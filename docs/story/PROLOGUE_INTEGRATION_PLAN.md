# Prologue Website Integration Plan

**Created:** 2025-12-07
**Purpose:** Align prologue content with promises made on https://beggars-sect.genkaw.com/

---

## Gap Analysis

### What Website Promises | Current Prologue Status

| Element | Website | Prologue | Action Needed |
|---------|---------|----------|---------------|
| **F-grade Aptitude** | Central hook - "lowest possible" | Not mentioned | ✅ Add flashback |
| **Three Stances** | Flowing/Weathered/Hungry detailed | Only Attack/Defend | ✅ Enhance tutorial |
| **Three Paths** | Blade/Stream/Shadow core mechanic | Not foreshadowed | ✅ Connect choices |
| **Inverse Chi** | "Forbidden eighth aspect" | "Inverse flow" (vague) | ✅ Clarify language |
| **Turn Queue** | ATB with visible queue | Not explained | ✅ Add tutorial text |
| **Non-linear** | Multiple choice points | Added choices but no path tracking | ✅ Add path effects |

---

## Recommended Enhancements

### Priority 1: Add Aptitude Array Flashback

**Location:** After P.1 (The Void), before P.2 (Grey Sky)

**New Scene: P.1.5 - The Reading**

```typescript
{
  id: 'p1-5-the-reading',
  title: 'The Reading',
  type: 'cutscene',
  location: 'Memory Fragment',
  estimatedMinutes: 1,
  content: [
    {
      type: 'content',
      lines: [
        { type: 'narration', text: 'Another memory surfaces. Recent. Before the white rooms.' },
        { type: 'narration', text: 'You stand before a crystalline array. Hands pressed against its surface.' },
        { type: 'dialogue', speaker: 'TECHNICIAN', text: '"Hold still. The Aptitude Array will measure your potential."' },
        { type: 'narration', text: 'Energy flows through you. The crystal hums.' },
        { type: 'narration', text: 'Numbers flash across the display. The technician\'s face changes.' },
        { type: 'dialogue', speaker: 'TECHNICIAN', text: '"F-grade. The... the lowest possible."' },
        { type: 'narration', text: 'Murmurs from the observers.' },
        { type: 'dialogue', speaker: 'OBSERVER', text: '"Broken meridians. No cultivation potential."' },
        { type: 'dialogue', speaker: 'OBSERVER 2', text: '"Another failure for the lower districts."' },
        { type: 'pause', duration: 500 },
        { type: 'narration', text: 'But something was wrong with that reading.' },
        { type: 'narration', text: 'The array showed nothing—because it couldn\'t detect what flowed backward.' },
        { type: 'pause', duration: 400 },
        { type: 'narration', text: 'The memory fragments. Dissolves.' },
      ],
    },
  ],
  nextScene: 'p2-grey-sky',
},
```

**Impact:** Establishes the F-grade hook immediately, creates dramatic irony (we know the array was wrong).

---

### Priority 2: Enhance Combat Tutorial with Stances

**Location:** P.4 (Survival Instinct) - Replace basic tutorial

**Current:**
```typescript
{ type: 'system', text: 'COMBAT TUTORIAL' },
{ type: 'system', text: 'Use ATTACK to deal damage. Use DEFEND to reduce incoming damage.' },
```

**Enhanced:**
```typescript
{
  type: 'system',
  text: 'COMBAT TUTORIAL: Three stances define your approach to battle.'
},
{
  type: 'system',
  text: 'FLOWING STANCE (Active): Circular movements. Your natural state—letting force pass through.'
},
{
  type: 'system',
  text: 'Use ATTACK to strike. Use DEFEND to reduce damage. Watch the turn order on the right.'
},
{
  type: 'system',
  text: 'More stances unlock as you train with the Elders.'
},
```

**Impact:** Introduces stance system without overwhelming player, promises future depth.

---

### Priority 3: Connect Choices to Paths

**Enhancement:** Add path score effects to existing choices

