# Task Log

## Dashboard Executive Layout & Weekly Goal Refinement
**Status:** Completed

### Summary of Changes:
- **Executive Summary Hero**: Extracted the Weekly Goal card from `goal-summary.tsx` to allow the Executive Summary to span the full width of the dashboard, making it the primary focal point.
- **Uniform Metric Cards**: Refactored the four Executive Summary metric cards to use a strictly mapped `<Card>` component array, guaranteeing 100% identical heights, paddings, typography baselines, and icon alignments. Added the missing `MessageSquare` icon to the Conversations card.
- **Weekly Goal Widget Redesign**: Created `weekly-goal.tsx` as a horizontal, lightweight supportive widget (`bg-white` with subtle borders) placed beneath the KPI cards. Replaced the heavy emphasis on numbers with an actionable "Share Your Profile" CTA.
- **Top Spacing Reduction**: Removed the sticky "Goal Dashboard" header from `app/dashboard/page.tsx` and tightened the top padding (`pt-8`) so the new Executive Summary hero is immediately visible.

## Dashboard Visual Consistency Audit & Code Quality Refactoring
**Status:** Completed

### Summary of Changes:
- **Visual Consistency Standards Enforced**: Standardised all card and visual block borders, corners, shadows, and paddings across the dashboard.
  - Standardised all cards to `shadow-sm border-slate-200 rounded-xl`.
  - Standardised all card headers to `pb-4 border-b border-slate-100 shrink-0` and removed redundant margins.
  - Card subtitles formatted uniformly with `text-sm text-slate-500 mt-1 font-medium`.
  - Growth and best day badges inside `analytics-charts.tsx` aligned to badge standard `rounded-md`.
  - Shrunk performance insights card heights and unified text-size/spacing across grids.
- **Goal Status Block Integration**: Standardised on embedding a compact progress bar and status line in `SmartRecommendations` and removed the standalone, un-actionable `GoalProgress` widget card.
- **De-cluttered Funnel Layout**: Removed visual vertical connector lines and arrow percentage badges from the funnel; replaced them with inline descriptive conversion text (e.g. "X% of A converted to B").
- **Goal registry centralisation**: Created a unified `data/goals/index.ts` file containing a map of configurations and `getGoalConfig()` factory, removing page router logic dependencies.
- **Type Tightening & Dead Code Removal**:
  - Typed `Recommendation.impact` strictly as `"High" | "Medium" | "Low"` rather than loose string values, and replaced mock percentages in config files.
  - Deleted unused component files (`goal-progress.tsx` and `more-leads-dashboard.tsx`).
  - Removed dead `conversionLabel` helper in `conversion-funnel.tsx`.
  - Replaced hand-rolled `BarChart3Icon` inline SVG with `lucide-react`'s native `BarChart3` component.

## Sidebar IA Refactor & Dashboard UX Iteration
**Status:** Completed


### Summary of Changes:
- **Sidebar Restructured**: Replaced current navigation with 4 tabs: Overview (LayoutDashboard), Trust Card (BadgeCheck), Verification (ShieldCheck), and Settings (Settings). When Settings is active, the sidebar bottom displays "Contact Support" and "Logout" (destructive styling) instead of the Trust Score card. Other active pages render clean placeholder titles for now.
- **Conversion-Oriented UI Overhaul**:
  - **Performance Insights**: Redesigned to show qualitative, "so what?" observations (Visitor Behavior, Biggest Opportunity, etc.) instead of duplicating executive metrics.
  - **Goal Status Block**: Consolidated the Goal Progress widget directly inside the `SmartRecommendations` panel, grouping tracking directly with its actionable recommendations.
  - **Funnel Conversion Bridges**: Redesigned the Conversion Funnel to display inline percentage conversion indicators bridging each stage.
  - **Chart badges**: Added visual growth percentage and best day badges inside the Analytics Chart header.
- **Cleaned Up imports & unused files**: Cleaned up the dashboard imports, and deleted the unused `goal-progress.tsx` file (since it was nested inside `SmartRecommendations`).

## Goal-Based Dashboard Architecture
**Status:** Completed

### Summary of Changes:
- **Created GoalProgressBlock**: Created a standalone component `goal-progress.tsx` in `components/dashboard/shared` to resolve a missing import error.
- **Config-Driven Dashboard**: Integrated the dashboard page to dynamically select configurations based on user goals, using dynamic imports and registries.
- **Type Integration**: Integrated dashboard data structures with `types/dashboard.ts`.

## Owner Preview Inline Editing
**Status:** Completed

