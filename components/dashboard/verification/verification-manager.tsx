"use client"

import * as React from "react"
import { ShieldCheck, Plus, Trash2, FileText, CheckCircle2, Clock } from "lucide-react"
import { useOnboardingStore, VerificationEntry, VerificationType } from "@/stores/onboarding-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function VerificationManager() {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;
  const verifications = draft.verifications || [];

  const [isAdding, setIsAdding] = React.useState(false);
  const [newEntry, setNewEntry] = React.useState<Partial<VerificationEntry>>({
    type: 'Certification',
    title: '',
    description: '',
    status: 'Pending',
    metadata: {}
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSaveNew = () => {
    if (!newEntry.title) return;
    
    const entry: VerificationEntry = {
      id: Date.now().toString(),
      type: newEntry.type as VerificationType,
      title: newEntry.title,
      description: newEntry.description || "",
      status: 'Pending', // Mocking pending status for newly added proofs
      metadata: newEntry.metadata || {}
    };

    updateDraft({ verifications: [...verifications, entry] });
    setIsAdding(false);
    setNewEntry({ type: 'Certification', title: '', description: '', status: 'Pending', metadata: {} });
  };

  const handleDelete = (id: string) => {
    updateDraft({ verifications: verifications.filter(v => v.id !== id) });
  };

  const updateMetadata = (key: string, value: unknown) => {
    setNewEntry(prev => ({
      ...prev,
      metadata: { ...(prev.metadata || {}), [key]: value }
    }));
  };

  const types: VerificationType[] = ['Identity', 'Certification', 'License', 'Award', 'Membership', 'Document', 'Other'];

  const renderDynamicForm = () => {
    const type = newEntry.type;

    return (
      <div className="space-y-5">
        {/* Certification Form */}
        {type === 'Certification' && (
          <>
            <div className="space-y-2">
              <Label>Certificate Name</Label>
              <Input 
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                placeholder="e.g. Certified Residential Specialist (CRS)"
              />
            </div>
            <div className="space-y-2">
              <Label>Issuing Organization</Label>
              <Input 
                value={(newEntry.metadata as Record<string, string>)?.organization || ''}
                onChange={(e) => updateMetadata('organization', e.target.value)}
                placeholder="e.g. National Association of Realtors"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input 
                  type="month"
                  value={(newEntry.metadata as Record<string, string>)?.issueDate || ''}
                  onChange={(e) => updateMetadata('issueDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Expiration Date (Optional)</Label>
                <Input 
                  type="month"
                  value={(newEntry.metadata as Record<string, string>)?.expirationDate || ''}
                  onChange={(e) => updateMetadata('expirationDate', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Credential ID</Label>
                <Input 
                  value={(newEntry.metadata as Record<string, string>)?.credentialId || ''}
                  onChange={(e) => updateMetadata('credentialId', e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <Label>Credential URL</Label>
                <Input 
                  value={(newEntry.metadata as Record<string, string>)?.credentialUrl || ''}
                  onChange={(e) => updateMetadata('credentialUrl', e.target.value)}
                  placeholder="https://"
                />
              </div>
            </div>
          </>
        )}

        {/* Identity Verification Form */}
        {type === 'Identity' && (
          <>
            <div className="space-y-2">
              <Label>Full Name (as it appears on ID)</Label>
              <Input 
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                placeholder="e.g. John Edward Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Country of Issuance</Label>
              <Input 
                value={(newEntry.metadata as Record<string, string>)?.country || ''}
                onChange={(e) => updateMetadata('country', e.target.value)}
                placeholder="e.g. United States"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Government ID Type</Label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={(newEntry.metadata as Record<string, string>)?.idType || ''}
                  onChange={(e) => updateMetadata('idType', e.target.value)}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver License">Driver&apos;s License</option>
                  <option value="National ID">National ID Card</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Government ID Number</Label>
                <Input 
                  value={(newEntry.metadata as Record<string, string>)?.idNumber || ''}
                  onChange={(e) => updateMetadata('idNumber', e.target.value)}
                  placeholder="Optional for MVP"
                />
              </div>
            </div>
          </>
        )}

        {/* License Form */}
        {type === 'License' && (
          <>
            <div className="space-y-2">
              <Label>License Name</Label>
              <Input 
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                placeholder="e.g. Real Estate Broker License"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>License Number</Label>
                <Input 
                  value={(newEntry.metadata as Record<string, string>)?.licenseNumber || ''}
                  onChange={(e) => updateMetadata('licenseNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Issuing Authority</Label>
                <Input 
                  value={(newEntry.metadata as Record<string, string>)?.issuingAuthority || ''}
                  onChange={(e) => updateMetadata('issuingAuthority', e.target.value)}
                  placeholder="e.g. Dept of Real Estate"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input 
                  type="month"
                  value={(newEntry.metadata as Record<string, string>)?.issueDate || ''}
                  onChange={(e) => updateMetadata('issueDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Expiration Date</Label>
                <Input 
                  type="month"
                  value={(newEntry.metadata as Record<string, string>)?.expirationDate || ''}
                  onChange={(e) => updateMetadata('expirationDate', e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {/* Award Form */}
        {type === 'Award' && (
          <>
            <div className="space-y-2">
              <Label>Award Name</Label>
              <Input 
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                placeholder="e.g. Top Producer 2025"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization</Label>
                <Input 
                  value={(newEntry.metadata as Record<string, string>)?.organization || ''}
                  onChange={(e) => updateMetadata('organization', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input 
                  type="date"
                  value={(newEntry.metadata as Record<string, string>)?.date || ''}
                  onChange={(e) => updateMetadata('date', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                value={newEntry.description}
                onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                placeholder="Briefly describe this award..."
                className="resize-none h-20"
              />
            </div>
          </>
        )}

        {/* Fallback for other types */}
        {['Membership', 'Document', 'Other'].includes(type || '') && (
          <>
            <div className="space-y-2">
              <Label>Title / Name of Document</Label>
              <Input 
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                placeholder="Document title"
              />
            </div>
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea 
                value={newEntry.description}
                onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                placeholder="Briefly describe this credential..."
                className="resize-none h-20"
              />
            </div>
          </>
        )}

        {/* Universal Upload Box */}
        <div className="space-y-2 pt-2 border-t border-slate-100 mt-4">
          <Label>Upload Document</Label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <FileText className="h-8 w-8 text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 mt-1">PDF, JPG, JPEG, or PNG (max 5MB)</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="application/pdf,image/jpeg,image/jpg,image/png" 
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Verification
        </h2>
        <p className="text-slate-500 mt-2">Manage your professional credentials, awards, licenses, and official documents to build trust. Uploaded documents will be reviewed by our team.</p>
      </div>

      {isAdding ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Add Verification Proof</h3>
          
          <div className="space-y-6">
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <Label className="text-slate-700 font-semibold">Proof Type</Label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={newEntry.type}
                onChange={(e) => {
                  const newType = e.target.value as VerificationType;
                  // Reset form when changing type but keep type
                  setNewEntry({ type: newType, title: '', description: '', status: 'Pending', metadata: {} });
                }}
              >
                {types.map(t => <option key={t} value={t}>{t === 'Identity' ? 'Identity Verification' : t}</option>)}
              </select>
            </div>
            
            {renderDynamicForm()}
            
            <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button type="button" onClick={handleSaveNew} disabled={!newEntry.title}>Submit for Review</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-end mb-6">
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Verification
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {verifications.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center">
            <ShieldCheck className="h-10 w-10 text-slate-300 mb-3" />
            <h3 className="text-base font-semibold text-slate-900 mb-1">No verifications yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">Add your licenses, awards, or ID to increase your Trust Score and get the Verified badge.</p>
          </div>
        ) : (
          verifications.map((v) => (
            <div key={v.id} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900">{v.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {v.type === 'Identity' ? 'Identity Verification' : v.type}
                    </span>
                  </div>
                  {v.description && <p className="text-sm text-slate-500 line-clamp-1">{v.description}</p>}
                </div>
              </div>
              
              <div className="flex items-center gap-4 shrink-0">
                {v.status === 'Verified' ? (
                  <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                ) : v.status === 'Pending' ? (
                  <div className="flex items-center gap-1.5 text-amber-600 text-sm font-medium bg-amber-50 px-2.5 py-1 rounded-full">
                    <Clock className="h-4 w-4" />
                    <span className="hidden sm:inline">In Review</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-red-600 text-sm font-medium bg-red-50 px-2.5 py-1 rounded-full">
                    <span className="hidden sm:inline">Rejected</span>
                  </div>
                )}
                
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(v.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