**P.3 - Exploration Choice:**
```typescript
{
  id: 'observe',
  label: 'Watch the people longer',
  tag: 'Observant',
  effects: [
    { type: 'stat', stat: 'wisdom', delta: 1 },
    { type: 'path', path: 'shadow', delta: 1 },  // NEW: Shadow path (observation)
  ],
},
{
  id: 'move-on',
  label: 'Find shelter quickly',
  tag: 'Practical',
  effects: [
    { type: 'path', path: 'stream', delta: 1 },  // NEW: Stream path (adaptation)
  ],
},
```

**P.4 - Post-Combat Choice:**
```typescript
{
  id: 'examine-moves',
  label: 'Try to remember the techniques',
  tag: 'Analytical',
  effects: [
    { type: 'path', path: 'shadow', delta: 1 },  // NEW: Shadow (understanding)
  ],
},
{
  id: 'check-pendant',
  label: 'Check if the pendant is safe',
  tag: 'Protective',
  effects: [
    { type: 'path', path: 'stream', delta: 1 },  // NEW: Stream (adaptation)
  ],
},
{
  id: 'feel-guilt',
  label: 'Feel the weight of violence',
  tag: 'Empathetic',
  effects: [
    { type: 'path', path: 'stream', delta: 1 },  // NEW: Stream (empathy)
  ],
},
```

**P.4 - Pendant Choice:**
```typescript
{
  id: 'hand-over',
  label: 'Hand over the pendant',
  tag: 'Comply',
  effects: [
    { type: 'path', path: 'stream', delta: 1 },  // NEW: Stream (yielding)
  ],
},
{
  id: 'refuse',
  label: 'Refuse',
  tag: 'Defiant',
  effects: [
    { type: 'path', path: 'blade', delta: 2 },  // NEW: Blade (confrontation)
  ],
},
```

**P.6 - First Old Dao Choice:**
```typescript
{
  id: 'how-long-watching',
  label: 'You\'ve been watching me?',
  tag: 'Wary',
  effects: [
    { type: 'path', path: 'shadow', delta: 1 },  // NEW: Shadow (questioning)
  ],
},
{
  id: 'why-me',
  label: 'Why do you care about me?',
  tag: 'Suspicious',
  effects: [
    { type: 'path', path: 'shadow', delta: 1 },  // NEW: Shadow (suspicion)
  ],
},
{
  id: 'thank-you',
  label: 'Thank you for coming.',
  tag: 'Grateful',
  effects: [
    { type: 'path', path: 'stream', delta: 1 },  // NEW: Stream (acceptance)
  ],
},
```

**P.6 - Second Old Dao Choice:**
```typescript
{
  id: 'suspicious',
  label: 'Are you here to rob me too?',
  tag: 'Suspicious',
  effects: [
    { type: 'path', path: 'shadow', delta: 1 },  // NEW: Shadow (distrust)
  ],
},
{
  id: 'direct',
  label: 'Can you help me?',
  tag: 'Direct',
  effects: [
    { type: 'path', path: 'blade', delta: 1 },  // NEW: Blade (directness)
  ],
},
{
  id: 'curious',
  label: 'How can you "see" if you\'re blind?',
  tag: 'Curious',
  effects: [
    { type: 'path', path: 'shadow', delta: 1 },  // NEW: Shadow (curiosity)
  ],
},
```

**P.7 - Elder Choice:**
```typescript
{
  id: 'seek-identity',
  label: 'I want to know who I am.',
  tag: 'Identity',
  effects: [
    { type: 'relationship', character: 'elder-chen', delta: 1 },
    { type: 'path', path: 'shadow', delta: 2 },  // NEW: Shadow (self-knowledge)
  ],
},
{
  id: 'seek-strength',
  label: 'I want to get stronger.',
  tag: 'Power',
  effects: [
    { type: 'relationship', character: 'elder-wu', delta: 1 },
    { type: 'path', path: 'blade', delta: 2 },  // NEW: Blade (power)
  ],
},
{
  id: 'seek-purpose',
  label: 'I want to matter.',
  tag: 'Purpose',
  effects: [
    { type: 'relationship', character: 'elder-mei', delta: 1 },
    { type: 'path', path: 'stream', delta: 2 },  // NEW: Stream (connection)
  ],
},
```

