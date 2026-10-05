# BankDash — final polish
Theme update: see the final section below.

Layout, page structure, colour theme and breakpoints are unchanged. The active page now also lives in the URL hash (#/transactions). All new styling is in `src/polish.css` (loaded after `index.css`).

## New files
- `src/polish.css` — shadows, hover/press feedback, entrance animations, validation styles, toasts, dialog, popovers, empty state
- `src/context/ToastContext.tsx`, `NavContext.tsx`, `SettingsTabContext.tsx`
- `src/components/Modal.tsx`, `Spinner.tsx`
- `src/pages/PrivilegesPage.tsx` (empty state; "My Privileges" used to be a dead menu item)
- `src/data/search.ts`
- `src/assets/mark-light.svg`, `mark-dark.svg` (crisp vector replacements for the 21x13 placeholder `mc.png`)

## Modified files
App, DashboardLayout, Sidebar, Header, SearchBar, Section, QuickTransfer, TransactionTable, LoanTable, ServiceCard, CardList,
CardSettings, AddCardForm, FormField, EditProfileForm, PreferencesForm, SecurityForm, SettingsPage, Dashboard, AccountsPage,
TransactionsPage, CreditCard, useCountUp, main.tsx, index.html

## Colour theme pass
- CSS/TS already used the target palette (:root tokens in `src/index.css`); no Figma hex values remained in code.
- Recoloured the raster icons that still carried the Figma blue/teal/pink/amber/red/slate (47 PNGs in `src/assets`, same size/shape, alpha untouched) onto Primary / Secondary / Accent / Warning / Danger / slate.
- Contrast fixes: `.inv-row small` and notification timestamps use `--muted`; placeholder grey #94A3B8 -> #7B8AA0; pie labels on cyan/amber slices use dark text (`ExpenseStats.tsx`, `.pie-pct.dark` in `polish.css`).
