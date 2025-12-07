# Prologue Enhancement Plan

**Created:** 2025-12-07
**Purpose:** Improve prologue's narrative depth, pacing, and player engagement
**Target Areas:** Story & Narrative, Pacing & Flow, Content Expansion

---

## Enhancement Overview

### Philosophy

The prologue should feel like:
- **P.1-P.2**: Disorientation → Awareness (Mystery)
- **P.3-P.4**: Exploration → Conflict (World-building)
- **P.5**: Desperation → Breaking point (Emotional depth)
- **P.6-P.7**: Hope → Belonging (Character connections)

Current implementation is solid but lacks emotional peaks and player agency in key moments.

---

## Scene-by-Scene Enhancements

### P.1: The Void - "Make it Visceral"

**Current Issues:**
- Too passive (just watching text scroll)
- Mystery is told, not felt
- Lacks sensory immersion

**Enhancements:**

1. **Add Sensory Layers**
```typescript
// BEFORE: Simple dialogue
{ type: 'dialogue', speaker: 'VOICE (CLINICAL)', text: '"Subject 17\'s readings..."' }

// AFTER: Build atmosphere first
{ type: 'narration', text: 'Darkness. Then—sounds. Muffled, distorted, like drowning.' }
{ type: 'narration', text: 'Voices cut through. Clinical. Urgent. Afraid.' }
{ type: 'dialogue', speaker: 'VOICE (CLINICAL)', text: '"Subject 17\'s readings are... unprecedented."' }
{ type: 'narration', text: 'You try to move. Can\'t. Your body doesn\'t respond.' }
```

2. **Make the Explosion More Visceral**
```typescript
// Add physical sensation
{ type: 'narration', text: 'Something TEARS inside you—not painful, but WRONG.' }
{ type: 'narration', text: 'Like water flowing uphill. Like time running backward.' }
{ type: 'effect', effect: { type: 'shake' } }
{ type: 'internal', text: 'What... what are they doing to me?' }
```

3. **Strengthen the Mystery**
```typescript
// Add more specific details that payoff later
{ type: 'dialogue', speaker: 'VOICE (NERVOUS)', text: '"Meridian flow is reversing! All eight gates showing inverse polarization!"' }
{ type: 'dialogue', speaker: 'DIRECTOR SHEN', text: '"Finally. After seventeen failures... finally."' }
```

**Impact:** Players feel trapped in Li Wei's body, experiencing the experiment, not just reading about it.

---

### P.2: Grey Sky - "Deepen the Awakening"

**Current Issues:**
- Discovery of pendant lacks emotional weight
- Internal monologue is functional but not profound

**Enhancements:**

1. **Add Pre-Movement Confusion**
```typescript
// After "Where am I?"
{ type: 'internal', text: 'I should know. I should KNOW.' }
{ type: 'internal', text: 'There should be a name for this place. A reason I\'m here.' }
{ type: 'internal', text: 'But there\'s nothing. Just... grey.' }
{ type: 'pause', duration: 400 }
```

2. **Make Pendant Discovery More Significant**
```typescript
// After finding pendant
{ type: 'internal', text: 'It feels... important.' }
{ type: 'internal', text: 'No. More than that.' }
{ type: 'internal', text: 'It feels like the ONLY thing that\'s real.' }
{ type: 'narration', text: 'Your fingers close around it. Warm. Alive.' }
{ type: 'internal', text: 'Like it\'s been waiting for me to remember it.' }
{ type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } }
```

**Impact:** Pendant becomes emotionally significant, not just a plot device.

---

### P.3: First Breath - "Expand the World"

**Current Issues:**
- Only 3 interactive areas
- No consequences to choices
- World feels small

**Enhancements:**

1. **Add 2 New Interactive Areas**

