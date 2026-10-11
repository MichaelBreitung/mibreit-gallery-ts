# Current Feature

> Active feature. See `INSTRUCTIONS.md` for the lifecycle.

- **Ticket:** `consistent-input-validation`
- **Branch:** `consistent-input-validation`
- **Updated:** 2026-10-11

## Goal

Reject malformed numeric attributes and factory inputs early, and centralize configuration defaults so components do not encode library defaults.

## Build Plan

- [ ] Define shared factory/config validation helpers and centralize the images-wall defaults in configuration types/checks.
- [ ] Validate all factory selectors, callbacks, and numeric options; validate web-component numeric attributes and remove the component-side slideshow interval default.
- [ ] Cover `NaN`, non-numeric attributes, invalid selector types, missing selectors, and images-wall defaults/checks in unit tests.
- [ ] Update README and architecture documentation, including the slideshow default decision.
- [ ] Run the existing test suite and reconcile the ticket/workflow state.

## Open Questions

- [x] Slideshow web-component default — **Answer:** use the centralized library default of 5000 ms; remove the component's 4000 ms override and update documentation.

## Decisions

- Keep validation in web components for attribute conversion and in factories for structural parameters; use configuration checks for numeric/config options — this follows the architecture's entry-point and factory responsibilities.
- Treat finite-number validation as a configuration-check responsibility so `NaN` cannot pass existing `typeof number` checks.
- Use a shared selector/selector-pair validation helper in the factory layer to avoid repeating selector and DOM lookup failures.
- Validate optional callback parameters only where TypeScript runtime typing is meaningful, while keeping the public factories permissive about optional arguments.

## Flags

- None yet.
