# Interview preparation

## Explain the architecture in one minute

This is a static browser application with a pure domain state module and a UI module. Each project owns its blueprint, editable structure, agent graph, records, chat, configuration, tests, GitHub simulation and release snapshots. The blueprints module separates example-domain assumptions from platform behavior. Unknown prompts start blank; prompt classification is a bounded rule set, not AI inference. Transitions clone state, validate preconditions, mutate the clone, and return it. The UI persists that result to localStorage and rerenders the current route. File views are derived from the same state, so they cannot silently diverge from preview settings.

The website uses plain HTML/CSS/JavaScript with no runtime dependencies. Node provides the local server and tests. Happy DOM tests the actual forms; isolated Chrome verifies rendered flows and captures desktop/mobile screenshots. This stack prioritizes portability and inspectability for a UI-led assignment. A larger product would benefit from typed state, component boundaries, a proper editor, and a server.

## Key code paths to read

1. `createProject`, `initialState`, `restoreState` in `dist/state.js`: defaults, state schema and interrupted-operation recovery.
2. `proposeChange`: bounded request interpretation and three-layer impact. Unknown requests produce explicit errors.
3. `transition` → `APPLY`, `UNDO`, `revise`: cross-layer mutation and invalidation of old tests. `APPLY` rejects a stale proposal.
4. `fileMap`: app config, agent contract and tool contract projections.
5. `readiness`, `DEPLOY_START`, `DEPLOY_DONE`: prerequisites and a captured revision stop changes from slipping into an in-flight release.
6. `ROLLBACK`: restore app/agent snapshot while preserving current connection state. A subsequent release requires fresh testing.
7. `app.js`: `dispatch`, `dispatchFor`, `render`, form handlers and modal behavior. Hash navigation gives static-host routing. Form drafts survive mode/view changes in memory; committed project state survives reload.

## Consequential technical tradeoffs

- Immutable cloning keeps transitions easy to reason about, but cloning the entire project does not scale to large files or long histories.
- Broad test invalidation is conservative and simple. Production should invalidate only affected evaluations using a dependency graph.
- localStorage is device-local and synchronous; it is not a database, access-control boundary, or multi-user sync layer.
- Export produces JSON, not a runnable generated application bundle. Import accepts a bounded manifest, not arbitrary source or an exported workspace.
- Framework-neutral contracts communicate compatibility intent. A real adapter must map lifecycle, tools, streaming, state and errors and pass contract tests.
- Native dialogs provide keyboard focus containment. Rerendering large HTML fragments is less efficient and more fragile than component updates; focus behavior requires continued review.
- Agent tests use fixed fixtures and permission checks. They cannot establish model quality, grounding accuracy, latency or cost.
- The cost display counts local runs and multiplies by an explicitly illustrative constant; it is not metered billing.

## What would a production backend add?

Authenticated users and tenant-scoped projects; a durable event/snapshot store; server-side authorization; encrypted secret references; isolated build/test workers; versioned adapters; real knowledge ingestion with provenance and access control; job cancellation and idempotency; GitHub OAuth/App tokens; a deployment pipeline with signed artifacts and immutable version IDs. Any destructive external tool call needs a policy and human approval appropriate to its effect. The prototype's green permission badge is not that policy enforcement.

Use optimistic concurrency: every command carries a base revision, the server checks it transactionally, and conflicting changes return a recoverable conflict. Pin all release evidence to an immutable source/configuration version. Never put model or GitHub credentials into browser state.

## Prioritization defense

The assignment prioritizes UI/UX and complete flows. The core journeys and consequential failure states therefore came before a paid LLM integration. The differentiator is shared understanding of change. A backend that merely responds to a prompt would add less evidence of product judgment than state-consistent review and recovery.

Do not say this proves market demand. A compelling interaction is a hypothesis until people use it on real work.

## Discovery questions

- Tell me about the last workflow or application you built whose owner or supporting evidence was unclear. What happened next?
- What systems did people consult, and which record was authoritative?
- Which decisions can be drafted automatically, and who can approve them?
- What is worse: an unnecessary escalation or an incorrectly accepted exception? How often does each happen?
- How does the developer currently learn that a business rule changed?
- What must a reviewer see before approving a deployment?
- Who buys, configures, uses and audits this workflow? Are they different people?

## Adoption and validation plan

Recruit paired business-owner/developer teams in a narrow workflow. Capture a baseline handoff and a comparable prototype task. Evaluate task completion, explanation accuracy, wrong permission assumptions and assistance required. In a real pilot, measure first reviewed release, repeat edits across roles, time to resolve a blocked release and 4-week retention. Define thresholds jointly before running the pilot; no numeric results are claimed here.

## Questions that test your understanding

1. Why does applying a Teams alert change invalidate the old test result? Show the code.
2. What happens if the user edits the project during deployment? Why is a UI-only disabled button insufficient?
3. Which properties does undo restore, and why should rollback not restore old credentials?
4. How can two views stay consistent without sharing a component tree?
5. What would you replace first to support 100 concurrent users?
6. Which “framework support” claim would be dishonest for this build?
7. What can a passing sample suite prove, and what can it not prove?
8. What evidence would convince you to abandon the shared-workspace hypothesis?
9. Where do exported project data and local demo identity go? Is the share link a collaborative project link?
10. Which task would you still do in Codex, Cursor or Claude Code, and why?

## Personal preparation

Run the demo yourself, read the four key transition paths, and modify one threshold without assistance. Use your own real EPC/project examples only where you can substantiate them. Be transparent that this was built collaboratively with an AI assistant, and explain the decisions you understand and would own.
