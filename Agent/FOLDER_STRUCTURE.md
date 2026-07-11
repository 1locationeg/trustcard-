app/
  dashboard/        # Dashboard page (goal-based, dynamically rendered)
  onboarding/       # Onboarding wizard routes
  profile/          # Public profile + owner preview
  login/
  signup/

components/
  auth/             # Login, signup, password strength indicator
  dashboard/
    goal-dashboard.tsx        # Top-level dashboard orchestrator
    shared/                   # All dashboard section components
    trust-card-editor/        # Editor UI components and layout
  onboarding/       # Wizard steps and navigation
  profile/          # PublicProfileLayout, OwnerPreviewBanner, TrustCard sub-components
  ui/               # shadcn/ui reusable primitives

data/
  goals/            # Per-goal config files (more-leads, more-authority, more-referrals) + index

types/              # Shared TypeScript interfaces (dashboard.ts, etc.)

stores/             # Zustand global state (onboarding-store.ts)

hooks/              # Custom React hooks

lib/                # Pure utility functions (password-strength, cn)

constants/          # App-wide constants (routes, etc.)

styles/             # Global CSS

public/             # Static assets

schemas/            # Zod validation schemas

Agent/              # AI agent context, rules, and project documentation