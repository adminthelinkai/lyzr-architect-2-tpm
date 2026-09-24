# Product rationale

## Thesis and personas

Help the person responsible for a business outcome and the person responsible for its implementation make changes to the **same app** without losing the reason behind those changes. A business owner needs to understand the next action and who remains accountable. A developer needs to inspect contracts, configuration, dependencies and release evidence.

Architect 2.0 serves users building agentic applications across domains. Support, sales, research and hiring are independent examples. A blank custom project demonstrates user-defined structure and agents; EPC quality remains optional. These examples are hypotheses for demonstration, not evidence of market demand.

## Selected differentiation

**Change impact** is the central interaction. “Add Teams alerts” produces a review across interface status, handoff-agent tools, and required permission. Applying the proposal updates shared configuration and preview, invalidates stale tests, and adds a release blocker until the connection is ready. Undo restores the prior app/agent configuration. Technical users see a diff on the same proposal.

This is a product hypothesis about review clarity, not a claim that no other platform offers change review. The current implementation is a deterministic prototype and does not generate arbitrary applications.

## Five consequential decisions

1. **One project, two levels of detail.** Guided/technical is a presentation choice over one state model. Work does not fork. Tradeoff: business users still need a few technical concepts at release time; plain-language checks carry that explanation.
2. **Outcome approval before generation.** The plan asks for a reviewer and threshold, rather than an exhaustive questionnaire. Tradeoff: assumptions remain; they are listed for validation rather than hidden.
3. **Cross-layer change review.** Impact comes before apply, with inspectable diff and undo. Tradeoff: an extra step slows trivial edits. Validate whether low-risk changes should later offer an abbreviated review.
4. **Release evidence belongs to a revision.** Configuration changes invalidate old results; missing permissions and conflicts block a release. Tradeoff: conservative invalidation reruns more checks than a production dependency graph would require.
5. **Compatibility starts with an explicit contract.** Imported manifests identify files, dependencies and missing environment names. Framework selectors describe metadata, not fake executable support. Tradeoff: this demonstrates the interaction but cannot prove adapter compatibility. Build one real adapter before expanding coverage.

## Visual direction

The workspace uses a crisp white working surface, deep green navigation accents, and a controlled lime action color. The sample app sits inside a separate preview frame so users can distinguish the platform from the app being built. Typography and spacing prioritize the next decision; technical controls appear on demand, while the outcome and revision remain visible.

## Priority decisions

Depth went to both complete journeys, impact/undo, meaningful failure recovery and state consistency. Backend work was deliberately deferred, following the brief's order. Zero runtime dependencies make the prototype portable and easy to inspect. Native HTML forms and dialogs provide a small, maintainable foundation; a component framework would be preferable as the product grows.

Multiple templates provide distinct workflows, data and previews. Role-based collaboration and Studio reuse remain simulations with explicit limits. Billing and full current-account parity remain gaps. They were not padded with fake successful transactions.

## Next validation

- Interview paired business owners and engineers across support, sales and research; ask about the last application or workflow they built and its actual handoffs. Do not lead with AI.
- Observe them changing a routing rule in their current tool and in this prototype. Measure completion, wrong assumptions, assistance needed, and explanation accuracy.
- Test whether the impact review helps users correctly identify all affected layers; compare with a plain chat confirmation.
- Instrument time to first reviewed preview, first recovered failure, release-check abandonment and repeat collaborative edits. Proposed metrics, not existing results.
- Pilot one real Lyzr integration and one permissioned knowledge source with a small, approved dataset. Define false-escalation and missed-escalation costs with the team before choosing thresholds.
- Continue only if users can explain and safely change the workflow, and repeated usage replaces a real handoff rather than adding another dashboard.
