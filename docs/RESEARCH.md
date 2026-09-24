# Research and source ledger

Reviewed 24 September 2026. This is bounded desk research, not customer discovery. Product claims below are documented claims, not independently measured results. All competitor friction points are **questions to validate**, not asserted weaknesses.

## Current assignment

The [live hiring brief](https://hiring.lyzrarchitect.space/) was fetched successfully over HTTP, including its public submission form content. The browser reading tool could not start. No substantive change from the supplied prompt was found: design/UI/UX/flows first, coverage second, working backend a bonus. Simulated flows are explicitly permitted; a live URL and public GitHub repository are required.

The two product prompts are “Why would a non-technical user pick your platform?” and “Why would a technical user pick your platform?” The first names Replit/Lovable/Emergent, the second Claude Code/Codex/Cursor. Other fields: full name, email, LinkedIn, resume PDF (up to 4 MB), deployed URL, GitHub, three comfort ratings, formal software-engineering experience, expected CTC, work-life-balance preference, and comments. Those personal fields remain for the applicant.

The [hiring post](https://www.linkedin.com/posts/suyashmankar_hiring-productmanagement-agenticai-share-7508696074547736579-mjtX) and [provided LinkedIn profile](https://www.linkedin.com/in/aihardik-bhatt/) were inaccessible. Background used only as supplied: 4+ years in AI architecture, 18+ total years in project management/leadership, EPC/manufacturing/industry familiarity. No employment history or achievements inferred.

## Current Architect inventory

[Architect](https://www.architect.new/) returned a client-rendered shell without readable application content. Authenticated product interaction is **unverified**; no claim of hands-on use is made. The following inventory is **documented** unless otherwise marked. It is an inventory of verified evidence, not a claim of exhaustive account-level parity.

| Capability | Evidence | Prototype treatment |
| --- | --- | --- |
| Discovery / AI Consultant | [Build guide](https://docs.lyzr.ai/enterprise/architect/build/build-guide): role, bottleneck, tools inform ideas | Discover dialog; fixed recommendation with stated limitation |
| Prompt → plan → agents → app; iterative refinement | Same build guide | Plan approval, agent configuration, timed build, preview, supported change requests |
| Knowledge and tools | Same build guide | Source metadata, contracts, permission states; no ingestion |
| Studio engineering handoff | [Architect + Studio](https://docs.lyzr.ai/enterprise/architect/introduction/platform/architect-vs-studio) describes deeper agent editing in Studio | Sample reference reuse; actual existing-agent import unverified |
| Agentlets / marketplace | [Agentlets](https://docs.lyzr.ai/enterprise/architect/introduction/platform/agentlets): browse and inspect; cloning explicitly “Coming Soon” | Sample workflow discovery and local template creation, labeled proposal |
| Template discovery | [Build guide](https://docs.lyzr.ai/enterprise/architect/build/build-guide) and documentation navigation | Two local starting points, one deeply implemented scenario |
| Managed database and authentication | [Database & Authentication](https://docs.lyzr.ai/enterprise/architect/build/database-auth) | Local data explorer and demo identity only; server implementation deferred |
| Projects and sharing | [Sharing an App](https://docs.lyzr.ai/enterprise/architect/build/share-app): project list, collaborator email, shared access | Recent projects, local access list, export and prototype link; no realtime collaboration |
| GitHub and automatic commits | [Connecting GitHub](https://docs.lyzr.ai/enterprise/architect/build/github-connect) | Sample authorization, repository/branch destination, automatic sync setting, conflict resolution |
| Deployment and URL | [Deployment & Publishing](https://docs.lyzr.ai/enterprise/architect/build/deployment) | Readiness gates, simulated releases, retry, snapshots; prototype separately hosted |
| Usage | [Usage](https://docs.lyzr.ai/enterprise/architect/introduction/platform/usage) | Actual local sample-run count; explicitly illustrative cost and budget |
| Universal framework compatibility | Hiring requirement, not established by current-product evidence | Framework-neutral contract metadata; executable adapters deferred |
| Detailed account settings, billing, support, sharing permissions | Not exhaustively inspected | Local settings and roles modeled; billing purchase flow deferred |

The [company site](https://www.lyzr.ai/) frames Lyzr around taking agents to production. This supports investigating operational clarity, but does not establish demand for our exact solution.

## Reference comparison

| Product / primary source | Target and documented workflow | Lesson applied | Open question to validate |
| --- | --- | --- | --- |
| [Replit Agent](https://docs.replit.com/features/agent/overview) | Broad builders; plain-language requests move through planning, code, checks and publishing | Preserve momentum from intent to a working result | How easily can an operations owner inspect the downstream consequences of an agent-policy change? |
| [Lovable](https://docs.lovable.dev/introduction/welcome) | Individuals and teams; natural language, project workspace, editable code and Git sync | Make preview and ownership part of one project | When does a team want a domain-specific review gate instead of a general app workflow? |
| [Emergent](https://emergent.sh/) | Beginners through developers; conversational web/mobile creation and owned source with GitHub integration | Keep entry lightweight and show a complete path to release | What evidence does an enterprise reviewer require before trusting generated agent behavior? |
| [v0 Design mode](https://v0.app/docs/design-mode), [Git Import](https://v0.app/docs/git-import) | UI builders and developers; preview edits and existing repository workflows | Couple visible edits with inspectable source | How should behavior, tool permissions and interface changes be reviewed together? |
| [Rocket.new](https://docs.rocket.new/getting-started/introduction) | Builders using Solve, Build and Intelligence; research can inform build context | Carry assumptions into implementation | Which discovery context remains useful during later release decisions? |
| [Cursor](https://cursor.com/docs) | Developers; codebase understanding, planning, changes, review and existing tools | Keep source inspection close to project intent | What handoff artifact lets a non-developer participate without opening the full coding environment? |
| [Codex](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex) | Engineering work across app, CLI and IDE; plans and verification guide longer tasks | Preserve inspectable progress and explicit validation | Which product-level decisions should stay visible outside the coding workflow? |
| [Claude Code](https://code.claude.com/docs/en/overview) | Developers; read codebase, edit files, run commands, integrate development tools | Respect existing work and technical control | What business-owner view improves review without duplicating the developer tool? |

All rows rely on first-party material. v0's documentation was available through indexed first-party excerpts; direct retrieval returned errors, so that evidence is weaker. Other cited pages were opened. No competitor account flows were exercised. No claim that competing products lack equivalent capabilities is made.

## Synthesis

Shared context is already a theme in current tools, so “chat plus code” is insufficient differentiation. The narrower hypothesis is that agentic business applications benefit from a single reviewable change spanning **interface → agent policy → integration permissions**, followed by revision-aware release evidence. The implementation makes that hypothesis tangible; adoption remains unproven.