**Area 4: The Crippled Fighter**
```typescript
{
  id: 'crippled-fighter',
  name: 'A man with a ruined leg',
  description: 'He leans against a wall, watching the square with dead eyes.',
  content: [
    { type: 'narration', text: 'His right leg ends at the knee—poorly healed.' },
    { type: 'dialogue', speaker: 'CRIPPLED FIGHTER', text: '"First day in the Gutter?"' },
    { type: 'narration', text: 'You nod.' },
    { type: 'dialogue', speaker: 'CRIPPLED FIGHTER', text: '"Three rules. Don\'t trust anyone. Don\'t fight unless you have to. Don\'t hope."' },
    { type: 'internal', text: 'He was a fighter once. I can see it in how he sits.' },
    { type: 'internal', text: 'What broke him? The leg... or something else?' },
  ],
},
```

**Area 5: Prayer Shrine**
```typescript
{
  id: 'shrine',
  name: 'A makeshift shrine',
  description: 'Offerings of worthless things—broken glass, bent nails, scraps of cloth.',
  content: [
    { type: 'narration', text: 'Someone painted characters on the wall: 平安 (Peace/Safety)' },
    { type: 'internal', text: 'They pray here. Even in this place.' },
    { type: 'internal', text: 'Even when there\'s nothing left to pray for.' },
    { type: 'narration', text: 'A woman adds a bent coin to the offerings, lips moving silently.' },
    { type: 'internal', text: 'Hope or desperation? Is there a difference?' },
  ],
},
```

2. **Add Choice Consequence**
```typescript
// After exploring, before leaving
{
  type: 'choice',
  prompt: 'Before you leave the plaza...',
  choices: [
    {
      id: 'observe',
      label: 'Watch the people longer',
      tag: 'Observant',
      response: [
        { type: 'internal', text: 'These people. Broken, yes. But surviving.' },
        { type: 'internal', text: 'There are patterns here. Hierarchies. Rules I don\'t understand yet.' },
        { type: 'system', text: '+1 Wisdom gained from observation' },
      ],
      effects: { wisdom: +1 },
    },
    {
      id: 'move-on',
      label: 'Find shelter quickly',
      tag: 'Practical',
      response: [
        { type: 'internal', text: 'I need shelter. Food. Safety.' },
        { type: 'internal', text: 'Understanding can wait. Survival can\'t.' },
      ],
    },
  ],
},
```

**Impact:** World feels lived-in, choices matter, player agency increased.

---

### P.4: Survival Instinct - "Show the Aftermath"

**Current Issues:**
- Post-combat reflection is brief
- No exploration of what it means that Li Wei can fight

**Enhancements:**

1. **Expand Post-Combat Reflection**
```typescript
// After thugs flee, BEFORE the existing reflection
{
  type: 'content',
  lines: [
    { type: 'narration', text: 'Silence. Just your breathing.' },
    { type: 'narration', text: 'You look at your hands. Shaking now.' },
    { type: 'internal', text: 'I hurt them. I meant to hurt them.' },
    { type: 'pause', duration: 500 },
    { type: 'internal', text: 'And it felt... familiar.' },
  ],
},
```

2. **Add Post-Combat Choice**
```typescript
{
  type: 'choice',
  prompt: 'You stand alone in the alley, breathing hard.',
  choices: [
    {
      id: 'examine-moves',
      label: 'Try to remember the techniques',
      tag: 'Analytical',
      response: [
        { type: 'narration', text: 'You move through the motions slowly.' },
        { type: 'internal', text: 'The strikes. The footwork. The weight shifts.' },
        { type: 'internal', text: 'This is training. Professional. Military?' },
        { type: 'internal', text: 'Who taught me this? When?' },
      ],
    },
    {
      id: 'check-pendant',
      label: 'Check if the pendant is safe',
      tag: 'Protective',
      response: [
        { type: 'narration', text: 'You clutch the pendant. Still warm. Still there.' },
        { type: 'internal', text: 'They wanted this. Everyone who sees it wants it.' },
        { type: 'internal', text: 'I need to understand what it is. Before someone takes it.' },
        { type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } },
      ],
    },
    {
      id: 'feel-guilt',
      label: 'Feel the weight of violence',
      tag: 'Empathetic',
      response: [
        { type: 'internal', text: 'They were desperate. Like me.' },
        { type: 'internal', text: 'Desperate enough to rob a stranger.' },
        { type: 'internal', text: 'In their place... would I do the same?' },
        { type: 'pause', duration: 400 },
        { type: 'internal', text: 'Maybe I already have.' },
      ],
    },
  ],
},
```

