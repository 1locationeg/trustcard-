"use client"

import * as React from "react"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { useAuthStore } from "@/stores/auth-store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Trash2, Copy, ExternalLink, ShieldCheck, User, Globe, Lock, Bell, AlertTriangle, Pencil, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/routes"

export function SettingsManager() {
  const router = useRouter()
  const { trustCardDraft, savedTrustCard, userMode, updateDraft } = useOnboardingStore()
  const { logout, user } = useAuthStore()

  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft

  const getInitialData = () => ({
    fullName: draft.fullName || "",
    email: user?.email || "",
    slug: draft.slug || draft.fullName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || "",
    showEmail: true,
    showPhone: true,
    emailNotifications: true,
    profilePhoto: draft.profilePhoto || "",
  })

  const [initialData, setInitialData] = React.useState(getInitialData())
  const [formData, setFormData] = React.useState(getInitialData())
  const [isSaving, setIsSaving] = React.useState(false)
  const [slugError, setSlugError] = React.useState("")
  const [showToast, setShowToast] = React.useState(false)
  
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))

    if (name === "slug") {
      if (!value.trim()) {
        setSlugError("Public URL cannot be empty")
      } else {
        setSlugError("")
      }
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, profilePhoto: imageUrl }))
    }
  }

  const handleSave = () => {
    if (!formData.slug.trim()) {
      setSlugError("Public URL cannot be empty")
      return
    }

    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      updateDraft({
        fullName: formData.fullName,
        slug: formData.slug,
        profilePhoto: formData.profilePhoto,
      })
      setInitialData(formData)
      setIsSaving(false)
      
      // Show success toast
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }, 800)
  }

  const handleCopyLink = () => {
    const url = `${window.location.origin}/profile/${formData.slug}`
    navigator.clipboard.writeText(url)
    
    // Using the same toast for link copy
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleSignOut = () => {
    logout()
    router.push(ROUTES.LOGIN)
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")
    if (confirmed) {
      logout()
      router.push(ROUTES.LOGIN)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 relative">
      {/* Local Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-5 duration-300">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span className="font-medium text-sm">Settings saved successfully</span>
        </div>
      )}

      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>
        <p className="text-slate-500 mt-2">Manage your account preferences, public profile, and privacy settings.</p>
      </div>

      {/* Account Summary Card */}
      <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={formData.profilePhoto} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {formData.fullName.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="h-6 w-6 text-white" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/jpeg, image/png, image/webp" 
                onChange={handleFileChange}
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">{formData.fullName || "Real Estate Agent"}</h3>
              <p className="text-slate-500">{formData.email}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Professional
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                  <User className="h-3.5 w-3.5" />
                  Pro Plan
                </span>
                <span className="text-xs text-slate-500 font-medium ml-1">
                  Member since {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
          
          {/* Account Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-slate-500" />
                Account
              </CardTitle>
              <CardDescription>Update your basic account information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  disabled // Email typically requires special flow to change
                />
                <p className="text-xs text-slate-500">To change your email, please contact support.</p>
              </div>
            </CardContent>
          </Card>

          {/* Password Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-slate-500" />
                Password
              </CardTitle>
              <CardDescription>Secure your account with a strong password.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                Change Password
              </Button>
              <Button variant="ghost" className="w-full sm:w-auto text-slate-500 hover:text-slate-900">
                Forgot Password?
              </Button>
            </CardContent>
          </Card>

          {/* Public Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-slate-500" />
                Public Profile
              </CardTitle>
              <CardDescription>Manage how your profile appears on the web.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="slug">Public URL</Label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 sm:text-sm">
                    r8estate.com/profile/
                  </span>
                  <Input 
                    id="slug" 
                    name="slug" 
                    value={formData.slug} 
                    onChange={handleChange} 
                    className={`rounded-l-none ${slugError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    placeholder="your-name"
                  />
                </div>
                {slugError && <p className="text-xs text-red-500 font-medium">{slugError}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 bg-slate-50 border-t border-slate-100 py-4">
              <Button variant="outline" onClick={handleCopyLink} className="w-full sm:w-auto gap-2">
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
              <Button variant="outline" onClick={() => window.open(`/profile/${formData.slug}?preview=true`, '_blank')} className="w-full sm:w-auto gap-2">
                <ExternalLink className="h-4 w-4" />
                Preview Trust Card
              </Button>
            </CardFooter>
          </Card>

        </div>

        <div className="space-y-8">
          
          {/* Privacy Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-slate-500" />
                Privacy
              </CardTitle>
              <CardDescription>Control what visitors can see.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Show Email</Label>
                  <p className="text-xs text-slate-500">Display email on your public profile</p>
                </div>
                <Checkbox 
                  checked={formData.showEmail} 
                  onCheckedChange={(c) => handleCheckboxChange("showEmail", c as boolean)} 
                  className="h-5 w-5"
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Show Phone</Label>
                  <p className="text-xs text-slate-500">Display phone number on your profile</p>
                </div>
                <Checkbox 
                  checked={formData.showPhone} 
                  onCheckedChange={(c) => handleCheckboxChange("showPhone", c as boolean)} 
                  className="h-5 w-5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-slate-500" />
                Notifications
              </CardTitle>
              <CardDescription>Manage your alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Email Alerts</Label>
                  <p className="text-xs text-slate-500">Receive updates and leads via email</p>
                </div>
                <Checkbox 
                  checked={formData.emailNotifications} 
                  onCheckedChange={(c) => handleCheckboxChange("emailNotifications", c as boolean)} 
                  className="h-5 w-5"
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone Section */}
          <Card className="border-red-100 bg-red-50/30 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-slate-700 bg-white" 
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button 
                variant="destructive" 
                className="w-full justify-start" 
                onClick={handleDeleteAccount}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Global Save Button */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-white border-t border-slate-200 flex justify-end z-10">
        <div className="max-w-5xl w-full mx-auto flex justify-end">
          <Button 
            size="lg" 
            onClick={handleSave} 
            disabled={!isDirty || isSaving || !!slugError}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}
