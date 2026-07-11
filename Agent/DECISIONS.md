# Architectural & UX Decisions

## Positioning & Copywriting
- **B2B Focus**: The platform is strictly positioned as a B2B trust platform for real estate agents to prove their credibility, rather than a consumer marketplace. Aggressive sales language has been replaced with calm, confident, and professional copy (Stripe/Linear-esque).
- **Primary CTA**: Standardized the primary call-to-action across the platform to "Get Verified" to focus on the core value proposition.

## UI/UX Implementation
- **Navigation**: Implemented a smart auto-hiding navigation bar that hides on scroll-down and reappears on scroll-up (with a 10px threshold) to maximize screen real estate while keeping navigation accessible.
- **Form Layout**: In the Authentication Layout, the visual relationship between the hero text and the dashboard preview was tightened by adjusting vertical padding to feel like a cohesive composition.
- **Password Creation**: Replaced the standard "Confirm Password" field and post-submit validation with a real-time, dynamic checklist and strength indicator. This provides positive, instant feedback without requiring a secondary input field.

## Typography & Scanning Optimization
- Text across the landing page (especially the Benefits and How it Works sections) has been ruthlessly trimmed. Titles are kept under 3-4 words, and descriptions are 10-14 words max. This creates perfect visual symmetry across grid cards and optimizes for 3-5 second scanning rather than deep reading.

## Frictionless Onboarding
- **Deferred Authentication**: Users are directed straight from the Landing Page into the Trust Card creation flow. Sign-up is deferred until the very end when the user actually wants to save or fully manage their newly created Trust Card. This drastically reduces drop-off rates at the top of the funnel.
- **Progressive Profiling**: The onboarding splits data entry into single, focused questions (Specialization, Strength) using easy-to-click chips with an "Other" override, before offering a one-click LinkedIn import to eliminate typing.
- **Unified Navigation**: Extracted a unified `<WizardNavigation />` component used consistently across all onboarding steps to ensure alignment, identical padding/spacing, and a predictable user flow.
- **Anonymous Publishing**: Users can publish a basic version of their Trust Card directly from the wizard without an account. An upsell encourages them to "Complete Profile" to unlock the Dashboard and analytics.

## Public Profile & Owner Preview
- **Shared Architecture**: To prevent drift between what the user previews and what the public sees, a single PublicProfileLayout component is used for both views. The Owner Preview simply wraps this layout with an OwnerPreviewBanner based on a ?preview=true query parameter.
- **Inline Edit Mode**: From the Owner Preview, users can enter "Edit Mode" which transforms the existing page into an inline editing interface using temporary Zustand store data (`isInlineEditing` and `tempDraft`). This allows users to update their profile photo, bio, and other fields in-place without navigating away from the preview or being redirected to the onboarding wizard.
- **Share Modal & Toasts**: To enrich the sharing experience without introducing heavy external modal/toast libraries, a custom Share modal and absolute-positioned Toast notifications were built directly into the OwnerPreviewBanner component.
- **Future Proofing**: Although the current MVP uses a static /profile route, the architecture is designed so that the PublicProfileLayout can easily be dropped into a dynamic route (e.g. /trust-card/[slug]) when backend integration is completed.

## Product Decisions (Public Profile & Trust Card)
- **Authentic Empty States**: Public Trust Card empty states should never display fabricated or fake credibility metrics (e.g., fake reviews, ratings, response times). Instead, they elegantly show conditional empty states (e.g., "Metrics & Verification Pending") until real data exists. 
- **Visitor-Centric Copy**: All empty-state messaging on the public Trust Card must be written from the visitor's perspective (e.g., "This professional is currently completing verification.") rather than addressing the profile owner (e.g., "Your Trust Card...").
- **Isolated Management UI**: Top management banners and editing actions are strictly reserved for the owner's preview (`?preview=true`) or dashboard, ensuring the public URL feels like a genuine public profile rather than an account management screen.

## Architecture & Refactoring Strategy
- **Incremental Refactoring over Large-Scale Restructuring**: Chosen for MVP to improve maintainability with minimal risk. Large "God Components" (`wizard-steps.tsx`, `trust-card-preview.tsx`, `signup-form.tsx`) were decomposed.
- **No Structural Shifts During MVP**: No folder restructuring and no store migrations during the MVP phase. Refactoring must strictly avoid introducing UI or behavioral changes.
- **Postponed Feature-First Restructuring (Phase 2)**: Large-scale architecture refactoring (migrating to feature-based folders) has been intentionally postponed until after MVP stabilization to reduce implementation risk, minimize merge conflicts, and maintain development velocity.

## Dashboard Architecture & Registry
- **Goal-Config Registry Pattern**: Dashboard content is driven entirely by a `GoalConfig` object resolved at runtime via `getGoalConfig(selectedGoal)`. Each goal is a self-contained data file in `data/goals/`. Registering a new goal only requires adding a file and one entry in the `goalConfigs` registry in `data/goals/index.ts` — no page or routing changes needed.
- **Decoupled Config Resolution**: Decoupled the page router component in `app/dashboard/page.tsx` from goal-mapping switches by moving the `getGoalConfig()` factory function to the centralized goal registry folder, keeping the routing layer clean.
- **Separation of Data and UI**: All dashboard mock/seed data lives in `data/goals/`, not inside components. Components are pure presentational layers that receive typed props from the config. This keeps components reusable across different goals without branching.
- **Dynamic Import for `GoalDashboard`**: The top-level dashboard component is loaded via `next/dynamic` to prevent SSR hydration issues (the component relies on Zustand store state that is only available client-side) and to keep the initial dashboard page bundle lean.

