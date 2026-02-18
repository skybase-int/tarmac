---
name: create-linear-ticket
description: Create a well-structured Linear issue with codebase context gathering and open questions
argument-hint: [brief description of what the ticket is about]
---

# Create Linear Ticket

Follow this process strictly before creating any Linear issue.

## 1. Gather Codebase Context

- Read the relevant source files the user mentions or that relate to the task
- Identify affected components, hooks, utilities, and routing
- Look for existing patterns, helpers, or abstractions that are relevant to the implementation
- Note the file paths and key technical details

## 2. Ask Clarifying Questions

Before creating the ticket, use AskUserQuestion to resolve any ambiguity:

- UX or design decisions that affect implementation
- Scope boundaries (what's in vs. out)
- Priority if not specified
- Any other open questions that would change the ticket content

Do NOT create the ticket until questions are answered.

## 3. Draft the Ticket

Prepare the full ticket content but do NOT create it yet.

### Title Guidelines
- Use imperative mood ("Add...", "Fix...", "Update...")
- Keep under 70 characters
- Be specific about what and where

### Metadata
- **Team**: Jetstream
- **Labels**: Pick from existing labels (Feature, Bug, Improvement, app -> webapp, Design, UX, etc.) as appropriate

### Description Format

Structure the description with these sections:

```markdown
## Summary
1-2 sentence overview of what needs to happen and why.

## Current Behavior
What happens today (be specific, reference components/files).

## Desired Behavior
What should happen after implementation. Include concrete details like URLs, UI states, or data flow.

## Implementation Notes
- Files to modify (with paths)
- Existing patterns or utilities to reuse
- Technical constraints or considerations
- Suggested approach based on codebase conventions

## Design Considerations
Any UX decisions that need design input (omit if none).

## Acceptance Criteria
- [ ] Specific, testable criteria
- [ ] Cover the main scenarios
- [ ] Include edge cases if relevant
- [ ] Include accessibility requirements if applicable
```

## 4. Preview and Confirm

Before creating the ticket, output the full draft to the user including:
- **Title**
- **Labels**
- **Full description** (rendered markdown)

Then use AskUserQuestion to ask the user to confirm:
- "Create this ticket?" with options: "Yes, create it", "Edit first" (let the user provide changes)

Do NOT call `mcp__linear-server__create_issue` until the user confirms.

## 5. Create the Ticket

Only after user confirmation, use `mcp__linear-server__create_issue` to create the issue.

Return the ticket URL and a brief summary of what was created.