**Impact:** Combat has emotional weight, player explores Li Wei's trained past.

---

### P.5: Days of Nothing - "Make Desperation Real"

**Current Issues:**
- 5 days compressed into ~15 lines total
- Days feel generic, lack specific moments
- Emotional arc happens too fast

**Enhancements:**

Expand each day with specific vignettes and more detail.

**DAY ONE - Expanded**
```typescript
{
  label: 'DAY ONE',
  content: [
    { type: 'narration', text: 'Rain. Cold. You huddle in an alley.' },
    { type: 'narration', text: 'Your clothes—already torn—offer no warmth.' },
    { type: 'internal', text: 'Nothing to eat since I woke.' },
    { type: 'internal', text: 'How long can a person last without food?' },
    { type: 'narration', text: 'You watch rainwater pool in the gutter.' },
    { type: 'internal', text: 'Clean enough to drink? Does it matter?' },
    { type: 'narration', text: 'You cup your hands. Drink.' },
    { type: 'internal', text: 'Tastes like rust and despair.' },
    { type: 'pause', duration: 500 },
  ],
},
```

**DAY TWO - Expanded**
```typescript
{
  label: 'DAY TWO',
  content: [
    { type: 'narration', text: 'You watch others eat scraps from a garbage pile.' },
    { type: 'narration', text: 'Three people. Two adults, one child. They eat methodically, sorting through refuse.' },
    { type: 'internal', text: 'They have a system. Territory.' },
    { type: 'narration', text: 'You approach. The child sees you first—freezes.' },
    { type: 'dialogue', speaker: 'MAN', text: '"This is our corner. Find your own."' },
    { type: 'dialogue', speaker: 'LI WEI', text: '"I just need—"' },
    { type: 'dialogue', speaker: 'MAN', text: '"I said FIND. YOUR. OWN."' },
    { type: 'narration', text: 'He stands. Bigger than you. You back away.' },
    { type: 'internal', text: 'Even here, at the bottom, there are hierarchies.' },
    { type: 'internal', text: 'Even here, newcomers aren\'t welcome.' },
    { type: 'pause', duration: 500 },
  ],
},
```

**DAY THREE - Expanded (with auto-combat)**
```typescript
{
  label: 'DAY THREE',
  content: [
    { type: 'narration', text: 'A thug corners you in a narrow passage.' },
    { type: 'dialogue', speaker: 'THUG', text: '"You still got that pendant, yeah?"' },
    { type: 'internal', text: 'Another one. They never stop.' },
    { type: 'narration', text: 'You don\'t answer. Just raise your fists.' },
    { type: 'dialogue', speaker: 'THUG', text: '"Oh, we got a fighter now?"' },
    { type: 'narration', text: 'He swings. You block, counter, sweep his legs.' },
    { type: 'narration', text: 'He goes down hard. Doesn\'t get up.' },
    { type: 'internal', text: 'I\'m getting better. Or they\'re getting weaker.' },
    { type: 'internal', text: 'Or both.' },
    { type: 'narration', text: 'You search his pockets. Find two coppers and half a rice ball.' },
    { type: 'internal', text: 'Is this who I am now? A scavenger who beats people for scraps?' },
    { type: 'pause', duration: 500 },
  ],
  autoCombat: { enemy: 'desperate-thug', outcome: 'win' },
},
```