## Sidebar & Information Architecture
- **4-Tab Navigation**: Refactored the dashboard navigation to exactly four tabs: Overview, Trust Card, Verification, and Settings. Non-active pages render clean title-only placeholders during this experimental phase.
- **Contextual Sidebar Bottom Actions**: The sidebar bottom conditionally renders based on the active tab. For Overview, Trust Card, and Verification, the standard Trust Score widget is shown. When Settings is active, the Trust Score is replaced with a clean list of primary support and account actions (Contact Support and Logout) with Logout explicitly styled with the destructive color to minimize visual noise elsewhere.

## Dashboard UX & Visual Consistency
- **Goal Progress Embedded in Recommendations**: Removed the standalone, non-actionable Goal Progress card. Embedded a compact, styled `GoalStatusBlock` directly at the top of `SmartRecommendations` to connect progress visualization directly to the actionable coach recommendations, making it clearer how to close the conversion gap.
- **Qualitative Recommendation Impact Labels**: Replaced numerical/percentage impact strings in `Recommendation` items with qualitative tags (`"High" | "Medium" | "Low"`). This prevents misleading user expectations prior to having real analytics and allows correct visual color-coding of badges.
- **Trimmed Performance Insights**: Reduced the Performance Insights section from 4 cards to exactly 2 high-value, action-oriented cards ("Biggest Opportunity" and "Visitor Behavior"), laid out in a clean 2-column grid. Visual spacing and heights were minimized to optimize information density.
- **Visual Conversion Bridges in Funnel**: Replaced absolute floating downward percentage badges and connector lines in the funnel with explicit, descriptive inline bridge lines (e.g. "X% of Profile Views converted to Contact Clicks"). The layout follows a logical top-to-bottom layout: Metric Name -> Value -> Progress Bar -> Conversion bridge.
- **Standardized Card Styling System**: Enforced strict CSS token mapping to eliminate UI drift:
  - Cards: outer borders mapped to `border-slate-200` with `shadow-sm` and radius `rounded-xl` (12px).
  - Headers: Standardized padding to `pb-4 border-b border-slate-100 shrink-0` across all cards.
  - Subtitles: Standardized weight and size to `text-sm text-slate-500 mt-1 font-medium`.
  - Badges/Pills: Standardized border radius to `rounded-md` (8px).
- **Executive Summary Hero Emphasis**: Expanded the Executive Summary to span the full width of the content area, establishing it as the primary visual hero and focal point of the dashboard.
- **Supportive Weekly Goal Widget**: Redesigned the Weekly Goal from a dominant, heavy card (`bg-slate-900`) into a horizontal, visually lightweight widget (`bg-white`) placed below the KPI cards. Replaced raw number emphasis with an actionable "Share Your Profile" CTA to encourage goal completion without dominating the interface.
- **Uniform Metric Cards**: Standardized the Executive Summary metric cards (Profile Views, Contact Clicks, etc.) to use the native `<Card>` component with CSS grid and array mapping. This guarantees identical dimensions, padding, icon positioning, and typography across all summary cards.

## Development Environment Authentication
- **Dual Auth Architecture**: Implemented a hybrid authentication strategy where a custom Auth.js Credentials Provider is exclusively enabled in development mode (`NODE_ENV=development`), providing frictionless local testing without compromising production security, where only secure providers (like Google OAuth) will run.

## Trust Card Editor Redesign
- **Isolated Editor Module**: Created a dedicated `components/dashboard/trust-card-editor/` directory to house the Trust Card Editor logic, keeping the main dashboard clean and preserving the Single Responsibility Principle for editing functionality.

## Settings & Verification
- **Dynamic Verification Schemas**: Implemented dynamic forms for different Verification types (Identity, Certification, License, Award). To avoid creating massive bloated union types or multiple tables, all type-specific fields are stored within a flexible `metadata: Record<string, string>` JSON object on the `VerificationEntry` model. This ensures scalability without interface churn.
- **Dirty State Settings**: The Settings MVP implements rigorous dirty-state tracking across all form inputs and toggles, keeping the "Save Changes" button disabled until actual changes occur, providing immediate user feedback and following standard UX best practices.

## Onboarding Data Strategy vs Dashboard
- **Single-Item Onboarding vs Multi-Entry Dashboard**: To maximize onboarding completion rates, steps like Experience and Achievements are strictly limited to single-item forms during the wizard. However, they are mapped to array-based state structures (`experiences[]`, `achievements[]` at index `0`) to remain perfectly compatible with the dashboard's multi-entry capability where users manage full lists.
- **Intercepted Completion Flow**: The post-preview state intercepts standard onboarding completion with an explicit decision screen. To solve race conditions between preview redirects and signup, the "Complete Profile" flow completely bypasses `completeOnboarding()` store updates, navigating directly to `/signup`, allowing the signup-success callback to handle the final conversion of the user's `trustCardDraft` to permanent status.

## MVP Stabilization & Linting Strategy
- **Zero Tolerance Linting**: Enforced a strict 0 errors and 0 warnings linting threshold prior to MVP launch to completely eliminate baseline technical debt.
- **Hydration Mismatch Mitigation**: Safely bypassed the `react-hooks/set-state-in-effect` rule selectively for `setMounted(true)` within empty-dependency `useEffect` hooks, acknowledging this as an established and intended pattern to prevent Next.js hydration mismatches.
- **Third-Party Type Conflicts**: Mitigated strict type conflicts stemming from external UI component libraries (e.g., Radix UI's `BaseUIEvent` overriding standard React events) using strict `React.MouseEvent` combined with isolated `@ts-expect-error` overrides. This keeps internal types pure while safely maintaining external library integration.
