# Coding Rules

## General

Write clean code.

Avoid duplicated code.

Keep components reusable.

Use descriptive names.

Never use magic numbers.

## React

Use functional components.

Keep components small.

Extract reusable logic into hooks.

## Next.js

Use App Router.

Prefer Server Components.

Use Client Components only when necessary.

## Styling

Tailwind CSS only.

Avoid inline styles.

Use Design Tokens.

Spacing must follow the 4px system.

Radius

- sm = 8
- md = 12
- lg = 16
- xl = 24

## Colors

Never hardcode colors.

Always use design system variables.

## Accessibility

Buttons need aria-label if necessary.

Images need alt text.

Inputs need labels.

Keyboard navigation must work.

## Performance

Lazy load large sections.

Optimize images.

Avoid unnecessary rerenders.

## Components

Each component should have a single responsibility.

Avoid "God Components".

If a component grows beyond approximately **200 lines**, consider splitting it into smaller reusable components.

Prefer composition over large components.

UI components should focus on rendering only.

---

## Functions

Keep functions small and focused.

A function should do one thing only.

If a function becomes difficult to read, split it into smaller functions.

Avoid deeply nested conditions.

---

## Business Logic

Never place business logic directly inside UI components.

Move complex logic into:

* hooks
* services
* utilities

**Configuration-Driven Thresholds:**
Never hardcode rating thresholds, statuses, or progress logic inside UI components. Define them in configuration objects (e.g., `GoalConfig` in `data/goals`) and pass them to components to map to design tokens dynamically.

Keep components as presentation layers whenever possible.

---

## State Management

Store only the state that needs to be shared.

Avoid unrelated state inside the same store.

Prefer feature-specific stores over one large global store.

Do not duplicate the same state in multiple places.

---

## Reusability

If the same UI or logic is repeated more than once, extract it into a reusable component, hook, or utility.

Avoid copy-paste implementations.

Shared components should only contain truly shared functionality.

---

## Folder Organization

Each feature should be isolated as much as possible.

A feature may contain:

* components
* hooks
* services
* validation
* constants
* types

Avoid mixing unrelated features.

---

## Imports

Use absolute imports whenever possible.

Group imports in the following order:

1. React / Next.js
2. Third-party libraries
3. Shared modules
4. Feature modules
5. Relative imports

Avoid circular dependencies.

---

## Naming

Use descriptive names.

Avoid abbreviations unless they are widely accepted.

Examples:

Good:

* TrustCardPreview
* OwnerPreviewBanner
* ProfileInformationForm

Avoid names like:

* Temp
* Data
* Component
* NewComponent
* Utils

---

## Constants

Do not hardcode:

* Routes
* Colors
* Labels
* Limits
* Status values

Move reusable values into constants.

---

## Validation

Keep validation rules inside dedicated validation files.

Do not duplicate validation logic.

---

## Error Handling

Never silently ignore errors.

Always provide meaningful feedback to users.

Handle loading, empty, success, and error states.

---

## Refactoring

Whenever modifying existing code:

Leave the code cleaner than you found it.

Reduce duplication where appropriate.

Do not introduce unnecessary abstractions.

---

## Documentation

Any significant architectural decision should be documented in:

* DECISIONS.md

Major structural changes should also update:

* ARCHITECTURE.md

Completed work should be recorded in:

* TASK_LOG.md
