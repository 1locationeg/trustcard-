"use client"

import * as React from "react"
import { useOnboardingStore, Testimonial } from "@/stores/onboarding-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from "lucide-react"

export function TestimonialManager() {
  const { trustCardDraft, savedTrustCard, userMode, updateDraft } = useOnboardingStore()
  const draft = userMode === "registered" && savedTrustCard ? savedTrustCard : trustCardDraft;

  const testimonials = draft.testimonials || [];

  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const handleAdd = () => {
    const newId = Date.now().toString();
    const newTestimonial: Testimonial = {
      id: newId,
      clientName: "",
      role: "",
      quote: "",
      rating: 5
    };
    updateDraft({ testimonials: [...testimonials, newTestimonial] });
    setExpandedId(newId);
  }

  const handleUpdate = (id: string, field: string, value: string | number) => {
    updateDraft({
      testimonials: testimonials.map(test => 
        test.id === id ? { ...test, [field]: value } : test
      )
    });
  }

  const handleDelete = (id: string) => {
    updateDraft({
      testimonials: testimonials.filter(test => test.id !== id)
    });
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newTestimonials = [...testimonials];
      [newTestimonials[index - 1], newTestimonials[index]] = [newTestimonials[index], newTestimonials[index - 1]];
      updateDraft({ testimonials: newTestimonials });
    } else if (direction === 'down' && index < testimonials.length - 1) {
      const newTestimonials = [...testimonials];
      [newTestimonials[index + 1], newTestimonials[index]] = [newTestimonials[index], newTestimonials[index + 1]];
      updateDraft({ testimonials: newTestimonials });
    }
  }

  return (
    <div className="space-y-4">
      {testimonials.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 border border-slate-100 border-dashed rounded-xl">
          <p className="text-slate-500 text-sm mb-3">No testimonials added yet.</p>
          <Button type="button" onClick={handleAdd} variant="outline" size="sm" className="bg-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((test, index) => {
            const isExpanded = expandedId === test.id;

            return (
              <div key={test.id} className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                {/* Header (Collapsed view) */}
                <div 
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors ${isExpanded ? 'border-b border-slate-100 bg-slate-50' : ''}`}
                  onClick={() => setExpandedId(isExpanded ? null : test.id)}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-semibold text-slate-900 truncate">
                      {test.clientName || "New Testimonial"}
                    </h4>
                    <p className="text-sm text-slate-500 truncate">
                      {test.role || "Client"}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-slate-700"
                      onClick={(e) => { e.stopPropagation(); handleMove(index, 'up') }}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-slate-700"
                      onClick={(e) => { e.stopPropagation(); handleMove(index, 'down') }}
                      disabled={index === testimonials.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 ml-1"
                      onClick={(e) => { e.stopPropagation(); handleDelete(test.id) }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="w-8 flex justify-center ml-1 text-slate-400">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Form */}
                {isExpanded && (
                  <div className="p-5 space-y-5 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2 md:col-span-1">
                        <Label>Client Name</Label>
                        <Input 
                          value={test.clientName}
                          onChange={(e) => handleUpdate(test.id, "clientName", e.target.value)}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label>Company or Role</Label>
                        <Input 
                          value={test.role}
                          onChange={(e) => handleUpdate(test.id, "role", e.target.value)}
                          placeholder="e.g. Buyer, CEO at Acme Corp"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Rating (1-5)</Label>
                        <select 
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          value={test.rating || 5}
                          onChange={(e) => handleUpdate(test.id, "rating", parseInt(e.target.value, 10))}
                        >
                          <option value={5}>5 Stars (Excellent)</option>
                          <option value={4}>4 Stars (Good)</option>
                          <option value={3}>3 Stars (Average)</option>
                          <option value={2}>2 Stars (Poor)</option>
                          <option value={1}>1 Star (Terrible)</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Quote</Label>
                        <Textarea 
                          value={test.quote}
                          onChange={(e) => handleUpdate(test.id, "quote", e.target.value)}
                          className="h-24 resize-none"
                          placeholder="What did the client say about working with you?"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          
          <Button 
            type="button" 
            onClick={handleAdd} 
            variant="outline" 
            className="w-full border-dashed text-slate-600 bg-slate-50 hover:bg-slate-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Testimonial
          </Button>
        </div>
      )}
    </div>
  )
}
