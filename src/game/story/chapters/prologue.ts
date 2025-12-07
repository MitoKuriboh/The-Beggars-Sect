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
            { type: 'narration', text: 'Darkness. Then—pain.' },
            { type: 'pause', duration: 300 },
            { type: 'narration', text: 'Something tears inside you. Wrong. Backward. Like water flowing uphill.' },
            { type: 'pause', duration: 200 },
          ],
        },
        {
          type: 'choice',
          prompt: 'What do you do?',
          choices: [
            {
              id: 'open-eyes',
              label: 'Force your eyes open',
              response: [
                { type: 'narration', text: 'You force your eyes open. Blinding white light.' },
                { type: 'narration', text: 'Shapes. Figures in white coats. Machinery.' },
                { type: 'dialogue', speaker: 'VOICE (URGENT)', text: '"Subject 17 is conscious! Increase sedation—"' },
                { type: 'effect', effect: { type: 'flash', color: 'white', duration: 200 } },
                { type: 'internal', text: 'Subject... seventeen?' },
              ],
              effects: [{ type: 'path', path: 'blade', delta: 1 }],
            },
            {
              id: 'listen',
              label: 'Stay still and listen',
              response: [
                { type: 'internal', text: 'Don\'t move. Don\'t let them know you\'re awake.' },
                { type: 'narration', text: 'You keep your breathing steady. Listen.' },
                { type: 'dialogue', speaker: 'VOICE (CLINICAL)', text: '"Subject 17\'s readings are... unprecedented."' },
                { type: 'dialogue', speaker: 'VOICE (NERVOUS)', text: '"The forbidden aspect is manifesting—"' },
                { type: 'internal', text: 'They\'re talking about me. Like I\'m an experiment.' },
              ],
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
            },
            {
              id: 'fight-it',
              label: 'Fight the darkness',
              response: [
                { type: 'internal', text: 'No. I won\'t let go. I won\'t—' },
                { type: 'narration', text: 'You cling to consciousness with everything you have.' },
                { type: 'narration', text: 'The pain intensifies. Your body convulses.' },
                { type: 'dialogue', speaker: 'VOICE (SHOUTING)', text: '"We\'re losing containment! Subject 17 is fighting back!"' },
                { type: 'internal', text: 'Good.' },
              ],
              effects: [{ type: 'path', path: 'stream', delta: 1 }],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'pause', duration: 400 },
            { type: 'dialogue', speaker: 'DIRECTOR SHEN', text: '"Proceed. After seventeen failures, Subject 17 finally exhibits inverse chi."' },
            { type: 'pause', duration: 300 },
            { type: 'narration', text: 'You try to move. Can\'t. Your body doesn\'t respond.' },
            { type: 'internal', text: 'What are they doing to me?' },
          ],
        },
        {
          type: 'choice',
          prompt: 'You try to resist...',
          choices: [
            {
              id: 'scream',
              label: 'Try to scream',
              response: [
                { type: 'internal', text: 'STOP—' },
                { type: 'narration', text: 'Nothing comes out. Your voice is gone. Or was it ever there?' },
                { type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } },
                { type: 'narration', text: 'Something on your chest warms suddenly. A pendant?' },
                { type: 'internal', text: 'I can\'t... I can\'t even scream.' },
              ],
            },
            {
              id: 'fight',
              label: 'Fight against the restraints',
              response: [
                { type: 'narration', text: 'You strain against invisible bonds. Your muscles scream but nothing moves.' },
                { type: 'internal', text: 'Move. MOVE!' },
                { type: 'effect', effect: { type: 'shake' } },
                { type: 'narration', text: 'For a moment, something shifts. The restraints flicker.' },
                { type: 'narration', text: 'Then your body stills. Betraying you.' },
              ],
            },
            {
              id: 'understand',
              label: 'Try to understand what\'s happening',
              response: [
                { type: 'internal', text: 'Subject 17. They called me Subject 17.' },
                { type: 'internal', text: 'Seventeen failures before me.' },
                { type: 'effect', effect: { type: 'flash', color: 'white', duration: 100 } },
                { type: 'narration', text: 'A flash—memory? Vision? Numbers. White rooms. Pain.' },
                { type: 'internal', text: 'What happened to them?' },
              ],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'effect', effect: { type: 'flash', color: 'white', duration: 200 } },
            { type: 'narration', text: 'A sharp electronic tone. Building. Piercing.' },
            { type: 'pause', duration: 300 },
            { type: 'narration', text: 'Something TEARS inside you—not painful, but WRONG.' },
            { type: 'narration', text: 'Like water flowing uphill. Like time running backward.' },
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
            { type: 'pause', duration: 400 },
            { type: 'internal', text: 'I should know. I should KNOW.' },
            { type: 'internal', text: 'There should be a name for this place. A reason I\'m here.' },
            { type: 'internal', text: 'But there\'s nothing. Just... grey.' },
          ],
        },
        {
          type: 'choice',
          prompt: 'What do you do first?',
          choices: [
            {
              id: 'examine-self',
              label: 'Examine yourself',
              response: [
                { type: 'narration', text: 'You look down at yourself. Dirty clothes. Scraped hands.' },
                { type: 'narration', text: 'Your body feels foreign, like borrowed skin.' },
                { type: 'internal', text: 'These hands... are they mine?' },
                { type: 'pause', duration: 1000 },
                { type: 'narration', text: 'You touch your face. Rough stubble. Gaunt cheeks.' },
                { type: 'internal', text: 'I don\'t recognize myself.' },
              ],
            },
            {
              id: 'examine-surroundings',
              label: 'Look around the alley',
              response: [
                { type: 'narration', text: 'The alley stretches in both directions. Garbage piled against crumbling walls.' },
                { type: 'narration', text: 'Graffiti marks the stone: symbols you don\'t recognize.' },
                { type: 'internal', text: 'This place... it feels wrong. Oppressive.' },
                { type: 'pause', duration: 1000 },
                { type: 'narration', text: 'In the distance, you hear voices. Crowds. Life.' },
                { type: 'internal', text: 'Maybe someone out there knows who I am.' },
              ],
            },
            {
              id: 'try-remember',
              label: 'Try to remember',
              response: [
                { type: 'narration', text: 'You close your eyes. Try to remember. Anything.' },
                { type: 'pause', duration: 800 },
                { type: 'internal', text: 'Come on. THINK.' },
                { type: 'pause', duration: 800 },
                { type: 'narration', text: 'Flashes. White rooms. Clinical voices. Numbers.' },
                { type: 'internal', text: 'Seventeen...' },
                { type: 'pause', duration: 600 },
                { type: 'narration', text: 'Then nothing. The memory slips away like water.' },
                { type: 'internal', text: 'It\'s gone. Whatever was there... it\'s gone.' },
              ],
            },
          ],
        },
        {
          type: 'content',
          lines: [
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
            { type: 'pause', duration: 400 },
            { type: 'internal', text: 'No. More than that.' },
            { type: 'internal', text: 'It feels like the ONLY thing that\'s real.' },
            { type: 'narration', text: 'Your fingers close around it. Warm. Alive.' },
            { type: 'internal', text: 'Like it\'s been waiting for me to remember it.' },
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
          type: 'choice',
          prompt: 'What catches your attention first?',
          choices: [
            {
              id: 'observe-people',
              label: 'The people struggling to survive',
              tag: 'Empathetic',
              response: [
                { type: 'internal', text: 'These people. Each one has a story.' },
                { type: 'internal', text: 'Each one is fighting just to see tomorrow.' },
                { type: 'narration', text: 'You watch them move through the plaza, studying their patterns.' },
              ],
              effects: [{ type: 'path', path: 'stream', delta: 1 }],
            },
            {
              id: 'observe-authority',
              label: 'The soldiers patrolling',
              tag: 'Vigilant',
              response: [
                { type: 'internal', text: 'Those soldiers. Authority. Power.' },
                { type: 'internal', text: 'Something about them makes my skin crawl.' },
                { type: 'narration', text: 'You keep to the shadows, watching how they move.' },
              ],
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
            },
            {
              id: 'observe-economy',
              label: 'The market and trade',
              tag: 'Practical',
              response: [
                { type: 'internal', text: 'A market. Even here, people trade.' },
                { type: 'internal', text: 'If I\'m going to survive, I need to understand how this works.' },
                { type: 'narration', text: 'You drift toward the lean-to market.' },
              ],
              effects: [{ type: 'path', path: 'blade', delta: 1 }],
            },
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
          ],
        },
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
                { type: 'narration', text: 'You watch how they move, who defers to whom, where the invisible lines are drawn.' },
                { type: 'internal', text: 'Understanding this might keep me alive.' },
              ],
              effects: [
                { type: 'stat', stat: 'wisdom', delta: 1 },
                { type: 'path', path: 'shadow', delta: 2 },
                { type: 'flag', flag: 'observed-plaza', value: true },
              ],
            },
            {
              id: 'help-someone',
              label: 'Help the begging mother',
              tag: 'Compassionate',
              response: [
                { type: 'internal', text: 'That woman. She needs help.' },
                { type: 'internal', text: 'Even if I have nothing, maybe I can do something.' },
                { type: 'narration', text: 'You approach the begging mother again.' },
              ],
              effects: [
                { type: 'path', path: 'stream', delta: 2 },
                { type: 'flag', flag: 'helped-mother', value: true },
              ],
            },
            {
              id: 'move-on',
              label: 'Find shelter quickly',
              tag: 'Practical',
              response: [
                { type: 'internal', text: 'I need shelter. Food. Safety.' },
                { type: 'internal', text: 'Understanding can wait. Survival can\'t.' },
              ],
              effects: [
                { type: 'path', path: 'blade', delta: 2 },
                { type: 'flag', flag: 'moved-quickly', value: true },
              ],
            },
          ],
        },
      ],
      nextScene: 'p3a-branch',
    },

    // =========================================================================
    // SCENE P.3A: PATH BRANCH (Conditional)
    // =========================================================================
    {
      id: 'p3a-branch',
      title: 'First Choice',
      type: 'interactive',
      location: 'Lower Streets',
      estimatedMinutes: 2,
      content: [
        {
          type: 'choice',
          choices: [
            {
              id: 'shadow-branch',
              label: 'Continue',
              response: [
                { type: 'system', text: 'SHADOW PATH' },
                { type: 'narration', text: 'You linger in the shadows, watching the plaza flow like a living organism.' },
                { type: 'narration', text: 'You notice a hooded figure moving through the crowd—purposeful, controlled.' },
                { type: 'internal', text: 'Not a beggar. Too clean. Too aware.' },
                { type: 'narration', text: 'The figure stops at the makeshift shrine, drops something, then vanishes into an alley.' },
                { type: 'internal', text: 'Who was that? And what did they leave?' },
                { type: 'narration', text: 'You approach the shrine. Among the worthless offerings: a small cloth bundle.' },
                { type: 'narration', text: 'Inside—a dried rice cake and a note: "For those who see."' },
                { type: 'internal', text: 'Someone is watching the watchers.' },
                { type: 'narration', text: 'You pocket the rice cake. It might be your only meal today.' },
                { type: 'internal', text: 'But the note... that stays with me longer.' },
                { type: 'pause', duration: 800 },
                { type: 'narration', text: 'You head toward a narrow passage leading deeper into the streets.' },
              ],
              condition: { type: 'flag', flag: 'observed-plaza', value: true },
            },
            {
              id: 'stream-branch',
              label: 'Continue',
              response: [
                { type: 'system', text: 'STREAM PATH' },
                { type: 'dialogue', speaker: 'LI WEI', text: '"Is there anything I can do? I don\'t have money, but..."' },
                { type: 'narration', text: 'The begging mother looks up at you. Her eyes are weary but kind.' },
                { type: 'dialogue', speaker: 'BEGGING MOTHER', text: '"You have nothing. Yet you offer help."' },
                { type: 'narration', text: 'She studies you for a long moment.' },
                { type: 'dialogue', speaker: 'BEGGING MOTHER', text: '"That pendant. It\'s dangerous. Hide it better."' },
                { type: 'narration', text: 'She reaches into her rags, pulls out a torn strip of cloth.' },
                { type: 'dialogue', speaker: 'BEGGING MOTHER', text: '"Wrap it. Make it look worthless. Like everything else here."' },
                { type: 'narration', text: 'You take the cloth. It smells like incense.' },
                { type: 'dialogue', speaker: 'LI WEI', text: '"Thank you."' },
                { type: 'dialogue', speaker: 'BEGGING MOTHER', text: '"Thank me by surviving. One more day than they expect."' },
                { type: 'internal', text: 'She knows something. About the pendant. About me?' },
                { type: 'narration', text: 'You wrap the pendant carefully. It feels... safer.' },
                { type: 'pause', duration: 800 },
                { type: 'narration', text: 'You head toward a narrow passage leading deeper into the streets.' },
              ],
              condition: { type: 'flag', flag: 'helped-mother', value: true },
            },
            {
              id: 'blade-branch',
              label: 'Continue',
              response: [
                { type: 'system', text: 'BLADE PATH' },
                { type: 'narration', text: 'You head directly toward the narrow passages, not looking back.' },
                { type: 'internal', text: 'No time for observation. I need to find shelter before nightfall.' },
                { type: 'narration', text: 'As you walk, you notice someone following you. Keeping distance.' },
                { type: 'internal', text: 'Another thug? Or just paranoia?' },
                { type: 'narration', text: 'You turn a corner sharply, then press against the wall, waiting.' },
                { type: 'narration', text: 'Footsteps approach. You coil, ready to strike—' },
                { type: 'dialogue', speaker: 'YOUNG VOICE', text: '"Wait! I\'m not here to rob you!"' },
                { type: 'narration', text: 'A boy, maybe twelve, raises his hands in surrender.' },
                { type: 'dialogue', speaker: 'BOY', text: '"You\'re new. I saw you in the plaza. You move like a fighter."' },
                { type: 'dialogue', speaker: 'LI WEI', text: '"What do you want?"' },
                { type: 'dialogue', speaker: 'BOY', text: '"To warn you. The gangs are watching newcomers. Especially ones with anything valuable."' },
                { type: 'narration', text: 'His eyes flick to your pendant.' },
                { type: 'dialogue', speaker: 'BOY', text: '"Hide that. Or you won\'t last the week."' },
                { type: 'narration', text: 'He darts away before you can respond.' },
                { type: 'internal', text: 'The gangs. Everyone keeps mentioning them.' },
                { type: 'internal', text: 'If they come for me... I\'ll be ready.' },
                { type: 'pause', duration: 800 },
                { type: 'narration', text: 'You head toward a narrow passage leading deeper into the streets.' },
              ],
              condition: { type: 'flag', flag: 'moved-quickly', value: true },
            },
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
            { type: 'narration', text: 'A large figure steps from the darkness, blocking your path.' },
            { type: 'dialogue', speaker: 'BRAWLER', text: '"End of the line, vagrant."', emotion: 'threatening' },
            { type: 'narration', text: 'He\'s big. Scarred knuckles. This isn\'t his first fight.' },
            { type: 'dialogue', speaker: 'BRAWLER', text: '"That pendant. Hand it over, and maybe you keep your teeth."', emotion: 'greedy' },
            { type: 'internal', text: 'He\'s blocking the only exit. I\'m cornered.' },
            { type: 'internal', text: 'I should be afraid.' },
            { type: 'internal', text: 'But instead I feel...' },
            { type: 'narration', text: 'Your hands curl into fists automatically.' },
            { type: 'internal', text: '...ready.' },
          ],
        },
        {
          type: 'choice',
          prompt: 'The brawler demands your pendant.',
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
                { type: 'dialogue', speaker: 'BRAWLER', text: '"Quit stalling! I\'ll take it myself!"' },
              ],
              effects: [{ type: 'path', path: 'stream', delta: 1 }],
            },
            {
              id: 'refuse',
              label: 'Refuse',
              tag: 'Defiant',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"No."' },
                { type: 'dialogue', speaker: 'BRAWLER', text: '"\'No\'? You don\'t get to say no, vagrant."', emotion: 'laughing' },
                { type: 'narration', text: 'He advances, cracking his knuckles.' },
              ],
              effects: [{ type: 'path', path: 'blade', delta: 2 }],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'system', text: 'COMBAT TUTORIAL: Three stances define your approach to battle.' },
            { type: 'system', text: 'FLOWING STANCE (Active): Circular movements. Your natural state—letting force pass through.' },
            { type: 'system', text: 'Use ATTACK to strike. Use DEFEND to reduce damage. Watch the turn order on the right.' },
            { type: 'system', text: 'More stances unlock as you train with the Elders.' },
          ],
        },
        {
          type: 'combat',
          enemies: ['alley-brawler'],
          canLose: false,
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'The brawler staggers back, blood on his lip.' },
            { type: 'dialogue', speaker: 'BRAWLER', text: '"You... you fight like a damn soldier..."', emotion: 'shocked' },
            { type: 'narration', text: 'He retreats, clutching his ribs.' },
            { type: 'dialogue', speaker: 'BRAWLER', text: '"Not worth it... not worth dying over..."' },
            { type: 'narration', text: 'Silence. Just your breathing.' },
            { type: 'narration', text: 'You look at your hands. Shaking now.' },
            { type: 'internal', text: 'I hurt him. I meant to hurt him.' },
            { type: 'pause', duration: 500 },
            { type: 'internal', text: 'And it felt... familiar.' },
          ],
        },
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
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
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
              effects: [{ type: 'path', path: 'stream', delta: 1 }],
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
              effects: [{ type: 'path', path: 'stream', delta: 1 }],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'You look at your hands again.' },
            { type: 'internal', text: 'These hands remember what my mind forgot.' },
            { type: 'internal', text: 'Someone taught me to fight.' },
            { type: 'internal', text: 'Before the white rooms. Or during them.' },
            { type: 'pause', duration: 500 },
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
          type: 'content',
          lines: [
            { type: 'system', text: 'DAY ONE' },
            { type: 'narration', text: 'Rain. Cold. You huddle in an alley.' },
            { type: 'narration', text: 'Your clothes—already torn—offer no warmth.' },
            { type: 'internal', text: 'Nothing to eat since I woke.' },
            { type: 'internal', text: 'How long can a person last without food?' },
            { type: 'narration', text: 'You watch rainwater pool in the gutter.' },
          ],
        },
        {
          type: 'choice',
          prompt: 'The rainwater...',
          choices: [
            {
              id: 'drink-water',
              label: 'Drink the rainwater',
              response: [
                { type: 'internal', text: 'Clean enough to drink? Does it matter?' },
                { type: 'narration', text: 'You cup your hands. Drink.' },
                { type: 'internal', text: 'Tastes like rust and despair.' },
                { type: 'narration', text: 'But it\'s something. Your throat thanks you.' },
              ],
            },
            {
              id: 'avoid-water',
              label: 'Find cleaner water elsewhere',
              response: [
                { type: 'internal', text: 'That water could make me sick. I need to find something cleaner.' },
                { type: 'narration', text: 'You wander the alleys for an hour. Find nothing.' },
                { type: 'internal', text: 'Maybe I was too careful.' },
              ],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'pause', duration: 500 },
            { type: 'system', text: 'DAY TWO' },
            { type: 'narration', text: 'You watch others eat scraps from a garbage pile.' },
            { type: 'narration', text: 'Three people. Two adults, one child. They eat methodically, sorting through refuse.' },
            { type: 'internal', text: 'They have a system. Territory.' },
          ],
        },
        {
          type: 'choice',
          prompt: 'How do you get food?',
          choices: [
            {
              id: 'approach-family',
              label: 'Approach them politely',
              response: [
                { type: 'narration', text: 'You approach. The child sees you first—freezes.' },
                { type: 'dialogue', speaker: 'MAN', text: '"This is our corner. Find your own."' },
                { type: 'dialogue', speaker: 'LI WEI', text: '"I just need—"' },
                { type: 'dialogue', speaker: 'MAN', text: '"I said FIND. YOUR. OWN."' },
                { type: 'narration', text: 'He stands. Bigger than you. You back away.' },
                { type: 'internal', text: 'Even here, at the bottom, there are hierarchies.' },
              ],
              effects: [{ type: 'path', path: 'stream', delta: 1 }],
            },
            {
              id: 'find-own-pile',
              label: 'Search for your own pile',
              response: [
                { type: 'internal', text: 'I won\'t intrude on their territory.' },
                { type: 'narration', text: 'You search for hours. Most piles are claimed. What\'s left is rotten.' },
                { type: 'narration', text: 'You find half a moldy dumpling. It\'s better than nothing.' },
                { type: 'internal', text: 'This is what I\'ve become.' },
              ],
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'pause', duration: 500 },
            { type: 'system', text: 'DAY THREE' },
            { type: 'narration', text: 'A thug corners you in a narrow passage.' },
            { type: 'dialogue', speaker: 'THUG', text: '"You still got that pendant, yeah?"' },
            { type: 'internal', text: 'Another one. They never stop.' },
          ],
        },
        {
          type: 'choice',
          prompt: 'The thug wants your pendant.',
          choices: [
            {
              id: 'fight-thug',
              label: 'Fight him off',
              response: [
                { type: 'narration', text: 'You don\'t answer. Just raise your fists.' },
                { type: 'dialogue', speaker: 'THUG', text: '"Oh, we got a fighter now?"' },
                { type: 'narration', text: 'He swings. You block, counter, sweep his legs.' },
                { type: 'narration', text: 'He goes down hard. Doesn\'t get up.' },
                { type: 'internal', text: 'I\'m getting better. Or they\'re getting weaker.' },
                { type: 'narration', text: 'You search his pockets. Find two coppers and half a rice ball.' },
                { type: 'internal', text: 'Is this who I am now? A scavenger who beats people for scraps?' },
              ],
              effects: [{ type: 'path', path: 'blade', delta: 1 }],
            },
            {
              id: 'run-away',
              label: 'Run away',
              response: [
                { type: 'narration', text: 'You turn and sprint. He gives chase but you\'re faster.' },
                { type: 'internal', text: 'Another fight I didn\'t need.' },
                { type: 'narration', text: 'You lose yourself in the maze of alleys.' },
                { type: 'internal', text: 'How long can I keep running?' },
              ],
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'pause', duration: 500 },
            { type: 'system', text: 'DAY FOUR' },
            { type: 'narration', text: 'You sit against a wall, staring at nothing.' },
            { type: 'narration', text: 'A woman walks past. Drops a copper in your lap without looking.' },
            { type: 'internal', text: 'She thinks I\'m begging.' },
            { type: 'internal', text: 'Am I?' },
          ],
        },
        {
          type: 'choice',
          prompt: 'You have one copper coin.',
          choices: [
            {
              id: 'buy-food',
              label: 'Buy food from a vendor',
              response: [
                { type: 'narration', text: 'You find a street vendor selling steamed buns. One copper each.' },
                { type: 'narration', text: 'The bun is small, barely warm. But it\'s real food.' },
                { type: 'internal', text: 'First real meal in four days.' },
                { type: 'narration', text: 'It\'s gone in three bites.' },
              ],
            },
            {
              id: 'save-coin',
              label: 'Save it for emergencies',
              response: [
                { type: 'internal', text: 'One copper won\'t buy much. Better to save it.' },
                { type: 'narration', text: 'You tuck the coin away carefully.' },
                { type: 'internal', text: 'Maybe tomorrow I\'ll need it more.' },
                { type: 'narration', text: 'Your stomach growls in protest.' },
              ],
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'You look at the pendant hanging against your chest.' },
            { type: 'internal', text: 'The pendant stays warm. Even when I\'m cold.' },
            { type: 'internal', text: 'Even when everything else feels dead.' },
            { type: 'narration', text: 'You press it against your chest.' },
            { type: 'internal', text: 'It\'s the only thing that makes sense.' },
            { type: 'internal', text: 'It\'s the only thing that\'s mine.' },
            { type: 'effect', effect: { type: 'pendant-glow', intensity: 'faint' } },
            { type: 'pause', duration: 600 },
            { type: 'system', text: 'DAY FIVE' },
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
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
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
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
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
              effects: [{ type: 'path', path: 'stream', delta: 1 }],
            },
          ],
        },
        {
          type: 'choice',
          prompt: 'Old Dao waits patiently for your next question.',
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
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
            },
            {
              id: 'direct',
              label: 'Can you help me?',
              tag: 'Direct',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"Can you help me? I don\'t know where I am. I don\'t know who I am."' },
                { type: 'dialogue', speaker: 'OLD DAO', text: '"Help is what I do. Though perhaps not the help you expect."' },
              ],
              effects: [{ type: 'path', path: 'blade', delta: 1 }],
            },
            {
              id: 'curious',
              label: 'How can you "see" if you\'re blind?',
              tag: 'Curious',
              response: [
                { type: 'dialogue', speaker: 'LI WEI', text: '"How can you see anything? You\'re blind."' },
                { type: 'dialogue', speaker: 'OLD DAO', text: '"The eyes see surfaces. The soul sees truth. Guess which one is more useful?"', emotion: 'smiling' },
              ],
              effects: [{ type: 'path', path: 'shadow', delta: 1 }],
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
            { type: 'narration', text: 'Old Dao leads you through winding streets.' },
            { type: 'narration', text: 'He moves impossibly fast for someone blind—never stumbling, never hesitating.' },
            { type: 'internal', text: 'He knows every stone, every turn.' },
            { type: 'internal', text: 'Or he sees in a way I don\'t understand.' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'dialogue', speaker: 'OLD DAO', text: '"You\'ve been fighting. The streets teach that quickly. But you fight... differently."' },
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
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"So this is him. The lost one."', emotion: 'kind' },
            { type: 'narration', text: 'Chen is old—truly old. But his eyes are gentle.' },
            { type: 'dialogue', speaker: 'ELDER WU', text: '"Bah. Looks half-dead. Probably diseased. Why bring disease to our doorstep, Dao?"', emotion: 'gruff' },
            { type: 'narration', text: 'Wu stands rigid, arms crossed. Short grey hair, missing two fingers on her left hand. A warrior\'s posture, even in old age.' },
            { type: 'dialogue', speaker: 'ELDER MEI', text: '"Oh, Wu, hush. Look at his EYES. There\'s hunger in there. Not for food. For PURPOSE."', emotion: 'excited' },
            { type: 'narration', text: 'Mei leans forward, studying you like a puzzle to solve. Wild hair, intense gaze.' },
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
            { type: 'narration', text: 'Elder Mei steps closer, studying you with intense eyes.' },
            { type: 'dialogue', speaker: 'ELDER MEI', text: '"The Aptitude Array. Did you take the test?"' },
            { type: 'dialogue', speaker: 'LI WEI', text: '"I... I think so. I remember... failing. F-grade."' },
            { type: 'dialogue', speaker: 'ELDER WU', text: '"F-grade. The lowest possible."', emotion: 'bitter' },
            { type: 'dialogue', speaker: 'ELDER MEI', text: '"The Array reads seven aspects. Force. Flow. Precision. Burst. Armor. Sense. Will."' },
            { type: 'dialogue', speaker: 'ELDER MEI', text: '"But there\'s an eighth. The forbidden one. Inverse."' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Chi that flows backward. The Array cannot detect it—so it shows nothing."' },
            { type: 'dialogue', speaker: 'ELDER WU', text: '"F-grade. Broken. Worthless. That\'s what they call us."' },
            { type: 'dialogue', speaker: 'ELDER MEI', text: '"But we know better. Don\'t we, Li Wei?"' },
            { type: 'narration', text: 'The pendant pulses with warmth against your chest.' },
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
          prompt: 'Elder Chen asks what you seek.',
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
              effects: [
                { type: 'relationship', character: 'elder-chen', delta: 1 },
                { type: 'path', path: 'shadow', delta: 2 },
              ],
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
              effects: [
                { type: 'relationship', character: 'elder-wu', delta: 1 },
                { type: 'path', path: 'blade', delta: 2 },
              ],
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
              effects: [
                { type: 'relationship', character: 'elder-mei', delta: 1 },
                { type: 'path', path: 'stream', delta: 2 },
              ],
            },
          ],
        },
        {
          type: 'choice',
          prompt: 'The Elders consider your answer.',
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
            { type: 'pause', duration: 500 },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"We will teach you three approaches to the beggar\'s way."' },
            { type: 'dialogue', speaker: 'ELDER WU', text: '"The Blade—direct power. Break through obstacles."' },
            { type: 'dialogue', speaker: 'ELDER MEI', text: '"The Stream—flowing adaptation. Turn force against itself."' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"The Shadow—hidden truth. See what others miss."' },
          ],
        },
        {
          type: 'choice',
          choices: [
            {
              id: 'shadow-recognition',
              label: 'Continue',
              response: [
                { type: 'dialogue', speaker: 'ELDER MEI', text: '"Ah! I see it in your eyes. You\'re already watching, aren\'t you? Observing."', emotion: 'excited' },
                { type: 'dialogue', speaker: 'LI WEI', text: '"I... yes. I notice things. Patterns."' },
                { type: 'dialogue', speaker: 'ELDER CHEN', text: '"The Shadow calls to you. Good. We need more who can see beneath the surface."' },
                { type: 'internal', text: 'The Shadow. Yes. That feels... right.' },
              ],
              condition: { type: 'flag', flag: 'observed-plaza', value: true },
            },
            {
              id: 'stream-recognition',
              label: 'Continue',
              response: [
                { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Old Dao told us you helped someone in the plaza. When you had nothing to give."' },
                { type: 'dialogue', speaker: 'LI WEI', text: '"She needed help. I couldn\'t just walk past."' },
                { type: 'dialogue', speaker: 'ELDER CHEN', text: '"The Stream flows through you naturally. Compassion, even in hardship."', emotion: 'kind' },
                { type: 'internal', text: 'The Stream. Connection. Maybe I\'m not as alone as I thought.' },
              ],
              condition: { type: 'flag', flag: 'helped-mother', value: true },
            },
            {
              id: 'blade-recognition',
              label: 'Continue',
              response: [
                { type: 'dialogue', speaker: 'ELDER WU', text: '"You move with purpose. No hesitation. I watched you cross the plaza."', emotion: 'approving' },
                { type: 'dialogue', speaker: 'LI WEI', text: '"Hesitation gets you killed out there."' },
                { type: 'dialogue', speaker: 'ELDER WU', text: '"Exactly. The Blade cuts through doubt. You understand this already."' },
                { type: 'internal', text: 'The Blade. Direct action. Maybe that\'s who I need to be.' },
              ],
              condition: { type: 'flag', flag: 'moved-quickly', value: true },
            },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'narration', text: 'Elder Chen gestures to the courtyard.' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Which you choose... that will define your path. But for now—"' },
            { type: 'dialogue', speaker: 'ELDER CHEN', text: '"Welcome home."' },
            { type: 'narration', text: 'Old Dao watches from the shadows, nodding to himself.' },
            { type: 'narration', text: 'Then—between one moment and the next—he\'s gone.' },
          ],
        },
        {
          type: 'content',
          lines: [
            { type: 'effect', effect: { type: 'fade', direction: 'out', color: 'black' } },
            { type: 'pause', duration: 1000 },
            { type: 'system', text: '═══ PROLOGUE COMPLETE ═══' },
            { type: 'pause', duration: 1500 },
            { type: 'divider', label: 'YOUR JOURNEY' },
            { type: 'narration', text: 'You made choices that defined your path.' },
            { type: 'narration', text: 'Each decision revealed who you are becoming.' },
            { type: 'pause', duration: 1000 },
            { type: 'divider', label: 'QUESTIONS REMAIN' },
            { type: 'narration', text: '• What is the pendant and why does it suppress your chi?' },
            { type: 'narration', text: '• Who trained you to fight with such skill?' },
            { type: 'narration', text: '• What happened in the white rooms of your past?' },
            { type: 'narration', text: '• Why does the Calibration Initiative want you back?' },
            { type: 'pause', duration: 1500 },
            { type: 'narration', text: 'Li Wei has found shelter among the Beggars Sect.' },
            { type: 'narration', text: 'But shelter is just the beginning.' },
            { type: 'pause', duration: 1000 },
            { type: 'narration', text: 'Beyond the Hidden Corner, forces are already stirring.' },
            { type: 'narration', text: 'Forces that want him back.' },
            { type: 'pause', duration: 2000 },
            { type: 'system', text: 'TO BE CONTINUED IN CHAPTER 1' },
            { type: 'narration', text: '(Chapter 1: Streets of the Forgotten - Coming Soon)' },
          ],
        },
      ],
      nextScene: undefined, // End of prologue
    },
  ],
  startScene: 'p1-void',
  endScenes: ['p7-hidden-corner'],
};
