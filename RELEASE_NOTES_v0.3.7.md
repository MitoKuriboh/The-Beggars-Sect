# The Beggars Sect v0.3.7 - Unified Progression System

**Release Date:** 2025-12-07
**Codename:** "Path of Mastery"

---

## 🎉 What's New

### Complete Training Loop System

Train your skills between story chapters! After completing the Prologue, access the **Training Grounds** where you can:

- **Fight Training Dummies** - Sparring matches that mirror your stats
- **Earn Mastery Points** - 5-10 points per victory (scales with difficulty)
- **Unlock New Techniques** - 6 path-specific techniques waiting to be mastered
- **Build Your Path** - Blade, Stream, or Shadow - choose your identity

---

## 🥋 New Features

### Training Grounds
Post-prologue progression hub accessible from the Stats Screen.

**Flow:**
```
Stats Screen → 🥋 Training Grounds → Sparring Match → Earn Mastery → Unlock Techniques
```

**Mastery Point Rewards:**
- **Easy:** 3-8 points per win
- **Medium:** 5-10 points per win (Recommended)
- **Hard:** 7-13 points per win
- **Hell:** 8-15 points per win

Performance bonuses for:
- 3+ combo chains (+2 points)
- Win in 5 turns or less (+2 points)
- Deal 50+ damage in one turn (+1 point)

### 6 New Starter Techniques

**Blade Path (力 Force):**
- **Shattering Strike (破击)** - Breaks enemy defense, enabling follow-up attacks
- **Explosive Fist (爆拳)** - Devastating burst damage combo finisher

**Stream Path (流 Flow):**
- **Calm Water Palm (静水掌)** - Gentle strike that restores your chi
- **Whirlpool Counter (漩涡反)** - Counter-attack that drains enemy chi

**Shadow Path (准 Precision):**
- **Vital Point Strike (要穴击)** - Critical hit on weak points
- **Mist Step (雾步)** - Evasive movement with speed buff

**How to Unlock:**
Earn mastery points through training, meet path requirements (30-40% path alignment), unlock required aspects. Press **T** in Training Menu to see what you can unlock!

### Chi Aspect System

8 aspects of chi power, unlocked through progression:

| Aspect | Effect | Path |
|--------|--------|------|
| 力 Force | +10% damage | Blade |
| 流 Flow | +10% chi regen | Stream |
| 准 Precision | +10% crit chance | Shadow |
| 爆 Burst | +20% technique damage | Blade |
| 甲 Armor | +15% defense | Stream |
| 感 Sense | +15% evasion | Shadow |
| 意 Will | +20% status resist | All |
| 逆 Inverse | Unique effects | Story |

**Loadout System:**
- 1 Primary Slot (locked to your main path)
- 3 Secondary Slots (unlock at 50 mastery, Chapter 1, Chapter 2)

View in **Status Menu → Aspects Tab**

### Difficulty Selection

Choose your challenge at game start:

- **🌸 Easy** - Forgiving enemies, gentle introduction
- **⚔️  Medium** - Balanced challenge (Recommended)
- **🔥 Hard** - Demanding combat, tactical thinking required
- **💀 Hell** - Brutal, relentless, unforgiving

Affects training dummy strength and mastery point rewards.

### Technique Unlock Preview

Press **T** in the Training Menu to see:
- ✅ **Available Techniques** - Ready to unlock now
- 🔒 **Locked Techniques** - What you're working toward
- Requirements clearly shown for each technique

No more guessing what comes next!

---

## 🎮 Gameplay Experience

### Typical Progression Session

1. **Complete Prologue** (~25 minutes)
   - Learn basic combat mechanics
   - Experience the story
   - Make initial path choices

2. **Enter Training Grounds**
   - See mastery: 0 points
   - View locked techniques (press T)
   - Start first sparring match

3. **Grind Mastery**
   - Win 5-10 sparring matches
   - Reach 50 mastery points
   - Unlock first path technique!

4. **Master Your Path**
   - Continue training (80, 100, 150 mastery milestones)
   - Unlock more techniques
   - Prepare for Chapter 1

**Estimated Time to First Unlock:** 30-45 minutes of training

---

## 🏗️ Technical Improvements

### Architecture Enhancements
- **AspectSystem.ts** - Centralized unlock logic
- **TrainingManager.ts** - Mastery progression and rewards
- **Unified unlock requirements** - Path%, aspects, mastery points

### New UI Components
- **AspectLoadoutDisplay** - View and manage chi aspects
- **TrainingMenu** - Complete training hub with progress tracking
- **Technique unlock preview** - Toggle with T key

### Documentation
**1,007 lines of new system documentation:**
- PROGRESSION_SYSTEM.md - Complete progression design
- STARTER_TECHNIQUES.md - Technique trees and builds
- TRAINING_INTEGRATION.md - Implementation guide

---

## 📊 By the Numbers

**Code Changes:**
- 33 files changed
- 5,345 lines added
- 9 new files created
- Zero build errors

**Game Content:**
- 6 new techniques
- 8 chi aspects
- 4 difficulty modes
- 1 complete progression loop

---

## 🎯 What This Means for Players

**Before v0.3.7:**
- Prologue → Game ends → Wait for Chapter 1

**After v0.3.7:**
- Prologue → **Training Grounds** → Build your character → Master techniques → Ready for Chapter 1

You now have meaningful progression between story chapters. Grind mastery, unlock techniques, and prepare for what's ahead!

---

## 🐛 Known Issues

None reported in testing. If you encounter issues, please report them at:
https://github.com/MitoKuriboh/The-Beggars-Sect/issues

---

## 📥 Download

**Standalone Executables:**
- **Windows:** beggars-sect-v0.3.7-win.exe (~50MB)
- **macOS:** beggars-sect-v0.3.7-macos (~45MB)
- **Linux:** beggars-sect-v0.3.7-linux (~45MB)

**Download from:**
- GitHub Releases: https://github.com/MitoKuriboh/The-Beggars-Sect/releases/tag/v0.3.7
- Official Site: https://beggars-sect.genkaw.com/download

**NPM (for developers):**
```bash
git clone https://github.com/MitoKuriboh/The-Beggars-Sect.git
cd The-Beggars-Sect
npm install
npm run dev
```

---

## 🙏 Credits

**Developed by:** Mitchell "Mito" Grebe (Genkaw)
**AI Assistant:** Claude Sonnet 4.5 (Anthropic)

**Special Thanks:** To everyone who played v0.3.6 and provided feedback on the combat system!

---

## 🚀 What's Next

**v0.4.0 - Chapter 1 Implementation**
- Gang Territory storyline
- Razor boss fight
- New locations and NPCs
- More techniques to unlock

Stay tuned!

---

**Playtime:**
- Prologue: ~25 minutes
- Training to first unlock: ~30-45 minutes
- Total demo content: ~60-90 minutes

**Recommended for:**
- Fans of wuxia/martial arts
- Turn-based RPG enthusiasts
- CLI game enjoyers
- Progressive unlock system lovers

---

🐉 **From nothing, to legend.**

🤖 Generated with [Claude Code](https://claude.com/claude-code)