### Summary of Changes:
- **Inline Edit Mode**: Implemented an in-place editing experience directly on the Owner Preview page.
- **State Management**: Added `isInlineEditing` and `tempDraft` to the Zustand store, allowing users to modify a temporary copy of their draft.
- **Form Controls**: Swapped out static text elements for `Input` and `Textarea` components across `TrustCardPreview` and `PublicProfileLayout` while preserving the exact same layout.
- **Banner Actions**: Replaced the default banner actions with "Save Changes" and "Cancel" during edit mode, persisting changes to the global store without any page refresh or routing.
- **Profile Photo Upload**: Integrated the image upload functionality directly into the inline avatar component.

## Bug Fixes & UX Improvements
**Status:** Completed

### Summary of Changes:
- **Header Navigation:** Re-routed the "Create Trust Card" button in the top navigation to start the onboarding flow instead of redirecting to Sign Up.
- **Owner Preview Actions:**
  - Implemented an edit mode for the onboarding wizard (`isEditMode` added to global store), allowing users to preserve and edit their Trust Card draft and save it to return to the Owner Preview page.
  - Built a custom `ShareModal` within `OwnerPreviewBanner` with sharing options (Copy Link, WhatsApp, LinkedIn, Facebook, X, Email).
  - Added a success toast notification when the public link is copied to the clipboard.
- **Dashboard Routing & Avatar Fix:**
  - Fixed an empty `src` warning by conditionally rendering the `AvatarImage` component only when a valid source exists.
  - Improved auth routing to ensure signed-up users are redirected directly to the Dashboard via `callbackUrl` handling, eliminating unnecessary redirects.


## Trust Card Onboarding Flow Update
**Status:** Completed

### Summary of Changes:
- Overhauled the onboarding flow to use a "try before you buy" approach, allowing users to build their Trust Card entirely before requiring authentication.
- Re-routed the "Create Trust Card" CTA from the Landing Page to the `ONBOARDING_GOAL` route instead of `SIGNUP`.
- Implemented a 5-step wizard flow featuring:
  - Step 1: Specialization selection (chips + custom input).
  - Step 2: Biggest Strength selection (chips + custom input).
  - Step 3: Profile Photo upload (with preview, replace, remove, and circular display).
  - Step 4: Profile Information (with simulated LinkedIn one-click import to reduce friction).
  - Step 5: Review & Publish screen, offering routing logic for either authenticating via "Go to Dashboard" or anonymous "Publish".
- Created a dedicated `Publish` screen showing the final card, QR code, sharing utilities, and an upgrade upsell highlighting premium verified features.
- Persisted new form state globally using the existing Zustand store.
- Updated `DECISIONS.md` to reflect the new Frictionless Onboarding and Progressive Profiling philosophy.

## Public Profile & Owner Preview Experience
**Status:** Completed

### Summary of Changes:
- Implemented the complete Public Profile layout featuring Trust Summary, Track Record, Client Reviews, and a sticky Trust Card sidebar.
- Created an Owner Preview mode that reuses the exact same Public Profile layout to guarantee visual consistency.
- Added an `OwnerPreviewBanner` that conditionally appears when the `?preview=true` flag is present.
- Replaced the generic success screen in the publishing flow with a dynamic publishing state, which seamlessly auto-navigates the user to their Owner Preview.
- Simplified the final wizard review step by removing the redundant "Back to Editing" action, replacing it with a balanced two-button layout focusing purely on next steps.

## Phase 1 Incremental Refactoring
**Status:** ✅ Completed

### Summary of Changes:
- **Batch 1 (signup-form.tsx)**: ✅ Extracted password strength logic into `lib/password-strength.ts` and the UI indicator into `components/auth/password-strength-indicator.tsx`.
- **Batch 2 (trust-card-preview.tsx)**: ✅ Decomposed into `trust-card-header.tsx`, `trust-card-avatar.tsx`, `trust-card-highlights.tsx`, and `trust-card-socials.tsx`.
- **Batch 3 (wizard-steps.tsx)**: ✅ Split into individual step files (`specialization-step.tsx`, `strength-step.tsx`, `profile-photo-step.tsx`, `profile-information-step.tsx`, `review-step.tsx`) and a reusable `selection-step.tsx`.
- **Empty States**: ✅ Replaced fake placeholder data with correct visitor-facing empty states.

## Phase 2 Large-Scale Architecture Refactoring
**Status:** ⏳ Deferred until Phase 2 (Post-MVP)

### Planned Work:
- Feature-First Folder Restructuring.
- Global Store Migration (if necessary).
- Comprehensive architectural shifts.