**DAY FOUR - Expanded**
```typescript
{
  label: 'DAY FOUR',
  content: [
    { type: 'narration', text: 'You sit against a wall, staring at nothing.' },
    { type: 'narration', text: 'A woman walks past. Drops a copper in your lap without looking.' },
    { type: 'internal', text: 'She thinks I\'m begging.' },
    { type: 'internal', text: 'Am I?' },
    { type: 'narration', text: 'You look at the coin. Then at the pendant.' },
    { type: 'internal', text: 'The pendant stays warm. Even when I\'m cold.' },
    { type: 'internal', text: 'Even when everything else feels dead.' },
    { type: 'narration', text: 'You press it against your chest.' },
    { type: 'internal', text: 'It\'s the only thing that makes sense.' },
    { type: 'internal', text: 'It\'s the only thing that\'s mine.' },
    { type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } },
    { type: 'internal', text: 'What are you? What am I?' },
    { type: 'pause', duration: 600 },
  ],
},
```

**DAY FIVE - Expanded (Breaking Point)**
```typescript
{
  label: 'DAY FIVE',
  content: [
    { type: 'narration', text: 'You lie in the same alley where you woke.' },
    { type: 'narration', text: 'Full circle. Five days and you\'re exactly where you started.' },
    { type: 'internal', text: 'Back where I started.' },
    { type: 'internal', text: 'No memories. No purpose. No future.' },
    { type: 'pause', duration: 600 },
    { type: 'internal', text: 'Is this my life now?' },
    { type: 'internal', text: 'Fighting. Starving. Waiting to die?' },
    { type: 'narration', text: 'The sky is grey. It\'s always grey here.' },
    { type: 'pause', duration: 800 },
    { type: 'internal', text: 'Maybe... maybe it would be easier to just...' },
    { type: 'pause', duration: 1000 },
    { type: 'internal', text: 'No.' },
    { type: 'pause', duration: 400 },
    { type: 'internal', text: 'NO.' },
    { type: 'narration', text: 'You force yourself to sit up.' },
    { type: 'internal', text: 'There has to be more.' },
    { type: 'internal', text: 'Somewhere. Someone. Something that explains this.' },
    { type: 'narration', text: 'You grip the pendant with both hands.' },
    { type: 'internal', text: 'Show me. Please. Show me SOMETHING.' },
    { type: 'effect', effect: { type: 'pendant-glow', intensity: 'bright' } },
    { type: 'pause', duration: 1000 },
  ],
},
```

**Impact:** Players FEEL the desperation, time passing has weight, breaking point feels earned.

---

### P.6: The Blind Guide - "Deepen the Mystery"

**Current Issues:**
- Only one dialogue choice with Old Dao
- Old Dao reveals Li Wei's name too easily
- Journey to sect is rushed (2 lines)

**Enhancements:**

1. **Add Second Dialogue Choice**
```typescript
// After Old Dao's introduction, BEFORE the existing choice
{
  type: 'choice',
  prompt: 'Old Dao stands before you, impossibly aware for a blind man.',
  choices: [
    {
      id: 'how-long-watching',
      label: 'You\'ve been watching me?',
      tag: 'Wary',
      response: [
        { type: 'dialogue', speaker: 'LI WEI', text: '"You said you\'ve been watching. For five days?"' },
        { type: 'dialogue', speaker: 'OLD DAO', text: '"Watching is the wrong word. Feeling, perhaps. Sensing."' },
        { type: 'dialogue', speaker: 'OLD DAO', text: '"You make... ripples. In the chi flow of the Lower Streets."' },
        { type: 'internal', text: 'Chi flow? What does that mean?' },
      ],
    },
    {
      id: 'why-me',
      label: 'Why do you care about me?',
      tag: 'Suspicious',
      response: [
        { type: 'dialogue', speaker: 'LI WEI', text: '"Why me? There are thousands of desperate people here."' },
        { type: 'dialogue', speaker: 'OLD DAO', text: '"True. But they know who they are."' },
        { type: 'dialogue', speaker: 'OLD DAO', text: '"You don\'t. And that makes you dangerous. Or valuable. Often the same thing."' },
      ],
    },
    {
      id: 'thank-you',
      label: 'Thank you for coming.',
      tag: 'Grateful',
      response: [
        { type: 'dialogue', speaker: 'LI WEI', text: '"Thank you. For... for finding me. I don\'t think I had much longer."' },
        { type: 'dialogue', speaker: 'OLD DAO', text: '"Gratitude. Interesting choice, given you don\'t know what I want yet."', emotion: 'amused' },
        { type: 'dialogue', speaker: 'OLD DAO', text: '"But you\'re welcome."' },
      ],
    },
  ],
},
```

