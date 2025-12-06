/**
 * Prologue: The Awakening
 * ~20-25 minutes of gameplay
 * No branching - establishes baseline for all players
 */

import type { Chapter } from '../../../types/index';

export const PROLOGUE: Chapter = {
  id: 'prologue',
  number: 0,
  title: 'The Awakening',
  scenes: [
    // =========================================================================
    // SCENE P.1: THE VOID
    // =========================================================================
    {
      id: 'p1-void',
      title: 'The Void',
      type: 'cutscene',
      location: 'Unknown',
      estimatedMinutes: 2,
      content: [
        {
          type: 'content',
          lines: [
            { type: 'effect', effect: { type: 'fade', direction: 'in', color: 'black' } },
            { type: 'pause', duration: 500 },
            { type: 'dialogue', speaker: 'VOICE (CLINICAL)', text: '"Subject 17\'s readings are... unprecedented."' },
            { type: 'pause', duration: 300 },
            { type: 'dialogue', speaker: 'VOICE (NERVOUS)', text: '"The inverse flow is accelerating. We should abort—"' },
            { type: 'pause', duration: 200 },
            { type: 'dialogue', speaker: 'VOICE (AUTHORITATIVE)', text: '"Proceed. Director Shen wants results."' },
            { type: 'pause', duration: 400 },
            { type: 'effect', effect: { type: 'flash', color: 'white', duration: 200 } },
            { type: 'narration', text: 'A sharp electronic tone. Building.' },
            { type: 'pause', duration: 300 },
            { type: 'dialogue', speaker: 'VOICE (SCREAMING)', text: '"It\'s loose! Subject 17 is—"' },
            { type: 'effect', effect: { type: 'shake' } },
            { type: 'pause', duration: 400 },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'You dream of white rooms' },
            { type: 'narration', text: 'and whispered numbers.' },
            { type: 'pause', duration: 300 },
            { type: 'narration', text: 'Of hands that measured' },
            { type: 'narration', text: 'but never touched.' },
            { type: 'pause', duration: 300 },
            { type: 'narration', text: 'Of something inside you,' },
            { type: 'narration', text: 'waiting.' },
            { type: 'pause', duration: 400 },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'You dream of running.' },
            { type: 'pause', duration: 200 },
            { type: 'narration', text: 'Of an explosion of... something.' },
            { type: 'pause', duration: 200 },
            { type: 'narration', text: 'Of falling through darkness' },
            { type: 'narration', text: 'that felt like freedom.' },
            { type: 'pause', duration: 400 },
            { type: 'narration', text: 'You dream of forgetting.' },
            { type: 'pause', duration: 500 },
            { type: 'narration', text: 'Then you wake.' },
            { type: 'effect', effect: { type: 'fade', direction: 'out', color: 'gray' } },
          ],
        },
      ],
      nextScene: 'p2-grey-sky',
    },

    // =========================================================================
    // SCENE P.2: GREY SKY
    // =========================================================================
    {
      id: 'p2-grey-sky',
      title: 'Grey Sky',
      type: 'interactive',
      location: 'Unknown Alley',
      estimatedMinutes: 3,
      content: [
        {
          type: 'content',
          lines: [
            { type: 'effect', effect: { type: 'fade', direction: 'in', color: 'gray' } },
            { type: 'narration', text: 'Grey sky above. Dark walls on either side. The smell of rot.' },
            { type: 'pause', duration: 300 },
            { type: 'internal', text: '...' },
            { type: 'internal', text: 'Where...' },
            { type: 'pause', duration: 200 },
            { type: 'internal', text: 'Where am I?' },
            { type: 'instruction', text: 'Press [SPACE] to continue', key: 'space' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'You look at your hands. Dirty. Scraped. Unfamiliar.' },
            { type: 'internal', text: 'These hands.' },
            { type: 'internal', text: 'Are they mine?' },
            { type: 'pause', duration: 1500 },
            { type: 'internal', text: 'I don\'t remember how I got here.' },
            { type: 'internal', text: 'I don\'t remember... anything.' },
            { type: 'pause', duration: 2000 },
            { type: 'internal', text: 'Wait.' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'Your hand moves to your chest automatically.' },
            { type: 'internal', text: 'There\'s something.' },
            { type: 'narration', text: 'A pendant. Jade, you think. Hanging from a cord around your neck.' },
            { type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } },
            { type: 'internal', text: 'It feels... important.' },
            { type: 'internal', text: 'Warm, somehow. Like it knows me.' },
            { type: 'pause', duration: 1500 },
            { type: 'internal', text: 'Do I know it?' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'You struggle to your feet. The world tilts, steadies.' },
            { type: 'internal', text: 'I need to... I need to find out where I am.' },
            { type: 'internal', text: 'Who I am.' },
            { type: 'pause', duration: 1000 },
            { type: 'internal', text: 'I need to survive.' },
            { type: 'system', text: 'You stumble toward the light at the alley\'s end.' },
          ],
        },
      ],
      nextScene: 'p3-first-breath',
    },

    // =========================================================================
    // SCENE P.3: FIRST BREATH
    // =========================================================================
    {
      id: 'p3-first-breath',
      title: 'First Breath',
      type: 'exploration',
      location: 'Guttermouth Plaza - Lower Streets',
      estimatedMinutes: 5,
      content: [
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'The alley opens into a plaza. People. Noise. Life, of a sort.' },
            { type: 'narration', text: 'A dried fountain sits at the center—now a stagnant pool. Buildings lean at impossible angles.' },
            { type: 'internal', text: 'They\'re ignoring me.' },
            { type: 'internal', text: 'No—they\'re avoiding me.' },
            { type: 'internal', text: 'I\'m just another piece of garbage the city washed down here.' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'A man bumps into you, hard, and keeps walking.' },
            { type: 'dialogue', speaker: 'MAN', text: '"Watch it, vagrant."', emotion: 'dismissive' },
            { type: 'internal', text: 'Vagrant. Is that what I am?' },
            { type: 'narration', text: 'You touch your clothes. Torn, dirty, but the fabric was quality once.' },
            { type: 'internal', text: 'These clothes. They were good once.' },
            { type: 'internal', text: 'What happened to them? To me?' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'A child darts past, stops, stares at you with wide eyes.' },
            { type: 'dialogue', speaker: 'CHILD', text: '"Mama! There\'s a dead man walking!"' },
            { type: 'dialogue', speaker: 'MOTHER\'S VOICE', text: '"Don\'t look at him! Come away!"', emotion: 'distant' },
            { type: 'narration', text: 'The child runs off.' },
            { type: 'internal', text: 'Dead man walking.' },
            { type: 'internal', text: 'Maybe she\'s right.' },
            { type: 'internal', text: 'I feel hollow. Empty.' },
            { type: 'internal', text: 'Like something was taken from me and I can\'t remember what.' },
          ],
        },
        {
          type: 'exploration',
          areas: [
            {
              id: 'begging-mother',
              name: 'A woman begging nearby',
              description: 'She holds a cracked bowl but doesn\'t speak.',
              content: [
                { type: 'narration', text: 'You crouch beside her. She doesn\'t look up.' },
                { type: 'dialogue', speaker: 'BEGGING MOTHER', text: '"Another hungry mouth. The streets don\'t care, you know. Neither does the city above."' },
                { type: 'dialogue', speaker: 'LI WEI', text: '"Where... where am I?"' },
                { type: 'dialogue', speaker: 'BEGGING MOTHER', text: '"The Gutter. Where everything flows down and nothing flows back up."', emotion: 'bitter' },
                { type: 'narration', text: 'She looks at you for the first time—then at your pendant. Her eyes widen.' },
                { type: 'dialogue', speaker: 'BEGGING MOTHER', text: '"That pendant. Where did you—No. Never mind. I don\'t want to know."' },
                { type: 'narration', text: 'She turns away.' },
                { type: 'dialogue', speaker: 'BEGGING MOTHER', text: '"If you\'re smart, you\'ll hide that. If you\'re lucky, you\'ll die before they find you."' },
              ],
            },
            {
              id: 'spartan-patrol',
              name: 'Soldiers in polished armor',
              description: 'Two soldiers walk through the square. Everyone shrinks away.',
              content: [
                { type: 'narration', text: 'You watch from the shadows as they pass.' },
                { type: 'dialogue', speaker: 'SPARTAN 1', text: '"Another sweep done. Nothing but rats and refuse."' },
                { type: 'dialogue', speaker: 'SPARTAN 2', text: '"Commander wants us checking for \'unauthorized martial activity.\' Whatever that means."' },
                { type: 'dialogue', speaker: 'SPARTAN 1', text: '"Means someone above us is nervous. Not our job to ask why."' },
                { type: 'narration', text: 'They pass without seeing you.' },
                { type: 'internal', text: 'Soldiers. Authority.' },
                { type: 'internal', text: 'Something about them makes my skin crawl.' },
                { type: 'internal', text: 'Do I know them? Have I... met them before?' },
                { type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } },
              ],
            },
            {
              id: 'market',
              name: 'A lean-to market',
              description: 'Scavengers trade salvage under corrugated metal sheets.',
              content: [
                { type: 'dialogue', speaker: 'TRADER 1', text: '"Three scraps for the wire. No more."' },
                { type: 'dialogue', speaker: 'TRADER 2', text: '"It\'s copper! Pre-Redistribution copper! Worth ten at least."' },
                { type: 'dialogue', speaker: 'TRADER 1', text: '"Worth what someone will pay. Here, no one pays ten for anything."' },
                { type: 'internal', text: 'A market. An economy.' },
                { type: 'internal', text: 'These people have almost nothing—but they\'ve built something from it.' },
              ],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'system', text: 'You\'ve seen enough. Time to find shelter before nightfall.' },
            { type: 'narration', text: 'You head toward a narrow passage leading deeper into the streets.' },
          ],
        },
      ],
      nextScene: 'p4-survival',
    },

    // =========================================================================
    // SCENE P.4: SURVIVAL INSTINCT
    // =========================================================================
    {
      id: 'p4-survival',
      title: 'Survival Instinct',
      type: 'combat',
      location: 'Back Alley',
      estimatedMinutes: 5,
      content: [
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'The passage narrows. Shadows deepen.' },
            { type: 'narration', text: 'Footsteps behind you. Then a figure steps out ahead.' },
            { type: 'dialogue', speaker: 'THUG 1', text: '"Well, well. Fresh meat."', emotion: 'threatening' },
            { type: 'dialogue', speaker: 'THUG 2', text: '"Nice pendant. Bet that\'s worth something."', emotion: 'greedy' },
            { type: 'internal', text: 'Two of them. Cornered.' },
            { type: 'internal', text: 'I should be afraid.' },
            { type: 'internal', text: 'But instead I feel...' },
            { type: 'narration', text: 'Your hands curl into fists automatically.' },
            { type: 'internal', text: '...ready.' },
          ],
        },
        {
          type: 'choice',
          prompt: 'The thugs demand your pendant.',
          choices: [
            {
              id: 'hand-over',
              label: 'Hand over the pendant',
              tag: 'Comply',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"Take it. I don\'t want trouble."' },
                { type: 'narration', text: 'You reach for the pendant—it FLARES with warmth.' },
                { type: 'narration', text: 'Your hands won\'t obey. You can\'t take it off.' },
                { type: 'internal', text: 'I can\'t... I can\'t give it up.' },
                { type: 'internal', text: 'It won\'t let me. Or I won\'t let me.' },
                { type: 'dialogue', speaker: 'THUG 1', text: '"Quit stalling! Boys, take it from him!"' },
              ],
            },
            {
              id: 'refuse',
              label: 'Refuse',
              tag: 'Defiant',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"No."' },
                { type: 'dialogue', speaker: 'THUG 2', text: '"\'No\'? You don\'t get to say no, vagrant."', emotion: 'laughing' },
                { type: 'narration', text: 'They advance.' },
              ],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'system', text: 'COMBAT TUTORIAL' },
            { type: 'system', text: 'Use ATTACK to deal damage. Use DEFEND to reduce incoming damage.' },
          ],
        },
        {
          type: 'combat',
          enemies: ['desperate-thug', 'desperate-thug'],
          canLose: false,
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'The thugs scramble away, clutching their wounds.' },
            { type: 'dialogue', speaker: 'THUG 1', text: '"This one\'s crazy! Leave him!"', emotion: 'panicked' },
            { type: 'dialogue', speaker: 'THUG 2', text: '"Not worth it! Not worth it!"' },
            { type: 'narration', text: 'You stand alone in the alley, breathing hard.' },
            { type: 'internal', text: 'I won.' },
            { type: 'internal', text: 'I knew how to win.' },
            { type: 'narration', text: 'You look at your hands.' },
            { type: 'internal', text: 'These hands remember what my mind forgot.' },
            { type: 'internal', text: 'Someone taught me to fight.' },
            { type: 'internal', text: 'Before the white rooms. Or during them.' },
            { type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } },
            { type: 'internal', text: 'Whatever I am... I\'m not helpless.' },
          ],
        },
      ],
      nextScene: 'p5-days-of-nothing',
    },

    // =========================================================================
    // SCENE P.5: DAYS OF NOTHING
    // =========================================================================
    {
      id: 'p5-days-of-nothing',
      title: 'Days of Nothing',
      type: 'montage',
      location: 'Lower Streets',
      estimatedMinutes: 3,
      content: [
        {
          type: 'montage',
          days: [
            {
              label: 'DAY ONE',
              content: [
                { type: 'narration', text: 'Rain. Cold. You huddle in an alley.' },
                { type: 'internal', text: 'Nothing to eat since I woke.' },
                { type: 'internal', text: 'Nothing to do but survive.' },
              ],
            },
            {
              label: 'DAY TWO',
              content: [
                { type: 'narration', text: 'You watch others eat scraps from a garbage pile.' },
                { type: 'internal', text: 'I tried to join them. They drove me away.' },
                { type: 'internal', text: 'Even here, at the bottom, there are hierarchies.' },
                { type: 'internal', text: 'Even here, newcomers aren\'t welcome.' },
              ],
            },
            {
              label: 'DAY THREE',
              content: [
                { type: 'narration', text: 'Another thug. Another fight. This time alone.' },
                { type: 'internal', text: 'I\'m getting better. Or they\'re getting weaker.' },
                { type: 'internal', text: 'Or both.' },
              ],
              autoCombat: { enemy: 'desperate-thug', outcome: 'win' },
            },
            {
              label: 'DAY FOUR',
              content: [
                { type: 'narration', text: 'You sit against a wall, staring at nothing.' },
                { type: 'internal', text: 'The pendant stays warm. Even when I\'m cold.' },
                { type: 'internal', text: 'It\'s the only thing that makes sense.' },
                { type: 'internal', text: 'It\'s the only thing that\'s mine.' },
                { type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } },
                { type: 'internal', text: 'What are you? What am I?' },
              ],
            },
            {
              label: 'DAY FIVE',
              content: [
                { type: 'narration', text: 'You lie in the same alley where you woke.' },
                { type: 'internal', text: 'Back where I started.' },
                { type: 'internal', text: 'Is this my life now?' },
                { type: 'internal', text: 'Fighting. Starving. Waiting to die?' },
                { type: 'pause', duration: 2000 },
                { type: 'internal', text: 'There has to be more.' },
                { type: 'internal', text: 'There HAS to be.' },
                { type: 'narration', text: 'You grip the pendant.' },
                { type: 'internal', text: 'Show me. Please. Show me something.' },
                { type: 'effect', effect: { type: 'pendant-glow', intensity: 'bright' } },
              ],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'dialogue', speaker: 'VOICE', text: '"Talking to jewelry now? That\'s usually week two."', emotion: 'amused' },
            { type: 'narration', text: 'You look up.' },
          ],
        },
      ],
      nextScene: 'p6-blind-guide',
    },

    // =========================================================================
    // SCENE P.6: THE BLIND GUIDE
    // =========================================================================
    {
      id: 'p6-blind-guide',
      title: 'The Blind Guide',
      type: 'dialogue',
      location: 'Lower Streets - Near Guttermouth',
      estimatedMinutes: 4,
      content: [
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'An ancient figure stands at the alley\'s entrance.' },
            { type: 'narration', text: 'Hunched, layered in rags, leaning on a wooden staff. His eyes are milky white—blind.' },
            { type: 'narration', text: 'He\'s smiling directly at you.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Five days. That\'s longer than most newcomers last. You\'re either lucky or stubborn."' },
            { type: 'narration', text: 'You struggle to your feet.' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"Who are you? How do you know how long I\'ve been here?"' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"I know many things. That\'s what happens when you stop looking and start seeing."' },
            { type: 'narration', text: 'He chuckles at his own joke.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"My name is Dao. Old Dao, they call me. Because I\'m old. And my name is Dao. Clever, yes?"' },
          ],
        },
        {
          type: 'choice',
          choices: [
            {
              id: 'suspicious',
              label: 'Are you here to rob me too?',
              tag: 'Suspicious',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"Are you here to rob me? I don\'t have anything worth taking."' },
                { type: 'dialogue', speaker: 'OLD DAO', text: '"Rob a man with nothing? That would be inefficient even for the desperate."', emotion: 'laughing' },
                { type: 'dialogue', speaker: 'OLD DAO', text: '"No, young one. I\'m here to give, not take."' },
              ],
            },
            {
              id: 'direct',
              label: 'Can you help me?',
              tag: 'Direct',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"Can you help me? I don\'t know where I am. I don\'t know who I am."' },
                { type: 'dialogue', speaker: 'OLD DAO', text: '"Help is what I do. Though perhaps not the help you expect."' },
              ],
            },
            {
              id: 'curious',
              label: 'How can you "see" if you\'re blind?',
              tag: 'Curious',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"How can you see anything? You\'re blind."' },
                { type: 'dialogue', speaker: 'OLD DAO', text: '"The eyes see surfaces. The soul sees truth. Guess which one is more useful?"', emotion: 'smiling' },
              ],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'dialogue', speaker: 'OLD DAO', text: '"You\'re lost. Not geographically—though yes, also that. Lost in the other way. The deeper way."' },
            { type: 'narration', text: 'He steps closer. Despite seeing nothing, he moves directly toward you.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"You don\'t remember who you are. Where you came from. What you can do."' },
            { type: 'narration', text: 'He stops in front of you.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"But I see it. The shape of you. The potential."' },
            { type: 'narration', text: 'He reaches out and touches your pendant.' },
            { type: 'effect', effect: { type: 'pendant-glow', intensity: 'intense' } },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Ah. Yes. There you are."' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"What did you—what is this thing?"' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"A key. A lock. A question and an answer. All at once."' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'He withdraws his hand.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Come with me, Li Wei. I know people who can help."' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"How do you know my name?!"' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"The pendant told me. Or you did, just now. Does it matter which?"' },
            { type: 'narration', text: 'He\'s already walking away, impossibly fast for a blind old man.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Come. Or stay. The path only opens once."' },
            { type: 'internal', text: 'What choice do I have?' },
            { type: 'narration', text: 'You follow.' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'Old Dao leads you through winding streets. He moves impossibly fast for someone blind.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"You\'ve been fighting. The streets teach that quickly. But you fight... differently."' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"I don\'t know why. My body remembers things my mind doesn\'t."' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Mmm. Muscle memory. Someone trained you well."' },
            { type: 'narration', text: 'You turn into an alley that looks like a dead end.' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"Trained? Who? Where?"' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Questions that might have answers. But not from me."' },
            { type: 'narration', text: 'He presses a specific stone in the wall.' },
            { type: 'narration', text: 'A section of rubble shifts—revealing a passage.' },
            { type: 'narration', text: 'Light spills through. Warm, golden. The first warm light you\'ve seen.' },
            { type: 'narration', text: 'Voices inside—people. Many people.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Welcome to the Beggars Sect, Li Wei. Welcome to your new family."' },
          ],
        },
      ],
      nextScene: 'p7-hidden-corner',
    },

    // =========================================================================
    // SCENE P.7: THE HIDDEN CORNER
    // =========================================================================
    {
      id: 'p7-hidden-corner',
      title: 'The Hidden Corner',
      type: 'dialogue',
      location: 'Beggar\'s Corner',
      estimatedMinutes: 3,
      content: [
        {
          type: 'content',
          lines: [
            { type: 'effect', effect: { type: 'fade', direction: 'in' } },
            { type: 'narration', text: 'The Hidden Corner opens before you—nothing like the streets outside.' },
            { type: 'narration', text: 'A courtyard surrounded by ancient walls. At the center, an ancient pine tree with hundreds of cloth strips tied to its branches.' },
            { type: 'narration', text: 'People move around you—beggars, but not broken. They train. They cook. They laugh.' },
            { type: 'internal', text: 'This place...' },
            { type: 'internal', text: 'It\'s still poor. Still hidden. Still at the bottom of the world.' },
            { type: 'internal', text: 'But it\'s ALIVE in a way the streets aren\'t.' },
            { type: 'internal', text: 'This isn\'t survival. This is... home. Someone\'s home.' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'Old Dao leads you toward three figures waiting beneath the pine tree.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Elders. I bring a newcomer."' },
            { type: 'narration', text: 'The three figures turn.' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"So this is him. The one you\'ve been watching."', emotion: 'kind' },
            { type: 'dialogue', speaker: 'ELDER WU', text: '"Looks half-dead. Are you sure, old man?"', emotion: 'stern' },
            { type: 'dialogue', speaker: 'ELDER MEI', text: '"Oh, I like his eyes. There\'s something in there. Something waiting."', emotion: 'intense' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"These are the Elders of the Beggars Sect. Chen. Wu. Mei. They lead what remains of us."' },
            { type: 'narration', text: 'He gestures for you to step forward.' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Show them the pendant."' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'dialogue', speaker: 'LI WEI', text: '"What?"' },
            { type: 'dialogue', speaker: 'OLD DAO', text: '"Trust me. Show them."' },
            { type: 'narration', text: 'You hesitate, then lift the pendant.' },
            { type: 'effect', effect: { type: 'pendant-glow', intensity: 'bright' } },
            { type: 'narration', text: 'All three Elders\' expressions change.' },
            { type: 'narration', text: 'Chen\'s eyes widen. Wu\'s arms uncross. Mei leans forward.' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Where did you get that?"', emotion: 'quiet' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"I... I woke up with it. I don\'t know where it came from."' },
            { type: 'dialogue', speaker: 'ELDER WU', text: '"Is it authentic?"' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Yes. It\'s real. I\'ve seen one before. Once. Forty years ago."' },
            { type: 'dialogue', speaker: 'ELDER MEI', text: '"Do you know what it IS?"' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"No. Nothing. I don\'t remember anything."' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'A long pause. The Elders exchange looks.' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Young man. What is your name?"' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"Li Wei. At least... I think so. It\'s the only thing I know for certain."' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Li Wei. Do you know why you fought so well in the streets? Why your body knows techniques your mind has forgotten?"' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"No."' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Neither do I. Not yet."' },
            { type: 'narration', text: 'He steps forward, placing a hand on your shoulder.' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"But I believe we can find out. Together."' },
          ],
        },
        {
          type: 'choice',
          prompt: 'Elder Chen offers to teach you.',
          choices: [
            {
              id: 'what-is-this',
              label: 'What is this place?',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"What is this place? The \'Beggars Sect\'?"' },
                { type: 'dialogue', speaker: 'ELDER CHEN', text: '"We are the forgotten who chose not to forget. The discarded who found value in each other. The empty who discovered fullness in emptiness."' },
                { type: 'narration', text: 'He smiles.' },
                { type: 'dialogue', speaker: 'ELDER CHEN', text: '"We are beggars. And we are free."' },
              ],
            },
            {
              id: 'what-do-you-want',
              label: 'What do you want from me?',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"What do you want from me?"' },
                { type: 'dialogue', speaker: 'ELDER WU', text: '"A fair question. Most who wash up here want something. We do too."', emotion: 'gruff' },
                { type: 'dialogue', speaker: 'ELDER CHEN', text: '"We want to help you discover what you are. In return, we hope you\'ll help us preserve what we are."' },
                { type: 'dialogue', speaker: 'ELDER MEI', text: '"Also, we\'re always looking for new fighters. And you can FIGHT, can\'t you?"', emotion: 'grinning' },
              ],
            },
            {
              id: 'accept',
              label: 'I accept.',
              response: [],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'dialogue', speaker: 'LI WEI', text: '"I... I accept. Whatever this is. Wherever this leads. I accept."' },
            { type: 'narration', text: 'Elder Chen smiles warmly.' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Then welcome, Li Wei, to the Beggars Sect."' },
            { type: 'narration', text: 'He gestures to the courtyard.' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Welcome home."' },
            { type: 'narration', text: 'Old Dao watches from the shadows, nodding to himself.' },
            { type: 'narration', text: 'Then—between one moment and the next—he\'s gone.' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'effect', effect: { type: 'fade', direction: 'out', color: 'black' } },
            { type: 'system', text: 'PROLOGUE COMPLETE' },
            { type: 'pause', duration: 2000 },
            { type: 'narration', text: 'Li Wei has found shelter.' },
            { type: 'narration', text: 'But shelter is just the beginning.' },
            { type: 'pause', duration: 1500 },
            { type: 'narration', text: 'Questions remain:' },
            { type: 'narration', text: '• What is the pendant?' },
            { type: 'narration', text: '• Who trained Li Wei?' },
            { type: 'narration', text: '• What are the white rooms in his dreams?' },
            { type: 'pause', duration: 2000 },
            { type: 'narration', text: 'And beyond the Hidden Corner,' },
            { type: 'narration', text: 'forces are already stirring.' },
            { type: 'narration', text: 'Forces that want him back.' },
            { type: 'pause', duration: 2000 },
            { type: 'system', text: 'CHAPTER 1: STREETS OF THE FORGOTTEN' },
          ],
        },
      ],
      nextScene: undefined, // End of prologue
    },
  ],
  startScene: 'p1-void',
  endScenes: ['p7-hidden-corner'],
};
