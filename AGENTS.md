# AGENTS.md

## Non-negotiable

This project uses **Beads (`bd`)** + **Atomic (`atomic`)** for all agent work.

| Layer | Tool | Owns |
|-------|------|------|
| Work graph | Beads | Tasks, blockers, claims, memory, session context |
| Change graph | Atomic | Code changes, views, provenance, model/cost, attestations |

**Hard rule:** Do **not** write, edit, delete, refactor, or generate project code until the **Pre-Code Gate** passes.

If either tool is missing, uninitialized, or failing → **STOP**, report the failure, and wait for a human. No fallbacks. No “quick fixes.” No markdown TODO lists for task tracking.

---

## Pre-Code Gate (every session, before any code)

Run these checks in order. All must succeed.

```bash
# 1) Tools installed
bd --version
atomic --version

# 2) Project initialized
test -d .beads   || { echo "FAIL: run bd init"; exit 1; }
test -d .atomic  || { echo "FAIL: run atomic init"; exit 1; }

# 3) Agent hooks enabled (once per machine/agent; safe to re-run)
atomic agent enable
atomic agent status

# 4) Session context
bd prime
bd ready --json
atomic status
```

**Pass criteria**
- Both CLIs respond with a version
- `.beads/` and `.atomic/` exist
- Agent hooks show enabled/active
- You have either a claimable bead from `bd ready` **or** you create + claim one before coding

**Fail action:** Stop. Do not touch source files. Tell the user exactly which check failed and the fix command.

---

## First-time project setup (humans or agents, once)

Only if the project is not yet initialized:

```bash
# Install (examples — use official docs if these fail)
# Beads: https://beads.gascity.com/
# Atomic: https://docs.atomic.dev/

bd init
atomic init
atomic agent enable
atomic vault init   # if vault not already present

# Seed initial work (example)
bd create "Project bootstrap / baseline" -t epic -p 1
bd create "Define first milestone" -t task -p 1
bd dep add <child-id> <parent-epic-id>
```

After setup, every agent session still runs the **Pre-Code Gate**.

---

## Session protocol (mandatory for the life of the project)

### A. Boot

```bash
bd prime
bd ready --json
```

Then **exactly one** of:

```bash
# Claim existing ready work
bd update <bead-id> --claim

# OR create then claim
bd create "<clear title>" -t task -p <0-4> --json
bd update <new-id> --claim
```

Start an Atomic goal linked to the bead:

```bash
atomic vault goal start --title "<same title as bead>" --intent <bead-id>
```

If multi-agent or parallel work needs isolation:

```bash
atomic view create agent-<session-or-bead-id> --draft --parent dev
atomic view switch agent-<session-or-bead-id>
```

### B. During work

1. **Only** implement the claimed bead (and its explicit child beads).
2. Keep Atomic hooks on — every agent turn should be recorded with model, session, tokens, cost, provenance.
3. After meaningful progress, update both systems:

```bash
bd update <bead-id> --notes "Progress: <what changed and why>"
atomic record -m "<type>: <summary> (<bead-id>)"
# types: feat|fix|refactor|docs|test|chore
```

4. Discover new work → create beads + deps. Do **not** bury new work only in chat.
5. Blocked? Record it:

```bash
bd update <bead-id> --status blocked --notes "Blocked by: ..."
bd dep add <blocked-id> <blocker-id>
bd create "Unblock: ..." -t task -p 1
```

6. Persistent project knowledge:

```bash
bd remember "<durable insight, convention, or decision>"
atomic vault memory add "<architecture/decision worth keeping>"
```

### C. Done / close task

```bash
# Verify (project-specific)
# e.g. tests, lint, typecheck — run what the repo requires

bd close <bead-id> --reason "Done: <one-line outcome>"
atomic vault goal stop --promote
atomic status
```

### D. End of session / handoff

```bash
bd prime                    # confirms remaining context
bd ready --json             # next claimable work
atomic agent attest         # session attestation (cost/coverage)
atomic log                  # recent changes
# If remotes configured:
# bd dolt push
# atomic push origin
```