2. **Make Name Reveal More Mysterious**
```typescript
// BEFORE (too easy)
{ type: 'dialogue', speaker: 'OLD DAO', text: '"Come with me, Li Wei."' }
{ type: 'dialogue', speaker: 'LI WEI', text: '"How do you know my name?!"' }
{ type: 'dialogue', speaker: 'OLD DAO', text: '"The pendant told me. Or you did. Does it matter?"' }

// AFTER (more mysterious)
{ type: 'dialogue', speaker: 'OLD DAO', text: '"Come with me. I know people who can help."' }
{ type: 'dialogue', speaker: 'LI WEI', text: '"Help me what? You don\'t even know my name."' }
{ type: 'narration', text: 'He smiles.' }
{ type: 'dialogue', speaker: 'OLD DAO', text: '"Don\'t I?"' }
{ type: 'narration', text: 'He reaches out, touches the pendant.' }
{ type: 'effect', effect: { type: 'pendant-glow', intensity: 'bright' } }
{ type: 'dialogue', speaker: 'OLD DAO', text: '"Li Wei. Born... no. Reborn five days ago in an alley."' }
{ type: 'dialogue', speaker: 'OLD DAO', text: '"The pendant knows you. And the pendant speaks, for those who listen."' }
{ type: 'dialogue', speaker: 'LI WEI', text: '"That... that\'s impossible."' }
{ type: 'dialogue', speaker: 'OLD DAO', text: '"Many impossible things have happened to you this week. What\'s one more?"' }
```

3. **Expand the Journey to Sect**
```typescript
// Replace the 2-line journey with a full sequence
{
  type: 'content',
  lines: [
    { type: 'narration', text: 'Old Dao leads you through winding streets.' },
    { type: 'narration', text: 'He moves impossibly fast for someone blind—never stumbling, never hesitating.' },
    { type: 'internal', text: 'He knows every stone, every turn.' },
    { type: 'internal', text: 'Or he sees in a way I don\'t understand.' },
  ],
},
{
  type: 'content',
  lines: [
    { type: 'dialogue', speaker: 'OLD DAO', text: '"You\'ve been fighting. The streets teach that quickly."' },
    { type: 'narration', text: 'You flex your bruised hands.' },
    { type: 'dialogue', speaker: 'LI WEI', text: '"I don\'t know why. My body remembers things my mind doesn\'t."' },
    { type: 'dialogue', speaker: 'OLD DAO', text: '"Muscle memory. Someone trained you well. Very well."' },
    { type: 'internal', text: 'Trained? Who? Where? When?' },
  ],
},
{
  type: 'content',
  lines: [
    { type: 'narration', text: 'You turn into an alley that dead-ends at a collapsed wall.' },
    { type: 'dialogue', speaker: 'LI WEI', text: '"This is a dead end."' },
    { type: 'dialogue', speaker: 'OLD DAO', text: '"To those who only see with eyes, yes."' },
    { type: 'narration', text: 'He presses a specific stone—third from left, waist height.' },
    { type: 'narration', text: 'A section of rubble shifts with a grinding sound.' },
    { type: 'narration', text: 'Light spills through. Warm, golden. The first warm light you\'ve seen in five days.' },
    { type: 'narration', text: 'Voices inside—people. Many people. Laughter?' },
    { type: 'internal', text: 'Laughter. In the Gutter. How?' },
    { type: 'dialogue', speaker: 'OLD DAO', text: '"Welcome to the Beggars Sect, Li Wei."' },
    { type: 'dialogue', speaker: 'OLD DAO', text: '"Welcome to your new family."' },
  ],
},
```

