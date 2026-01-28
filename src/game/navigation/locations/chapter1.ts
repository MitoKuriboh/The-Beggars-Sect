/**
 * Chapter 1 Locations
 * The Gutter Ring - Razor's territory and surroundings
 */

import type { NavigationLocation } from '../../../types/navigation';

/**
 * All navigable locations in Chapter 1
 */
export const CHAPTER1_LOCATIONS: NavigationLocation[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // SAFE ZONES
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'beggars-corner',
    name: "Beggar's Corner",
    chinese: '乞丐角',
    description:
      'The hidden sanctuary of the Beggars Sect. Crumbling walls covered in moss hide a network of tunnels and training grounds. The Ancient Pine stands at its heart, roots reaching deep into forgotten cellars.',
    connectedTo: ['lower-streets'],
    dangerLevel: 'safe',
    encounterPool: [],
    encounterChance: 0,
    features: {
      hasRest: true,
      hasTraining: true,
      hasSavePoint: true,
      hasShop: false,
    },
    explorationAreas: [
      {
        id: 'ancient-pine',
        name: 'The Ancient Pine',
        description: 'A gnarled tree that has witnessed centuries of beggar disciples.',
        content: [
          {
            type: 'narration',
            text: 'The pine stands silent, its bark scarred with countless names and dates. Some are fresh. Many are faded beyond recognition.',
          },
          {
            type: 'narration',
            text: 'Elder Chen meditates beneath it every dawn. The tree seems to lean toward him, as if listening.',
          },
        ],
      },
      {
        id: 'training-ground',
        name: 'Training Ground',
        description: 'A cleared space where disciples practice their techniques.',
        content: [
          {
            type: 'narration',
            text: 'Packed earth, worn smooth by countless feet. Training dummies made of rope and cloth stand in rows.',
          },
          {
            type: 'dialogue',
            speaker: 'ELDER MEI',
            text: '"Hit them like you mean it! A half-hearted punch is worse than no punch at all!"',
          },
        ],
      },
      {
        id: 'elders-quarters',
        name: "Elders' Quarters",
        description: 'Where the three elders plan and rest.',
        content: [
          {
            type: 'narration',
            text: 'Three worn mats. A small fire pit. Maps of the Gutter Ring on the walls, marked with symbols only the elders understand.',
          },
        ],
      },
    ],
    chapter: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NEUTRAL ZONES
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'lower-streets',
    name: 'Lower Streets',
    chinese: '下街',
    description:
      'Narrow alleys and crumbling tenements. The smell of cooking fires mixes with refuse. People hurry past, eyes down, minding their own business.',
    connectedTo: ['beggars-corner', 'guttermouth-plaza', 'gang-territory', 'bone-yard', 'rust-heap'],
    dangerLevel: 'neutral',
    encounterPool: ['desperate-thug', 'street-punk'],
    encounterChance: 0.15,
    features: {
      hasRest: false,
      hasTraining: false,
      hasSavePoint: false,
      hasShop: false,
    },
    explorationAreas: [
      {
        id: 'market-stalls',
        name: 'Market Stalls',
        description: 'Ramshackle vendors selling whatever they can scrounge.',
        content: [
          {
            type: 'narration',
            text: 'A woman sells wilted vegetables. A man hawks "genuine" antiques that are clearly fake. Everyone watches everyone else.',
          },
        ],
      },
      {
        id: 'beggar-post',
        name: 'Beggar Post',
        description: 'A corner where beggars gather and share information.',
        content: [
          {
            type: 'narration',
            text: 'Several beggars sit here, bowls out. They nod at Li Wei—recognition. News travels fast in the Gutter Ring.',
          },
        ],
      },
    ],
    chapter: 1,
  },

  {
    id: 'guttermouth-plaza',
    name: 'Guttermouth Plaza',
    chinese: '臭嘴广场',
    description:
      'A wide open space where the Gutter Ring meets the Commerce Ring above. Spartans patrol the perimeter. Those without papers stay well back.',
    connectedTo: ['lower-streets', 'bright-spot'],
    dangerLevel: 'neutral',
    encounterPool: ['spartan-grunt'],
    encounterChance: 0.1,
    features: {
      hasRest: false,
      hasTraining: false,
      hasSavePoint: false,
      hasShop: false,
    },
    explorationAreas: [
      {
        id: 'checkpoint',
        name: 'Spartan Checkpoint',
        description: 'The official entrance to the Commerce Ring.',
        content: [
          {
            type: 'narration',
            text: 'Spartans in gleaming armor check papers. A long queue of people wait, hope and desperation in their eyes.',
          },
          {
            type: 'dialogue',
            speaker: 'SPARTAN',
            text: '"Move along. No loitering."',
          },
        ],
      },
    ],
    chapter: 1,
  },

  {
    id: 'bright-spot',
    name: 'The Bright Spot',
    chinese: '亮点',
    description:
      'A tavern that caters to both locals and the occasional slumming merchant. Neutral ground by unspoken agreement.',
    connectedTo: ['guttermouth-plaza'],
    dangerLevel: 'safe',
    encounterPool: [],
    encounterChance: 0,
    features: {
      hasRest: true,
      hasTraining: false,
      hasSavePoint: false,
      hasShop: false,
    },
    explorationAreas: [
      {
        id: 'bar',
        name: 'The Bar',
        description: 'Where information flows as freely as the cheap wine.',
        content: [
          {
            type: 'narration',
            text: 'The bartender polishes a glass that will never be clean. Conversations stop when strangers approach.',
          },
        ],
      },
      {
        id: 'back-room',
        name: 'Back Room',
        description: 'Where deals are made away from prying eyes.',
        content: [
          {
            type: 'narration',
            text: 'A curtain separates this space from the main room. The air is thick with smoke and secrets.',
          },
        ],
        discoveryFlag: 'found-bright-spot-backroom',
      },
    ],
    chapter: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DANGEROUS ZONES
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'gang-territory',
    name: 'Gang Territory',
    chinese: '帮派地盘',
    description:
      "Iron Dogs' claimed turf. Now Razor's. Graffiti marks the boundaries. Cross them without permission and you might not come back.",
    connectedTo: ['lower-streets', 'the-drain'],
    dangerLevel: 'dangerous',
    encounterPool: ['street-punk', 'alley-brawler', 'scarred-enforcer'],
    encounterChance: 0.35,
    unlockCondition: {
      type: 'scene-complete',
      sceneId: '1-2-awakening',
    },
    features: {
      hasRest: false,
      hasTraining: false,
      hasSavePoint: false,
      hasShop: false,
    },
    explorationAreas: [
      {
        id: 'gang-hideout',
        name: 'Gang Hideout',
        description: "A building claimed by Razor's crew.",
        content: [
          {
            type: 'narration',
            text: "Thugs loiter outside, watching everyone who passes. Razor's symbol is painted on the door—a blade dripping blood.",
          },
        ],
      },
      {
        id: 'protection-zone',
        name: 'Protection Zone',
        description: 'Shops that pay for "protection".',
        content: [
          {
            type: 'narration',
            text: 'Shopkeepers here look nervous. They pay Razor to be left alone. Some call it extortion. Razor calls it business.',
          },
        ],
      },
    ],
    chapter: 1,
  },

  {
    id: 'bone-yard',
    name: 'The Bone Yard',
    chinese: '骨场',
    description:
      'An abandoned construction site. Skeletal buildings never completed loom overhead. The Bone Collectors made this their home before Razor scattered them.',
    connectedTo: ['lower-streets'],
    dangerLevel: 'dangerous',
    encounterPool: ['desperate-thug', 'alley-brawler', 'wandering-fighter'],
    encounterChance: 0.3,
    unlockCondition: {
      type: 'any',
      conditions: [
        { type: 'scene-complete', sceneId: '1-3a-proving-ground' },
        { type: 'scene-complete', sceneId: '1-3b-service' },
        { type: 'scene-complete', sceneId: '1-3c-secrets' },
      ],
    },
    features: {
      hasRest: false,
      hasTraining: false,
      hasSavePoint: false,
      hasShop: false,
    },
    explorationAreas: [
      {
        id: 'bone-collector-camp',
        name: 'Bone Collector Camp',
        description: 'What remains of the scattered gang.',
        content: [
          {
            type: 'narration',
            text: 'A few ragged figures huddle around a fire. They were a gang once. Now they are just survivors, hiding from Razor.',
          },
        ],
        discoveryFlag: 'found-bone-collectors',
      },
    ],
    chapter: 1,
  },

  {
    id: 'rust-heap',
    name: 'The Rust Heap',
    chinese: '锈堆',
    description:
      'A junkyard of broken machines and discarded technology. Ratlings scavenge here, trading scraps for food. If you need something rare, someone here might have it.',
    connectedTo: ['lower-streets'],
    dangerLevel: 'dangerous',
    encounterPool: ['desperate-thug', 'street-punk'],
    encounterChance: 0.25,
    unlockCondition: {
      type: 'any',
      conditions: [
        { type: 'scene-complete', sceneId: '1-3a-proving-ground' },
        { type: 'scene-complete', sceneId: '1-3b-service' },
        { type: 'scene-complete', sceneId: '1-3c-secrets' },
      ],
    },
    features: {
      hasRest: false,
      hasTraining: false,
      hasSavePoint: false,
      hasShop: true,
    },
    explorationAreas: [
      {
        id: 'ratling-market',
        name: 'Ratling Market',
        description: 'Where the Ratlings trade their scavenged goods.',
        content: [
          {
            type: 'narration',
            text: 'Small, quick figures dart between piles of junk. They speak in rapid hand signs. One approaches, holding up something that might be valuable.',
          },
        ],
        discoveryFlag: 'found-ratlings',
      },
    ],
    chapter: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DEADLY ZONES
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'the-drain',
    name: 'The Drain',
    chinese: '下水道',
    description:
      "The deepest part of the Gutter Ring. Razor's inner sanctum. The air is thick with the stench of decay and the promise of violence.",
    connectedTo: ['gang-territory'],
    dangerLevel: 'deadly',
    encounterPool: ['alley-brawler', 'scarred-enforcer', 'gang-lieutenant'],
    encounterChance: 0.5,
    unlockCondition: {
      type: 'flag',
      flag: 'drain-entrance-found',
      value: true,
    },
    features: {
      hasRest: false,
      hasTraining: false,
      hasSavePoint: false,
      hasShop: false,
    },
    explorationAreas: [
      {
        id: 'razors-throne',
        name: "Razor's Throne",
        description: 'Where the gang lord holds court.',
        content: [
          {
            type: 'narration',
            text: 'A chair made of scrap metal and bone. Razor sits here, judging those brought before him. Few leave standing.',
          },
        ],
      },
    ],
    chapter: 1,
  },
];

/**
 * Get a location by ID
 */
export function getChapter1Location(id: string): NavigationLocation | undefined {
  return CHAPTER1_LOCATIONS.find(loc => loc.id === id);
}

/**
 * Get all locations connected to a given location
 */
export function getConnectedLocations(locationId: string): NavigationLocation[] {
  const location = getChapter1Location(locationId);
  if (!location) return [];

  return location.connectedTo
    .map(id => getChapter1Location(id))
    .filter((loc): loc is NavigationLocation => loc !== undefined);
}
