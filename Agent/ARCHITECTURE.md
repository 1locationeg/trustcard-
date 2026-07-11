# Architecture Summary (Post-Phase 1)

This document provides a concise summary of the project's current architecture following the completion of the Phase 1 Incremental Refactoring. It serves as a quick guide for developers continuing MVP feature development.

## 1. Folder Structure (MVP)
The project currently adheres to a traditional Next.js App Router structure. (Feature-first restructuring has been intentionally deferred until Phase 2).

```text
/app               # Next.js App Router (Pages, Layouts, Route Handlers)
/components        # React Components (UI, Shared, Domain-specific)
  /auth            # Authentication and Signup forms/indicators
  /onboarding      # Trust Card Wizard components and steps
  /profile         # Public Profile and Owner Preview layouts
  /dashboard        # Goal-based dashboard and its shared sub-components
  /ui              # Reusable design system components (shadcn/ui)
/data              # Static/seed data organized by feature (e.g., goals/)
/lib               # Shared utilities (e.g., password strength logic, cn wrapper)
/stores            # Global state management (Zustand)
/types             # Shared TypeScript type definitions (e.g., dashboard.ts)
/constants         # Application-wide constants (e.g., Routes)
/Agent             # AI context, rules, decisions, and documentation
```

## 2. Major Reusable Components
- **`TrustCardPreview`**: A lightweight composition component containing the Trust Card visual elements (`TrustCardAvatar`, `TrustCardHeader`, `TrustCardHighlights`, `TrustCardSocials`). Used seamlessly across the Wizard and the Public Profile.
- **`PublicProfileLayout`**: The single source of truth for the public profile page layout. Conditionally renders owner-editing capabilities if in `isInlineEditing` mode.
- **`OwnerPreviewBanner`**: A management banner rendered *only* when the `?preview=true` parameter is present, preventing visitors from seeing owner controls.
- **`SelectionStep`**: A highly reusable wizard step component handling option chips, searching, and custom "Other" inputs.
- **`WizardNavigation`**: Standardized bottom navigation for the onboarding wizard.

## 3. Shared Utilities
- **`lib/password-strength.ts`**: Pure functions extracting the business logic for calculating password strength criteria.
- **`stores/onboarding-store.ts`**: The primary Zustand store managing global application state, handling:
  - The `trustCardDraft` data payload.
  - The `tempDraft` for isolated inline edits.
  - Flow states (`isEditMode`, `isInlineEditing`).
  - Wizard navigation methods (`nextStep`, `previousStep`).

## 4. Current Onboarding Flow (Frictionless)
1. **Landing Page**: User lands and clicks "Get Verified" -> Navigates to `/onboarding/welcome`.
2. **Progressive Wizard**: 5 modular steps (`specialization-step`, `strength-step`, `profile-photo-step`, `profile-information-step`, `review-step`). State is saved globally in Zustand.
3. **Publishing**: User can publish directly as an anonymous draft or sign up.
4. **Authentication (Deferred)**: Sign-up is postponed until the user wishes to claim and manage their newly built card, drastically reducing funnel drop-off.

## 5. Current Trust Card Flow
1. **Creation**: Built in the wizard using `TrustCardPreview` as a real-time feedback mechanism.
2. **Owner Preview**: The newly published card redirects to `/profile?preview=true`. The owner sees the `PublicProfileLayout` wrapped by the `OwnerPreviewBanner`.
3. **Inline Editing**: Owners can click "Edit Trust Card" from the preview, instantly swapping text for inputs (using `tempDraft`) without navigating away or breaking the layout.
4. **Public Visitor**: A visitor accessing `/profile` sees the exact same layout but is presented with elegant, visitor-facing empty states (e.g., "Metrics & Verification Pending") instead of management banners or fake data.

## 6. Goal-Based Dashboard Architecture

The dashboard dynamically adapts its content, copy, and KPIs to the agent's chosen goal (set during onboarding).

### Data Layer — `data/goals/`
Each goal is an isolated file (`more-leads.ts`, `more-authority.ts`, `more-referrals.ts`) that exports a typed `GoalConfig` object. The `data/goals/index.ts` file maintains a registry (`goalConfigs`) and exports `getGoalConfig(goal)` — a single lookup function with a safe fallback to "More Leads".

**Adding a new goal requires only:** creating a new config file and registering it in `index.ts`. No changes to any page or component are needed.

### Type System — `types/dashboard.ts`
All dashboard data contracts are defined here: `GoalConfig`, `GoalProgress`, `Recommendation`, `FunnelStep`, `FunnelInsight`, `ChartData`, `ChartDatasets`, `SummaryMetrics`, `InsightCard`, `ContactRateRating`, `RecentActivityItem`.

### Component Layer — `components/dashboard/`
- **`goal-dashboard.tsx`**: Top-level orchestrator. Receives `firstName` and `config: GoalConfig`, composes all section components. Loaded dynamically via `next/dynamic`.
- **`shared/goal-summary.tsx`**: Hero/executive summary section — greeting, goal title, KPI metrics, contact rate rating.
- **`shared/performance-insights.tsx`**: Renders the `InsightCard[]` list.
- **`shared/conversion-funnel.tsx`**: Visualises `FunnelStep[]` with percentage bars and an optional insight callout.
- **`shared/analytics-charts.tsx`**: Time-range-switchable bar chart of views and clicks using `ChartDatasets`.
- **`shared/smart-recommendations.tsx`**: Renders `Recommendation[]` cards; conditionally shows `GoalStatusBlock` when `goalProgress` is provided.
- **`shared/goal-progress.tsx`**: Standalone `GoalProgressBlock` component displaying goal attainment progress bar and status message. Imports `GoalProgress` from `@/types/dashboard`.
- **`shared/recent-activity.tsx`**: Scrollable activity feed.
- **`shared/quick-actions.tsx`**: Fixed shortcut action bar.