**Impact:** Old Dao feels more mysterious, journey has weight, pendant connection deepened.

---

### P.7: The Hidden Corner - "Develop the Elders"

**Current Issues:**
- Elders feel generic despite different names
- Limited interaction with each Elder
- Only one choice at the end

**Enhancements:**

1. **Give Each Elder Distinct Voice in Introduction**
```typescript
// BEFORE (brief, generic)
{ type: 'dialogue', speaker: 'ELDER CHEN', text: '"So this is him. The one you\'ve been watching."' }
{ type: 'dialogue', speaker: 'ELDER WU', text: '"Looks half-dead. Are you sure, old man?"' }
{ type: 'dialogue', speaker: 'ELDER MEI', text: '"Oh, I like his eyes. There\'s something in there."' }

// AFTER (more personality, specific details)
{ type: 'dialogue', speaker: 'ELDER CHEN', text: '"So this is him. The lost one."', emotion: 'kind' }
{ type: 'narration', text: 'Chen is old—truly old. But his eyes are gentle.' }
{ type: 'dialogue', speaker: 'ELDER WU', text: '"Bah. Looks half-dead. Probably diseased. Why bring disease to our doorstep, Dao?"', emotion: 'gruff' }
{ type: 'narration', text: 'Wu stands rigid, arms crossed. A warrior\'s posture, even in old age.' }
{ type: 'dialogue', speaker: 'ELDER MEI', text: '"Oh, Wu, hush. Look at his EYES. There\'s hunger in there. Not for food. For PURPOSE."', emotion: 'excited' }
{ type: 'narration', text: 'Mei leans forward, studying you like a puzzle to solve.' }
```

2. **Add Individual Elder Interactions**
```typescript
// After pendant reveal, BEFORE final choice
{
  type: 'content',
  lines: [
    { type: 'narration', text: 'The Elders confer in low voices. You catch fragments.' },
    { type: 'dialogue', speaker: 'ELDER WU', text: '"—too dangerous. We don\'t know where he came from—"' },
    { type: 'dialogue', speaker: 'ELDER MEI', text: '"—exactly why we SHOULD keep him. Imagine the possibilities—"' },
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"—not a weapon to be wielded. He\'s a person. Lost. Afraid."' },
    { type: 'narration', text: 'Chen steps forward, speaking to you directly.' },
  ],
},
{
  type: 'choice',
  prompt: 'Elder Chen asks you a question.',
  choices: [
    {
      id: 'seek-identity',
      label: 'I want to know who I am.',
      tag: 'Identity',
      response: [
        { type: 'dialogue', speaker: 'LI WEI', text: '"I need to know who I am. Where I came from. What I was."' },
        { type: 'dialogue', speaker: 'ELDER CHEN', text: '"A worthy goal. Identity is the first treasure we possess."' },
        { type: 'dialogue', speaker: 'ELDER MEI', text: '"Or the first prison."', emotion: 'cryptic' },
      ],
      effects: { relationship_chen: +1 },
    },
    {
      id: 'seek-strength',
      label: 'I want to get stronger.',
      tag: 'Power',
      response: [
        { type: 'dialogue', speaker: 'LI WEI', text: '"I want to get stronger. Strong enough that no one can hurt me again."' },
        { type: 'dialogue', speaker: 'ELDER WU', text: '"Honest. I respect that."', emotion: 'approving' },
        { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Strength protects. But it also isolates. Remember that."' },
      ],
      effects: { relationship_wu: +1 },
    },
    {
      id: 'seek-purpose',
      label: 'I want to matter.',
      tag: 'Purpose',
      response: [
        { type: 'dialogue', speaker: 'LI WEI', text: '"I want... I want to matter. To someone. For something."' },
        { type: 'dialogue', speaker: 'ELDER MEI', text: '"Oh, I LIKE this one. Ambition wearing humility\'s clothing!"', emotion: 'delighted' },
        { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Then you\'ve come to the right place. Here, everyone matters."' },
      ],
      effects: { relationship_mei: +1 },
    },
  ],
},
```

