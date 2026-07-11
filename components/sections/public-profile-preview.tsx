"use client"

import * as React from "react"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { Card } from "@/components/ui/card"
import { VerificationBadge } from "@/components/ui/verification-badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { MapPin, Briefcase, Mail, Phone, QrCode, Share } from "lucide-react"

export function PublicProfilePreview() {
  return (
    <section className="py-20 md:py-28 bg-slate-900 text-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-grid-slate-800/[0.2] bg-[size:32px_32px]" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionTitle 
            title="A stronger first impression."
            subtitle="Consolidate your professional identity into a single, verified destination. Share your R8ESTATE profile prior to appointments to let your established reputation speak for itself."
            className="text-slate-50 [&_p]:text-slate-400"
          />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-50 text-slate-900 overflow-hidden shadow-2xl border-none">
              <div className="h-32 bg-slate-200 w-full relative">
                {/* Cover Image Placeholder */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
              </div>
              
              <div className="px-6 sm:px-8 pb-8 relative -mt-16">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <div className="flex flex-col items-start gap-4">
                    <Avatar className="h-32 w-32 border-4 border-slate-50 shadow-md">
                      <AvatarImage src="/mohamed-othman.png" alt="Profile" />
                      <AvatarFallback>MO</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        Mohamed Othman
                        <VerificationBadge />
                      </h2>
                      <p className="text-slate-600 font-medium">Senior Property Consultant at Elite Realty</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="rounded-full shadow-sm">
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full shadow-sm">
                      <Share className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col items-center bg-primary/5 text-primary px-3 py-1 rounded-lg border border-primary/20 ml-2">
                      <span className="text-2xl font-bold leading-none">98</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider">Trust Score</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">About</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        With over 10 years of experience in luxury real estate, I specialize in helping families find their dream homes while ensuring a transparent and stress-free transaction process.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Areas Served</p>
                          <p className="text-slate-500 text-xs">Downtown, Westside, North Hills</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Experience</p>
                          <p className="text-slate-500 text-xs">10+ Years Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full gap-2 shadow-sm">
                      <Mail className="h-4 w-4" /> Contact Agent
                    </Button>
                    <Button variant="outline" className="w-full gap-2 shadow-sm">
                      <Phone className="h-4 w-4" /> View Phone Number
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex justify-center"
          >
            <Button variant="outline" size="lg" className="bg-slate-800/50 text-slate-50 border-slate-700 hover:bg-slate-800 hover:text-white px-8 shadow-sm h-12">
              View a Sample Profile
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
