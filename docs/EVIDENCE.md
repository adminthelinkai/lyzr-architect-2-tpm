# Requirement → flow → evidence

Status definitions: **Local** = working behavior on this device; **Simulated** = deterministic external-service flow; **Deferred** = absent. Tests and browser results are recorded in VERIFICATION.md; a passing result is not a claim of production readiness.

| Requirement / user problem | Screen or journey | Implementation | Verification |
| --- | --- | --- | --- |
| Authentication and low-friction entry | Home, demo identity | Local demo identity; real auth deferred | Journey A entry; reset |
| Homepage, recent projects, templates, discovery | Overview, Discover | Local projects/search; six starting points; input-based discovery suggestions | Browser route/overflow sweep; DOM navigation |
| Prompt to plan; clarify requirements | Outcome & plan | Local editable outcome, audience, owner and threshold | A: approve plan; state validation |
| Chat, changes, assumptions | Build, Plan | Local bounded edit parser; unsupported requests explain limits | Impact, stale proposal, numeric validation tests |
| Visible generation, cancel/retry | Build | Timed simulated build with preserved plan | Unit cancel/retry; real browser build |
| Configurable app structure | App structure / Build | Local heading, labels, fields, stages and three layouts | Platform state tests and custom-app Chrome journey |
| Interactive app preview | Build → Preview | Local inbox/board/briefs, distinct records, custom fields, record creation/stages/search, human assignment | Browser preview changes, rollback and reload |
| Agent roles, instructions, framework, model | Agents | Add/edit/remove roles and contracts; inference simulated | Agent config state test; DOM config change |
| Inputs/outputs/tools/knowledge | Agents, Files, Data | Derived contracts and local source metadata | File-map assertions; route sweep |
| Existing Studio agent reuse | Studio dialog | Sample reference attach; actual account reuse deferred | Local transition; manual coverage remains narrower |
| Existing-project import | Overview → Import | Validated JSON manifest; repository cloning simulated | B: invalid input preserved, valid import, missing model |
| Any-framework agent workflow | Import, Agents | Lyzr/LangGraph/CrewAI/AutoGen/custom metadata; executable adapters deferred | Validation and config state tests |
| Integration setup and recovery | Data & connections | Missing/denied/connected simulations | A: denied Teams → reconnect; B: missing model |
| Database explorer and schema | Data | Local sample rows and schema; cloud DB deferred | Route/overflow sweep; source inspection |
| Memorable change interaction | Build → Change impact | Local interface/agent/connection review, apply, diff, undo | A and B; immutable and stale proposal tests |
| Code/configuration, logs, versions | Technical view, History | Derived file map, editable config, local transition history | B config diff; revision and snapshot assertions |
| GitHub authorization, branch, sync, conflicts | GitHub | Simulated destination and revision sync; automatic sync setting | B: conflict blocks sync → remote choice → sync |
| Realistic test and failure | Scenario lab | Deterministic fixtures and connection validation | Missing knowledge/model, timeout, retry suite |
| Deployment readiness and progress | Release | Revision-aware checks and timed simulation | A/B releases; changed-during-release guard |
| Failure recovery, versions, rollback | Release | Simulated release snapshots with real local rollback | A failure → retry → v2 → rollback; reload |
| Sharing/collaboration | Share, Settings | Copy prototype link, JSON export, local roles; realtime deferred | DOM behavior; external invites never sent |
| Usage and cost | Settings | Local run counter and illustrative budget; no billing | Source inspection and transition accounting |
| Persistence and reset | All routes, Settings | Browser localStorage and reset | Browser reload/reset; state recovery tests |
| Keyboard, focus, narrow-screen layout | All | Native controls/dialogs, focus rings, 390px breakpoint | See browser report and explicit limitations |
| Live URL and public source | Separate publication workflow | See HANDOFF.md | Hosting terminal status; repository metadata check |

## Known coverage boundaries

The inventory is evidence-bounded: authenticated Architect account settings and all integrations were not directly explored. This prototype does not establish exhaustive parity. General natural-language app generation, arbitrary repository import, real cloud collaboration/auth/database, usage billing and actual framework execution remain deferred. Those gaps should be acknowledged in the interview.