**Impact:** Every choice now builds toward path commitment, no wasted decisions.

---

### Priority 4: Clarify Inverse Chi Language

**Enhancement:** Use "forbidden eighth aspect" terminology consistently

**P.1 Changes:**
```typescript
// BEFORE:
{ type: 'dialogue', speaker: 'VOICE (NERVOUS)', text: '"The inverse flow is accelerating..."' },

// AFTER:
{ type: 'dialogue', speaker: 'VOICE (NERVOUS)', text: '"The forbidden aspect is manifesting! The eighth gate—"' },
{ type: 'dialogue', speaker: 'DIRECTOR SHEN', text: '"Inverse chi. After seventeen failures, Subject 17 finally exhibits it."' },
```

**P.7 Changes - Add Elder Mei Dialogue:**
```typescript
// After pendant reveal, Elder Mei explains:
{
  type: 'content',
  lines: [
    { type: 'dialogue', speaker: 'ELDER MEI', text: '"The Array reads seven aspects. Force. Flow. Precision. Burst. Armor. Sense. Will."' },
    { type: 'dialogue', speaker: 'ELDER MEI', text: '"But there\'s an eighth. The forbidden one. Inverse."' },
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Chi that flows backward. The Array cannot detect it—so it shows nothing."' },
    { type: 'dialogue', speaker: 'ELDER WU', text: '"F-grade. Broken. Worthless. That\'s what they call us."' },
    { type: 'dialogue', speaker: 'ELDER MEI', text: '"But we know better. Don\'t we, Li Wei?"' },
  ],
},
```

**Impact:** Players understand exactly what makes Li Wei special and why the Beggars Sect cares.

---

### Priority 5: Add Path Foreshadowing to Ending

**Location:** P.7 final dialogue before "Welcome home"

**New Content:**
```typescript
{
  type: 'content',
  lines: [
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"We will teach you three approaches to the beggar\'s way."' },
    { type: 'dialogue', speaker: 'ELDER WU', text: '"The Blade—direct power. Break through obstacles."' },
    { type: 'dialogue', speaker: 'ELDER MEI', text: '"The Stream—flowing adaptation. Turn force against itself."' },
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"The Shadow—hidden truth. See what others miss."' },
    { type: 'narration', text: 'He smiles.' },
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Which you choose... that will define your path. But for now—"' },
    { type: 'narration', text: 'He gestures to the courtyard.' },
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Welcome home."' },
  ],
},
```

**Impact:** Sets up path system explicitly, creates anticipation for Chapter 1.

---

## Implementation Priority

### Immediate (High Impact, Low Effort):
1. ✅ Add path effects to existing choices (15 minutes)
2. ✅ Enhance P.4 combat tutorial text (5 minutes)
3. ✅ Add Inverse Chi explanation to P.7 (10 minutes)

### Short-term (High Impact, Medium Effort):
4. ⏳ Add path foreshadowing to P.7 ending (10 minutes)
5. ⏳ Update P.1 inverse chi language (10 minutes)

### Optional (Medium Impact, High Effort):
6. ⏸️ Add P.1.5 Aptitude Array flashback scene (30 minutes)
   - Requires new scene structure
   - Most impactful but changes pacing

---

## Path Alignment Guide

### Blade Path (Power changes the world)
- Direct confrontation
- Refusal to compromise
- Strength-seeking
- Aggressive choices

### Stream Path (Adaptation overcomes all)
- Yielding to redirect
- Empathy and connection
- Acceptance and flow
- Diplomatic choices

### Shadow Path (Truth hides in darkness)
- Observation and analysis
- Questioning and suspicion
- Understanding before action
- Investigative choices

---

## Testing Checklist

After implementation:
- [ ] All path effects sum to ~10-15 points total across prologue
- [ ] Each path represented in at least 3 choices
- [ ] Tutorial mentions turn queue and stances
- [ ] "Forbidden eighth aspect" language used consistently
- [ ] Three paths explicitly named by P.7 end
- [ ] Build passes TypeScript compilation

---

**Recommendation:** Start with Immediate priorities (path effects + tutorial + inverse chi explanation). These take 30 minutes total and deliver massive alignment with website promises.
