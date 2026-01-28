/**
 * Chapter 1: Streets of the Forgotten
 * ~90-120 minutes of gameplay
 * Three branching paths (Blade/Stream/Shadow) with major choice points
 */

import type { Chapter } from "../../../types/index";

export const CHAPTER_1: Chapter = {
  id: "chapter-1",
  number: 1,
  title: "Streets of the Forgotten",
  scenes: [
    // =========================================================================
    // SCENE 1.1: THE HIDDEN HOME
    // =========================================================================
    {
      id: "1-1-hidden-home",
      title: "The Hidden Home",
      type: "exploration",
      location: "Beggar's Corner - Full Access",
      estimatedMinutes: 15,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Morning light filters through gaps in the walls.",
            },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "Li Wei wakes in the Sleeping Quarters—a mat on the floor, a thin blanket, but warm. Safe.",
            },
            { type: "internal", text: "I slept. Actually slept." },
            {
              type: "internal",
              text: "No dreams of white rooms. No waking to danger.",
            },
            { type: "internal", text: "Just... rest." },
            { type: "pause", duration: 300 },
            { type: "narration", text: "He sits up, looks around." },
            {
              type: "narration",
              text: "Other mats, other sleepers. Fellow beggars.",
            },
            { type: "internal", text: "Fellow... family?" },
            { type: "internal", text: "Is that what they are now?" },
            {
              type: "system",
              text: "Welcome to Beggar's Corner. Explore and speak with residents to learn about your new home.",
            },
          ],
        },
        {
          type: "exploration",
          areas: [
            {
              id: "beggars-pine",
              name: "The Beggar's Pine",
              description:
                "The ancient tree at the Corner's heart, draped with hundreds of cloth strips.",
              required: true,
              content: [
                {
                  type: "narration",
                  text: "You approach the ancient tree at the Corner's heart.",
                },
                {
                  type: "narration",
                  text: "Hundreds of cloth strips hang from its branches.",
                },
                {
                  type: "narration",
                  text: "Each strip has writing—names, prayers, memories.",
                },
                { type: "internal", text: "So many strips. So many names." },
                { type: "pause", duration: 300 },
                { type: "narration", text: "Examining closer:" },
                { type: "narration", text: '"Wang Ji - remembered"' },
                {
                  type: "narration",
                  text: '"The forty-seven who fell in Year 15"',
                },
                {
                  type: "narration",
                  text: '"For Elder Shu, who taught us hunger is not weakness"',
                },
                { type: "internal", text: "This tree holds their history." },
                { type: "internal", text: "The people they've lost." },
                { type: "internal", text: "The things they refuse to forget." },
                { type: "pause", duration: 400 },
                {
                  type: "narration",
                  text: "A beggar nearby notices Li Wei looking.",
                },
                {
                  type: "dialogue",
                  speaker: "BEGGAR",
                  text: "\"Every member writes their name when they join. Every member who dies, we add 'remembered.'\"",
                  emotion: "quiet",
                },
                { type: "narration", text: "She touches one strip gently." },
                {
                  type: "dialogue",
                  speaker: "BEGGAR",
                  text: '"My mother\'s. Thirty years ago."',
                },
                {
                  type: "narration",
                  text: "She walks away without another word.",
                },
                { type: "internal", text: "They remember their dead." },
                {
                  type: "internal",
                  text: "In a world that forgot them, they remember.",
                },
              ],
            },
            {
              id: "bone-yard",
              name: "Grandmother Bone",
              description:
                "A small area filled with animal bones, cleaned and arranged. An impossibly old woman sits among them.",
              content: [
                {
                  type: "narration",
                  text: "A small area filled with animal bones, cleaned and arranged.",
                },
                {
                  type: "narration",
                  text: "An impossibly old woman sits among them, sorting.",
                },
                {
                  type: "dialogue",
                  speaker: "GRANDMOTHER BONE",
                  text: '"Another new one. They always come to stare at the bones."',
                  emotion: "gruff",
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"What... what is this place?"',
                },
                {
                  type: "dialogue",
                  speaker: "GRANDMOTHER BONE",
                  text: '"The Bone Yard. I read futures in what others throw away."',
                },
                {
                  type: "narration",
                  text: "She finally looks at Li Wei—her eyes are sharp, penetrating, despite her age.",
                },
                {
                  type: "dialogue",
                  speaker: "GRANDMOTHER BONE",
                  text: '"Sit. Let me see your fortune."',
                },
              ],
            },
            {
              id: "training-ground",
              name: "Brother Feng",
              description:
                "A young man practices strikes against a wooden post with infectious energy.",
              required: true,
              content: [
                {
                  type: "narration",
                  text: "A young man practices strikes against a wooden post.",
                },
                {
                  type: "narration",
                  text: "He's fast but sloppy—enthusiasm over technique.",
                },
                { type: "narration", text: "He notices Li Wei and grins." },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: '"Hey! The new guy! Li Wei, right? I\'m Feng. Brother Feng."',
                  emotion: "enthusiastic",
                },
                {
                  type: "narration",
                  text: "He bounds over, energy infectious.",
                },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: "\"Man, you've got the whole Corner buzzing. Old Dao brought you? That's rare. He mostly just sits in corners being cryptic.\"",
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"You know Old Dao?"',
                },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: '"Everyone knows OF him. No one knows him. He\'s been around longer than the Elders remember."',
                },
                {
                  type: "narration",
                  text: "He lowers his voice conspiratorially.",
                },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: '"Some say he was around before the Array. Like, PRE-Redistribution."',
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"That would make him—"',
                },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: "\"Ancient. Yeah. But here's the thing—I've never seen him eat. Never seen him sleep. Never seen him anywhere except exactly where something important is about to happen.\"",
                },
                { type: "narration", text: "He shrugs." },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: '"Creepy? Little bit. But he brought YOU, so he can\'t be all bad."',
                },
                { type: "narration", text: "He slaps Li Wei on the shoulder." },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: '"We\'re going to be friends, Li Wei. I can tell."',
                },
              ],
            },
            {
              id: "communal-kitchen",
              name: "The Communal Kitchen",
              description:
                "An open area with cook fires and shared pots. The smell of rice porridge—simple but warm.",
              content: [
                {
                  type: "narration",
                  text: "An open area with cook fires and shared pots.",
                },
                {
                  type: "narration",
                  text: "The smell of rice porridge—simple but warm.",
                },
                {
                  type: "narration",
                  text: "Several beggars sit eating, talking quietly.",
                },
                {
                  type: "dialogue",
                  speaker: "BEGGAR 1",
                  text: '"Another patrol last night. Third this week."',
                },
                {
                  type: "dialogue",
                  speaker: "BEGGAR 2",
                  text: '"The Spartans are looking for someone. Something\'s got them nervous."',
                },
                {
                  type: "dialogue",
                  speaker: "BEGGAR 1",
                  text: '"As long as they don\'t find the Corner, let them search."',
                },
                {
                  type: "narration",
                  text: "Li Wei can take a bowl of porridge.",
                },
                { type: "internal", text: "Real food. Hot food." },
                {
                  type: "internal",
                  text: "When did I last eat something that wasn't scraps from garbage?",
                },
              ],
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "narration", text: "A young beggar approaches Li Wei." },
            {
              type: "dialogue",
              speaker: "MESSENGER",
              text: '"Elder Chen wants to see you. Elder\'s Quarters."',
            },
            { type: "narration", text: "Points to the building." },
            {
              type: "dialogue",
              speaker: "MESSENGER",
              text: "\"Don't keep him waiting. I mean, he'll wait—he's patient like that—but it's rude, you know?\"",
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "The Elder's Quarters are simple—a meditation space with cushions, scrolls on walls, a low table with tea.",
            },
            { type: "narration", text: "Elder Chen sits, waiting, smiling." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Ah, Li Wei. Please, sit. Tea?"',
            },
            { type: "narration", text: "Li Wei sits." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"You\'ve had time to see our home. What do you think?"',
            },
          ],
        },
        {
          type: "choice",
          prompt: "What do you tell Elder Chen?",
          choices: [
            {
              id: "more-than-expected",
              label: '"It\'s more than I expected."',
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"It\'s more than I expected. The streets outside are... harsh. This place is almost peaceful."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"Peace requires effort. We work to maintain this sanctuary because without it, we would have nothing."',
                  emotion: "nodding",
                },
              ],
            },
            {
              id: "why-live-like-this",
              label: '"Why do you live like this?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Why do you live like this? Hidden underground, scraping by?"',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"Because the alternative is death. Or worse—losing ourselves entirely. The world above declared us worthless. Here, we define our own worth."',
                  emotion: "sad",
                },
              ],
            },
            {
              id: "how-stay-hidden",
              label: '"How has this place stayed hidden?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"How has this place stayed hidden? The Spartans patrol everywhere."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"They patrol where they expect to find things. We exist where they don\'t expect. Also..."',
                },
                { type: "narration", text: "He gestures to the walls." },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"These stones are old. Older than the city above. They have their own ways of hiding what they shelter."',
                },
              ],
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: "\"But you didn't come here for philosophy. You came because you're lost.\"",
            },
            { type: "narration", text: "He studies Li Wei." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Old Dao believes you\'re special. The pendant you carry suggests he may be right. But belief and potential are nothing without cultivation."',
            },
            { type: "dialogue", speaker: "LI WEI", text: '"Cultivation?"' },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Training. Development. Becoming what you could be."',
            },
            { type: "narration", text: "He stands." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"I would like to teach you, Li Wei. The path of the Beggars Sect. Our techniques. Our philosophy."',
            },
            { type: "pause", duration: 400 },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"It will be difficult. You will suffer. You may fail. But if you succeed..."',
            },
            { type: "narration", text: "He meets Li Wei's eyes." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"You will become something this world has forgotten how to measure."',
            },
          ],
        },
        {
          type: "choice",
          prompt: "Do you accept Elder Chen's offer?",
          choices: [
            {
              id: "accept-training",
              label: "Accept training",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"I accept. Whatever it takes."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"Good. Your resolve will be tested."',
                  emotion: "approving",
                },
              ],
              effects: [
                { type: "relationship", character: "elder-chen", delta: 1 },
              ],
            },
            {
              id: "ask-whats-in-it-for-me",
              label: '"What\'s in it for me?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: "\"What's in it for me? I don't even know who I am.\"",
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"A place to belong. Answers to questions you haven\'t asked yet. And perhaps... your memories."',
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Then I accept."',
                },
              ],
              effects: [{ type: "path", path: "shadow", delta: 1 }],
            },
            {
              id: "ask-whats-in-it-for-them",
              label: '"What\'s in it for you?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"What\'s in it for you? For the sect?"',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"Survival. The sect grows weaker each year. We need new blood. New strength."',
                  emotion: "honest",
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"But more than that—we need hope. You represent possibility."',
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Then I\'ll try to be worthy of it."',
                },
              ],
              effects: [{ type: "path", path: "stream", delta: 1 }],
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Then we begin tomorrow. Rest today. Eat. Meet your new family."',
            },
            { type: "narration", text: "He returns to sitting." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"And Li Wei? Welcome."',
            },
            { type: "system", text: "SCENE 1.1 COMPLETE" },
          ],
        },
      ],
      nextScene: "1-2-first-lessons",
    },

    // =========================================================================
    // SCENE 1.2: FIRST LESSONS
    // =========================================================================
    {
      id: "1-2-first-lessons",
      title: "First Lessons",
      type: "combat",
      location: "Training Ground",
      estimatedMinutes: 20,
      content: [
        {
          type: "content",
          lines: [
            { type: "system", text: "DAWN - Training Ground" },
            {
              type: "narration",
              text: "Elder Chen waits, standing still as stone.",
            },
            {
              type: "narration",
              text: "Brother Feng and several other beggars watch from the edges.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Good. You\'re punctual."',
            },
            { type: "narration", text: "Li Wei approaches." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Today, you learn the first stance of the Beggars Sect. The Flowing Stance."',
            },
            {
              type: "narration",
              text: "He demonstrates—his body shifts, becoming fluid, loose, water-like.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"We do not meet force with force. We redirect. We flow. We let aggression pass through us and become nothing."',
            },
            { type: "narration", text: "He returns to normal standing." },
            { type: "dialogue", speaker: "ELDER CHEN", text: '"Attack me."' },
            { type: "dialogue", speaker: "LI WEI", text: '"What?"' },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Attack. However you like."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "COMBAT TUTORIAL: Attack Elder Chen" },
            {
              type: "narration",
              text: "Every attack misses or is gently redirected.",
            },
            {
              type: "narration",
              text: "Chen doesn't counterattack—just flows.",
            },
            { type: "pause", duration: 400 },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"You see? Your strikes have power. But power without direction is merely noise."',
            },
            { type: "narration", text: "He takes Li Wei's arm gently." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Now. I will show you how to BE the water, not fight it."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "system",
              text: "TECHNIQUE LEARNED: FLOWING STANCE (流勢)",
            },
            { type: "divider", label: "FLOWING STANCE" },
            {
              type: "narration",
              text: '"Water does not fight the rock; it flows around and eventually wears it down."',
            },
            { type: "pause", duration: 300 },
            { type: "narration", text: "EFFECTS:" },
            { type: "narration", text: "  +15% Evasion while active" },
            { type: "narration", text: "  Chi regenerates faster" },
            { type: "narration", text: "  Counterattacks gain bonus damage" },
            { type: "pause", duration: 200 },
            { type: "narration", text: "WEAKNESS:" },
            { type: "narration", text: "  -10% Direct attack damage" },
            { type: "divider", label: "" },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"The stance alone is foundation. Now, learn to strike from it."',
            },
            {
              type: "narration",
              text: "He demonstrates—a fluid palm strike that seems slow but arrives instantly.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Flowing Strike. Not powerful, but it opens possibilities."',
            },
            { type: "pause", duration: 300 },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: FLOWING STRIKE (流擊)",
            },
            { type: "narration", text: "Light attack from Flowing Stance" },
            {
              type: "narration",
              text: "Power: 12 | Chi Cost: 0 | Speed: Fast",
            },
            {
              type: "narration",
              text: "SPECIAL: Combo Starter - Can chain into Stream Palm, Beggar's Feint",
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"One more technique for today. Stream Palm."',
            },
            {
              type: "narration",
              text: "He demonstrates—a two-handed push that redirects as much as damages.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"This strike pushes. Against aggressive enemies, it creates space. Against defensive enemies, it breaks their stance."',
            },
            { type: "pause", duration: 300 },
            { type: "system", text: "TECHNIQUE LEARNED: STREAM PALM (流掌)" },
            { type: "narration", text: "Medium attack from Flowing Stance" },
            {
              type: "narration",
              text: "Power: 18 | Chi Cost: 5 | Speed: Medium",
            },
            { type: "narration", text: "SPECIAL: Knockback effect" },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Now. Let\'s see you use them."',
            },
            { type: "narration", text: "Feng steps forward, grinning." },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"My turn! Come on, Li Wei, show me what Chen taught you!"',
              emotion: "excited",
            },
          ],
        },
        {
          type: "combat",
          enemies: ["brother-feng-sparring"],
          canLose: false,
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"Okay, okay, I yield! Man, you pick things up FAST."',
              emotion: "laughing",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Good. Better than good. You have instinct for this."',
              emotion: "approving",
            },
            { type: "narration", text: "He pauses, studying Li Wei." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Almost as if you\'ve done it before."',
            },
            {
              type: "narration",
              text: "Li Wei touches his pendant unconsciously.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Maybe I have. I don\'t remember."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Memory is a river. Sometimes it flows underground for a while. But it always resurfaces."',
            },
            { type: "narration", text: "He bows slightly." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Rest. Tomorrow, you meet Elder Wu. Her lessons are... different."',
            },
            { type: "narration", text: "He walks away." },
            { type: "system", text: "SCENE 1.2 COMPLETE" },
          ],
        },
      ],
      nextScene: "1-3-choice-fengs-challenge",
    },

    // =========================================================================
    // CHOICE POINT 1: BROTHER FENG'S CHALLENGE
    // =========================================================================
    {
      id: "1-3-choice-fengs-challenge",
      title: "Brother Feng's Challenge",
      type: "interactive",
      location: "Beggar's Corner",
      estimatedMinutes: 5,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "Li Wei is exploring when Feng approaches.",
            },
            {
              type: "narration",
              text: "Feng's expression is different—less joking, more tense.",
            },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"Hey. Li Wei. Got a minute?"',
            },
            { type: "dialogue", speaker: "LI WEI", text: '"What\'s wrong?"' },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"Look, I... I need to ask you something. And I need you to be honest."',
              emotion: "serious",
            },
            {
              type: "narration",
              text: "He looks around, makes sure they're alone.",
            },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"How are you so GOOD?"',
            },
            { type: "dialogue", speaker: "LI WEI", text: '"What?"' },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: "\"At fighting! At techniques! I've been here two years. TWO YEARS. And you show up and in one day you're already better than me.\"",
            },
            {
              type: "narration",
              text: "His frustration is real, but not angry.",
            },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: "\"I'm not jealous. Okay, I'm a little jealous. But mostly I just... I want to understand.\"",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Feng, I don\'t know how to explain it. My body just... knows."',
            },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"Yeah. Yeah, that\'s what Chen says. Natural talent or some buried past or whatever."',
              emotion: "nodding",
            },
            { type: "narration", text: "He squares his shoulders." },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: "\"So here's the thing. The other disciples are talking. Some of them think you're special. Some think you're a spy. Some think Chen's playing favorites.\"",
            },
            { type: "pause", duration: 400 },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"If you want to fit in here—REALLY fit in—you need to prove yourself. Not to Chen. To them."',
            },
          ],
        },
        {
          type: "choice",
          prompt: "How will you prove yourself to the other disciples?",
          choices: [
            {
              id: "challenge-duel",
              label: '"Challenge whoever doubts me to a duel."',
              tag: "Blade",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Challenge whoever doubts me to a duel. If they think I\'m not worthy, let them prove it."',
                },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: '"NOW we\'re talking!"',
                  emotion: "grinning",
                },
              ],
              effects: [{ type: "path", path: "blade", delta: 1 }],
              nextScene: "1-3a-proving-ground",
            },
            {
              id: "service",
              label:
                '"Let me help with something. Prove myself through service."',
              tag: "Stream",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Let me help with something. Prove myself through service, not combat."',
                },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: '"That could work. Actually..."',
                  emotion: "thoughtful",
                },
              ],
              effects: [{ type: "path", path: "stream", delta: 1 }],
              nextScene: "1-3b-service",
            },
            {
              id: "gather-intel",
              label: '"Who\'s talking? I want to know who my enemies are."',
              tag: "Shadow",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Who\'s talking? I want to know who my enemies are."',
                },
                {
                  type: "dialogue",
                  speaker: "BROTHER FENG",
                  text: '"You want to know who\'s talking?"',
                  emotion: "uncomfortable",
                },
              ],
              effects: [{ type: "path", path: "shadow", delta: 1 }],
              nextScene: "1-3c-secrets",
            },
          ],
        },
      ],
      // nextScene on choices handles branching - this is fallback only
      nextScene: "1-3a-proving-ground",
    },

    // =========================================================================
    // SCENE 1.3A: THE PROVING GROUND (BLADE PATH)
    // =========================================================================
    {
      id: "1-3a-proving-ground",
      title: "The Proving Ground",
      type: "combat",
      location: "Training Ground - Evening",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: "\"All right, I know just the guy. Brother Kang. He's been the loudest about you being 'suspicious.'\"",
            },
            { type: "system", text: "TRAINING GROUND - Evening" },
            {
              type: "narration",
              text: "A muscular beggar stands waiting—KANG.",
            },
            {
              type: "narration",
              text: "Other disciples have gathered to watch.",
            },
            {
              type: "dialogue",
              speaker: "KANG",
              text: "\"So the newcomer wants to fight? Fine. Let's see if you're as good as Chen thinks.\"",
              emotion: "challenging",
            },
            { type: "narration", text: "Elder Wu appears from the shadows." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: "\"If there's to be a proving, I'll oversee it.\"",
            },
            {
              type: "narration",
              text: "She steps forward—stern, arms crossed.",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Standard rules. First to yield or fall. No permanent damage."',
            },
            { type: "narration", text: "She looks between them." },
            { type: "dialogue", speaker: "ELDER WU", text: '"Begin."' },
          ],
        },
        {
          type: "combat",
          enemies: ["brother-kang"],
          canLose: true,
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "KANG",
              text: '"How... you moved like water..."',
              emotion: "shocked",
            },
            { type: "narration", text: "Li Wei offers his hand." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"No hard feelings?"',
            },
            {
              type: "dialogue",
              speaker: "KANG",
              text: '"...No. No hard feelings. You\'re the real thing."',
              emotion: "slowly",
            },
            { type: "narration", text: "He bows, stiffly." },
            {
              type: "dialogue",
              speaker: "KANG",
              text: '"Welcome to the sect. Brother."',
            },
            { type: "narration", text: "The crowd murmurs with respect." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"You fight well. But fighting well isn\'t enough. Tomorrow, I teach you to fight HARD."',
            },
            { type: "narration", text: "She walks away." },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"THAT was awesome! Did you see his face when you dodged that punch?"',
              emotion: "excited",
            },
            { type: "system", text: "SCENE 1.3A COMPLETE" },
            {
              type: "system",
              text: "Path: Blade +1 | Reputation: Known as fighter",
            },
          ],
        },
      ],
      nextScene: "1-4-second-teacher",
    },

    // =========================================================================
    // SCENE 1.3B: SERVICE IN SHADOWS (STREAM PATH)
    // =========================================================================
    {
      id: "1-3b-service",
      title: "Service in Shadows",
      type: "interactive",
      location: "Communal Kitchen",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"Okay, that could work. Actually... the kitchen needs help. Sister Lin\'s been complaining about being short-handed."',
            },
            { type: "narration", text: "He leans in." },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"I know it sounds small, but trust me—EVERYONE notices who helps in the kitchen. Food is life down here."',
            },
            { type: "system", text: "COMMUNAL KITCHEN" },
            {
              type: "dialogue",
              speaker: "SISTER LIN",
              text: '"Feng said you wanted to help? Good. Grab a knife. We have vegetables that need cutting."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "MINI-GAME: Cooking assistance" },
            {
              type: "narration",
              text: "During the work, conversations happen.",
            },
            {
              type: "dialogue",
              speaker: "SISTER LIN",
              text: "\"You're the new one. The mystery boy Chen's so excited about.\"",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I'm not sure 'excited' is the word.\"",
            },
            {
              type: "dialogue",
              speaker: "SISTER LIN",
              text: '"Chen doesn\'t get excited. But for him, slight interest IS excitement."',
              emotion: "laughing",
            },
            { type: "pause", duration: 300 },
            {
              type: "dialogue",
              speaker: "SISTER LIN",
              text: '"You know what I\'ve learned in twenty years in this kitchen?"',
            },
            { type: "dialogue", speaker: "LI WEI", text: '"What?"' },
            {
              type: "dialogue",
              speaker: "SISTER LIN",
              text: '"The fighters get the glory. The cooks keep everyone alive. Both matter. Neither works alone."',
            },
            {
              type: "narration",
              text: "She puts a hand on Li Wei's shoulder.",
            },
            {
              type: "dialogue",
              speaker: "SISTER LIN",
              text: '"You\'re helping. That means you understand."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "Other beggars passing through see Li Wei working.",
            },
            { type: "narration", text: "Nods of approval." },
            { type: "pause", duration: 400 },
            { type: "narration", text: "Later—the meal is served." },
            {
              type: "narration",
              text: "Li Wei sits with the disciples, eating what he helped make.",
            },
            {
              type: "dialogue",
              speaker: "BEGGAR",
              text: '"Hey, this is good. You help make it?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Just chopped vegetables."',
            },
            {
              type: "dialogue",
              speaker: "BEGGAR",
              text: "\"That's something. That's real.\"",
              emotion: "nodding",
            },
            { type: "narration", text: "Brother Kang approaches—the doubter." },
            {
              type: "dialogue",
              speaker: "KANG",
              text: '"Heard you helped in the kitchen."',
              emotion: "gruff",
            },
            { type: "pause", duration: 300 },
            {
              type: "dialogue",
              speaker: "KANG",
              text: '"...That\'s all right then."',
            },
            {
              type: "narration",
              text: "He walks away—not warm, but not hostile.",
            },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"See? Service speaks louder than words."',
              emotion: "whispering",
            },
            { type: "system", text: "SCENE 1.3B COMPLETE" },
            {
              type: "system",
              text: "Path: Stream +1 | Reputation: Known as helpful",
            },
          ],
        },
      ],
      nextScene: "1-4-second-teacher",
    },

    // =========================================================================
    // SCENE 1.3C: SECRETS IN STONE (SHADOW PATH)
    // =========================================================================
    {
      id: "1-3c-secrets",
      title: "Secrets in Stone",
      type: "interactive",
      location: "Beggar's Corner - Hidden Corners",
      estimatedMinutes: 12,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I want to know everything. Who doubts me, why, and what they\'re hiding."',
            },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"That\'s... kind of paranoid."',
              emotion: "uncomfortable",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"In my position, wouldn\'t you be?"',
            },
            { type: "narration", text: "Feng considers." },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"Yeah. Fair point."',
            },
            { type: "narration", text: "He lowers his voice." },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: "\"Okay. Brother Kang's the loudest. Sister Mei—not Elder Mei, different person—she's been asking questions too. And there's a guy, Whisper, who doesn't talk much but watches EVERYTHING.\"",
            },
            { type: "pause", duration: 300 },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"If you want to know what they really think... you\'ll have to listen without them knowing."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "STEALTH SEQUENCE" },
            {
              type: "narration",
              text: "Li Wei moves through the Corner, listening to conversations without being noticed.",
            },
            { type: "pause", duration: 400 },
            { type: "divider", label: "CONVERSATION 1 - Kang and Another" },
            {
              type: "dialogue",
              speaker: "KANG",
              text: "\"I'm telling you, no one learns that fast. Either he's a plant or he's hiding something.\"",
            },
            {
              type: "dialogue",
              speaker: "OTHER DISCIPLE",
              text: "\"What if he's telling the truth? What if he really doesn't remember?\"",
            },
            {
              type: "dialogue",
              speaker: "KANG",
              text: '"Then he\'s dangerous anyway. Unknowns are always dangerous."',
            },
            { type: "pause", duration: 400 },
            {
              type: "divider",
              label: "CONVERSATION 2 - Sister Mei and Others",
            },
            {
              type: "dialogue",
              speaker: "SISTER MEI",
              text: '"The pendant. Did you see it? Jade, old jade. That\'s not beggar jewelry."',
            },
            {
              type: "dialogue",
              speaker: "DISCIPLE",
              text: '"Could be stolen."',
            },
            {
              type: "dialogue",
              speaker: "SISTER MEI",
              text: "\"He didn't steal it. Did you see how he touched it? That's personal.\"",
            },
            { type: "pause", duration: 400 },
            {
              type: "divider",
              label: "CONVERSATION 3 - Whisper (alone, muttering)",
            },
            {
              type: "dialogue",
              speaker: "WHISPER",
              text: "\"The pendant. The Initiative's mark. I've seen it before. Subject 11 had one. Before they... before...\"",
              emotion: "muttering",
            },
            { type: "narration", text: "He stops, shuddering." },
            {
              type: "dialogue",
              speaker: "WHISPER",
              text: "\"If he's from THERE... he's either victim or weapon. Either way, trouble.\"",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "internal", text: "The Initiative. That word again." },
            {
              type: "internal",
              text: "Whisper knows something. About me. About this pendant.",
            },
          ],
        },
        {
          type: "choice",
          prompt: "What do you do with this information?",
          choices: [
            {
              id: "confront-whisper",
              label: "Confront Whisper now",
              response: [
                { type: "narration", text: "Li Wei steps out of the shadows." },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"What do you know about the Initiative?"',
                },
                {
                  type: "dialogue",
                  speaker: "WHISPER",
                  text: '"You— how long were you—"',
                  emotion: "startled",
                },
                { type: "narration", text: "He backs away." },
                {
                  type: "dialogue",
                  speaker: "WHISPER",
                  text: '"I know nothing. Forget I said anything."',
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Subject 11. You mentioned Subject 11. I\'M Subject 17."',
                },
                { type: "narration", text: "Whisper goes pale." },
                {
                  type: "dialogue",
                  speaker: "WHISPER",
                  text: '"Then you should be dead. They don\'t let subjects go."',
                  emotion: "terrified",
                },
                { type: "narration", text: "He grabs Li Wei's arm." },
                {
                  type: "dialogue",
                  speaker: "WHISPER",
                  text: '"They\'ll come for you. They ALWAYS come for escaped subjects."',
                },
                { type: "narration", text: "He releases, backs away." },
                {
                  type: "dialogue",
                  speaker: "WHISPER",
                  text: '"Stay away from me. I survived by being invisible. You\'ll get us all killed."',
                },
                { type: "narration", text: "He flees." },
              ],
              effects: [
                { type: "flag", flag: "whisper-confronted", value: true },
                { type: "path", path: "shadow", delta: 1 },
              ],
            },
            {
              id: "store-information",
              label: "Store this information for later",
              response: [
                {
                  type: "internal",
                  text: "I'll remember this. Whisper knows more than he's saying.",
                },
                {
                  type: "internal",
                  text: "But confronting him now might make things worse.",
                },
              ],
              effects: [
                { type: "flag", flag: "whisper-noted", value: true },
                { type: "path", path: "shadow", delta: 1 },
              ],
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "narration", text: "Li Wei returns to Feng." },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"Well? Learn anything useful?"',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I learned that I need to be careful. And that some secrets are better kept."',
              emotion: "carefully",
            },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"Welcome to the sect, Li Wei. Everyone here has secrets."',
              emotion: "nodding",
            },
            { type: "system", text: "SCENE 1.3C COMPLETE" },
            {
              type: "system",
              text: "Path: Shadow +1 | Reputation: Known as observant",
            },
          ],
        },
      ],
      nextScene: "1-4-second-teacher",
    },

    // =========================================================================
    // SCENE 1.4: SECOND TEACHER
    // =========================================================================
    {
      id: "1-4-second-teacher",
      title: "Second Teacher",
      type: "combat",
      location: "Training Ground",
      estimatedMinutes: 20,
      content: [
        {
          type: "content",
          lines: [
            { type: "system", text: "DAWN - Training Ground" },
            {
              type: "narration",
              text: "Elder Wu stands like a statue—unmoved, unmoving.",
            },
            {
              type: "narration",
              text: "Her stance is different from Chen's—rooted, solid.",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"You\'re the one Chen praises."',
            },
            { type: "narration", text: "Li Wei bows." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: "\"Stop. Don't bow until you've earned it.\"",
            },
            { type: "narration", text: "She circles him like a predator." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Chen teaches flow. I teach endurance. His path avoids damage. Mine survives it."',
            },
            { type: "narration", text: "She stops in front of him." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: "\"The world will hit you. It will hit you when you're ready and when you're not. My question is: will you break?\"",
            },
            { type: "narration", text: "She throws a punch without warning." },
            {
              type: "narration",
              text: "The hit lands, but Li Wei stays standing.",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Mmm. Let\'s begin."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"The Weathered Stance. Not water. Stone that has survived a thousand storms."',
            },
            {
              type: "narration",
              text: "She demonstrates—low, rooted, immovable.",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"In this stance, you do not dodge. You do not retreat. You ENDURE. And then you strike back."',
            },
            { type: "pause", duration: 300 },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: WEATHERED STANCE (風霜勢)",
            },
            { type: "divider", label: "WEATHERED STANCE" },
            {
              type: "narration",
              text: '"The stone that bends to the storm does not break."',
            },
            { type: "narration", text: "EFFECTS:" },
            {
              type: "narration",
              text: "  +20% Damage Resistance while active",
            },
            { type: "narration", text: "  Counterattacks deal bonus damage" },
            { type: "narration", text: "  Cannot be knocked back" },
            { type: "narration", text: "WEAKNESS:" },
            { type: "narration", text: "  -20% Evasion" },
            { type: "narration", text: "  Slower attack speed" },
            { type: "divider", label: "" },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Now. The strike that answers pain."',
            },
            {
              type: "narration",
              text: "She demonstrates—a heavy palm strike that uses the body's full weight.",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"When they think they\'ve hurt you, hurt them back. Worse."',
            },
            { type: "pause", duration: 300 },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: WEATHERED PALM (風霜掌)",
            },
            { type: "narration", text: "Heavy attack from Weathered Stance" },
            {
              type: "narration",
              text: "Power: 22 | Chi Cost: 5 | Speed: Slow",
            },
            {
              type: "narration",
              text: "SPECIAL: +50% damage if used after taking damage",
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"And this. For when you cannot attack, but WILL NOT fall."',
            },
            {
              type: "narration",
              text: "She demonstrates—a defensive posture that seems to absorb impacts.",
            },
            { type: "pause", duration: 300 },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: STEADFAST GUARD (堅守)",
            },
            {
              type: "narration",
              text: "Defensive technique from Weathered Stance",
            },
            {
              type: "narration",
              text: "Power: 0 | Chi Cost: 10 | Duration: 1 turn",
            },
            {
              type: "narration",
              text: "SPECIAL: Reduces ALL damage by 50% for one turn",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "dialogue", speaker: "ELDER WU", text: '"Now. Survive."' },
            { type: "narration", text: "She attacks—full force." },
          ],
        },
        {
          type: "combat",
          enemies: ["elder-wu-training"],
          canLose: true,
        },
        {
          type: "content",
          lines: [
            { type: "dialogue", speaker: "ELDER WU", text: '"Enough."' },
            { type: "narration", text: "Li Wei is bruised but standing." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"You didn\'t fall."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Was I supposed to?"',
              emotion: "catching breath",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Most do."',
              emotion: "almost smiling",
            },
            { type: "narration", text: "She studies him." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: "\"Chen wasn't wrong about you. There's iron in your bones.\"",
            },
            { type: "narration", text: "She turns to leave, then pauses." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"The streets outside are getting dangerous. Gang called Razor\'s boys have been expanding. They may come for the Corner eventually."',
            },
            { type: "narration", text: "She looks back." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"When they do, you\'ll need both stances. Flow AND endurance. Remember that."',
            },
            { type: "narration", text: "She leaves." },
            { type: "system", text: "SCENE 1.4 COMPLETE" },
          ],
        },
      ],
      nextScene: "1-5-gang-problem",
    },

    // =========================================================================
    // SCENE 1.5: THE GANG PROBLEM
    // =========================================================================
    {
      id: "1-5-gang-problem",
      title: "The Gang Problem",
      type: "dialogue",
      location: "Beggar's Corner",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "Li Wei is in the Corner when SHOUTING begins.",
            },
            {
              type: "dialogue",
              speaker: "VOICES",
              text: '"Someone\'s coming! The hidden entrance!"',
              emotion: "urgent",
            },
            {
              type: "narration",
              text: "Li Wei rushes to the entrance with others.",
            },
            {
              type: "narration",
              text: "A young beggar stumbles through, bloodied.",
            },
            {
              type: "dialogue",
              speaker: "BLOODIED BEGGAR",
              text: '"They found... they found the outer marker..."',
              emotion: "panting",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Who? Who found it?"',
              emotion: "arriving",
            },
            {
              type: "dialogue",
              speaker: "BLOODIED BEGGAR",
              text: "\"Razor's gang. They're demanding... tribute. Said if we don't pay, they'll...\"",
            },
            { type: "narration", text: "He collapses—others catch him." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Get him to the healers."',
            },
            { type: "narration", text: "He turns to the gathered disciples." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"It seems we have a problem."',
            },
            { type: "narration", text: "Elder Wu arrives." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Razor. That little thug\'s been growing bold since he took over the Iron Dogs."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"Are we fighting? Please tell me we\'re fighting!"',
              emotion: "excited",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"We\'re... discussing."',
            },
            { type: "narration", text: "He looks at Li Wei." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Come. All of you. We need to decide how to handle this."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "ELDER'S QUARTERS - Council Meeting" },
            {
              type: "narration",
              text: "Elder's Quarters—all three Elders present.",
            },
            {
              type: "narration",
              text: "Li Wei, Feng, and several senior disciples attend.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: "\"The situation: Razor's gang has discovered our outer perimeter. Not the Corner itself, but they know we're somewhere in the area.\"",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: "\"They're demanding 'protection money.' A thousand credits a month or they start tearing up the neighborhood looking for us.\"",
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"We don\'t HAVE a thousand credits a month. We barely have food."',
              emotion: "snorting",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Precisely. Which means we need another solution."',
            },
            { type: "narration", text: "He looks around the room." },
            { type: "dialogue", speaker: "ELDER CHEN", text: '"Options?"' },
            {
              type: "dialogue",
              speaker: "DISCIPLE 1",
              text: '"We could relocate. Find another hidden spot."',
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: "\"And abandon everything we've built here? The training grounds, the Pine, our ancestors' memory?\"",
            },
            {
              type: "dialogue",
              speaker: "DISCIPLE 2",
              text: '"We could fight. We have numbers—"',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: "\"Against Razor? He's got forty thugs. We have twelve who can fight. The math doesn't work.\"",
              emotion: "interrupting",
            },
            { type: "narration", text: "Silence." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"You\'re new. You see with fresh eyes. What would you suggest?"',
            },
            { type: "narration", text: "All eyes turn to Li Wei." },
          ],
        },
        {
          type: "choice",
          prompt:
            "Before deciding, you can ask questions to gather information.",
          choices: [
            {
              id: "ask-who-razor",
              label: '"Who is Razor, exactly?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "ELDER WU",
                  text: '"A street thug who got ambitious. Real name unknown. Takes the name because he cut a man\'s face off for looking at him wrong."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER MEI",
                  text: "\"But here's the thing—he fights like he's trained. Not just brawling. Real technique. Someone taught him.\"",
                },
              ],
            },
            {
              id: "ask-what-he-wants",
              label: '"What does he actually want?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: "\"Power. Territory. He's not political—he doesn't care about the Aptitude System. He just wants to be king of the gutter.\"",
                },
              ],
            },
            {
              id: "ask-weaknesses",
              label: '"Does he have weaknesses?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "ELDER WU",
                  text: '"Pride. He never backs down from a direct challenge. It\'s how he got where he is."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER MEI",
                  text: '"Also, his second-in-command, Scarred Jin, is an idiot. Loyal but stupid."',
                  emotion: "grinning",
                },
              ],
            },
            {
              id: "ask-other-gangs",
              label: '"What about the other gangs?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: "\"Other gangs? There's the Bone Collectors, what's left of the Iron Dogs before Razor absorbed them, the Ratlings...\"",
                  emotion: "interested",
                },
                {
                  type: "dialogue",
                  speaker: "ELDER WU",
                  text: '"All smaller than Razor. But combined..."',
                },
              ],
            },
            {
              id: "ask-secrets",
              label: '"Is there anything Razor\'s hiding?"',
              response: [
                {
                  type: "dialogue",
                  speaker: "ELDER MEI",
                  text: '"Rumors. He used to work for someone in the upper rings. Someone he doesn\'t talk about anymore."',
                  emotion: "narrowing eyes",
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"If that connection could be proven... the Spartans would be very interested."',
                  emotion: "thoughtful",
                },
              ],
            },
            {
              id: "ready-decide",
              label: "I've heard enough. Time to decide.",
              response: [],
            },
          ],
        },
        {
          type: "choice",
          prompt: 'Elder Chen asks: "What do you think we should do?"',
          choices: [
            {
              id: "challenge-razor",
              label:
                "\"I'll challenge Razor directly. His pride won't let him refuse.\"",
              tag: "Blade",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: "\"I'll challenge Razor directly. His pride won't let him refuse. One fight. If I win, they leave us alone.\"",
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"A direct challenge. Bold. Perhaps foolish. But bold."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER WU",
                  text: "\"Razor's pride is his weakness. He CAN'T refuse a public challenge. It would destroy his reputation.\"",
                  emotion: "nodding slowly",
                },
                {
                  type: "dialogue",
                  speaker: "ELDER MEI",
                  text: '"Finally! Violence! I was getting bored with all the talking."',
                  emotion: "excited",
                },
              ],
              effects: [{ type: "path", path: "blade", delta: 2 }],
              nextScene: "1-6a-direct-challenge",
            },
            {
              id: "alliance",
              label:
                '"Let me talk to the other gangs. Together, we can pressure him."',
              tag: "Stream",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Let me talk to the other gangs. The Bone Collectors, the Ratlings, the Iron Dogs remnants. Together, we can pressure him."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"Unite the gangs against Razor? Ambitious."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER WU",
                  text: '"And difficult. They all hate each other."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER MEI",
                  text: '"But they hate Razor MORE. He\'s been absorbing everyone."',
                },
              ],
              effects: [{ type: "path", path: "stream", delta: 2 }],
              nextScene: "1-6b-alliance",
            },
            {
              id: "blackmail",
              label:
                '"I\'ll find proof of his upper ring connection. Use it against him."',
              tag: "Shadow",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"I\'ll find proof of his upper ring connection. Use it against him. If the Spartans found out a Commerce Ring citizen was funding gang activity..."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER CHEN",
                  text: '"Find Razor\'s secrets? Dangerous. But effective, if you can do it."',
                },
                {
                  type: "dialogue",
                  speaker: "ELDER MEI",
                  text: '"If that connection could be proven... the Spartans would be very interested."',
                  emotion: "leaning in",
                },
              ],
              effects: [{ type: "path", path: "shadow", delta: 2 }],
              nextScene: "1-6c-shadow",
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Are you certain?"',
            },
            { type: "dialogue", speaker: "LI WEI", text: '"I am."' },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Then prepare. We move soon."',
            },
            { type: "system", text: "SCENE 1.5 COMPLETE" },
          ],
        },
      ],
      // nextScene on choices handles branching - this is fallback only
      nextScene: "1-6a-direct-challenge",
    },

    // =========================================================================
    // SCENE 1.6A: DIRECT CHALLENGE (BLADE PATH - BOSS FIGHT)
    // =========================================================================
    {
      id: "1-6a-direct-challenge",
      title: "Direct Challenge",
      type: "combat",
      location: "Gang Territory - Night",
      estimatedMinutes: 30,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"A direct challenge. Bold. Are you certain? Razor is dangerous. He\'s killed people."',
            },
            { type: "dialogue", speaker: "LI WEI", text: '"I\'m certain."' },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Then prepare. Wu, Mei—give him what you can."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "TRAINING MONTAGE" },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"The duel will be to submission or death. Razor won\'t hold back."',
            },
            { type: "narration", text: "She teaches one more technique." },
            { type: "pause", duration: 300 },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: RIPPLE GUARD (漣漪護)",
            },
            { type: "narration", text: "Hybrid defensive technique" },
            { type: "narration", text: "Chi Cost: 8" },
            {
              type: "narration",
              text: "SPECIAL: Deflects one attack, returns 30% damage. Works in either stance.",
            },
            { type: "pause", duration: 300 },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"And from me—a bit of hunger."',
            },
            {
              type: "system",
              text: "TECHNIQUE LEARNED: BEGGAR'S FEINT (丐幫虛招)",
            },
            { type: "narration", text: "Deceptive attack" },
            {
              type: "narration",
              text: "Power: 8 | Chi Cost: 3 | Speed: Very Fast",
            },
            {
              type: "narration",
              text: "SPECIAL: If enemy tries to block, this attack bypasses and follows with guaranteed critical hit opportunity.",
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"And from me..."',
            },
            {
              type: "narration",
              text: "He places a hand on Li Wei's shoulder.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Remember: you fight not for pride, but for family. Let that give you strength."',
            },
            {
              type: "narration",
              text: "Li Wei's chi flares—briefly, the pendant glows.",
            },
            {
              type: "effect",
              effect: { type: "pendant-glow", intensity: "bright" },
            },
            {
              type: "system",
              text: "BUFF: Elder's Blessing - +10% all stats for boss fight",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "GANG TERRITORY - Night" },
            {
              type: "narration",
              text: "Li Wei walks into the territory alone.",
            },
            {
              type: "narration",
              text: "Thugs emerge from shadows, surrounding him.",
            },
            {
              type: "dialogue",
              speaker: "THUG 1",
              text: '"Look what wandered in. Fresh meat."',
            },
            {
              type: "dialogue",
              speaker: "THUG 2",
              text: '"Boss is gonna love this."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'m here to challenge Razor. One on one. Public combat. For territory rights."',
              emotion: "loudly",
            },
            { type: "narration", text: "Laughter from the thugs." },
            {
              type: "dialogue",
              speaker: "THUG 1",
              text: '"You\'re challenging the BOSS? You must be crazy."',
            },
            { type: "narration", text: "A voice cuts through." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"What\'s all the noise?"',
              emotion: "emerging",
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "RAZOR steps forward—lean, sharp-featured, dangerous. A scar runs across his cheek.",
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"A beggar? Challenging ME?"',
            },
            { type: "narration", text: "He laughs." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"This is the best entertainment I\'ve had all week."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'m serious. One fight. If I win, your gang leaves the Lower Streets. If you win, you get whatever tribute you want."',
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"And why would I accept? I could just have my boys kill you right now."',
              emotion: "amused",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Because everyone\'s watching. And if you refuse a direct challenge, what does that say about you?"',
            },
            { type: "narration", text: "Razor's smile freezes." },
            {
              type: "narration",
              text: "The thugs mutter—Li Wei struck a nerve.",
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"Fine. You want to die so badly?"',
              emotion: "coldly",
            },
            { type: "narration", text: "He cracks his knuckles." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"Let\'s dance, beggar."',
            },
            {
              type: "narration",
              text: "The thugs form a circle—improvised arena.",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "BOSS ENCOUNTER: RAZOR" },
            { type: "divider", label: "BOSS FIGHT" },
            {
              type: "narration",
              text: '"The streets have a king. And kings don\'t bow to beggars."',
            },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "RAZOR - HP: 200 | Faction: Urban Thugs (Leader)",
            },
            {
              type: "narration",
              text: "Style: Aggressive, relentless pressure",
            },
            { type: "pause", duration: 300 },
            { type: "narration", text: "PHASES:" },
            {
              type: "narration",
              text: "  Phase 1 (100%): Probing attacks, testing Li Wei",
            },
            {
              type: "narration",
              text: "  Phase 2 (60%): Gets serious, faster combos",
            },
            {
              type: "narration",
              text: "  Phase 3 (30%): Desperate, unpredictable, powerful",
            },
            { type: "divider", label: "" },
          ],
        },
        {
          type: "combat",
          enemies: ["razor"],
          canLose: true,
        },
        {
          type: "content",
          lines: [
            { type: "narration", text: "Razor falls, knife clattering away." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"How... what ARE you?"',
              emotion: "on the ground",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I don\'t know yet."',
            },
            { type: "narration", text: "He looks at the watching thugs." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The deal stands. Leave the Lower Streets. Don\'t come back."',
            },
            { type: "narration", text: "Long silence." },
            {
              type: "dialogue",
              speaker: "SCARRED JIN",
              text: '"Boss... boss, what do we do?"',
              emotion: "stepping forward",
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"You heard him. We\'re done here."',
              emotion: "bitterly",
            },
            { type: "narration", text: "He looks at Li Wei with hatred." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: "\"This isn't over, beggar. I'll remember you.\"",
            },
            { type: "narration", text: "The gang disperses." },
            {
              type: "narration",
              text: "Li Wei stands alone in the territory—victorious.",
            },
            { type: "system", text: "SCENE 1.6A COMPLETE" },
            {
              type: "system",
              text: "Razor: DEFEATED | Street Status: Li Wei feared as fighter",
            },
          ],
        },
      ],
      nextScene: "1-7-aftermath",
    },

    // =========================================================================
    // SCENE 1.6B: THE ALLIANCE PATH (STREAM PATH)
    // =========================================================================
    {
      id: "1-6b-alliance",
      title: "The Alliance Path",
      type: "interactive",
      location: "Lower Streets",
      estimatedMinutes: 25,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Unite the gangs against Razor? Ambitious."',
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"And difficult. They all hate each other."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: '"But they hate Razor MORE. He\'s been absorbing everyone."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"You\'ll need to convince them one by one. The Bone Collectors. The Ratlings. What remains of the old Iron Dogs."',
            },
            { type: "pause", duration: 300 },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Be careful. These are not good people. They\'re just people with a common enemy."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "BONE YARD TERRITORY" },
            {
              type: "narration",
              text: "A different Bone Yard, filled with human remains.",
            },
            {
              type: "narration",
              text: "The Bone Collectors deal in burial, cremation, and occasionally, less legal body disposal.",
            },
            {
              type: "dialogue",
              speaker: "MAMA BONE",
              text: '"A beggar wants to talk? Talk."',
              emotion: "ancient woman",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I want to propose an alliance against Razor."',
            },
            {
              type: "dialogue",
              speaker: "MAMA BONE",
              text: '"Alliance? Against that psychopath?"',
              emotion: "laughing",
            },
            { type: "narration", text: "She stops laughing." },
            {
              type: "dialogue",
              speaker: "MAMA BONE",
              text: "\"He killed three of my collectors last month. Just for being in 'his' territory.\"",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Then help me stop him."',
            },
            {
              type: "dialogue",
              speaker: "MAMA BONE",
              text: '"And what do WE get?"',
            },
          ],
        },
        {
          type: "choice",
          prompt: "What do you offer the Bone Collectors?",
          choices: [
            {
              id: "offer-territory",
              label: "Offer: Their territory back",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Your territory back. Everything Razor took."',
                },
                {
                  type: "dialogue",
                  speaker: "MAMA BONE",
                  text: '"Hmm. Territory. That\'s something."',
                },
                { type: "narration", text: "She studies Li Wei." },
                {
                  type: "dialogue",
                  speaker: "MAMA BONE",
                  text: '"Fine. When you move against Razor, the Collectors will block the southern alleys. He won\'t be able to run."',
                },
                { type: "system", text: "BONE COLLECTORS: Allied" },
              ],
              effects: [
                { type: "flag", flag: "bone-collectors-allied", value: true },
              ],
            },
            {
              id: "offer-protection",
              label: "Offer: Protection from Beggars Sect",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Protection. The Beggars Sect will stand with you if trouble comes."',
                },
                {
                  type: "dialogue",
                  speaker: "MAMA BONE",
                  text: '"Beggars protecting Collectors? That\'s... unusual."',
                },
                { type: "narration", text: "She considers." },
                {
                  type: "dialogue",
                  speaker: "MAMA BONE",
                  text: "\"We'll watch. If your plan works, we'll consider it.\"",
                },
                { type: "system", text: "BONE COLLECTORS: Partial support" },
              ],
              effects: [
                { type: "flag", flag: "bone-collectors-watching", value: true },
              ],
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "SEWER ENTRANCE - The Ratlings" },
            {
              type: "narration",
              text: "A child-gang that lives in the drainage system.",
            },
            {
              type: "dialogue",
              speaker: "RAT KING",
              text: '"You want our help? Us?"',
              emotion: "teenager, suspicious",
            },
            {
              type: "narration",
              text: "He's suspicious—adults rarely offer deals to children.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I want everyone who hates Razor to stand together."',
            },
            {
              type: "dialogue",
              speaker: "RAT KING",
              text: "\"We don't fight. We're small. We survive.\"",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I'm not asking you to fight. I'm asking you to watch. To report. To be my eyes where I can't go.\"",
            },
            { type: "narration", text: "The Rat King considers." },
            {
              type: "dialogue",
              speaker: "RAT KING",
              text: '"And what do we get?"',
            },
          ],
        },
        {
          type: "choice",
          prompt: "What do you offer the Ratlings?",
          choices: [
            {
              id: "offer-food",
              label: "Offer: Food from the sect kitchen",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Food. Real food from the sect kitchen. Every week."',
                },
                {
                  type: "dialogue",
                  speaker: "RAT KING",
                  text: '"Real food?"',
                  emotion: "eyes widening",
                },
                {
                  type: "dialogue",
                  speaker: "RAT KING",
                  text: '"Deal. The Ratlings are your eyes."',
                },
                { type: "system", text: "RATLINGS: Allied" },
              ],
              effects: [{ type: "flag", flag: "ratlings-allied", value: true }],
            },
            {
              id: "offer-training",
              label: "Offer: Training",
              response: [
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Training. If you want it. Real fighting training."',
                },
                {
                  type: "dialogue",
                  speaker: "RAT KING",
                  text: '"Training? Like, real fighting training?"',
                  emotion: "eyes widening",
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"If you want it."',
                },
                {
                  type: "dialogue",
                  speaker: "RAT KING",
                  text: '"Nobody ever offered to teach us anything."',
                  emotion: "slowly",
                },
                { type: "narration", text: "He extends a grimy hand." },
                {
                  type: "dialogue",
                  speaker: "RAT KING",
                  text: '"Deal. The Ratlings are your eyes."',
                },
                { type: "system", text: "RATLINGS: Allied + Future Contact" },
              ],
              effects: [
                { type: "flag", flag: "ratlings-allied", value: true },
                {
                  type: "flag",
                  flag: "ratlings-training-promised",
                  value: true,
                },
              ],
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "WAREHOUSE - Iron Dogs Remnant" },
            {
              type: "narration",
              text: "A handful of scarred fighters, remnants of the gang Razor conquered.",
            },
            {
              type: "dialogue",
              speaker: "OLD IRON",
              text: '"Razor killed our leader. Took everything. We\'ve been waiting to hit back."',
              emotion: "grizzled veteran",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Then stand with me."',
            },
            {
              type: "dialogue",
              speaker: "OLD IRON",
              text: '"With a beggar? Against Razor? What makes you think you can win?"',
              emotion: "suspicious",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I have the Bone Collectors blocking the south. The Ratlings watching every move. And I have the Beggars Sect."',
            },
            {
              type: "dialogue",
              speaker: "OLD IRON",
              text: '"You put all that together? In a few days?"',
              emotion: "impressed",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"We all want the same thing."',
            },
            {
              type: "dialogue",
              speaker: "OLD IRON",
              text: '"Fine. The Dogs will bite again. Just point us at the target."',
              emotion: "nodding slowly",
            },
            { type: "system", text: "IRON DOGS REMNANT: Allied" },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "system",
              text: "GANG TERRITORY - Night - The Confrontation",
            },
            {
              type: "narration",
              text: "Li Wei approaches, but this time he's not alone.",
            },
            {
              type: "narration",
              text: "Bone Collectors block the southern exit.",
            },
            { type: "narration", text: "Ratlings watch from the shadows." },
            { type: "narration", text: "Iron Dogs stand behind Li Wei." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"What the hell is this?"',
              emotion: "emerging",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Your options narrowing, Razor."',
            },
            {
              type: "narration",
              text: "Razor's thugs look around—they're surrounded.",
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"Kill them all! We outnumber—"',
            },
            {
              type: "dialogue",
              speaker: "SCARRED JIN",
              text: '"Boss... we don\'t. Look."',
            },
            {
              type: "narration",
              text: "More figures emerge—the alliance is larger than Razor realized.",
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"You think a bunch of rats and bones can stop me?!"',
              emotion: "furious",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I think you have a choice. Leave the Lower Streets peacefully. Or leave in pieces."',
            },
            {
              type: "narration",
              text: "Razor's hand twitches toward his knife.",
            },
            {
              type: "dialogue",
              speaker: "MAMA BONE",
              text: '"We handle bodies, Razor. One more won\'t be a problem."',
              emotion: "stepping forward",
            },
            {
              type: "dialogue",
              speaker: "OLD IRON",
              text: '"I\'ve been waiting for this."',
              emotion: "cracking knuckles",
            },
            {
              type: "narration",
              text: "Razor looks at his men—they're not ready to die for him.",
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"Fine. You win this round, beggar."',
              emotion: "through gritted teeth",
            },
            { type: "narration", text: "He points at Li Wei." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"But this isn\'t over. The streets have long memories."',
            },
            { type: "narration", text: "He turns to leave." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"Come on. We\'re relocating."',
            },
            { type: "narration", text: "His gang follows." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Thank you. All of you."',
            },
            {
              type: "dialogue",
              speaker: "MAMA BONE",
              text: '"Don\'t thank us yet. You promised things. Make sure you deliver."',
            },
            { type: "narration", text: "She walks away." },
            {
              type: "dialogue",
              speaker: "RAT KING",
              text: '"That was cool. Really cool."',
              emotion: "to Li Wei, quietly",
            },
            { type: "narration", text: "The alliance disperses." },
            {
              type: "narration",
              text: "Li Wei stands in the territory—victorious through unity.",
            },
            { type: "system", text: "SCENE 1.6B COMPLETE" },
            {
              type: "system",
              text: "Razor: ALLIED (forced truce) | Street Status: Li Wei known as diplomat",
            },
          ],
        },
      ],
      nextScene: "1-7-aftermath",
    },

    // =========================================================================
    // SCENE 1.6C: THE SHADOW PATH (BLACKMAIL)
    // =========================================================================
    {
      id: "1-6c-shadow",
      title: "The Shadow Path",
      type: "interactive",
      location: "Lower Streets - Night",
      estimatedMinutes: 25,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Find Razor\'s secrets? Dangerous. But effective, if you can do it."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: "\"I mentioned his upper ring connection. Rumor is he worked for someone in the Commerce Ring before he 'became' Razor.\"",
              emotion: "leaning in",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: "\"If that's true, the Spartans would love to know. Unauthorized gang activity traced to an upper citizen? That's scandal.\"",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: "\"Be careful. If Razor catches you digging, he won't challenge you to a duel. He'll just kill you.\"",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'ll be careful."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "system",
              text: "INVESTIGATION PHASE - Lower Streets - Night",
            },
            {
              type: "narration",
              text: "Li Wei moves through shadows, gathering information.",
            },
            { type: "divider", label: "INVESTIGATION POINT 1: Scarred Jin" },
            {
              type: "narration",
              text: "Scarred Jin drinks alone at a broken fountain.",
            },
            { type: "narration", text: "Stealth check—Li Wei listens." },
            {
              type: "dialogue",
              speaker: "SCARRED JIN",
              text: '"...stupid beggar... shouldn\'t have come to our territory... boss is gonna be mad..."',
              emotion: "muttering drunkenly",
            },
            { type: "narration", text: "He drinks." },
            {
              type: "dialogue",
              speaker: "SCARRED JIN",
              text: '"...boss is always mad these days. Ever since that messenger came from up-ring..."',
            },
            { type: "narration", text: "He looks around nervously." },
            {
              type: "dialogue",
              speaker: "SCARRED JIN",
              text: '"...shouldn\'t talk about that. Boss said never talk about the Jade people."',
            },
            { type: "narration", text: "He passes out." },
            {
              type: "internal",
              text: '"Jade people." Jade Cloud Sect is based in the Commerce Ring. Are they connected to Razor?',
            },
            { type: "system", text: 'CLUE: "Jade Connection" obtained' },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "divider",
              label: "INVESTIGATION POINT 2: Razor's Quarters",
            },
            {
              type: "narration",
              text: "Li Wei infiltrates Razor's hideout while the gang is out patrolling.",
            },
            { type: "narration", text: "Stealth sequences—avoiding guards." },
            { type: "narration", text: "Inside Razor's room:" },
            { type: "narration", text: "A hidden compartment in the floor." },
            { type: "narration", text: "Inside: Letters." },
            { type: "pause", duration: 300 },
            { type: "narration", text: "LETTER 1:" },
            {
              type: "narration",
              text: '"Your payment for this month has been received. Continue territorial expansion as discussed. The merchandise will flow through your area. Do not fail us. - J.C."',
            },
            { type: "pause", duration: 300 },
            { type: "narration", text: "LETTER 2:" },
            {
              type: "narration",
              text: '"The Beggars Sect may be in your area. Flush them out. There may be someone among them we\'re looking for. Bring any jade pendants you find. - J.C."',
            },
            { type: "internal", text: "They're looking for me. The pendant." },
            {
              type: "internal",
              text: 'Whoever "J.C." is, they know about me.',
            },
            { type: "internal", text: "And Razor works for them." },
            { type: "system", text: 'CLUE: "Jade Cloud Connection" obtained' },
            { type: "system", text: 'CLUE: "Initiative Interest" obtained' },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider", label: "INVESTIGATION POINT 3: The Messenger" },
            {
              type: "narration",
              text: "A Commerce Ring messenger arrives at gang territory.",
            },
            { type: "narration", text: "Li Wei follows at a distance." },
            {
              type: "narration",
              text: "The messenger meets with Razor in secret.",
            },
            {
              type: "dialogue",
              speaker: "MESSENGER",
              text: '"The Jade Cloud Trade Master grows impatient. Where is the subject you were told to find?"',
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"I\'m looking! The Lower Streets are a maze. The beggars hide well."',
              emotion: "defensive",
            },
            {
              type: "dialogue",
              speaker: "MESSENGER",
              text: '"Then look harder. The Initiative is offering substantial payment for Subject 17\'s return."',
              emotion: "coldly",
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"What\'s so special about one beggar?"',
            },
            {
              type: "dialogue",
              speaker: "MESSENGER",
              text: '"That\'s not your concern. Find them."',
            },
            { type: "narration", text: "The messenger leaves." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: "\"'Find them.' Like I'm some errand boy.\"",
              emotion: "to himself, bitter",
            },
            { type: "narration", text: "He kicks a wall." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: "\"I'm RAZOR! I run these streets! I'm not anyone's servant!\"",
            },
            {
              type: "internal",
              text: "The Initiative. They're using Jade Cloud Trade Master to fund Razor. To find me.",
            },
            { type: "internal", text: "But Razor doesn't LIKE being used." },
            {
              type: "internal",
              text: "And the Spartans would LOVE to know that a High Sect is funding gang activity.",
            },
            { type: "internal", text: "I have everything I need." },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "system", text: "GANG TERRITORY - Night - The Blackmail" },
            {
              type: "narration",
              text: "Li Wei walks in openly—Razor's thugs immediately surround him.",
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"You\'ve got nerve, beggar."',
              emotion: "emerging",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I have more than nerve. I have information."',
            },
            { type: "narration", text: "He pulls out the letters." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"Where did you—"',
              emotion: "face going pale",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"Your connection to Jade Cloud. Your funding from the Initiative. Your orders to find 'Subject 17.'\"",
            },
            { type: "narration", text: "He lets that sink in." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The Spartans would find this very interesting, don\'t you think?"',
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: "\"You're dead. You're SO dead—\"",
              emotion: "fury building",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"If I die, these letters go public. To the Spartans. To the other gangs. To everyone."',
            },
            { type: "narration", text: "Razor stops." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"How long would you last if everyone knew you were a puppet? If the Iron Dogs remnant knew you sold out to upper-ringers?"',
            },
            { type: "narration", text: "Razor's thugs shift uncomfortably." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"What do you want?"',
              emotion: "through gritted teeth",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Leave. The Lower Streets, the Beggars Sect, all of it. Go somewhere else. And when your Jade Cloud masters ask about Subject 17, tell them you found nothing."',
            },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"And the letters?"',
              emotion: "hatred burning",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Disappear, and so do they."',
            },
            { type: "narration", text: "Long silence." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"Fine. You win."',
              emotion: "finally",
            },
            { type: "narration", text: "He turns to his men." },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"We\'re leaving. Tonight."',
            },
            { type: "dialogue", speaker: "SCARRED JIN", text: '"But boss—"' },
            {
              type: "dialogue",
              speaker: "RAZOR",
              text: '"TONIGHT!"',
              emotion: "cutting him off",
            },
            { type: "narration", text: "He looks back at Li Wei." },
            { type: "dialogue", speaker: "RAZOR", text: '"This isn\'t over."' },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Yes it is. You just don\'t know it yet."',
            },
            { type: "narration", text: "Razor leaves. The gang follows." },
            {
              type: "narration",
              text: "Li Wei stands alone—victorious through information and manipulation.",
            },
            { type: "system", text: "SCENE 1.6C COMPLETE" },
            {
              type: "system",
              text: "Razor: EXILED | Street Status: Li Wei's role hidden",
            },
            { type: "system", text: "FLAG: Know about Jade Cloud connection" },
            {
              type: "system",
              text: "FLAG: Know Initiative is hunting Subject 17",
            },
          ],
        },
      ],
      nextScene: "1-7-aftermath",
    },

    // =========================================================================
    // SCENE 1.7: AFTERMATH
    // =========================================================================
    {
      id: "1-7-aftermath",
      title: "Aftermath",
      type: "dialogue",
      location: "Beggar's Corner / Garrison Ring",
      estimatedMinutes: 5,
      content: [
        {
          type: "content",
          lines: [
            { type: "system", text: "BEGGAR'S CORNER - The Next Day" },
            { type: "narration", text: "Li Wei returns to the Corner." },
            {
              type: "dialogue",
              speaker: "BROTHER FENG",
              text: '"You DID it!"',
              emotion: "excited",
            },
            { type: "narration", text: "The disciples crowd around." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"Enough. Give him air."',
              emotion: "pushing through",
            },
            { type: "narration", text: "She looks at Li Wei appraisingly." },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"You handled it well. But you\'ve made yourself visible. Word will spread."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"The Spartans will hear. They always hear."',
              emotion: "arriving",
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "Elder Chen places a hand on Li Wei's shoulder.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Enjoy your victory. But prepare yourself. This was the beginning, not the end."',
            },
            { type: "pause", duration: 500 },
            { type: "divider", label: "ELSEWHERE - GARRISON RING" },
            {
              type: "dialogue",
              speaker: "SPARTAN OFFICER",
              text: '"Commander Vex? Reports from the Lower Streets."',
            },
            {
              type: "dialogue",
              speaker: "COMMANDER VEX",
              text: '"What is it?"',
            },
            {
              type: "dialogue",
              speaker: "SPARTAN OFFICER",
              text: '"The gang leader Razor has been... neutralized. A vagrant was involved."',
            },
            {
              type: "dialogue",
              speaker: "COMMANDER VEX",
              text: '"A vagrant?"',
              emotion: "interested",
            },
            {
              type: "narration",
              text: "He looks at a file on his desk—Subject 17.",
            },
            {
              type: "dialogue",
              speaker: "COMMANDER VEX",
              text: '"Begin surveillance. I want to know everything about this vagrant."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "effect",
              effect: { type: "fade", direction: "out", color: "black" },
            },
            { type: "pause", duration: 1000 },
            { type: "system", text: "═══ CHAPTER 1 COMPLETE ═══" },
            { type: "pause", duration: 1500 },
            { type: "divider", label: "THE STORY CONTINUES" },
            {
              type: "narration",
              text: "Li Wei has survived his first test as a member of the Beggars Sect.",
            },
            {
              type: "narration",
              text: "Razor has been dealt with—but the Initiative still searches for Subject 17.",
            },
            {
              type: "narration",
              text: "And now, Commander Vex of the Spartans has taken notice.",
            },
            { type: "pause", duration: 1000 },
            { type: "divider", label: "WHAT AWAITS IN CHAPTER 2" },
            {
              type: "narration",
              text: "  The Spartans tighten their grip on the Lower Streets.",
            },
            {
              type: "narration",
              text: "  Commander Vex hunts for the vagrant who defeated Razor.",
            },
            {
              type: "narration",
              text: "  Li Wei must master the Hungry Stance—or fall to a deadlier foe.",
            },
            {
              type: "narration",
              text: "  The truth about the Initiative draws closer...",
            },
            { type: "pause", duration: 1500 },
            { type: "system", text: "CHAPTER 2: THE LAW'S SHADOW" },
            { type: "narration", text: "Coming soon..." },
          ],
        },
      ],
      nextScene: undefined, // End of Chapter 1
    },
  ],
  startScene: "1-1-hidden-home",
  endScenes: ["1-7-aftermath"],
};
