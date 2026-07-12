import os
import sys
from ftplib import FTP

logs = []
def log(msg):
    print(msg)
    logs.append(msg)

def main():
    ftp_host = os.environ.get('FTP_HOST')
    ftp_username = os.environ.get('FTP_USERNAME')
    ftp_password = os.environ.get('FTP_PASSWORD')
    
    if not all([ftp_host, ftp_username, ftp_password]):
        log("ERROR: Missing one or more FTP environment variables: FTP_HOST, FTP_USERNAME, FTP_PASSWORD")
        sys.exit(1)
        
    try:
        log('Connecting to FTP server...')
        ftp = FTP(ftp_host)
        ftp.login(ftp_username, ftp_password)
        log('Logged in successfully!')
        
        local_dir = 'out'
        remote_dir = 'domains/r8estate.com/public_html/trustcard'
        
        # Walk local directory and upload files
        for root, dirs, files in os.walk(local_dir):
            rel_path = os.path.relpath(root, local_dir)
            if rel_path == '.':
                target_dir = remote_dir
            else:
                target_dir = os.path.join(remote_dir, rel_path).replace('\\', '/')
            
            # Ensure directory exists on server
            parts = target_dir.split('/')
            current_parts = []
            for part in parts:
                if not part:
                    continue
                current_parts.append(part)
                path_to_create = '/'.join(current_parts)
                try:
                    ftp.mkd(path_to_create)
                    log(f'Created remote directory: {path_to_create}')
                except Exception:
                    pass # Already exists
            
            for file in files:
                # Skip .htaccess upload from the regular out/ folder walk
                if file == '.htaccess':
                    log('Skipping .htaccess file in walk')
                    continue
                    
                local_file = os.path.join(root, file)
                remote_file = os.path.join(target_dir, file).replace('\\', '/')
                
                try:
                    with open(local_file, 'rb') as f:
                        ftp.storbinary(f'STOR {remote_file}', f)
                    log(f'SUCCESS: Uploaded {file} -> {remote_file}')
                except Exception as e:
                    log(f'ERROR: Failed to upload {remote_file}: {e}')
        
        # Attempt to upload and rename htaccess.txt to .htaccess on subdomain root
        ftp.cwd(remote_dir)
        
        htaccess_content = """DirectoryIndex index.html index.htm

<IfModule mod_rewrite.c>
RewriteEngine Off
</IfModule>
"""
        
        with open('temp_htaccess.txt', 'w') as f:
            f.write(htaccess_content)
            
        try:
            log('Uploading temp_htaccess.txt as htaccess.txt...')
            with open('temp_htaccess.txt', 'rb') as f:
                ftp.storbinary('STOR htaccess.txt', f)
            log('Uploaded htaccess.txt successfully!')
            
            # Try to delete existing .htaccess first
            try:
                ftp.delete('.htaccess')
                log('Deleted old .htaccess successfully!')
            except Exception as e:
                log(f'No old .htaccess deleted: {e}')
                
            # Rename htaccess.txt to .htaccess
            try:
                ftp.rename('htaccess.txt', '.htaccess')
                log('Successfully renamed htaccess.txt to .htaccess!')
            except Exception as e:
                log(f'ERROR: Failed to rename htaccess.txt to .htaccess: {e}')
        except Exception as e:
            log(f'ERROR: Failed htaccess operations: {e}')
            
        # Read remote .htaccess if exists to verify
        log('\nAttempting to read remote .htaccess:')
        try:
            lines = []
            ftp.retrlines('RETR .htaccess', lines.append)
            log('Found .htaccess content:')
            log('\n'.join(lines))
        except Exception as e:
            log(f'No .htaccess found or cannot read: {e}')
            
        # Read parent directory .htaccess to debug routing
        log('\nAttempting to read parent directory (.public_html) .htaccess:')
        try:
            ftp.cwd('..')
            parent_lines = []
            ftp.retrlines('RETR .htaccess', parent_lines.append)
            log('Found parent .htaccess content:')
            log('\n'.join(parent_lines))
            ftp.cwd('trustcard')
        except Exception as e:
            log(f'Cannot read parent .htaccess: {e}')
            
        # Get final file list including hidden files
        log('\nSubdomain Directory Listing (LIST -a):')
        lines = []
        ftp.retrlines('LIST -a', lines.append)
        log('\n'.join(lines))
        
        ftp.quit()
    except Exception as e:
        log(f'FTP fatal error: {e}')
        
    # Write all logs to ftp_list.txt
    with open('ftp_list.txt', 'w') as f:
        f.write('\n'.join(logs))

if __name__ == '__main__':
    main()
