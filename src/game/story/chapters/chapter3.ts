/**
 * Chapter 3: The Hollow at the Summit
 * ~90-120 minutes of gameplay
 * Climactic finale with three endings based on path choices
 * Boss: The Hollow One (3 phases)
 */

import type { Chapter } from "../../../types/index";

export const CHAPTER_3: Chapter = {
  id: "chapter-3",
  number: 3,
  title: "The Hollow at the Summit",
  scenes: [
    // =========================================================================
    // SCENE 3.1: THE SUMMONS
    // =========================================================================
    {
      id: "3-1-summons",
      title: "The Summons",
      type: "cutscene",
      location: "Training Ground - Dawn",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Li Wei practices alone, moving through all three stances with fluid precision.",
            },
            {
              type: "narration",
              text: "His chi flows visibly now—a faint inverse glow around his hands.",
            },
            { type: "pause", duration: 400 },
            { type: "narration", text: "Three weeks since the Garrison." },
            {
              type: "narration",
              text: "Three weeks of questions without answers.",
            },
            { type: "narration", text: "The pendant grows warmer each night." },
            { type: "narration", text: "The memories grow sharper." },
            { type: "pause", duration: 300 },
            {
              type: "narration",
              text: "Li Wei stops mid-form, touching the jade pendant.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Subject 17. The Calibration Initiative. Dr. Mae."',
              emotion: "quietly",
            },
            {
              type: "narration",
              text: "He looks at his hands—the inverse chi fading.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I remember more each day. The white rooms. The tests. The pain."',
            },
            { type: "pause", duration: 300 },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"But I also remember HER. The one who helped me escape. Where is she now?"',
            },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "Elder Chen approaches from the shadows, holding something.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"You feel it too, don\'t you? The growing storm."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Something\'s coming."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Something\'s already here."',
            },
            {
              type: "narration",
              text: "He holds out a grey cloth with an empty circle symbol.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"This was left at our entrance. No one saw who brought it."',
            },
            {
              type: "narration",
              text: "Li Wei takes it—beneath the cloth is a jade token matching his pendant.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"'Subject 17. I know what you are. Come to the Forgotten Temple in the Wild Lands. Come alone. I have answers you seek—and questions only you can answer.'\"",
              emotion: "reading the attached note",
            },
            { type: "narration", text: "Elder Chen's face is grave." },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: "\"The Hollow One's mark. I'd hoped they were just legend.\"",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Who are they?"',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"A master who abandoned all factions decades ago. Some say they\'ve mastered every technique in existence—and found them all wanting."',
            },
          ],
        },
        {
          type: "choice",
          prompt: "How do you respond to this mysterious invitation?",
          choices: [
            {
              id: "cautious",
              label: "It's obviously a trap.",
              effects: [],
            },
            {
              id: "eager",
              label: "This is the opportunity I've been waiting for.",
              effects: [],
            },
            {
              id: "curious",
              label: "What can you tell me about the Forgotten Temple?",
              effects: [],
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Whatever you choose, Li Wei, know this—"',
            },
            {
              type: "narration",
              text: "Elder Wu and Elder Mei approach, joining them.",
            },
            {
              type: "dialogue",
              speaker: "ELDER WU",
              text: '"We suspected from the beginning. Your chi, your potential..."',
            },
            {
              type: "dialogue",
              speaker: "ELDER MEI",
              text: "\"You're not F-grade. You never were. The Array simply couldn't measure what flows backward.\"",
              emotion: "for once, serious",
            },
            { type: "narration", text: "Li Wei's eyes widen." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The Inverted One. From the prophecy."',
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"We don\'t know if prophecies are real. But we know YOU are. Whatever you discover out there... whatever the Hollow One wants..."',
              emotion: "nodding",
            },
            {
              type: "narration",
              text: "He puts a hand on Li Wei's shoulder.",
            },
            {
              type: "dialogue",
              speaker: "ELDER CHEN",
              text: '"Remember who you chose to become. Not who they say you are."',
            },
          ],
        },
      ],
      nextScene: "3-2-leaving-city",
    },

    // =========================================================================
    // SCENE 3.2: LEAVING THE CITY
    // =========================================================================
    {
      id: "3-2-leaving-city",
      title: "Leaving the City",
      type: "exploration",
      location: "Haven's Cradle Outskirts",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            { type: "system", text: "THE OLD GATE - Edge of Haven's Cradle" },
            {
              type: "narration",
              text: "Ancient stone arch, partially collapsed.",
            },
            {
              type: "narration",
              text: "Beyond: the Wild Lands, untamed forests and distant mountains.",
            },
            { type: "pause", duration: 300 },
            {
              type: "narration",
              text: "Old Dao waits at the gate, leaning on his staff.",
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"I wondered when you\'d come this way."',
              emotion: "smiling",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Old Dao? What are you doing here?"',
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"Where else would I be? This is where paths converge."',
            },
            {
              type: "narration",
              text: "He gestures toward the mountains.",
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"The Forgotten Temple was old when Haven\'s Cradle was just a collection of tents. Before the Array. Before the sects."',
            },
            {
              type: "narration",
              text: "He looks at Li Wei with those strange, clouded eyes.",
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"Before worth was measured rather than discovered."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Will you come with me?"',
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"I go everywhere with you, young one. But this path..."',
            },
            {
              type: "narration",
              text: "He taps his staff on the ground.",
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"This path you walk alone."',
            },
            {
              type: "narration",
              text: "He gestures, and the mist beyond the gate seems to part slightly.",
            },
            {
              type: "dialogue",
              speaker: "OLD DAO",
              text: '"Trust what you feel. Not what you know."',
            },
            {
              type: "narration",
              text: "He disappears into the mist before Li Wei can respond.",
            },
          ],
        },
      ],
      nextScene: "3-3-mountain-journey",
    },

    // =========================================================================
    // SCENE 3.3: MOUNTAIN JOURNEY (Path Selection)
    // =========================================================================
    {
      id: "3-3-mountain-journey",
      title: "The Mountain Journey",
      type: "interactive",
      location: "Wild Lands",
      estimatedMinutes: 5,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "The Wild Lands stretch before you—untamed territory beyond the city's reach.",
            },
            {
              type: "narration",
              text: "The mountain looms ahead, shrouded in mist.",
            },
            {
              type: "internal",
              text: "Multiple paths lead upward. Which approach suits me best?",
            },
          ],
        },
        {
          type: "choice",
          prompt: "How do you approach the mountain?",
          choices: [
            {
              id: "blade-path",
              label: "Take the direct path - face any challengers head-on",
              effects: [
                { type: "path", path: "blade", delta: 5 },
                { type: "flag", flag: "MOUNTAIN_BLADE", value: true },
              ],
              nextScene: "3-3a-blade-ascent",
            },
            {
              id: "stream-path",
              label: "Seek guidance - there must be locals who know the way",
              effects: [
                { type: "path", path: "stream", delta: 5 },
                { type: "flag", flag: "MOUNTAIN_STREAM", value: true },
              ],
              nextScene: "3-3b-stream-passage",
            },
            {
              id: "shadow-path",
              label:
                "Find the hidden path - Dr. Mae's maps showed ancient tunnels",
              effects: [
                { type: "path", path: "shadow", delta: 5 },
                { type: "flag", flag: "MOUNTAIN_SHADOW", value: true },
              ],
              nextScene: "3-3c-shadow-trail",
            },
          ],
        },
      ],
    },

    // =========================================================================
    // SCENE 3.3A: THE BLADE'S ASCENT
    // =========================================================================
    {
      id: "3-3a-blade-ascent",
      title: "The Blade's Ascent",
      type: "combat",
      location: "Mountain Path",
      estimatedMinutes: 15,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "The mountain path is treacherous—and not empty.",
            },
            {
              type: "narration",
              text: "Li Wei climbs through hostile territory.",
            },
            { type: "divider" },
            { type: "narration", text: "The Wild Lands remember strength." },
            {
              type: "narration",
              text: "The Lone Wolf school maintains order here.",
            },
            {
              type: "narration",
              text: "They recognize no authority but power.",
            },
            { type: "pause", duration: 300 },
            {
              type: "narration",
              text: "Three Lone Wolf disciples block the path.",
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF DISCIPLE",
              text: '"A beggar? Climbing the sacred mountain?"',
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"Check his chi. Something\'s... wrong about him."',
            },
            {
              type: "narration",
              text: "They all shift to fighting stances.",
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF DISCIPLE",
              text: '"Wrong or not, the mountain tests all who climb."',
            },
          ],
        },
        {
          type: "combat",
          enemies: [
            "lone-wolf-disciple",
            "lone-wolf-disciple",
            "lone-wolf-senior",
          ],
          canLose: false,
        },
        {
          type: "content",
          lines: [
            { type: "narration", text: "The disciples lie defeated." },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"You fight like... like nothing I\'ve trained against."',
              emotion: "struggling up",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I fight like myself."',
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"The Hollow One was right about you. Go. The path is clear."',
              emotion: "laughing painfully",
            },
            { type: "narration", text: "He waves Li Wei forward." },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"But know this—what waits at the summit... it defeated our master. Every challenger in fifty years."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Then it\'s time that changed."',
            },
            { type: "divider" },
            {
              type: "narration",
              text: "Along the path, Li Wei finds a training shrine.",
            },
            {
              type: "narration",
              text: "Stone markers with names carved into them—challengers who attempted the summit.",
            },
            { type: "narration", text: "At the base, a technique scroll." },
            {
              type: "system",
              text: "TECHNIQUE DISCOVERED: Lone Wolf's Fang (Power 35, Speed +1)",
            },
            {
              type: "system",
              text: '"A technique of pure aggression—attack is the only defense."',
            },
          ],
        },
      ],
      nextScene: "3-4-testing-stones",
    },

    // =========================================================================
    // SCENE 3.3B: THE STREAM'S PASSAGE
    // =========================================================================
    {
      id: "3-3b-stream-passage",
      title: "The Stream's Passage",
      type: "cutscene",
      location: "Mountain Path",
      estimatedMinutes: 12,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "The mountain path is treacherous—but Li Wei doesn't climb alone.",
            },
            {
              type: "narration",
              text: "A group of Lone Wolf disciples intercepts him.",
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF DISCIPLE",
              text: '"Hold, traveler. The summit is forbidden."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I was invited."',
            },
            { type: "narration", text: "He shows the jade token." },
            { type: "narration", text: "The disciples' eyes widen." },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: "\"The Hollow One's mark. We haven't seen that in years.\"",
            },
            { type: "narration", text: "They confer quietly." },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"We\'ll escort you. The path is dangerous, and you carry important cargo."',
            },
            { type: "divider" },
            {
              type: "narration",
              text: "Li Wei walks with the Lone Wolf disciples.",
            },
            {
              type: "narration",
              text: "They share stories of the mountain, the temple, the Hollow One.",
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF DISCIPLE",
              text: '"The Hollow One saved our school once. Bandits from the outer realms. Fifty of them."',
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"The Hollow One killed none. Defeated all. Then walked away without a word."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"What do they want?"',
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"That\'s the question everyone asks."',
            },
            {
              type: "narration",
              text: "They reach a diverging path.",
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"Here we leave you. The final approach is sacred. Only the invited may walk it."',
            },
            { type: "narration", text: "He bows to Li Wei." },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"Whatever you seek up there... I hope you find it."',
            },
            { type: "divider" },
            {
              type: "narration",
              text: "The Lone Wolf Senior hands Li Wei a small vial.",
            },
            {
              type: "dialogue",
              speaker: "LONE WOLF SENIOR",
              text: '"Mountain Spring Water. Restores chi completely. For whatever trial awaits."',
            },
            {
              type: "system",
              text: "ITEM RECEIVED: Mountain Spring Water - Fully restores Chi when used (single use)",
            },
          ],
        },
      ],
      nextScene: "3-4-testing-stones",
    },

    // =========================================================================
    // SCENE 3.3C: THE SHADOW'S TRAIL
    // =========================================================================
    {
      id: "3-3c-shadow-trail",
      title: "The Shadow's Trail",
      type: "exploration",
      location: "Ancient Tunnels",
      estimatedMinutes: 15,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Li Wei takes the hidden path—the one not meant to be found.",
            },
            {
              type: "narration",
              text: "Dr. Mae's map shows an old tunnel system through the mountain.",
            },
            { type: "divider" },
            {
              type: "narration",
              text: "Before the Temple was forgotten, pilgrims climbed in secret.",
            },
            {
              type: "narration",
              text: "The persecution of 'unmeasured' arts was old even then.",
            },
            { type: "pause", duration: 300 },
            {
              type: "narration",
              text: "Li Wei enters a cave mouth hidden behind a waterfall.",
            },
            {
              type: "narration",
              text: "Inside: ancient murals depicting inverse chi cultivation.",
            },
            {
              type: "narration",
              text: "Figures with light flowing INWARD, not outward.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"They practiced this. Before the Array. Before everything."',
              emotion: "examining the walls",
            },
            {
              type: "narration",
              text: "A carving shows a figure with a pendant—just like his.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"How old IS this prophecy?"',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            {
              type: "narration",
              text: "The tunnel is blocked by a formation—requires inverse chi to open.",
            },
            {
              type: "system",
              text: "Formation Detected. Requires chi of opposite polarity to unlock.",
            },
            {
              type: "narration",
              text: "Li Wei touches the formation. His pendant glows.",
            },
            {
              type: "narration",
              text: "The chi flows BACKWARD from the formation into him.",
            },
            { type: "narration", text: "The barrier dissolves." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I didn\'t force it open. I... absorbed it."',
              emotion: "looking at his hands",
            },
            {
              type: "narration",
              text: "He continues through the ancient tunnel.",
            },
            { type: "divider" },
            {
              type: "narration",
              text: "In the tunnel, Li Wei finds an ancient chamber.",
            },
            {
              type: "narration",
              text: "A skeleton sits in meditation pose, clutching a scroll.",
            },
            {
              type: "system",
              text: 'ANCIENT NOTE: "To whoever reads this—I was called mad for studying the inverse flow. But I discovered truth in madness. The Array was built to MISS us. Not by accident. We were hidden. Protected. Until the time was right. —Wei Zhang, Year 847"',
            },
            {
              type: "system",
              text: "LORE DISCOVERED: Ancient practitioner of inverse chi. Connection to Wei Zhong unclear.",
            },
            {
              type: "narration",
              text: "Li Wei takes the scroll—contains fragments of an ancient technique.",
            },
            {
              type: "system",
              text: "TECHNIQUE FRAGMENT DISCOVERED: Ancestor's Echo (Incomplete)",
            },
          ],
        },
      ],
      nextScene: "3-4-testing-stones",
    },

    // =========================================================================
    // SCENE 3.4: THE TESTING STONES
    // =========================================================================
    {
      id: "3-4-testing-stones",
      title: "The Testing Stones",
      type: "interactive",
      location: "Stone Circle - Mountain Plateau",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Regardless of route, Li Wei arrives at the same location.",
            },
            {
              type: "narration",
              text: "The mountain opens into a plateau. The Forgotten Temple ahead.",
            },
            {
              type: "narration",
              text: "Ancient stone buildings, partially reclaimed by nature.",
            },
            {
              type: "narration",
              text: "But signs of recent care—swept paths, maintained gardens.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Someone lives here."',
              emotion: "looking around",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Not lives. Waits."',
              emotion: "disembodied voice",
            },
            {
              type: "narration",
              text: "Li Wei spins, seeing no one.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Before we meet face to face, you must pass one more test. The Testing Stones."',
            },
            {
              type: "narration",
              text: "Li Wei looks up the path—a circle of standing stones visible.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: "\"Show me what you've learned. Show me what you've become.\"",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "narration", text: "Li Wei enters the circle." },
            {
              type: "narration",
              text: "A circle of twelve standing stones, each carved with different chi patterns.",
            },
            {
              type: "narration",
              text: "They represent the twelve great sects—and their fallen paths.",
            },
            {
              type: "narration",
              text: "The stones begin to GLOW as his chi resonates.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Each stone remembers a path. Each path remembers a technique. Show me you can walk all paths."',
              emotion: "voice echoing",
            },
            { type: "pause", duration: 400 },
            { type: "system", text: "SEQUENTIAL TECHNIQUE CHALLENGE" },
            {
              type: "narration",
              text: "Each stone activates, testing Li Wei's mastery.",
            },
            {
              type: "narration",
              text: "The first glows red—aggressive chi demands a flowing counter.",
            },
            {
              type: "narration",
              text: "The second glows blue—defensive chi must be broken through.",
            },
            {
              type: "narration",
              text: "The third glows yellow—endurance is tested.",
            },
            {
              type: "narration",
              text: "The fourth glows purple—hungry chi must be matched.",
            },
            { type: "narration", text: "Stone after stone, Li Wei responds." },
            { type: "pause", duration: 400 },
            { type: "narration", text: "All twelve stones pulse in harmony." },
            {
              type: "narration",
              text: "Li Wei stands in the center, chi flowing visibly around him.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Impressive. You\'ve learned well."',
            },
            { type: "pause", duration: 300 },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"But now... remember."',
            },
            {
              type: "narration",
              text: "The stones PULSE—and Li Wei's pendant BLAZES.",
            },
            { type: "effect", effect: { type: "shake" } },
            { type: "narration", text: "The world goes WHITE." },
          ],
        },
      ],
      nextScene: "3-5-memory-complete",
    },

    // =========================================================================
    // SCENE 3.5: MEMORY COMPLETE
    // Full flashback revelation
    // =========================================================================
    {
      id: "3-5-memory-complete",
      title: "Memory Complete",
      type: "cutscene",
      location: "Memory Sequence",
      estimatedMinutes: 15,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "system",
              text: "MEMORY: CALIBRATION INITIATIVE FACILITY - 15 YEARS AGO",
            },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "A sterile white room. A child (Young Li Wei, age 5) stands before the Aptitude Array.",
            },
            {
              type: "dialogue",
              speaker: "TECHNICIAN",
              text: '"Results confirmed. Subject shows... nothing."',
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: "\"Explain 'nothing.'\"",
              emotion: "leaning forward",
            },
            {
              type: "dialogue",
              speaker: "TECHNICIAN",
              text: '"Standard meridians read as completely closed. No chi flow whatsoever. The Array should register something—even F-grade shows minimal activity."',
            },
            {
              type: "narration",
              text: "Director Shen approaches the Array, examining the readings personally.",
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Invert the readings."',
              emotion: "slowly",
            },
            {
              type: "dialogue",
              speaker: "TECHNICIAN",
              text: '"Sir?"',
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Run the inverse protocol. The one Wei Zhong built into the original design."',
            },
            {
              type: "narration",
              text: "The technician complies. New readings appear.",
            },
            {
              type: "dialogue",
              speaker: "TECHNICIAN",
              text: "\"That's... that's impossible. The inverse channels are...\"",
              emotion: "gasping",
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Off the charts. Yes."',
            },
            {
              type: "narration",
              text: "He approaches Young Li Wei, kneeling to eye level.",
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Do you know what you are, child?"',
            },
            {
              type: "dialogue",
              speaker: "YOUNG LI WEI",
              text: '"I\'m Li Wei."',
              emotion: "scared, defiant",
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"You\'re so much more than that."',
              emotion: "smiling coldly",
            },
            { type: "narration", text: "He stands, gesturing to guards." },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Begin Calibration Protocol Seven. I want to understand how his chi flows backward."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "MONTAGE: YEARS OF EXPERIMENTS" },
            {
              type: "narration",
              text: "Young Li Wei strapped to examination tables.",
            },
            {
              type: "narration",
              text: "Chi being forcibly redirected—screaming.",
            },
            {
              type: "narration",
              text: "Other children in cells, numbered: Subject 14, 15, 16...",
            },
            { type: "narration", text: "Some never seen again." },
            {
              type: "narration",
              text: "Li Wei growing older, harder, but never broken.",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "MEMORY: FIVE YEARS AGO" },
            {
              type: "narration",
              text: "Li Wei (age 14) in his cell, stronger now.",
            },
            {
              type: "narration",
              text: "Dr. Mae enters—the first kind face he's seen in years.",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"You shouldn\'t be reading that."',
            },
            {
              type: "narration",
              text: "Li Wei hides a smuggled book—technique manuals, forbidden texts.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Are you going to report me?"',
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"I\'m going to teach you."',
              emotion: "sitting down",
            },
            { type: "narration", text: "He looks up, suspicious." },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: "\"I know what they're doing to you, Li Wei. I know it's wrong. I can't stop it. But I can give you something they can't take away.\"",
            },
            { type: "narration", text: "She taps her temple." },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Knowledge."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "MEMORY: THREE WEEKS BEFORE GAME BEGINS" },
            { type: "system", text: "TESTING CHAMBER - HIGH SECURITY" },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Today we remove the suppression pendant. I want full readings on his inverse chi flow."',
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Please let this work."',
              emotion: "in observation room, to herself",
            },
            {
              type: "narration",
              text: "Li Wei is strapped to a platform. Scientists behind barriers.",
            },
            { type: "narration", text: "The jade pendant is removed." },
            { type: "pause", duration: 400 },
            { type: "effect", effect: { type: "shake" } },
            { type: "system", text: "EXPLOSION OF INVERSE CHI" },
            {
              type: "narration",
              text: "Everything inverts—equipment shatters, barriers crack, reality bends.",
            },
            {
              type: "narration",
              text: "When the chaos settles—Li Wei stands in destruction, chi crackling.",
            },
            {
              type: "dialogue",
              speaker: "DIRECTOR SHEN",
              text: '"Magnificent... Subject 17, stand down."',
              emotion: "from the floor, bleeding but alive",
            },
            {
              type: "narration",
              text: "Li Wei looks at his hands—power he's never felt.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"No."',
              emotion: "quietly",
            },
            {
              type: "narration",
              text: "He MOVES—faster than anything they've seen.",
            },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "MEMORY: THE ESCAPE" },
            { type: "narration", text: "Li Wei tears through the facility." },
            { type: "narration", text: "Guards fall. Barriers shatter." },
            {
              type: "narration",
              text: "His chi is wild, uncontrolled, terrifying.",
            },
            {
              type: "narration",
              text: "He reaches the exit. Dr. Mae waits with the pendant.",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Put it on. It will suppress your power but hide you. Without it, they\'ll track you anywhere."',
              emotion: "urgently",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"What AM I?"',
              emotion: "looking at his crackling hands",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: "\"You're Li Wei. That's all that matters.\"",
            },
            {
              type: "narration",
              text: "She presses the pendant into his hand.",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"The Lower Streets. The Beggars Sect. Find Elder Chen. Tell him... tell him Dr. Mae sent you."',
            },
            {
              type: "narration",
              text: "Li Wei puts on the pendant. Power dampens. Memories begin to fragment.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"Mae... I'll forget this. Won't I?\"",
              emotion: "already confused",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Yes. The pendant does more than suppress—it protects. Your mind needs time to process what you\'ve become."',
            },
            { type: "narration", text: "She pushes him toward the exit." },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: "\"But you'll remember when you're ready. When you're strong enough.\"",
            },
            { type: "narration", text: "Li Wei runs into the night." },
            {
              type: "narration",
              text: "Dr. Mae watches him go, then destroys the exit controls.",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Run far, Li Wei. And when you come back..."',
              emotion: "to herself",
            },
            {
              type: "narration",
              text: "She looks at the destruction around her.",
            },
            {
              type: "dialogue",
              speaker: "DR. MAE",
              text: '"Burn it all down."',
            },
            { type: "divider" },
            { type: "system", text: "END FLASHBACK" },
          ],
        },
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Li Wei gasps back to consciousness, on his knees in the stone circle.",
            },
            { type: "narration", text: "Tears stream down his face." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I remember. Everything."',
            },
            { type: "narration", text: "He touches the pendant." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"She saved me. Dr. Mae saved me."',
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"And now you know what you are."',
              emotion: "closer now",
            },
            {
              type: "narration",
              text: "Li Wei stands, chi flickering with barely contained power.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I'm not Subject 17. I'm not the Inverted One.\"",
            },
            { type: "narration", text: "He looks toward the temple." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I\'m Li Wei. And I have questions for you."',
            },
            {
              type: "system",
              text: "MEMORY RESTORED - Full backstory revealed",
            },
          ],
        },
      ],
      nextScene: "3-6-forgotten-temple",
    },

    // =========================================================================
    // SCENE 3.6: THE FORGOTTEN TEMPLE
    // =========================================================================
    {
      id: "3-6-forgotten-temple",
      title: "The Forgotten Temple",
      type: "exploration",
      location: "Temple Interior",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "The Forgotten Temple was once a grand martial academy.",
            },
            {
              type: "narration",
              text: "Massive training halls, meditation chambers, living quarters.",
            },
            {
              type: "narration",
              text: "All partially reclaimed by nature but clearly maintained by someone.",
            },
          ],
        },
        {
          type: "exploration",
          areas: [
            {
              id: "main-hall",
              name: "Main Hall",
              description: "Vast training hall with weapons on the walls.",
              content: [
                {
                  type: "narration",
                  text: "Many styles represented—some Li Wei recognizes, many he doesn't.",
                },
                {
                  type: "narration",
                  text: "A single practice dummy in the center, worn smooth by countless strikes.",
                },
                {
                  type: "narration",
                  text: "Li Wei examines it—the attack patterns are strange, defensive positions designed for impossible angles.",
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"These techniques... they\'re like beggar forms. But older."',
                },
                {
                  type: "system",
                  text: "INSIGHT: Ancient inverse techniques predate the Beggars Sect.",
                },
              ],
            },
            {
              id: "memorial-wall",
              name: "Memorial Wall",
              description: "A wall of carved names—thousands of them.",
              required: true,
              content: [
                { type: "narration", text: "Some ancient, some more recent." },
                { type: "narration", text: "At the bottom, a note:" },
                {
                  type: "narration",
                  text: '"Those who walked the inverse path before measure became law. None were worthless. All were forgotten."',
                },
                {
                  type: "narration",
                  text: 'One name catches Li Wei\'s eye: "Wei Ming - The First Wanderer"',
                },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"Wei Ming... related to Wei Zhong?"',
                  emotion: "touching the name",
                },
                {
                  type: "system",
                  text: "LORE DISCOVERED: Wei Ming was Wei Zhong's sister. She opposed the Array's creation. She was the first to be 'measured out.'",
                },
              ],
            },
            {
              id: "inner-sanctum",
              name: "Inner Sanctum",
              description: "A meditation chamber with an empty cushion.",
              required: true,
              content: [
                {
                  type: "narration",
                  text: "Before it: the jade symbol matching Li Wei's pendant.",
                },
                {
                  type: "narration",
                  text: "The Hollow One sits cross-legged, back to the entrance.",
                },
                {
                  type: "dialogue",
                  speaker: "THE HOLLOW ONE",
                  text: '"You\'ve seen the names. The history."',
                },
                { type: "narration", text: "They don't turn." },
                {
                  type: "dialogue",
                  speaker: "THE HOLLOW ONE",
                  text: '"Now you understand why I called you here."',
                },
                { type: "narration", text: "Li Wei steps forward." },
                {
                  type: "dialogue",
                  speaker: "LI WEI",
                  text: '"To test me?"',
                },
                {
                  type: "dialogue",
                  speaker: "THE HOLLOW ONE",
                  text: '"To test myself."',
                  emotion: "finally turning",
                },
                {
                  type: "narration",
                  text: "They stand—a figure of indeterminate age and gender, dressed in grey, movements fluid as water.",
                },
                {
                  type: "dialogue",
                  speaker: "THE HOLLOW ONE",
                  text: '"I have mastered every technique in existence. And felt nothing."',
                },
                {
                  type: "narration",
                  text: "They look at Li Wei with something like hope.",
                },
                {
                  type: "dialogue",
                  speaker: "THE HOLLOW ONE",
                  text: '"You are the first opponent who might make me feel... alive."',
                },
              ],
            },
          ],
        },
      ],
      nextScene: "3-7-hollow-one",
    },

    // =========================================================================
    // SCENE 3.7: THE HOLLOW ONE (Pre-Boss Dialogue)
    // =========================================================================
    {
      id: "3-7-hollow-one",
      title: "The Hollow One",
      type: "dialogue",
      location: "Temple Courtyard",
      estimatedMinutes: 8,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "system",
              text: "TEMPLE COURTYARD - Open sky, ancient training grounds",
            },
            {
              type: "narration",
              text: "The Hollow One and Li Wei face each other.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"I was once called Wei Lin. Direct descendant of Wei Zhong—the creator of the Aptitude Array."',
            },
            { type: "narration", text: "Li Wei's eyes widen." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"S-grade aptitude. Perfect meridians. I mastered every technique before I turned thirty."',
            },
            { type: "narration", text: "They look at their hands." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"And when I reached the peak... I felt nothing. Achievement without struggle is meaningless. Mastery without sacrifice is empty."',
            },
            { type: "narration", text: "They gesture at the temple." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"So I came here. To the place my ancestor\'s sister built for those the system would erase. And I waited."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"For what?"',
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"For you. For the Inverted One."',
            },
            { type: "narration", text: "They step forward." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Someone whose chi flows backward. Someone who shouldn\'t exist. Someone who might finally give me what I seek."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"What\'s that?"',
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Meaning."',
            },
          ],
        },
        {
          type: "choice",
          prompt: "How do you respond to the Hollow One?",
          choices: [
            {
              id: "blade-response",
              label: "Then let's not waste time talking. Fight me.",
              effects: [
                { type: "path", path: "blade", delta: 5 },
                { type: "flag", flag: "HOLLOW_BLADE_START", value: true },
              ],
            },
            {
              id: "stream-response",
              label:
                "Why fight at all? You said you found emptiness at the peak.",
              effects: [
                { type: "path", path: "stream", delta: 5 },
                { type: "flag", flag: "HOLLOW_STREAM_START", value: true },
              ],
            },
            {
              id: "shadow-response",
              label:
                "You're not really Wei Lin, are you? Wei Lin died fifty years ago.",
              effects: [
                { type: "path", path: "shadow", delta: 5 },
                { type: "flag", flag: "HOLLOW_SHADOW_START", value: true },
              ],
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Direct. I like that."',
              emotion: "eyes gleaming",
            },
            { type: "narration", text: "They assume fighting stance." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"No tricks. No dialogue. Just pure combat. Show me your strength!"',
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"An interesting question."',
              emotion: "pausing",
            },
            { type: "narration", text: "They relax slightly." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: "\"Perhaps... you're right. Perhaps fighting isn't the only way.\"",
            },
            {
              type: "narration",
              text: "They gesture to the ground—sit.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Tell me your philosophy, Li Wei. Convince me there\'s meaning beyond combat."',
            },
          ],
        },
        {
          type: "content",
          lines: [
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"What?"',
              emotion: "freezing",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I found records in the tunnels. Wei Lin challenged the Initiative directly and was killed. Whoever you are, you took their identity."',
            },
            {
              type: "narration",
              text: "The Hollow One is silent for a long moment.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"You see clearly, Li Wei. Perhaps too clearly."',
              emotion: "slowly",
            },
            {
              type: "narration",
              text: "They shift—their form seems to flicker.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Before I tell you the truth... prove you can handle it."',
            },
          ],
        },
      ],
      nextScene: "3-8-the-test",
    },

    // =========================================================================
    // SCENE 3.8: THE TEST (Boss Fight)
    // =========================================================================
    {
      id: "3-8-the-test",
      title: "The Test",
      type: "combat",
      location: "Temple Arena",
      estimatedMinutes: 25,
      content: [
        {
          type: "content",
          lines: [
            { type: "divider" },
            { type: "system", text: "BOSS ENCOUNTER: THE HOLLOW ONE" },
            {
              type: "narration",
              text: '"I am what happens when potential is fulfilled but meaning is not."',
            },
            { type: "pause", duration: 400 },
          ],
        },
        {
          type: "combat",
          enemies: ["the-hollow-one"],
          canLose: false,
        },
      ],
      nextScene: "3-9-revelation",
    },

    // =========================================================================
    // SCENE 3.9: THE REVELATION
    // =========================================================================
    {
      id: "3-9-revelation",
      title: "The Revelation",
      type: "cutscene",
      location: "Temple Arena",
      estimatedMinutes: 10,
      content: [
        {
          type: "content",
          lines: [
            { type: "narration", text: "The Hollow One falls to one knee." },
            {
              type: "narration",
              text: "For the first time, they're genuinely wounded.",
            },
            { type: "narration", text: "And they're SMILING." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"At last. At LAST."',
              emotion: "laughing, joyful",
            },
            {
              type: "narration",
              text: "They stand slowly, no longer hostile.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"You did it. You defeated someone who mastered everything... with techniques built from nothing."',
            },
            {
              type: "narration",
              text: "They bow deeply to Li Wei—profound respect.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"I understand now. Why you matter. Why the prophecy speaks of the Inverted One."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Tell me."',
              emotion: "exhausted",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: "\"It's not about power. It's about PROOF.\"",
            },
            { type: "narration", text: "They gesture at Li Wei." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: "\"The Array measures chi flow. But chi is just energy. What it CAN'T measure is will. Heart. The choice to become something the world says you can't be.\"",
            },
            {
              type: "narration",
              text: "They reach into their robe—a map, ancient and worn.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"My ancestor, Wei Zhong, created the Array. But he regretted it until his death. So he created a counter."',
            },
            { type: "narration", text: "They hand Li Wei the map." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"The Dog Beating Staff. A weapon that only someone with fully inverted chi can wield."',
            },
            {
              type: "narration",
              text: "Li Wei looks at the map—a path up the mountain peak.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"It\'s real."',
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"It\'s waiting. For someone like you."',
            },
            { type: "narration", text: "They step back." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"I\'ve spent fifty years guarding this path. Waiting for the one who could claim it."',
            },
            {
              type: "narration",
              text: "They look at Li Wei with something like peace.",
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Whatever you choose to do with it... know that you\'ve given me something I never expected."',
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"What?"',
            },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"A reason to keep living."',
            },
            { type: "narration", text: "They gesture up the mountain." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Go. The Staff awaits. And when you\'ve claimed it..."',
            },
            { type: "narration", text: "Their eyes gleam." },
            {
              type: "dialogue",
              speaker: "THE HOLLOW ONE",
              text: '"Find me again. I\'ll be waiting for the rematch."',
            },
          ],
        },
      ],
      nextScene: "3-10-final-choice",
    },

    // =========================================================================
    // SCENE 3.10: THE FINAL CHOICE
    // =========================================================================
    {
      id: "3-10-final-choice",
      title: "The Final Choice",
      type: "interactive",
      location: "Mountain Peak",
      estimatedMinutes: 5,
      content: [
        {
          type: "content",
          lines: [
            { type: "effect", effect: { type: "fade", direction: "in" } },
            {
              type: "narration",
              text: "Mountain peak. Dawn breaking. The city visible far below.",
            },
            {
              type: "narration",
              text: "A cave entrance sealed with ancient formations.",
            },
            {
              type: "narration",
              text: "The Hollow One's symbol alongside an inverted spiral—Li Wei's pendant symbol.",
            },
            { type: "narration", text: "Li Wei approaches the seal." },
            {
              type: "narration",
              text: "His pendant BLAZES—the formations recognize him.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"This is it. Everything I\'ve been running toward."',
              emotion: "touching the seal",
            },
            {
              type: "narration",
              text: "The formations glow, reacting to his inverse chi.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"Whatever\'s inside... it changes everything."',
            },
            {
              type: "narration",
              text: "He pauses, looking back at the path he climbed.",
            },
            { type: "divider" },
            { type: "system", text: "THE FINAL CHOICE" },
            {
              type: "narration",
              text: "The Dog Beating Staff waits beyond this seal.",
            },
            {
              type: "narration",
              text: "A weapon that could overturn a thousand years of oppression.",
            },
            {
              type: "narration",
              text: "But power is nothing without purpose.",
            },
            { type: "narration", text: "What do you seek?" },
          ],
        },
        {
          type: "choice",
          prompt: "What purpose drives you?",
          choices: [
            {
              id: "ending-destroyer",
              label: "THE BLADE: Power to destroy the system that hurt me.",
              effects: [
                { type: "path", path: "blade", delta: 10 },
                { type: "flag", flag: "ENDING_DESTROYER", value: true },
              ],
              nextScene: "ending-a-destroyer",
            },
            {
              id: "ending-reformer",
              label: "THE STREAM: Truth to share with the world.",
              effects: [
                { type: "path", path: "stream", delta: 10 },
                { type: "flag", flag: "ENDING_REFORMER", value: true },
              ],
              nextScene: "ending-b-reformer",
            },
            {
              id: "ending-wanderer",
              label: "THE SHADOW: Freedom to walk my own path.",
              effects: [
                { type: "path", path: "shadow", delta: 10 },
                { type: "flag", flag: "ENDING_WANDERER", value: true },
              ],
              nextScene: "ending-c-wanderer",
            },
          ],
        },
      ],
    },

    // =========================================================================
    // ENDING A: THE DESTROYER
    // =========================================================================
    {
      id: "ending-a-destroyer",
      title: "The Destroyer",
      type: "cutscene",
      location: "Cave of Origins / Haven's Cradle",
      estimatedMinutes: 8,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "Li Wei's chi FLARES—aggressive, determined.",
            },
            {
              type: "narration",
              text: "He presses his hand against the seal.",
            },
            {
              type: "narration",
              text: "The formations don't open—they SHATTER.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"No more patience. No more hiding."',
            },
            { type: "narration", text: "He strides into the cave." },
            { type: "divider" },
            { type: "system", text: "INTERIOR - Cave of Origins" },
            {
              type: "narration",
              text: "A single pedestal. Upon it: the Dog Beating Staff.",
            },
            {
              type: "narration",
              text: "It's plain. Unassuming. A beggar's weapon.",
            },
            {
              type: "narration",
              text: "Li Wei reaches for it—and it IGNITES with inverse chi.",
            },
            {
              type: "narration",
              text: "Power beyond anything he's felt flows into him.",
            },
            {
              type: "narration",
              text: "His pendant CRACKS—the suppression breaking.",
            },
            {
              type: "narration",
              text: "Full inverse chi visible now, flowing backward through his meridians.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"So this is what I really am."',
              emotion: "looking at his hands",
            },
            {
              type: "narration",
              text: "He turns toward the cave entrance—toward Haven's Cradle in the distance.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"They measured us. Sorted us. Told us what we could be."',
            },
            { type: "narration", text: "He grips the Staff." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I am what they cannot measure. And I will show them ALL what 'nothing' can become.\"",
            },
            { type: "divider" },
            {
              type: "narration",
              text: "Li Wei returned to Haven's Cradle not as a beggar, but as a storm.",
            },
            {
              type: "narration",
              text: "The Dog Beating Staff sang with power no Array could comprehend.",
            },
            {
              type: "narration",
              text: "The Calibration Initiative mobilized every resource.",
            },
            {
              type: "narration",
              text: "The sects trembled at rumors of the Inverted One.",
            },
            { type: "pause", duration: 400 },
            { type: "narration", text: "Revolution had a name." },
            { type: "narration", text: "Revolution had a face." },
            { type: "narration", text: "Revolution had begun." },
            {
              type: "narration",
              text: "And the Martial Arts Haven would never be the same.",
            },
            { type: "divider" },
            {
              type: "narration",
              text: '"Li Wei\'s journey continues in..."',
            },
            { type: "system", text: "THE BEGGARS SECT: BOOK TWO" },
            { type: "system", text: "THE FALLING SPIRE" },
            { type: "pause", duration: 500 },
            { type: "system", text: "ENDING A: THE DESTROYER - COMPLETE" },
          ],
        },
      ],
    },

    // =========================================================================
    // ENDING B: THE REFORMER
    // =========================================================================
    {
      id: "ending-b-reformer",
      title: "The Reformer",
      type: "cutscene",
      location: "Cave of Origins / Haven's Cradle",
      estimatedMinutes: 8,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "Li Wei's chi flows calm, purposeful.",
            },
            { type: "narration", text: "He touches the seal gently." },
            {
              type: "narration",
              text: "The formations don't shatter—they unfold, recognizing him.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I'm not here to destroy. I'm here to understand.\"",
            },
            { type: "narration", text: "He enters the cave with respect." },
            { type: "divider" },
            { type: "system", text: "INTERIOR - Cave of Origins" },
            {
              type: "narration",
              text: "A single pedestal. Upon it: the Dog Beating Staff.",
            },
            {
              type: "narration",
              text: "Li Wei approaches slowly, studying it.",
            },
            {
              type: "narration",
              text: "Ancient texts surround the pedestal—Wei Zhong's final writings.",
            },
            {
              type: "narration",
              text: "He reads before he reaches for the Staff.",
            },
            {
              type: "dialogue",
              speaker: "WEI ZHONG",
              text: '"To whoever claims this Staff—know that I built the Array with good intentions. I wanted to help people find their potential. Instead, I created a system that sorted souls like grain."',
              emotion: "from the text",
            },
            {
              type: "dialogue",
              speaker: "WEI ZHONG",
              text: '"I cannot undo what I built. But you can do what I could not. You can prove that worth cannot be measured. Not through destruction—through demonstration. Not through war—through truth."',
              emotion: "from the text",
            },
            { type: "narration", text: "Li Wei reaches for the Staff." },
            {
              type: "narration",
              text: "It settles into his grip like it was always meant to be there.",
            },
            {
              type: "narration",
              text: "Power flows through him—controlled, purposeful.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I understand."',
            },
            { type: "narration", text: "He turns toward Haven's Cradle." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"The Array didn\'t just hurt those it marked as worthless. It poisoned everyone. Made them believe the lie."',
            },
            { type: "narration", text: "He grips the Staff." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I won't burn it down. I'll give them something better. A choice they never had.\"",
            },
            { type: "divider" },
            {
              type: "narration",
              text: "Li Wei returned to Haven's Cradle as a question, not an answer.",
            },
            {
              type: "narration",
              text: "He carried proof the Array was flawed—and he offered it as a gift, not a weapon.",
            },
            { type: "narration", text: "Some listened. Some didn't." },
            {
              type: "narration",
              text: "Commander Vex sought him out—not to fight, but to understand.",
            },
            {
              type: "narration",
              text: "Sergeant Yun brought others who questioned the system.",
            },
            {
              type: "narration",
              text: "Even some High Sect members began to wonder.",
            },
            { type: "pause", duration: 400 },
            { type: "narration", text: "The conversation had begun." },
            {
              type: "narration",
              text: "And conversations, unlike revolutions, have no end.",
            },
            { type: "divider" },
            {
              type: "narration",
              text: '"Li Wei\'s journey continues in..."',
            },
            { type: "system", text: "THE BEGGARS SECT: BOOK TWO" },
            { type: "system", text: "THE OPENING PATH" },
            { type: "pause", duration: 500 },
            { type: "system", text: "ENDING B: THE REFORMER - COMPLETE" },
          ],
        },
      ],
    },

    // =========================================================================
    // ENDING C: THE WANDERER
    // =========================================================================
    {
      id: "ending-c-wanderer",
      title: "The Wanderer",
      type: "cutscene",
      location: "Cave of Origins / Beyond",
      estimatedMinutes: 8,
      content: [
        {
          type: "content",
          lines: [
            {
              type: "narration",
              text: "Li Wei's chi flows inward, contemplative.",
            },
            {
              type: "narration",
              text: "He touches the seal—but doesn't press.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"What if I don\'t want to be a weapon? Or a symbol? Or a savior?"',
              emotion: "quietly",
            },
            {
              type: "narration",
              text: "He looks at the seal for a long moment.",
            },
            {
              type: "narration",
              text: "Then he presses his palm against it—gently.",
            },
            {
              type: "narration",
              text: "The formations recognize him but don't fully open.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"I'm taking the Staff. But I'm not taking the destiny.\"",
            },
            {
              type: "narration",
              text: "A crack appears—just enough for him to slip through.",
            },
            { type: "divider" },
            { type: "system", text: "INTERIOR - Cave of Origins" },
            {
              type: "narration",
              text: "A single pedestal. Upon it: the Dog Beating Staff.",
            },
            { type: "narration", text: "Li Wei takes it without ceremony." },
            {
              type: "narration",
              text: "Power flows into him—and he lets it settle naturally.",
            },
            {
              type: "narration",
              text: "He doesn't fight it or embrace it. He just... accepts it.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: "\"You were made for someone like me. But I get to decide what 'someone like me' means.\"",
              emotion: "looking at the Staff",
            },
            {
              type: "narration",
              text: "He turns toward the cave entrance—but doesn't look at the city.",
            },
            {
              type: "narration",
              text: "He looks at the mountains beyond. The unknown realms. The endless horizon.",
            },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"I spent my whole life being told what I was. Subject 17. F-grade. Beggar. Weapon. Prophecy."',
            },
            { type: "narration", text: "He smiles slightly." },
            {
              type: "dialogue",
              speaker: "LI WEI",
              text: '"For once, I want to just... be."',
            },
            {
              type: "narration",
              text: "He walks out of the cave—past the Hollow One, past the temple, past everything familiar.",
            },
            { type: "narration", text: "Heading into the unknown." },
            { type: "divider" },
            { type: "narration", text: "Li Wei walked away from fate itself." },
            {
              type: "narration",
              text: "The prophecy remained unfulfilled—or perhaps it fulfilled itself in ways no one predicted.",
            },
            { type: "narration", text: "The Initiative kept hunting." },
            {
              type: "narration",
              text: "The Beggars Sect kept his memory alive.",
            },
            {
              type: "narration",
              text: "The Hollow One waited for his return.",
            },
            { type: "pause", duration: 400 },
            {
              type: "narration",
              text: "But somewhere in the endless realms beyond Haven's Cradle,",
            },
            {
              type: "narration",
              text: "a wanderer carried a staff and asked no questions of the sky.",
            },
            { type: "narration", text: "What he found, he never told." },
            { type: "narration", text: "What he became, only the stars know." },
            { type: "pause", duration: 300 },
            {
              type: "narration",
              text: "But sometimes, in the distant corners of the world,",
            },
            {
              type: "narration",
              text: "people spoke of a beggar with a plain staff",
            },
            {
              type: "narration",
              text: "who appeared when the helpless needed help",
            },
            {
              type: "narration",
              text: "and vanished before thanks could be given.",
            },
            { type: "divider" },
            {
              type: "narration",
              text: '"Li Wei\'s journey continues in..."',
            },
            { type: "system", text: "THE BEGGARS SECT: BOOK TWO" },
            { type: "system", text: "THE ENDLESS ROAD" },
            { type: "pause", duration: 500 },
            { type: "system", text: "ENDING C: THE WANDERER - COMPLETE" },
          ],
        },
      ],
    },
  ],
  startScene: "3-1-summons",
  endScenes: ["ending-a-destroyer", "ending-b-reformer", "ending-c-wanderer"],
};
