# Verification record

Verified 24 September 2026. This records observed checks, not a self-assigned quality score.

## Automated checks

- `npm run check`: passed JavaScript syntax checks.
- `npm test`: 11 tests passed, 0 failed. Includes both journeys through the actual form handlers in Happy DOM and important domain invariants.
- `npm run build`: passed static asset/manifest validation. This project has no bundling step.
- `node verification/render.mjs`: both complete journeys passed in isolated local Google Chrome, including missing connection, denied permission, invalid import, provider timeout, failed release/retry, conflict recovery, second release, rollback, reload and reset.
- No uncaught browser page errors. No document-level horizontal overflow on 12 main routes at 390×844. Desktop captured at 1440×1000.
- `node verification/accessibility.mjs`: keyboard skip link, dialog Escape, build cancel/retry, and 200% root-text enlargement smoke checks passed. Enlarged text originally squeezed the workspace; container reflow corrected it. The skip-link hash navigation originally had a focus race; explicit main focus corrected it.

- `node verification/platform.mjs`: distinct sales/research/custom projects, editable app structure, adding an agent, record creation/stage changes, persistence, contracts, and mobile routes passed with no page errors or horizontal overflow.
- New state checks cover domain independence, custom structure, agent/record transitions, coupled undo, and migration of existing EPC projects.

## Visual evidence

- `verification/01-home-desktop.png`
- `verification/02-change-impact-desktop.png`
- `verification/03-release-desktop.png`
- `verification/04-developer-github.png`
- `verification/05-workspace-mobile.png`
- `verification/06-text-enlargement.png`

Desktop impact, homepage, mobile workspace and enlarged-text screenshots were visually inspected. New evidence includes `07-sales-board.png`, `08-research-briefs.png`, `09-custom-application.png`, and `10-platform-mobile.png`. Native in-app browser tooling could not start because of a Windows sandbox helper error. Local isolated Chrome was used as a fallback; this is not a claim of testing the user's signed-in browser or the authenticated Architect product.

## What remains unverified

- Screen-reader behavior and a full WCAG audit, including all contrast combinations.
- Safari, Firefox, real phones, touch devices and every intermediate viewport.
- Real OAuth, API credentials, GitHub sync, model behavior, Studio integration, backend persistence or cloud collaboration: these are deliberately absent.
- General app generation and arbitrary repository/framework compatibility.
- Real customer usability, adoption, ROI, cost and accuracy.

Transient notifications appear in some captured screenshots. They disappear automatically and are not blocking dialogs. The narrow navigation intentionally scrolls horizontally; document-level overflow is absent.

Hosting success and public-repository verification are reported separately in HANDOFF.md after publication. No form was submitted and no recruiter message was sent.
