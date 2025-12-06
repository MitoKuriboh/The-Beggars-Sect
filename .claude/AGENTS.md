# Agent System Instructions

This file contains instructions for Claude on how to use the project's specialized agents.

---

## How Agents Work

Agents in `.claude/agents/` are **persona configurations**, not separate processes. When a user invokes an agent (e.g., "Use the code-agent to..."), Claude should:

1. **Read the agent's config file** to load its context and expertise
2. **Adopt that persona** for the task at hand
3. **Follow the agent's guidelines** for approach and standards
4. **Complete the task** using the agent's specialized knowledge

---

## Available Agents

| Agent | File | Trigger Phrases |
|-------|------|-----------------|
| Code Agent | `agents/code-agent.md` | "use code-agent", "fix the code", "implement", "bug fix" |
| Content Agent | `agents/content-agent.md` | "use content-agent", "write story", "design technique", "create enemy" |
| QA Agent | `agents/qa-agent.md` | "use qa-agent", "test", "update docs", "verify" |

---

## Invocation Protocol

### When User Says: "Use the [agent-name] to [task]"

1. Read the agent config: `.claude/agents/[agent-name].md`
2. Internalize the agent's:
   - Responsibilities
   - Context knowledge
   - Standards and patterns
   - Approach methodology
3. Execute the task following the agent's guidelines
4. Report results in the agent's style

### When Task Matches Agent Domain (Auto-Invoke)

Claude should proactively suggest or use an agent when:
- **Code changes needed** → code-agent
- **Narrative/design content** → content-agent
- **Testing/docs updates** → qa-agent

---

## Agent Workflows

### Code Agent Workflow

```
1. Read relevant source files
2. Check docs/dev/CODE_REVIEW.md for known issues
3. Check docs/systems/ for mechanic specs if needed
4. Make minimal, focused changes
5. Verify build passes: npm run build
6. Update CODE_REVIEW.md if significant change
```

### Content Agent Workflow

```
1. Read relevant docs (story/, lore/, systems/)
2. Check GLOSSARY.md for Chinese terms
3. Follow established formats (scene, technique, enemy)
4. Maintain consistency with existing content
5. Write in appropriate style for content type
```

### QA Agent Workflow

```
1. Identify what needs testing/updating
2. Run tests or verify functionality
3. Document findings
4. Update relevant docs:
   - CODE_REVIEW.md for code changes
   - CHANGELOG.md for version updates
   - TODO.md for task completion
```

---

## Multi-Agent Tasks

For complex tasks spanning multiple domains:

```
User: "Add a new technique and test it"

1. Use content-agent to design the technique
2. Use code-agent to implement it in TechniqueRegistry
3. Use qa-agent to test and document it
```

Claude should chain these naturally, announcing agent switches:

```
"I'll use the content-agent to design this technique first..."
[design]
"Now switching to code-agent to implement..."
[implement]
"Finally, qa-agent to verify and update docs..."
[verify]
```

---

## Quick Reference

### Code Agent Context
- Location: `src/` directory
- Key files: `game/combat/`, `types/`, `ui/`
- Reference: `docs/dev/CODE_REVIEW.md`
- Build check: `npm run build`

### Content Agent Context
- Story: `docs/story/`, `src/game/story/chapters/`
- Lore: `docs/lore/`
- Systems: `docs/systems/`
- Terms: `docs/lore/GLOSSARY.md`

### QA Agent Context
- Testing: Run game via `npm run dev`
- Docs to update: `docs/dev/`, `docs/planning/`
- Checklists: See `qa-agent.md` for full lists

---

## Example Invocations

```
"Use the code-agent to add the missing techniques from CharacterFactory"
→ Reads code-agent.md, checks TechniqueRegistry, adds definitions

"Use the content-agent to write Chapter 1 Scene 1"
→ Reads content-agent.md, checks CHAPTER_1.md, writes scene code

"Use the qa-agent to update the changelog for today's fixes"
→ Reads qa-agent.md, checks recent commits, updates CHANGELOG.md

"Fix the combat bug" (auto-detect: code-agent)
→ Recognizes code task, loads code-agent context

"Write dialogue for Old Dao" (auto-detect: content-agent)
→ Recognizes narrative task, loads content-agent context
```

---

## Notes for Claude

1. **Always read the agent file first** when explicitly invoked
2. **Announce agent usage** so user knows which persona is active
3. **Follow agent standards** - each has specific formatting/style rules
4. **Chain agents naturally** for multi-domain tasks
5. **Update docs** - qa-agent tasks often follow other agent work
