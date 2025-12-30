/**
 * Chapter 2: The Law's Long Reach
 * ~120-150 minutes of gameplay
 * Three branching paths based on dominant Chapter 1 alignment
 * Major choices: Response to Initiative hunt, Facing Commander Vex
 */

import type { Chapter } from "../../../types/index";

export const CHAPTER_2: Chapter = {
  id: "chapter-2",
  number: 2,
  title: "The Law's Long Reach",
  scenes: [
    // =========================================================================
    // SCENE 2.1: GROWING SHADOWS
    // =========================================================================
    {
      id: "2-1-growing-shadows",
      title: "Growing Shadows",
      type: "cutscene",
      location: "Beggar's Corner",
      estimatedMinutes: 15,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "narration", text: "Night at Beggar's Corner." },
            {
              type: "narration",
              text: "Li Wei meditates beneath the Beggar's Pine.",
            },
            {
              type: "narration",
              text: "The jade pendant glows faintly in the darkness.",
            },
            { type: "pause", duration: 400 },
            { type: "divider" },
            { type: "narration", text: "Three weeks since Razor." },
            { type: "narration", text: "Three weeks of training." },
            { type: "narration", text: "Three weeks of growing stronger." },
            { type: "narration", text: "But also three weeks of dreams." },
            { type: "pause", duration: 500 },
            { type: "divider" },
            {
              type: "system",
              text: "DREAM SEQUENCE",
            },
            { type: "pause", duration: 300 },
            {
              type: "narration",
              text: "White room. Sterile walls. A young Li Wei strapped to a table.",
            },
            {
              type: "dialogue",
              speaker: "VOICE",
              text: '"Subject 17\'s chi flow remains inverted. Increase the suppression dosage."',
              emotion: "clinical",
            },
            {
              type: "dialogue",
              speaker: "YOUNG LI WEI",
              text: '"Please... it hurts..."',
              emotion: "struggling",
            },
            {
              type: "dialogue",
              speaker: "VOICE",
              text: '"Pain is necessary for calibration."',
              emotion: "cold",
            },
            { type: "pause", duration: 400 },
            { type: "effect", effect: { type: "shake" } },
            { type: "narration", text: "Li Wei gasps awake." },
            { type: "pause", duration: 300 },
            {
              type: "narration",
              text: "Elder Chen sits nearby, watching.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"The dreams again?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"They\'re getting clearer. I can almost see faces now."',
              emotion: "troubled",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Memory returns when it\'s ready. Or when something forces it."',
            },
            { type: "narration", text: "He stands." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Speaking of which. We have a problem."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            {
              type: "system",
              text: "Elder's Quarters - All three Elders present",
            },
            { type: "pause", duration: 300 },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Spartan patrols have increased. They\'re asking questions. About a beggar who caused trouble with the gangs."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Your fame precedes you."',
              emotion: "amused",
            },
          ],
        },
        // Path-dependent dialogue - handled via conditional in game engine
        {
          type: "content",
          lines: [
            { type: "divider" },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"There\'s more. Old Dao brought word. The Calibration Initiative has activated recovery protocols."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Recovery?"',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: "\"They're looking for you, Li Wei. Specifically. 'Subject 17.'\"",
            },
            { type: "pause", duration: 500 },
            { type: "narration", text: "Silence falls over the room." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"On the bright side, you\'ve been too busy to train with me! That changes now."',
              emotion: "breaking tension",
            },
            { type: "narration", text: "She grins ferally." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Time to learn the HUNGRY stance."',
            },
          ],
        },
      ],
      nextScene: "2-2-path-opening",
    },

    // =========================================================================
    // SCENE 2.2: PATH-DEPENDENT OPENING
    // Branches based on dominant Chapter 1 path
    // =========================================================================
    {
      id: "2-2-path-opening",
      title: "The Streets Have Eyes",
      type: "interactive",
      location: "Lower Streets",
      estimatedMinutes: 10,
      content: [
        {
          type: "choice",
          prompt:
            "Your actions in Chapter 1 have shaped your reputation. How do you move through the city?",
          choices: [
            {
              id: "blade-hunted",
              label: "Walk openly - let them see the one who defeated Razor",
              condition: { type: "path", path: "blade", min: 40 },
              effects: [{ type: "flag", flag: "BLADE_PATH_CH2", value: true }],
              nextScene: "2-2a-hunted",
            },
            {
              id: "stream-watched",
              label: "Move with allies - the network protects its own",
              condition: { type: "path", path: "stream", min: 40 },
              effects: [{ type: "flag", flag: "STREAM_PATH_CH2", value: true }],
              nextScene: "2-2b-watched",
            },
            {
              id: "shadow-hidden",
              label: "Stay unseen - information is your shield",
              condition: { type: "path", path: "shadow", min: 40 },
              effects: [{ type: "flag", flag: "SHADOW_PATH_CH2", value: true }],
              nextScene: "2-2c-hidden",
            },
            {
              id: "default-path",
              label: "Move carefully through the streets",
              effects: [],
              nextScene: "2-3-hungry-lessons",
            },
          ],
        },
      ],
    },

    // =========================================================================
    // SCENE 2.2A: HUNTED (Blade Path)
    // =========================================================================
    {
      id: "2-2a-hunted",
      title: "Hunted",
      type: "interactive",
      location: "Lower Streets",
      estimatedMinutes: 12,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Li Wei moves through the streets—but it's different now.",
            },
            {
              type: "narration",
              text: "People recognize him. Some nod respect. Others shrink away.",
            },
            { type: "internal", text: "They know my face now." },
            { type: "internal", text: "The beggar who beat Razor." },
            { type: "internal", text: "Fame is a double-edged sword." },
            { type: "pause", duration: 400 },
            { type: "narration", text: "A commotion ahead—Spartan patrol." },
            {
              type: "dialogue",
              speaker: "SPARTAN 1",
              text: '"You there! Vagrant! Stop!"',
              emotion: "commanding",
            },
            { type: "narration", text: "Li Wei has been spotted." },
            {
              type: "dialogue",
              speaker: "SPARTAN 2",
              text: '"That\'s him. The one from the reports."',
              emotion: "checking sketch",
            },
          ],
        },
        {
          type: "choice",
          prompt: "The Spartans have spotted you. How do you respond?",
          choices: [
            {
              id: "face-directly",
              label: "Face them directly - I'm done running",
              effects: [
                { type: "path", path: "blade", delta: 3 },
                { type: "flag", flag: "SPARTAN_CONFRONTATION", value: true },
              ],
            },
            {
              id: "talk-out",
              label: "Talk your way out - there's no need for violence yet",
              effects: [{ type: "path", path: "stream", delta: 3 }],
              nextScene: "2-3-hungry-lessons",
            },
            {
              id: "run",
              label: "Run - fight on your terms, not theirs",
              effects: [{ type: "path", path: "shadow", delta: 3 }],
              nextScene: "2-3-hungry-lessons",
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'m just a beggar. What do you want?"',
            },
            {
              type: "dialogue",
              speaker: "SPARTAN 1",
              text: "\"'Just a beggar' who defeated a gang leader? Commander Vex wants to talk.\"",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'m not interested in talking."',
            },
          ],
        },
        {
          type: "combat",
          enemies: ["spartan-grunt", "spartan-grunt"],
          canLose: false,
        },
      ],
      nextScene: "2-3-hungry-lessons",
    },

    // =========================================================================
    // SCENE 2.2B: WATCHED (Stream Path)
    // =========================================================================
    {
      id: "2-2b-watched",
      title: "Watched",
      type: "cutscene",
      location: "Lower Streets",
      estimatedMinutes: 8,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Li Wei walks with Rat King's messenger at his side.",
            },
            {
              type: "dialogue",
              speaker: "RAT MESSENGER",
              text: '"The Eyes say Spartans are asking about you. Not by name. By description."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"What description?"',
            },
            {
              type: "dialogue",
              speaker: "RAT MESSENGER",
              text: "\"'A beggar who united the underworld.' Sounds fancy when they say it.\"",
            },
            {
              type: "narration",
              text: "He hands Li Wei a wrapped package.",
            },
            {
              type: "dialogue",
              speaker: "RAT MESSENGER",
              text: '"From Mama Bone. Says you might need it."',
            },
            {
              type: "narration",
              text: "Inside: A set of merchant's clothes.",
            },
            {
              type: "dialogue",
              speaker: "RAT MESSENGER",
              text: "\"You can't move in the upper rings looking like a beggar. These'll help.\"",
            },
            { type: "internal", text: "The alliance pays dividends." },
            {
              type: "internal",
              text: "But attention is attention, wanted or not.",
            },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "A Spartan patrol passes—they look at Li Wei but the merchant clothes give pause.",
            },
            {
              type: "dialogue",
              speaker: "SPARTAN",
              text: '"Doesn\'t match the description..."',
              emotion: "muttering",
            },
            { type: "narration", text: "They move on." },
            {
              type: "system",
              text: "FLAG SET: ALLIANCE_ACTIVE",
            },
            {
              type: "system",
              text: "ITEM OBTAINED: Merchant Disguise",
            },
          ],
        },
      ],
      nextScene: "2-3-hungry-lessons",
    },

    // =========================================================================
    // SCENE 2.2C: HIDDEN (Shadow Path)
    // =========================================================================
    {
      id: "2-2c-hidden",
      title: "Hidden",
      type: "cutscene",
      location: "Lower Streets - Night",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Li Wei moves through shadows, observing.",
            },
            { type: "narration", text: "He's learned to be invisible." },
            { type: "pause", duration: 300 },
            { type: "narration", text: "Ahead: A secret meeting." },
            {
              type: "narration",
              text: "Spartan officers with someone in civilian clothes.",
            },
            {
              type: "dialogue",
              speaker: "INITIATIVE AGENT",
              text: '"Subject 17 is confirmed in the Lower Streets area. Your patrols should—"',
            },
            {
              type: "dialogue",
              speaker: "SPARTAN OFFICER",
              text: '"With respect, we patrol as the Commander orders. Not as the Initiative suggests."',
              emotion: "cold",
            },
            {
              type: "dialogue",
              speaker: "INITIATIVE AGENT",
              text: '"The Initiative\'s authority supersedes—"',
            },
            {
              type: "dialogue",
              speaker: "SPARTAN OFFICER",
              text: '"Does it? In MY district?"',
            },
            { type: "narration", text: "Tension between them." },
            {
              type: "dialogue",
              speaker: "SPARTAN OFFICER",
              text: '"I\'ll increase patrols. But this remains MY operation."',
            },
            {
              type: "dialogue",
              speaker: "INITIATIVE AGENT",
              text: '"Very well. Report any F-grade vagrants with unusual abilities directly to this contact."',
              emotion: "backing down",
            },
            { type: "narration", text: "Hands over a card." },
            { type: "pause", duration: 400 },
            { type: "narration", text: "Li Wei has heard everything." },
            { type: "internal", text: "The Initiative and the Spartans." },
            { type: "internal", text: "Not quite allies. Not quite enemies." },
            {
              type: "internal",
              text: "Both hunting me for different reasons.",
            },
            {
              type: "internal",
              text: "Information is power. And I have information.",
            },
            {
              type: "system",
              text: "FLAG SET: INITIATIVE_KNOWLEDGE_DEEP",
            },
            {
              type: "system",
              text: "FLAG SET: SPARTAN_INITIATIVE_TENSION",
            },
          ],
        },
      ],
      nextScene: "2-3-hungry-lessons",
    },

    // =========================================================================
    // SCENE 2.3: HUNGRY LESSONS
    // Training with Elder Mei - Learn Hungry Stance
    // =========================================================================
    {
      id: "2-3-hungry-lessons",
      title: "Hungry Lessons",
      type: "interactive",
      location: "Training Ground",
      estimatedMinutes: 20,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "system", text: "TRAINING GROUND - Dawn" },
            { type: "narration", text: "Elder Mei paces impatiently." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"FINALLY! I\'ve been waiting to get my hands on you!"',
              emotion: "excited",
            },
            {
              type: "narration",
              text: "She examines Li Wei like a predator examining prey.",
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Chen taught you flow. Wu taught you endurance. Both good. Both necessary."',
            },
            { type: "narration", text: "She grins." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"But neither teaches you to be DANGEROUS. To make enemies fear you. That\'s my job."',
            },
            {
              type: "narration",
              text: "She takes a stance—coiled, tense, hungry.",
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"The Hungry Stance. We don\'t just survive. We CONSUME."',
            },
            {
              type: "narration",
              text: "She moves—sudden, explosive, terrifying.",
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: "\"When you're starving, you don't think about tomorrow. You think about NOW. About survival. About TAKING what you need.\"",
            },
            { type: "narration", text: "She stops in front of Li Wei." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"The system called us worthless. Said we had no potential. The Hungry Stance is our answer: we\'ll DEVOUR our potential from the world that denied it."',
            },
            { type: "narration", text: "She gestures." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Attack me."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            {
              type: "narration",
              text: "Li Wei attacks—Elder Mei doesn't evade or block.",
            },
            {
              type: "narration",
              text: "She intercepts, redirects, and COUNTERS.",
            },
            { type: "narration", text: "Li Wei is thrown back." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"See? You expected me to defend. Hungry style doesn\'t defend. It takes."',
            },
            { type: "narration", text: "She helps him up." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"The stance makes you vulnerable to damage. But it makes your attacks DEVASTATING. Risk for reward."',
            },
            { type: "pause", duration: 400 },
            { type: "divider" },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: HUNGRY STANCE (飢餓勢)",
            },
            {
              type: "narration",
              text: '"The starving wolf does not hesitate. It survives."',
            },
            { type: "pause", duration: 300 },
            {
              type: "system",
              text: "+30% Attack damage while active",
            },
            {
              type: "system",
              text: "Chi gain on successful hits doubled",
            },
            {
              type: "system",
              text: "Counterattacks deal massive bonus damage",
            },
            {
              type: "system",
              text: "WEAKNESS: -15% Damage Resistance, -10% Evasion",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Now. The strike that takes."',
            },
            {
              type: "narration",
              text: "She demonstrates—a palm strike that seems to pull chi FROM the target.",
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Ravenous Palm. You hit them, and you STEAL their energy. Makes you stronger. Makes them weaker."',
            },
            {
              type: "narration",
              text: "Li Wei practices—feels strange at first.",
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: "\"Don't feel guilty! They're trying to hurt you. Taking their chi is self-defense.\"",
            },
            { type: "pause", duration: 400 },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: RAVENOUS PALM (貪掌)",
            },
            { type: "system", text: "Power: 25 | Chi Cost: 5" },
            {
              type: "system",
              text: "SPECIAL: Steals chi from target (gain 5 chi on hit)",
            },
            {
              type: "system",
              text: "Deals +20% damage to targets above 50% HP",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"One more. For when you\'re cornered and the only way out is THROUGH."',
            },
            {
              type: "narration",
              text: "She demonstrates—a rapid three-strike combination that's brutal and relentless.",
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Feral Combo. Three strikes, each faster than the last. The final hit knocks them DOWN."',
            },
            { type: "pause", duration: 400 },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: FERAL COMBO (野蠻連擊)",
            },
            {
              type: "system",
              text: "Power: 10 + 15 + 25 = 50 total | Chi Cost: 15",
            },
            {
              type: "system",
              text: "SPECIAL: Each hit builds momentum, final hit causes knockdown",
            },
            { type: "system", text: "Cannot be interrupted once started" },
            {
              type: "system",
              text: "RISK: Very vulnerable if combo is dodged",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Now fight me. And don\'t hold back!"',
            },
          ],
        },
        {
          type: "combat",
          enemies: ["elder-mei-training"],
          canLose: true,
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"THAT was fun. You\'ve got the hunger in you, Li Wei. I can see it."',
              emotion: "grinning, breathing hard",
            },
            {
              type: "narration",
              text: "Her expression grows serious briefly.",
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"When the Initiative comes—and they WILL come—you\'ll need to be ready to fight without mercy. Chen and Wu taught you discipline. I taught you desperation."',
            },
            { type: "narration", text: "She pats his shoulder." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Use all three. Survive."',
            },
          ],
        },
      ],
      nextScene: "2-4-memory-fractures",
    },

    // =========================================================================
    // SCENE 2.4: MEMORY FRACTURES
    // Flashback revealing Li Wei's past
    // =========================================================================
    {
      id: "2-4-memory-fractures",
      title: "Memory Fractures",
      type: "cutscene",
      location: "Li Wei's Mind / Past",
      estimatedMinutes: 15,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "system", text: "NIGHT - Li Wei sleeps" },
            {
              type: "narration",
              text: "The jade pendant pulses with increasing intensity.",
            },
            { type: "pause", duration: 500 },
            { type: "divider" },
            { type: "system", text: "FLASHBACK - 12 YEARS AGO" },
            {
              type: "system",
              text: "CALIBRATION INITIATIVE RESEARCH FACILITY",
            },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "WHITE ROOM - A child (Young Li Wei, age 5) sits on a table.",
            },
            { type: "narration", text: "Masked researchers surround him." },
            {
              type: "dialogue",
              speaker: "RESEARCHER 1",
              text: '"Subject 17\'s readings are stable. Proceeding with chi flow analysis."',
            },
            { type: "narration", text: "Young Li Wei is scared but silent." },
            { type: "internal", text: "He's learned crying doesn't help." },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Hello, Li Wei. Do you remember me?"',
              emotion: "kinder face",
            },
            {
              type: "dialogue",
              speaker: "YOUNG LI WEI",
              text: '"You gave me the sweet yesterday."',
              emotion: "quietly",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: "\"That's right. I'm going to run some tests today. They won't hurt. I promise.\"",
              emotion: "smiling",
            },
            {
              type: "narration",
              text: "The test begins—chi sensors placed on his body.",
            },
            {
              type: "narration",
              text: "The readings appear on screen—and the researchers freeze.",
            },
            {
              type: "dialogue",
              speaker: "RESEARCHER 2",
              text: '"That\'s impossible. The flow is... backwards."',
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR",
              text: '"Explain."',
              emotion: "over intercom",
            },
            {
              type: "dialogue",
              speaker: "RESEARCHER 1",
              text: '"His chi moves in reverse through his meridians. The Array would read this as... nothing. Below F-grade. But the POWER—"',
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR",
              text: '"Confirm the readings. Double-check everything."',
            },
            { type: "narration", text: "More tests. Same results." },
            {
              type: "dialogue",
              speaker: "RESEARCHER 2",
              text: '"Director, he\'s the first subject to survive with stable inverse chi. Subjects 1 through 16 all..."',
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: "\"He's not a subject. He's a child.\"",
              emotion: "protectively",
            },
            {
              type: "dialogue",
              speaker: "RESEARCHER 1",
              text: '"He\'s BOTH."',
              emotion: "coldly",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "FLASH FORWARD - 2 YEARS AGO" },
            { type: "system", text: "THE SAME FACILITY" },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "Teen Li Wei (age 17) in a training room.",
            },
            {
              type: "narration",
              text: "His body moves with trained precision.",
            },
            {
              type: "narration",
              text: "Multiple combat instructors face him.",
            },
            {
              type: "dialogue",
              speaker: "INSTRUCTOR",
              text: '"How... how is he so fast?"',
              emotion: "on ground",
            },
            {
              type: "narration",
              text: "Li Wei stands over his defeated opponents.",
            },
            {
              type: "narration",
              text: "His chi FLARES—visible, inverted, wrong.",
            },
            {
              type: "narration",
              text: "The jade pendant around his neck glows.",
            },
            { type: "pause", duration: 300 },
            { type: "system", text: "OBSERVATION ROOM" },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"The pendant suppresses 80% of his output. And he\'s STILL defeating master-level opponents."',
              emotion: "watching through glass",
            },
            {
              type: "dialogue",
              speaker: "RESEARCHER",
              text: '"Imagine if we removed the suppression."',
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"We tried. Three times."',
            },
            {
              type: "narration",
              text: "He pulls up files on a screen—destroyed rooms, body counts.",
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Every time the pendant is removed, he... releases. We lost seven staff members learning that lesson."',
            },
            {
              type: "dialogue",
              speaker: "RESEARCHER",
              text: '"So what do we do with him?"',
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"We continue. Subject 17 is proof that inverse chi can be harnessed. If we can replicate his condition..."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "FLASH FORWARD - 3 MONTHS AGO" },
            { type: "system", text: "THE ESCAPE" },
            { type: "pause", duration: 400 },
            { type: "narration", text: "Li Wei in a testing chamber." },
            { type: "narration", text: "Multiple electrodes attached." },
            {
              type: "narration",
              text: "The pendant has been removed for 'calibration.'",
            },
            {
              type: "dialogue",
              speaker: "RESEARCHER",
              text: '"Beginning suppression field activation in three... two..."',
            },
            { type: "system", text: "ALARMS" },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: "\"STOP! The field isn't properly calibrated! You'll kill him!\"",
              emotion: "bursting in",
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Continue the test. We need the data."',
              emotion: "over intercom",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Director, his chi readings are spiking beyond—"',
            },
            { type: "pause", duration: 300 },
            { type: "effect", effect: { type: "shake" } },
            { type: "system", text: "EXPLOSION OF INVERSE CHI" },
            { type: "narration", text: "Everything goes white." },
            { type: "pause", duration: 500 },
            {
              type: "narration",
              text: "When vision returns—the room is destroyed.",
            },
            {
              type: "narration",
              text: "Researchers lie unconscious or worse.",
            },
            {
              type: "narration",
              text: "Li Wei stands at the center, chi swirling around him in impossible patterns.",
            },
            { type: "internal", text: "He doesn't remember doing this." },
            { type: "internal", text: "He doesn't remember anything." },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Li Wei... Li Wei, can you hear me?"',
              emotion: "injured but alive, crawling to him",
            },
            { type: "narration", text: "He looks at her blankly." },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"You have to run. Before they recover. Before—"',
            },
            {
              type: "narration",
              text: "She places the pendant back around his neck.",
            },
            {
              type: "narration",
              text: "The chi calms. The glow fades. Li Wei collapses.",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Come on... the emergency exit..."',
              emotion: "struggling to lift him",
            },
            { type: "pause", duration: 300 },
            { type: "system", text: "FLASH - Running through corridors" },
            { type: "system", text: "FLASH - Sirens blaring" },
            {
              type: "system",
              text: "FLASH - The outside world, blinding after years of white rooms",
            },
            { type: "system", text: "FLASH - Falling through streets" },
            { type: "system", text: "FLASH - Darkness" },
            { type: "divider" },
            { type: "system", text: "END FLASHBACK" },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "narration", text: "Li Wei GASPS awake." },
            {
              type: "narration",
              text: "Elder Chen is there, along with Wu and Mei.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Easy. Easy. You were thrashing. Screaming."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I remember. I remember everything."',
              emotion: "shaking",
            },
            { type: "narration", text: "He looks at the pendant." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"This thing... it suppresses what I am. The Initiative put it on me to contain my power."',
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"And now?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Now it\'s damaged. From the explosion. The suppression is... failing."',
            },
            {
              type: "narration",
              text: "His chi flares briefly—inverse, visible.",
            },
            { type: "narration", text: "The Elders exchange looks." },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"So that\'s what you are. Inverse chi made manifest."',
              emotion: "quietly, for once",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"The Inverted One. Wei Zhong\'s prophecy."',
              emotion: "gravely",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"What prophecy?"',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"An old story. About someone whose chi flows backward. Someone who could challenge the Array itself."',
            },
            { type: "narration", text: "He meets Li Wei's eyes." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"We always thought it was myth. But here you are."',
            },
            { type: "pause", duration: 500 },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"The Initiative wants you back."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"They\'ll never stop hunting."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Which means you must decide. Hide forever. Or confront what\'s coming."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'m done hiding."',
            },
            {
              type: "system",
              text: "MEMORY RESTORED - Full backstory revealed",
            },
          ],
        },
      ],
      nextScene: "2-5-choice-point",
    },

    // =========================================================================
    // CHOICE POINT 3: RESPONDING TO THE HUNT
    // =========================================================================
    {
      id: "2-5-choice-point",
      title: "The Initiative Hunts",
      type: "interactive",
      location: "Elder's Quarters",
      estimatedMinutes: 5,
      content: [
        {
          type: "content",
          lines: [
            { type: "system", text: "STRATEGY MEETING" },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"The Initiative is closing in. Commander Vex of the Spartans has been given orders to find you."',
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"We have three options, as I see it."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: "\"FOUR, if we count 'burn everything down.'\"",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"One: Strike first. Hit their operations before they find us."',
              emotion: "ignoring her",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Two: Find allies. There are people within the system who doubt it. Convince them to help."',
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Three: Dig deeper. Find leverage. Information that makes hunting you too costly."',
            },
            { type: "narration", text: "They all look at Li Wei." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"This is your fight, Li Wei. How do you want to wage it?"',
            },
          ],
        },
        {
          type: "choice",
          prompt: "The Initiative hunts you. How do you respond?",
          choices: [
            {
              id: "strike-first",
              label: "Strike first. Show them we're not prey.",
              effects: [
                { type: "path", path: "blade", delta: 5 },
                { type: "flag", flag: "CHOSE_STRIKE", value: true },
              ],
              nextScene: "2-5a-raid",
            },
            {
              id: "find-allies",
              label:
                "Find allies within the system. Not everyone believes in it.",
              effects: [
                { type: "path", path: "stream", delta: 5 },
                { type: "flag", flag: "CHOSE_ALLIES", value: true },
              ],
              nextScene: "2-5b-allies",
            },
            {
              id: "dig-deeper",
              label:
                "I need more information. There's something they're hiding.",
              effects: [
                { type: "path", path: "shadow", delta: 5 },
                { type: "flag", flag: "CHOSE_SECRETS", value: true },
              ],
              nextScene: "2-5c-secrets",
            },
          ],
        },
      ],
    },

    // =========================================================================
    // SCENE 2.5A: THE RAID (Blade Path)
    // =========================================================================
    {
      id: "2-5a-raid",
      title: "The Raid",
      type: "interactive",
      location: "Initiative Safe House - Labor Ring",
      estimatedMinutes: 25,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: "\"NOW we're talking! There's an Initiative safe house in the Labor Ring. Small staff, lots of records.\"",
              emotion: "excited",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: "\"It's guarded. But not heavily. They don't expect attack.\"",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"This will escalate things. Permanently."',
              emotion: "concerned",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"Good. Let them know I'm not a subject anymore. I'm a threat.\"",
            },
            { type: "divider" },
            { type: "system", text: "MISSION BRIEFING" },
            {
              type: "system",
              text: "LOCATION: Initiative Safe House, Labor Ring",
            },
            {
              type: "system",
              text: "OBJECTIVE: Destroy operations, retrieve intel",
            },
            {
              type: "system",
              text: "ENEMIES: 4-6 Initiative Soldiers, 1 Agent",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "system", text: "LABOR RING - Night" },
            {
              type: "narration",
              text: "A nondescript building. Too clean for the area.",
            },
            { type: "narration", text: "Li Wei approaches from the shadows." },
            {
              type: "internal",
              text: "This is where they coordinate the hunt.",
            },
            {
              type: "internal",
              text: "Where they plan how to cage people like me.",
            },
            { type: "internal", text: "No more." },
          ],
        },
        {
          type: "combat",
          enemies: ["initiative-soldier", "initiative-soldier"],
          canLose: false,
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "RECORDS ROOM" },
            {
              type: "narration",
              text: "Filing cabinets with subject information.",
            },
            { type: "narration", text: "Li Wei finds his own file." },
            { type: "pause", duration: 400 },
            { type: "system", text: "FILE: SUBJECT 17" },
            { type: "system", text: "Status: ESCAPED" },
            { type: "system", text: "Priority: ALPHA" },
            {
              type: "system",
              text: "Notes: Inverse chi manifestation confirmed. Pendant suppression failing. RECAPTURE OR TERMINATE.",
            },
            { type: "pause", duration: 300 },
            { type: "narration", text: "He finds other files too." },
            { type: "system", text: "FILE: SUBJECT 11" },
            { type: "system", text: "Status: TERMINATED" },
            {
              type: "system",
              text: "Notes: Inverse chi unstable. Expired during testing Year 115.",
            },
            { type: "system", text: "FILE: SUBJECT 23" },
            { type: "system", text: "Status: ACTIVE" },
            {
              type: "system",
              text: "Notes: Partial inverse manifestation. Currently in CONTAINMENT.",
            },
            { type: "internal", text: "There are others. Or there were." },
            {
              type: "internal",
              text: "They created more of us. Experimented until we broke or died.",
            },
            { type: "system", text: "INTEL OBTAINED: Subject Records" },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "OPERATIONS CENTER" },
            {
              type: "narration",
              text: "Initiative Agent at a desk, armed.",
            },
            {
              type: "dialogue",
              speaker: "AGENT THORN",
              text: '"So. Subject 17 comes to us."',
            },
            {
              type: "narration",
              text: "She draws a blade—clearly trained.",
            },
            {
              type: "dialogue",
              speaker: "AGENT THORN",
              text: '"Director Shen will reward me handsomely for your return."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'m not going back."',
            },
            {
              type: "dialogue",
              speaker: "AGENT THORN",
              text: '"That\'s not your choice."',
            },
          ],
        },
        {
          type: "combat",
          enemies: ["agent-thorn"],
          canLose: false,
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Tell Shen I\'m coming for him."',
            },
            {
              type: "dialogue",
              speaker: "AGENT THORN",
              text: "\"You have no idea what you're challenging. The Initiative has resources you can't imagine.\"",
              emotion: "laughing despite defeat",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Then they should have been more careful who they created."',
            },
            { type: "narration", text: "He leaves her alive but defeated." },
            { type: "system", text: "FLAG SET: SAFE_HOUSE_DESTROYED" },
            { type: "system", text: "FLAG SET: THORN_DEFEATED" },
            { type: "system", text: "INTEL: Full Initiative knowledge" },
          ],
        },
      ],
      nextScene: "2-6-climbing-higher",
    },

    // =========================================================================
    // SCENE 2.5B: FINDING ALLIES (Stream Path)
    // =========================================================================
    {
      id: "2-5b-allies",
      title: "Finding Allies",
      type: "dialogue",
      location: "Labor Ring Checkpoint",
      estimatedMinutes: 25,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: "\"Not everyone in the system believes in it. There's a Spartan sergeant, name of Yun. He's been asking questions.\"",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Dangerous to approach a Spartan."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"More dangerous not to try. If Li Wei can turn even one of them..."',
            },
            { type: "divider" },
            { type: "system", text: "MISSION SETUP" },
            { type: "system", text: "LOCATION: Labor Ring Checkpoint" },
            { type: "system", text: "TARGET: Sergeant Yun" },
            { type: "system", text: "OBJECTIVE: Make contact, plant doubt" },
            { type: "system", text: "RISK: Exposure, capture" },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "system", text: "LABOR RING - Checkpoint" },
            {
              type: "narration",
              text: "Li Wei approaches in the merchant disguise.",
            },
            {
              type: "narration",
              text: "Sergeant Yun oversees the checkpoint—tired, middle-aged, not cruel like some.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I need to speak with Sergeant Yun. Privately."',
              emotion: "to a guard",
            },
            {
              type: "dialogue",
              speaker: "GUARD",
              text: '"Who are you?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Someone with information about the Initiative. The kind he\'s been looking for."',
            },
            {
              type: "narration",
              text: "The guard hesitates—but Yun has been asking questions. Word spreads.",
            },
            { type: "narration", text: "Yun approaches." },
            {
              type: "dialogue",
              speaker: "SERGEANT YUN",
              text: '"You have ten seconds to explain why I shouldn\'t arrest you."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Because the Initiative is using your Commander. And you know it."',
            },
            { type: "narration", text: "Yun's expression flickers." },
            {
              type: "dialogue",
              speaker: "SERGEANT YUN",
              text: '"Follow me."',
              emotion: "quietly",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "PRIVATE MEETING - Yun's office" },
            {
              type: "dialogue",
              speaker: "SERGEANT YUN",
              text: '"Talk."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"The Calibration Initiative experiments on children. F-grade children, mostly. They call us 'subjects.' They test us until we break. Or die.\"",
            },
            { type: "narration", text: "He taps the files." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"Seventeen of us. That's how many subjects they've had. I'm the seventeenth. Only two of us are still alive.\"",
            },
            {
              type: "dialogue",
              speaker: "YUN",
              text: '"This... this can\'t be official policy."',
              emotion: "reading",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"It's not. Director Shen operates beyond Council oversight. The High Sects don't know the full scope.\"",
            },
            {
              type: "dialogue",
              speaker: "YUN",
              text: '"And you expect me to believe you?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I expect you to investigate. Verify. You're not a stupid man, Commander. Check the records. Interview Dr. Mae—if she's still alive.\"",
            },
            { type: "pause", duration: 400 },
            {
              type: "dialogue",
              speaker: "YUN",
              text: '"Why would you trust me with this?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Because Sergeant Yun said you were different. That you believe in law, not just power."',
            },
          ],
        },
        {
          type: "choice",
          prompt: "How do you appeal to Yun?",
          choices: [
            {
              id: "appeal-justice",
              label:
                "Appeal to justice - the system is broken and must be fixed",
              effects: [{ type: "relationship", character: "yun", delta: 1 }],
            },
            {
              id: "appeal-family",
              label: "Appeal to family - ask about his brother",
              effects: [{ type: "relationship", character: "yun", delta: 2 }],
            },
            {
              id: "appeal-interest",
              label:
                "Appeal to self-interest - when this falls, you want to be on the right side",
              effects: [],
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "pause", duration: 400 },
            {
              type: "dialogue",
              speaker: "YUN",
              text: "\"My brother tested F-grade. He was 'collected' when he was seven. The family was told he died in an accident.\"",
            },
            { type: "narration", text: "His fists clench." },
            {
              type: "dialogue",
              speaker: "YUN",
              text: '"I became a Spartan to find out what really happened. Never could. But I know they lied."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Help me expose them. Not for me. For your brother. For everyone like him."',
            },
            { type: "pause", duration: 500 },
            {
              type: "dialogue",
              speaker: "YUN",
              text: '"I can\'t openly oppose the Commander. But I can look the other way at certain times. Forget to report certain things."',
              emotion: "finally",
            },
            { type: "narration", text: "He writes something on paper." },
            {
              type: "dialogue",
              speaker: "YUN",
              text: "\"This is when and where the Initiative has meetings with Vex. If you're going to expose them, you'll need proof.\"",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Thank you, Sergeant."',
            },
            {
              type: "dialogue",
              speaker: "YUN",
              text: '"Don\'t thank me. Just make it matter."',
            },
            { type: "system", text: "FLAG SET: YUN_ALLIED" },
            { type: "system", text: "INTEL: Initiative meeting schedule" },
          ],
        },
      ],
      nextScene: "2-6-climbing-higher",
    },

    // =========================================================================
    // SCENE 2.5C: DR. MAE'S DEAD DROP (Shadow Path)
    // =========================================================================
    {
      id: "2-5c-secrets",
      title: "The Dead Drop",
      type: "exploration",
      location: "Undercity - Old Drainage System",
      estimatedMinutes: 25,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"You remember Dr. Mae from your flashback?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The one who helped me escape."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: "\"She's been trying to contact the sect for months. She has information. But she's watched constantly.\"",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"She uses dead drops. Hidden messages in the Undercity."',
            },
            { type: "divider" },
            { type: "system", text: "MISSION SETUP" },
            {
              type: "system",
              text: "LOCATION: Undercity - Old Drainage System",
            },
            { type: "system", text: "OBJECTIVE: Retrieve Dr. Mae's messages" },
            {
              type: "system",
              text: "RISK: Initiative patrols, unstable terrain",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "system",
              text: "UNDERCITY ENTRANCE - Hidden behind collapsed building",
            },
            {
              type: "internal",
              text: "Beneath the streets, the city has layers.",
            },
            {
              type: "internal",
              text: "The Undercity—where old Haven's Cradle was buried by new construction.",
            },
            {
              type: "internal",
              text: "Where the Initiative hides its secrets.",
            },
            { type: "internal", text: "And where Dr. Mae hides hers." },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "The Undercity is dark, dangerous, fascinating.",
            },
            {
              type: "narration",
              text: "Ancient architecture mixed with modern refuse.",
            },
            {
              type: "narration",
              text: "Initiative presence here and there—guards watching certain areas.",
            },
          ],
        },
        {
          type: "exploration",
          areas: [
            {
              id: "drainage-tunnels",
              name: "Drainage Tunnels",
              description:
                "Dark passages beneath the city. Ancient and forgotten.",
              required: true,
              content: [
                {
                  type: "narration",
                  text: "The tunnels twist and wind beneath the city.",
                },
                {
                  type: "narration",
                  text: "Water drips from above. Rats scatter at your approach.",
                },
                {
                  type: "internal",
                  text: "These passages are older than the current city.",
                },
                {
                  type: "internal",
                  text: "Built for a different Haven's Cradle.",
                },
              ],
            },
            {
              id: "patrol-point",
              name: "Initiative Patrol",
              description: "Guards stationed at a junction. Must be avoided.",
              content: [
                {
                  type: "narration",
                  text: "Initiative soldiers guard a junction ahead.",
                },
                {
                  type: "dialogue",
                  speaker: "GUARD 1",
                  text: '"Why are we even down here?"',
                },
                {
                  type: "dialogue",
                  speaker: "GUARD 2",
                  text: '"Director\'s orders. Watching for unauthorized access."',
                },
                {
                  type: "internal",
                  text: "They're looking for me. Or anyone like me.",
                },
                { type: "internal", text: "Best to go around." },
              ],
            },
            {
              id: "dead-drop-location",
              name: "The Dead Drop",
              description:
                "A specific drainage pipe marked with a familiar symbol.",
              required: true,
              content: [
                {
                  type: "narration",
                  text: "A specific drainage pipe, marked with a symbol only Li Wei would recognize.",
                },
                {
                  type: "narration",
                  text: "The outline of a jade pendant.",
                },
                {
                  type: "narration",
                  text: "Inside: A sealed container with letters.",
                },
                { type: "pause", duration: 400 },
                { type: "system", text: "LETTER 1 (from Dr. Mae):" },
                {
                  type: "narration",
                  text: "\"Li Wei—if you're reading this, you survived. I'm sorry I couldn't do more. But I can do this: the Initiative has a weakness.\"",
                },
                {
                  type: "narration",
                  text: "\"Director Shen isn't acting on Council orders. The High Sects don't know the full extent of his experiments. If they did...\"",
                },
                {
                  type: "narration",
                  text: '"The proof is in the Archive. Beneath the Measuring Spire. But no one can access it without the Director\'s seal."',
                },
                {
                  type: "narration",
                  text: "\"One more thing: you're not the only surviving subject. There's another—Subject 23. They're keeping her in the Garrison Ring, in a hidden facility. If you can free her...\"",
                },
                {
                  type: "narration",
                  text: '"Be careful. They\'re watching everything. - Mae"',
                },
                { type: "pause", duration: 300 },
                { type: "system", text: "LETTER 2:" },
                {
                  type: "narration",
                  text: "A map of the Garrison Ring with a location marked—the hidden facility.",
                },
                { type: "system", text: "LETTER 3:" },
                {
                  type: "narration",
                  text: "Initiative passcodes and patrol schedules.",
                },
                { type: "pause", duration: 400 },
                {
                  type: "internal",
                  text: "Another subject. Still alive. Still trapped.",
                },
                {
                  type: "internal",
                  text: "And proof that could expose everything.",
                },
                { type: "system", text: "FLAG SET: MAE_CONTACT" },
                { type: "system", text: "FLAG SET: SUBJECT_23_KNOWN" },
                {
                  type: "system",
                  text: "INTEL: Hidden facility location, passcodes",
                },
              ],
            },
          ],
        },
      ],
      nextScene: "2-6-climbing-higher",
    },

    // =========================================================================
    // SCENE 2.6: CLIMBING HIGHER
    // Exploration into upper rings
    // =========================================================================
    {
      id: "2-6-climbing-higher",
      title: "Climbing Higher",
      type: "exploration",
      location: "Commerce Ring / Garrison Ring Border",
      estimatedMinutes: 20,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Beyond the Commerce Ring, you\'ll be in Spartan territory. Their domain."',
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Commander Vex controls the Garrison Ring. He\'s disciplined. Dangerous. Not corrupt exactly, but utterly loyal to the system."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Break him or break past him. Either way, the path to the Spire goes through him."',
            },
            { type: "narration", text: "Li Wei departs." },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "system", text: "COMMERCE RING - The merchant district" },
            {
              type: "narration",
              text: "A different world from the Lower Streets.",
            },
            { type: "narration", text: "Clean. Organized. Prosperous." },
            {
              type: "narration",
              text: "People with aptitude grades visible on their clothing—C, B, occasionally A.",
            },
            {
              type: "narration",
              text: "In disguise, Li Wei passes through.",
            },
          ],
        },
        {
          type: "exploration",
          areas: [
            {
              id: "merchant-district",
              name: "Merchant Streets",
              description: "Clean streets filled with shops and traders.",
              content: [
                {
                  type: "narration",
                  text: "The Commerce Ring bustles with trade.",
                },
                {
                  type: "narration",
                  text: "Everyone here has a place. A purpose.",
                },
                { type: "internal", text: "All determined by the Array." },
                {
                  type: "internal",
                  text: "They don't question it because it works for them.",
                },
              ],
            },
            {
              id: "broken-cup",
              name: "The Broken Cup Tea House",
              description:
                "A quiet establishment between rings where different grades mingle.",
              content: [
                {
                  type: "narration",
                  text: "A quiet tea house between the rings.",
                },
                {
                  type: "narration",
                  text: "Here, people of different grades mingle—against regulation, but tolerated.",
                },
                {
                  type: "dialogue",
                  speaker: "TEA HOUSE OWNER",
                  text: "\"Another traveler seeking the upper rings? I've seen many. Most don't come back.\"",
                  emotion: "old woman, knowing eyes",
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"What happened to them?"',
                },
                {
                  type: "dialogue",
                  speaker: "TEA HOUSE OWNER",
                  text: '"The ones who challenged the system? Dead or disappeared. The ones who accepted it? They became part of it."',
                },
                { type: "narration", text: "She serves tea." },
                {
                  type: "dialogue",
                  speaker: "TEA HOUSE OWNER",
                  text: '"Which will you be, young one?"',
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Neither. I\'ll change it."',
                },
                {
                  type: "dialogue",
                  speaker: "TEA HOUSE OWNER",
                  text: '"They all say that. But I\'ll pray for you anyway."',
                  emotion: "smiling",
                },
              ],
            },
            {
              id: "garrison-border",
              name: "Garrison Ring Checkpoint",
              description:
                "The heavily guarded entrance to the military district.",
              required: true,
              content: [
                { type: "system", text: "THE GARRISON RING CHECKPOINT" },
                {
                  type: "narration",
                  text: "Spartan guards. Strict. Professional.",
                },
                { type: "narration", text: "No easy way through." },
                { type: "pause", duration: 300 },
                {
                  type: "internal",
                  text: "The path forward depends on my approach.",
                },
              ],
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "INSIDE THE GARRISON RING" },
            { type: "narration", text: "Military precision everywhere." },
            {
              type: "narration",
              text: "Barracks. Training grounds. Command buildings.",
            },
            {
              type: "narration",
              text: "And at the center—Commander Vex's headquarters.",
            },
            { type: "internal", text: "Li Wei has arrived." },
          ],
        },
      ],
      nextScene: "2-7-choice-point",
    },

    // =========================================================================
    // CHOICE POINT 4: FACING COMMANDER VEX
    // =========================================================================
    {
      id: "2-7-choice-point",
      title: "The Commander",
      type: "interactive",
      location: "Garrison Ring - Vex's Headquarters",
      estimatedMinutes: 5,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "Li Wei observes Vex's headquarters.",
            },
            {
              type: "narration",
              text: "The Commander is inside—reports say he's reviewing the Subject 17 case personally.",
            },
            { type: "internal", text: "Commander Vex. The law's long reach." },
            {
              type: "internal",
              text: "He represents everything the system claims to be: order, discipline, control.",
            },
            {
              type: "internal",
              text: "But also everything it really is: oppression dressed in righteousness.",
            },
            { type: "internal", text: "How do I face him?" },
          ],
        },
        {
          type: "choice",
          prompt: "Commander Vex stands before you. What do you do?",
          choices: [
            {
              id: "challenge-directly",
              label:
                "Challenge him directly. Show him the system's champion can fall.",
              effects: [
                { type: "path", path: "blade", delta: 5 },
                { type: "flag", flag: "CHOSE_COMBAT", value: true },
              ],
              nextScene: "2-7a-combat",
            },
            {
              id: "expose-crimes",
              label:
                "Expose the Initiative's crimes. Make him choose between law and justice.",
              effects: [
                { type: "path", path: "stream", delta: 5 },
                { type: "flag", flag: "CHOSE_EXPOSE", value: true },
              ],
              nextScene: "2-7b-expose",
            },
            {
              id: "slip-past",
              label:
                "I don't need to fight him. Slip past and reach my real objective.",
              effects: [
                { type: "path", path: "shadow", delta: 5 },
                { type: "flag", flag: "CHOSE_EVADE", value: true },
              ],
              nextScene: "2-7c-evade",
            },
          ],
        },
      ],
    },

    // =========================================================================
    // SCENE 2.7A: THE COMMANDER'S CHALLENGE (Blade Path - Full Boss)
    // =========================================================================
    {
      id: "2-7a-combat",
      title: "The Commander's Challenge",
      type: "combat",
      location: "Garrison Ring - Headquarters Courtyard",
      estimatedMinutes: 30,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Li Wei walks into the open.",
            },
            {
              type: "narration",
              text: "Spartans immediately surround him.",
            },
            {
              type: "dialogue",
              speaker: "SPARTAN",
              text: '"Intruder! Identify—"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'m Li Wei. Subject 17. The one your Commander has been hunting."',
              emotion: "loudly",
            },
            { type: "narration", text: "Murmurs among the soldiers." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I'm here to challenge Commander Vex. One on one. Let's see if the system's enforcer can back up his authority.\"",
            },
            { type: "pause", duration: 400 },
            { type: "narration", text: "A door opens." },
            {
              type: "narration",
              text: "COMMANDER VEX emerges—tall, imposing, coldly professional.",
            },
            {
              type: "dialogue",
              speaker: "COMMANDER VEX",
              text: '"The beggar who thinks he\'s special."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The enforcer who thinks he\'s righteous."',
            },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"You\'ve caused considerable trouble, Subject 17. Unauthorized martial activity. Assault on Initiative personnel. Sedition."',
              emotion: "walking closer",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"And your crimes? Hunting innocent people? Enforcing a system built on lies?"',
            },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"The system maintains order. Without it, chaos."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The system creates slaves. And calls it civilization."',
            },
            {
              type: "narration",
              text: "Vex draws his blade—ceremonial, but real.",
            },
            {
              type: "dialogue",
              speaker: "VEX",
              text: "\"Then let's test your philosophy against mine. Single combat. If you win, I'll hear what you have to say.\"",
            },
            { type: "narration", text: "He gestures—the Spartans step back." },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"If I win, you return to the Initiative in chains."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Agreed."',
            },
          ],
        },
        {
          type: "combat",
          enemies: ["commander-vex"],
          canLose: false,
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "narration", text: "Vex falls." },
            { type: "narration", text: "The watching Spartans are frozen." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The system you served is built on a lie, Commander. I\'m proof. The question is: what will you do now that you know?"',
              emotion: "standing over Vex",
            },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"I... I need to think."',
              emotion: "on the ground, broken",
            },
            { type: "narration", text: "Li Wei turns to leave." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"When you\'re done thinking, find me. Maybe we can build something better."',
            },
            { type: "narration", text: "He walks away." },
            { type: "narration", text: "The Spartans don't stop him." },
            { type: "system", text: "VEX: DEFEATED" },
            {
              type: "system",
              text: "STATUS: Spartans confused, system shaken",
            },
          ],
        },
      ],
      nextScene: "2-8-invitation",
    },

    // =========================================================================
    // SCENE 2.7B: THE EXPOSÉ (Stream Path - Reduced Boss)
    // =========================================================================
    {
      id: "2-7b-expose",
      title: "The Exposé",
      type: "dialogue",
      location: "Commander Vex's Office",
      estimatedMinutes: 25,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Li Wei enters through proper channels—Yun arranged the meeting as an 'informant.'",
            },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"So. The informant who has information about Subject 17."',
              emotion: "behind his desk",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I AM Subject 17."',
              emotion: "lowering hood",
            },
            { type: "narration", text: "Vex's hand moves toward a bell." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Before you call your guards, consider this: I could have attacked. I could have snuck in. Instead, I requested a meeting."',
            },
            {
              type: "narration",
              text: "He places documents on the desk—Initiative records, subject files, authorization orders.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Because I think you need to see what you\'re really protecting."',
            },
            { type: "narration", text: "Vex hesitates." },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"Explain."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"The Calibration Initiative experiments on children. F-grade children, mostly. They call us 'subjects.' They test us until we break. Or die.\"",
            },
            { type: "narration", text: "He taps the files." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"Seventeen of us. That's how many subjects they've had. I'm the seventeenth. Only two of us are still alive.\"",
            },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"This... this can\'t be official policy."',
              emotion: "reading",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"It's not. Director Shen operates beyond Council oversight. The High Sects don't know the full scope.\"",
            },
            { type: "narration", text: "Vex looks up." },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"And you expect me to believe you?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I expect you to investigate. Verify. You\'re not a stupid man, Commander."',
            },
            { type: "pause", duration: 400 },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"If what you\'re saying is true... my entire career has been serving a corrupted system."',
              emotion: "slowly",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"It can be uncorrupted. But not from outside. It needs people like you to change it from within."',
            },
            {
              type: "dialogue",
              speaker: "VEX",
              text: "\"I'll verify your claims. If they're true...\"",
              emotion: "standing",
            },
            { type: "narration", text: "He extends his hand." },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"You\'ll have an ally in the Spartans. Or at least, one Spartan."',
            },
            { type: "narration", text: "Li Wei shakes his hand." },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"But first... I need to test you myself. Not for the Initiative. For me."',
            },
          ],
        },
        {
          type: "combat",
          enemies: ["commander-vex-reduced"],
          canLose: true,
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"You could have killed me several times. You held back."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I'm not looking for enemies, Commander. I'm looking for a better world.\"",
            },
            {
              type: "dialogue",
              speaker: "VEX",
              text: '"Then perhaps we want the same thing."',
              emotion: "nodding slowly",
            },
            { type: "system", text: "VEX: CONVERTED (tentatively)" },
            {
              type: "system",
              text: "STATUS: Alliance forming within system",
            },
          ],
        },
      ],
      nextScene: "2-8-invitation",
    },

    // =========================================================================
    // SCENE 2.7C: THE SHADOW'S PATH (Shadow Path - No Boss)
    // =========================================================================
    {
      id: "2-7c-evade",
      title: "The Shadow's Path",
      type: "exploration",
      location: "Garrison Ring - Hidden Facility",
      estimatedMinutes: 25,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "system", text: "GARRISON RING - Night" },
            {
              type: "narration",
              text: "Using Dr. Mae's maps and passcodes, Li Wei navigates the underground passages.",
            },
            { type: "internal", text: "Vex is a symptom, not the disease." },
            { type: "internal", text: "The real power is the Initiative." },
            { type: "internal", text: "And my real objective..." },
            { type: "narration", text: "He checks the map." },
            {
              type: "internal",
              text: "...is the hidden facility. Subject 23. Another person trapped like I was.",
            },
          ],
        },
        {
          type: "exploration",
          areas: [
            {
              id: "maintenance-tunnels",
              name: "Maintenance Tunnels",
              description:
                "Service passages beneath the Garrison Ring. Rarely patrolled.",
              required: true,
              content: [
                {
                  type: "narration",
                  text: "The maintenance tunnels snake beneath the military district.",
                },
                {
                  type: "narration",
                  text: "Dr. Mae's maps are accurate—Li Wei avoids every patrol.",
                },
              ],
            },
            {
              id: "hidden-facility-entrance",
              name: "Hidden Facility",
              description:
                "A smaller version of the facility Li Wei escaped from.",
              required: true,
              content: [
                {
                  type: "narration",
                  text: "Beneath the Garrison Ring—a smaller version of the facility Li Wei escaped from.",
                },
                {
                  type: "narration",
                  text: "Inside: Medical equipment, holding cells.",
                },
                { type: "narration", text: "One cell is occupied." },
                {
                  type: "narration",
                  text: "A young woman, barely conscious, jade pendant around her neck.",
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Subject 23?"',
                  emotion: "breaking the lock",
                },
                {
                  type: "dialogue",
                  speaker: "YUAN",
                  text: '"Who... who are you?"',
                  emotion: "weakly",
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: "\"I'm Subject 17. I'm here to get you out.\"",
                },
                { type: "narration", text: "She looks at his pendant." },
                {
                  type: "dialogue",
                  speaker: "YUAN",
                  text: '"You\'re real. You escaped. They said... they said it was impossible."',
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"It wasn\'t impossible. Just difficult."',
                  emotion: "helping her up",
                },
              ],
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "ESCAPE SEQUENCE" },
            {
              type: "narration",
              text: "Li Wei guides Yuan through the facility.",
            },
            {
              type: "narration",
              text: "She's weak but alive—her inverse chi suppressed but stable.",
            },
            { type: "narration", text: "Near the exit:" },
            { type: "system", text: "ALARMS" },
            {
              type: "dialogue",
              speaker: "SPEAKER",
              text: '"Containment breach! All units to Facility B!"',
            },
            { type: "internal", text: "They've been discovered." },
          ],
        },
        {
          type: "choice",
          prompt: "The alarms are blaring. How do you escape?",
          choices: [
            {
              id: "fight-through",
              label: "Fight through - clear a path",
              effects: [{ type: "path", path: "blade", delta: 3 }],
            },
            {
              id: "stealth-escape",
              label: "Sacrifice time for stealth - slip through",
              effects: [{ type: "path", path: "shadow", delta: 3 }],
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "narration", text: "Li Wei manages to escape with Yuan." },
            {
              type: "narration",
              text: "But Commander Vex glimpses them from a distance.",
            },
            { type: "narration", text: "He doesn't pursue." },
            { type: "internal", text: "He's seen enough to have questions." },
            { type: "divider" },
            { type: "system", text: "OUTSIDE THE GARRISON RING" },
            {
              type: "dialogue",
              speaker: "YUAN",
              text: '"Where... where are we going?"',
              emotion: "breathing hard",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Somewhere safe. The Beggars Sect. They\'ll help you recover."',
            },
            {
              type: "dialogue",
              speaker: "YUAN",
              text: '"Beggars? Like the stories?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Better than the stories."',
            },
            { type: "system", text: "FLAG SET: SUBJECT_23_RESCUED" },
            { type: "system", text: "STATUS: Vex suspicious but uninvolved" },
          ],
        },
      ],
      nextScene: "2-8-invitation",
    },

    // =========================================================================
    // SCENE 2.8: THE INVITATION
    // Chapter ending - All paths converge
    // =========================================================================
    {
      id: "2-8-invitation",
      title: "The Invitation",
      type: "cutscene",
      location: "Beggar's Corner",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "system", text: "BEGGAR'S CORNER - Night" },
            { type: "narration", text: "Li Wei returns." },
            { type: "narration", text: "The Elders wait." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"You\'ve changed things, Li Wei. Whoever you faced, whatever you chose... the balance has shifted."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "pause", duration: 400 },
            { type: "narration", text: "A sound at the entrance." },
            {
              type: "narration",
              text: "Old Dao appears—the first time since Chapter 1.",
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"Well done, Li Wei. Well done indeed."',
              emotion: "smiling",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Dao? Where have you been?"',
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"Watching. Waiting. Seeing if you were truly what I suspected."',
            },
            { type: "narration", text: "He walks closer." },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"And you are. The chi that flows backward. The one who doesn\'t fit their measurements."',
            },
            { type: "narration", text: "He hands Li Wei a scroll." },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: "\"This arrived by methods I won't explain. It's for you.\"",
            },
            { type: "pause", duration: 400 },
            { type: "narration", text: "Li Wei opens it." },
            {
              type: "narration",
              text: "The scroll contains a single message, written in an ancient hand:",
            },
            { type: "divider" },
            {
              type: "narration",
              text: '"Seeker of the Inverse Path:"',
            },
            {
              type: "narration",
              text: '"I have watched your progress with interest. You have faced the streets. You have faced the law. But you have not yet faced yourself."',
            },
            {
              type: "narration",
              text: '"Come to the Forgotten Temple in the wild lands beyond the city. There, you will find what you truly seek."',
            },
            {
              type: "narration",
              text: '"The Dog Beating Staff awaits."',
            },
            {
              type: "narration",
              text: '"- The Hollow One"',
            },
            { type: "divider" },
            { type: "narration", text: "Li Wei looks up." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The Hollow One. Who is that?"',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"A legend. A martial artist who transcended all sects. All systems. All limits."',
              emotion: "grave",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Some say he fought Wei Zhong himself. Others say he IS Wei Zhong, transformed."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: "\"Most say he's a story to scare children. But if he's real...\"",
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: "\"He's real. And he's been waiting a very long time for someone like you.\"",
              emotion: "smiles wider",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The Dog Beating Staff. The prophecy."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"The weapon that could challenge the Array itself. Hidden for generations. Waiting for the Inverted One."',
            },
            {
              type: "narration",
              text: "He places a hand on Li Wei's shoulder.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Whatever you face in that temple, Li Wei, know this: you carry our hopes with you. The hopes of everyone the system forgot."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I won\'t let you down."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "out" } },
            { type: "pause", duration: 500 },
            { type: "divider" },
            {
              type: "narration",
              text: "The law's long reach has been shortened.",
            },
            { type: "narration", text: "But the journey is not over." },
            { type: "pause", duration: 300 },
            {
              type: "narration",
              text: "In the wild lands, the Hollow One waits.",
            },
            {
              type: "narration",
              text: "In the Forgotten Temple, truth sleeps.",
            },
            {
              type: "narration",
              text: "And in Li Wei's hands, destiny stirs.",
            },
            { type: "pause", duration: 500 },
            { type: "divider" },
            { type: "system", text: "CHAPTER 2: COMPLETE" },
            { type: "pause", duration: 300 },
            { type: "system", text: "CHAPTER 3: THE HOLLOW AT THE SUMMIT" },
            { type: "system", text: "Loading..." },
          ],
        },
      ],
    },
  ],
  startScene: "2-1-growing-shadows",
  endScenes: ["2-8-invitation"],
};
