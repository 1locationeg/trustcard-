#!/usr/bin/env python3
"""
FTP Diagnostic and Cleanup Script for Hostinger Deployment
Helps diagnose and fix deployment issues on the FTP server
"""

import ftplib
import os
import sys
from datetime import datetime

class FTPDiagnostic:
    def __init__(self, host, username, password, port=21):
        self.host = host
        self.username = username
        self.password = password
        self.port = port
        self.ftp = None
        self.log_file = f"ftp_diagnostic_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"
        
    def log(self, message, level="INFO"):
        """Log messages to both console and file"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_message = f"[{timestamp}] [{level}] {message}"
        print(log_message)
        with open(self.log_file, 'a') as f:
            f.write(log_message + "\n")
    
    def connect(self):
        """Connect to FTP server"""
        try:
            self.log(f"Connecting to FTP server: {self.host}:{self.port}")
            self.ftp = ftplib.FTP()
            self.ftp.connect(self.host, self.port, timeout=10)
            self.ftp.login(self.username, self.password)
            self.log("✓ Successfully connected to FTP server")
            return True
        except ftplib.all_errors as e:
            self.log(f"✗ Failed to connect to FTP server: {e}", "ERROR")
            return False
    
    def disconnect(self):
        """Safely disconnect from FTP server"""
        try:
            if self.ftp:
                self.ftp.quit()
                self.log("Disconnected from FTP server")
        except:
            pass
    
    def list_directory(self, path="/"):
        """List files and directories"""
        try:
            self.log(f"Listing directory: {path}")
            self.ftp.cwd(path)
            files = self.ftp.nlst()
            self.log(f"✓ Found {len(files)} items in {path}")
            for f in files:
                self.log(f"  - {f}")
            return files
        except ftplib.all_errors as e:
            self.log(f"✗ Failed to list directory {path}: {e}", "ERROR")
            return []
    
    def check_file_exists(self, filepath):
        """Check if a file exists"""
        try:
            self.ftp.size(filepath)
            self.log(f"✓ File exists: {filepath}")
            return True
        except ftplib.error_perm:
            self.log(f"✗ File not found or permission denied: {filepath}", "ERROR")
            return False
    
    def delete_file(self, filepath):
        """Delete a file"""
        try:
            self.ftp.delete(filepath)
            self.log(f"✓ Successfully deleted: {filepath}")
            return True
        except ftplib.error_perm as e:
            self.log(f"✗ Permission denied deleting {filepath}: {e}", "ERROR")
            return False
        except ftplib.all_errors as e:
            self.log(f"✗ Failed to delete {filepath}: {e}", "ERROR")
            return False
    
    def delete_directory(self, path):
        """Delete an empty directory"""
        try:
            self.ftp.rmd(path)
            self.log(f"✓ Successfully deleted directory: {path}")
            return True
        except ftplib.error_perm as e:
            self.log(f"✗ Permission denied deleting directory {path}: {e}", "ERROR")
            return False
        except ftplib.all_errors as e:
            self.log(f"✗ Failed to delete directory {path}: {e}", "ERROR")
            return False
    
    def get_file_info(self, filepath):
        """Get file information"""
        try:
            size = self.ftp.size(filepath)
            self.log(f"✓ File: {filepath}, Size: {size} bytes")
            return size
        except ftplib.all_errors as e:
            self.log(f"✗ Failed to get info for {filepath}: {e}", "ERROR")
            return None
    
    def diagnose(self):
        """Run full diagnostics"""
        self.log("="*60)
        self.log("Starting FTP Diagnostic", "DIAGNOSTIC")
        self.log("="*60)
        
        if not self.connect():
            return False
        
        try:
            # Check trustcard directory
            self.log("\n1. Checking trustcard deployment directory:")
            self.list_directory("/")
            
            # Check if sync state file exists
            self.log("\n2. Checking for old sync state file:")
            sync_file = "/.ftp-deploy-sync-state.json"
            if self.check_file_exists(sync_file):
                self.log(f"Found problematic sync state file: {sync_file}")
                self.log("This file tracks previous deployments and causes cleanup errors")
            
            # List contents of trustcard folder
            self.log("\n3. Checking trustcard folder contents:")
            try:
                self.ftp.cwd("/")
                trustcard_contents = self.ftp.nlst()
                if "trustcard" in trustcard_contents or "trustcard/" in trustcard_contents:
                    self.list_directory("trustcard")
                else:
                    self.log("! trustcard folder not found in root", "WARNING")
            except Exception as e:
                self.log(f"! Could not access trustcard: {e}", "WARNING")
            
            # Check for _next directory issues
            self.log("\n4. Checking for _next directory issues:")
            try:
                self.ftp.cwd("trustcard")
                items = self.ftp.nlst()
                if "_next" in items:
                    self.log("✓ _next directory exists")
                    self.log("Attempting to list _next contents:")
                    try:
                        self.ftp.cwd("_next")
                        next_items = self.ftp.nlst()
                        self.log(f"✓ _next contains {len(next_items)} items")
                    except Exception as e:
                        self.log(f"! Could not access _next contents: {e}", "WARNING")
                else:
                    self.log("! _next directory not found in trustcard")
            except Exception as e:
                self.log(f"! Could not check _next: {e}", "WARNING")
            
            # Check for index.html
            self.log("\n5. Checking for index.html:")
            try:
                self.ftp.cwd("/trustcard")
                if "index.html" in self.ftp.nlst():
                    size = self.get_file_info("index.html")
                else:
                    self.log("! index.html not found - deployment may have failed", "WARNING")
            except Exception as e:
                self.log(f"! Could not check index.html: {e}", "WARNING")
            
            self.log("\n" + "="*60)
            self.log("Diagnostic complete. See recommendations below.", "DIAGNOSTIC")
            self.log("="*60)
            
        finally:
            self.disconnect()
        
        return True
    
    def cleanup(self):
        """Clean up problematic sync state file and old directories"""
        self.log("="*60)
        self.log("Starting FTP Cleanup", "CLEANUP")
        self.log("="*60)
        
        if not self.connect():
            return False
        
        try:
            # Delete sync state file
            self.log("\n1. Removing old sync state file:")
            sync_file = "/.ftp-deploy-sync-state.json"
            if self.check_file_exists(sync_file):
                if self.delete_file(sync_file):
                    self.log("✓ Sync state file removed - future deployments will start fresh")
            else:
                self.log("! Sync state file not found (already clean)")
            
            # Try to clean up corrupted _next directory
            self.log("\n2. Checking for orphaned _next directories:")
            try:
                self.ftp.cwd("/trustcard/_next")
                self.log("Listing contents of _next directory to assess cleanup needs:")
                items = self.ftp.nlst()
                self.log(f"Found {len(items)} items in _next")
                for item in items[:5]:  # Show first 5
                    self.log(f"  - {item}")
                if len(items) > 5:
                    self.log(f"  ... and {len(items) - 5} more items")
            except Exception as e:
                self.log(f"Could not inspect _next: {e}")
            
            self.log("\n" + "="*60)
            self.log("Cleanup complete", "CLEANUP")
            self.log("="*60)
            self.log("\nNext steps:")
            self.log("1. Manually delete _next directory via Hostinger File Manager if needed")
            self.log("2. Run a new deployment from GitHub Actions")
            self.log("3. The deployment will create fresh _next directory without conflicts")
            
        finally:
            self.disconnect()
        
        return True


def main():
    """Main execution"""
    # Get credentials from environment or command line
    ftp_host = os.getenv("FTP_HOST") or (sys.argv[1] if len(sys.argv) > 1 else None)
    ftp_username = os.getenv("FTP_USERNAME") or (sys.argv[2] if len(sys.argv) > 2 else None)
    ftp_password = os.getenv("FTP_PASSWORD") or (sys.argv[3] if len(sys.argv) > 3 else None)
    
    if not all([ftp_host, ftp_username, ftp_password]):
        print("Usage: python diagnose_ftp.py <host> <username> <password>")
        print("Or set FTP_HOST, FTP_USERNAME, FTP_PASSWORD environment variables")
        sys.exit(1)
    
    diagnostic = FTPDiagnostic(ftp_host, ftp_username, ftp_password)
    
    # Run diagnostics
    if diagnostic.diagnose():
        # Ask to cleanup
        print("\n" + "="*60)
        response = input("Run cleanup to remove sync state file? (yes/no): ").strip().lower()
        if response in ["yes", "y"]:
            diagnostic.cleanup()
    
    print(f"\nDiagnostic log saved to: {diagnostic.log_file}")


if __name__ == "__main__":
    main()