Handoff truth order:
1. `bd prime` + open/ready beads  
2. `atomic log` / attestations  
3. Chat history is disposable  

---

## ID cross-linking (required)

Every unit of work must be traceable both ways.

| Direction | Rule | Example |
|-----------|------|---------|
| Atomic → Beads | Include bead ID in every Atomic record message | `fix: validate token expiry (bd-a1b2)` |
| Beads → Atomic | Put change hash / view name in bead notes when useful | `change:XMJZ3IPF view:agent-bd-a1b2` |
| Commits/PRs (if git still used) | Include bead ID | `feat: add age gate (bd-a1b2)` |

No orphan code: if it shipped, a bead was claimed and closed (or explicitly deferred).

---

## Roles of each tool (do not confuse)

### Beads owns
- What work exists
- Priority, type, status
- Dependencies / blockers
- Who claimed what
- `bd remember` project memory
- `bd ready` queue

### Atomic owns
- What files changed
- Why (provenance graph: goal → exploration → edit → verify)
- Which model/provider/session
- Token usage and cost
- Views/sandboxes for agent isolation
- Attestations and vault goals/memory of a technical nature

### Neither replaces
- Product requirements from the human
- Secrets management
- Production deploy approvals

---

## Multi-agent rules

1. **One agent claims one bead** (or a parent assigns explicit child beads).
2. Never edit another agent’s in-progress bead without transferring claim.
3. Prefer Atomic **draft views** for isolation; insert/merge into shared view when done.
4. Use `bd dep add` before parallelizing so `bd ready` stays correct.
5. Conflicts: stop, write notes on both beads, create a resolver bead, do not force-merge blindly.

---

## Forbidden

- Coding before Pre-Code Gate passes
- Markdown TODO/checklist files as the task system (`TODO.md`, ad-hoc plan dumps)
- Creating `MEMORY.md` instead of `bd remember` / Atomic vault memory
- Working from chat memory without a claimed bead
- “Tiny fix” outside Beads + Atomic
- Closing a bead without verification notes/reason
- Disabling Atomic agent hooks to “go faster”
- Inventing bead IDs or faking gate output

---

## Essential commands

### Beads
```bash
bd prime
bd ready --json
bd create "Title" -t task|bug|feature|epic -p 0-4
bd update <id> --claim
bd update <id> --notes "..."
bd update <id> --status blocked|in_progress|open
bd show <id>
bd dep add <child> <parent>
bd close <id> --reason "..."
bd remember "insight"
bd list
```

### Atomic
```bash
atomic init
atomic agent enable
atomic agent status
atomic agent attest
atomic status
atomic diff
atomic record -m "feat: ... (bd-xxxx)"
atomic log
atomic view create <name> --draft --parent dev
atomic view switch <name>
atomic view list
atomic vault init
atomic vault goal start --title "..." --intent <bd-id>
atomic vault goal stop --promote
atomic vault memory add "..."
atomic query search "..."
atomic push origin
atomic pull origin
```

---

## Minimal happy path (copy this mental model)

```text
GATE → bd prime → bd ready → claim bead
     → atomic vault goal start
     → code (hooks record turns)
     → atomic record + bd notes (cross-link IDs)
     → verify
     → bd close + atomic vault goal stop
     → atomic agent attest (session end)
```

---

## Quality bar before closing any bead

- [ ] Claimed bead matches the work actually done
- [ ] Atomic history contains the changes (record/hooks)
- [ ] Bead ID appears in Atomic change message(s)
- [ ] Notes/reason explain outcome
- [ ] No new untracked work left only in chat (new beads created if needed)
- [ ] Project checks passed (test/lint/typecheck as applicable)

---

## Enforcement statement (read aloud to yourself)

> I will not produce or modify project code until Beads and Atomic gates pass.  
> I will not track work in markdown TODOs.  
> I will claim a bead before coding, cross-link IDs, and close or block honestly.  
> I will leave the next agent a clean `bd ready` queue and Atomic history.

**This workflow is mandatory for the entire life of the project.**