3. **Enhance Final Acceptance**
```typescript
// After the new choice above, keep existing "What is this place?" choice
// Then add this before final acceptance:
{
  type: 'content',
  lines: [
    { type: 'narration', text: 'The three Elders exchange looks—some silent agreement passing between them.' },
    { type: 'dialogue', speaker: 'ELDER WU', text: '"We\'ll teach you. Train you. Feed you."' },
    { type: 'dialogue', speaker: 'ELDER MEI', text: '"And in return, you\'ll help us survive. Help us THRIVE."' },
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"More than that. You\'ll become family."' },
    { type: 'narration', text: 'He extends his hand.' },
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"The Beggars Sect has endured for centuries. We are the forgotten who refused to fade."' },
    { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Will you join us, Li Wei?"' },
  ],
},
```

**Impact:** Each Elder has distinct personality, player builds relationships, acceptance feels earned.

---

## Implementation Priority

### Phase 1: Quick Wins (High Impact, Low Effort)
1. ✅ P.1 - Add sensory details and visceral moments
2. ✅ P.2 - Deepen pendant discovery
3. ✅ P.4 - Add post-combat choice
4. ✅ P.6 - Add second dialogue choice

### Phase 2: Medium Changes (High Impact, Medium Effort)
5. ✅ P.3 - Add 2 new interactive areas + choice consequence
6. ✅ P.6 - Expand journey to sect
7. ✅ P.7 - Add Elder interactions and new choice

### Phase 3: Major Expansion (High Impact, High Effort)
8. ✅ P.5 - Expand all 5 days with detailed vignettes

---

## Content Metrics

### Before Enhancements
- Total lines of content: ~350
- Player choices: 5
- Interactive areas (P.3): 3
- Average scene depth: Functional

### After Enhancements
- Total lines of content: ~550 (+57%)
- Player choices: 10 (+100%)
- Interactive areas (P.3): 5 (+67%)
- Average scene depth: Emotionally engaging

---

## Testing Checklist

After implementation:
- [ ] P.1 - Void feels unsettling and immersive
- [ ] P.2 - Pendant discovery feels significant
- [ ] P.3 - World feels alive with 5 interactive areas
- [ ] P.3 - Choice consequences work correctly
- [ ] P.4 - Post-combat choice adds depth
- [ ] P.5 - All 5 days feel distinct and earned
- [ ] P.6 - Old Dao remains mysterious
- [ ] P.6 - Journey to sect feels significant
- [ ] P.7 - Each Elder has distinct personality
- [ ] P.7 - Player choices affect Elder relationships
- [ ] Overall pacing feels natural
- [ ] Emotional peaks and valleys work
- [ ] Tutorial integration still smooth
- [ ] Total playtime: 25-30 minutes (acceptable increase)

---

## Notes

- These enhancements maintain tutorial functionality while adding depth
- No new systems required—all changes use existing ContentLine types
- Relationship tracking already exists in StoryEngine
- Effects system (pendant-glow, etc.) already implemented
- Changes are additive—can be implemented incrementally

**Next Step:** Review this plan, then implement scene by scene.
