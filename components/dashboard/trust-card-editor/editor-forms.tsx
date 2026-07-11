"use client"

import * as React from "react"
import { ProfilePhotoStep } from "@/components/onboarding/profile-photo-step"
import { ProfileInformationStep } from "@/components/onboarding/profile-information-step"
import { SpecializationStep } from "@/components/onboarding/specialization-step"
import { StrengthStep } from "@/components/onboarding/strength-step"
import { ExperienceManager } from "@/components/dashboard/trust-card-editor/experience-manager"
import { TestimonialManager } from "@/components/dashboard/trust-card-editor/testimonial-manager"
import { TrustMetricsManager } from "@/components/dashboard/trust-card-editor/trust-metrics-manager"

export function EditorForms() {
  return (
    <div className="w-full">

      {/* Basic Information Section */}
      <section id="Basic Information" data-editor-section="true" className="scroll-mt-8">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
          <p className="text-sm text-slate-500 mt-1">Manage your name, profile photo, and short bio.</p>
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-lg p-1">
            <ProfilePhotoStep isEditorMode={true} />
          </div>
          <div className="bg-white rounded-lg p-1">
            <ProfileInformationStep isEditorMode={true} section="basic" />
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section id="Trust Signals" data-editor-section="true" className="scroll-mt-8 mt-16">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">Trust Signals</h3>
          <p className="text-sm text-slate-500 mt-1">Highlight your expertise, specialization, and strongest traits.</p>
        </div>
        <div className="space-y-12">
          <div className="bg-white rounded-lg p-1">
            <SpecializationStep isEditorMode={true} />
          </div>
          <div className="bg-white rounded-lg p-1">
            <StrengthStep isEditorMode={true} />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="Metrics" data-editor-section="true" className="scroll-mt-8 mt-16">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">Metrics</h3>
          <p className="text-sm text-slate-500 mt-1">Manage the metrics displayed on your Trust Card.</p>
        </div>
        <div className="bg-white rounded-lg p-1 border border-slate-100 shadow-sm">
          <TrustMetricsManager />
        </div>
      </section>

      {/* Experience Section */}
      <section id="Experience" data-editor-section="true" className="scroll-mt-8 mt-16">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
          <p className="text-sm text-slate-500 mt-1">Manage your work history to show your track record.</p>
        </div>
        <div className="bg-white rounded-lg p-1">
          <ExperienceManager />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="Testimonials" data-editor-section="true" className="scroll-mt-8 mt-16">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">Testimonials</h3>
          <p className="text-sm text-slate-500 mt-1">Add client feedback to build social proof.</p>
        </div>
        <div className="bg-white rounded-lg p-1">
          <TestimonialManager />
        </div>
      </section>

      {/* Contact Section */}
      <section id="Contact" data-editor-section="true" className="scroll-mt-8 mt-16">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">Contact</h3>
          <p className="text-sm text-slate-500 mt-1">Provide your phone number, email, and social links.</p>
        </div>
        <div className="bg-white rounded-lg p-1">
          <ProfileInformationStep isEditorMode={true} section="contact" />
        </div>
      </section>

      {/* Appearance Section */}
      <section id="Appearance" data-editor-section="true" className="scroll-mt-8 mt-16 mb-16">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-semibold text-slate-900">Appearance</h3>
          <p className="text-sm text-slate-500 mt-1">Customize the visual appearance of your public profile.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 min-h-[150px]">
          <p>Theme selection coming soon...</p>
        </div>
      </section>

    </div>
  )
}
