/**
 * Combat Message Variety
 * Phrase pools for varied combat messages to reduce repetition
 */

// =============================================================================
// ATTACK PHRASES
// =============================================================================

export const ATTACK_PHRASES = {
  basic: [
    '{actor} strikes {target}',
    '{actor} lands a blow on {target}',
    '{actor} connects with {target}',
    '{actor} hits {target}',
    '{actor} attacks {target}',
  ],

  critical: [
    '{actor} finds an opening in {target}\'s defense',
    '{actor}\'s strike hits true',
    'A perfect strike from {actor}',
    '{actor} exploits a weakness',
    '{actor} strikes with precision',
  ],

  miss: [
    '{actor}\'s attack misses {target}',
    '{target} evades {actor}\'s strike',
    '{actor}\'s blow goes wide',
    '{target} sidesteps {actor}\'s attack',
  ],
};

// =============================================================================
// DAMAGE PHRASES (appended to attack messages)
// =============================================================================

export const DAMAGE_PHRASES = {
  light: [ // < 20% of target's max HP
    'for {damage} damage!',
    '- {damage} damage!',
    'dealing {damage} damage!',
  ],

  moderate: [ // 20-40% of target's max HP
    'for {damage} damage!',
    'dealing {damage} damage!',
    '- a solid {damage} damage!',
  ],

  heavy: [ // 40-70% of target's max HP
    'for {damage} damage!',
    'dealing a crushing {damage} damage!',
    '- {damage} damage! That hurt!',
  ],

  massive: [ // > 70% of target's max HP
    'for a devastating {damage} damage!',
    'dealing a massive {damage} damage!',
    '- {damage} damage! A brutal blow!',
  ],
};

// =============================================================================
// DEFEAT PHRASES
// =============================================================================

export const DEFEAT_PHRASES = [
  '{target} is defeated!',
  '{target} falls!',
  '{target} collapses!',
  '{target} has been defeated!',
  '{target} is down!',
];

// =============================================================================
// TECHNIQUE USAGE PHRASES
// =============================================================================

export const TECHNIQUE_PHRASES: Record<string, string[]> = {
  // Flowing techniques
  'flowing-palm': [
    '{actor} flows like water, palm striking {target}',
    'With fluid grace, {actor} unleashes Flowing Palm on {target}',
    '{actor}\'s palm flows toward {target}',
  ],

  'rippling-strike': [
    '{actor}\'s strike ripples through {target}',
    'Like a stone in water, {actor} strikes {target}',
    '{actor} unleashes Rippling Strike on {target}',
  ],

  'double-palm': [
    '{actor} strikes {target} twice in rapid succession',
    'Two palms flash out from {actor}',
    '{actor} delivers a double palm strike to {target}',
  ],

  'finishing-palm': [
    '{actor} delivers a finishing blow to {target}',
    'With decisive force, {actor} strikes {target}',
    '{actor} unleashes Finishing Palm on {target}',
  ],

  // Weathered techniques
  'weathered-guard': [
    '{actor} raises an unyielding guard',
    'Like stone, {actor} stands firm',
    '{actor} adopts Weathered Guard',
  ],

  'boulder-palm': [
    '{actor}\'s palm falls like a boulder on {target}',
    'With crushing weight, {actor} strikes {target}',
    '{actor} unleashes Boulder Palm',
  ],

  'iron-skin': [
    '{actor}\'s skin hardens like iron',
    '{actor} channels defensive chi',
    '{actor} activates Iron Skin',
  ],

  // Hungry techniques
  'starving-strike': [
    '{actor} strikes {target} with desperate hunger',
    'Ravenous, {actor} attacks {target}',
    '{actor} unleashes Starving Strike',
  ],

  'chi-drain': [
    '{actor} drains chi from {target}',
    '{actor}\'s touch leeches energy from {target}',
    '{actor} siphons chi from {target}',
  ],

  'desperate-flurry': [
    '{actor} unleashes a desperate flurry on {target}',
    'In desperation, {actor} strikes wildly at {target}',
    '{actor}\'s attacks come fast and reckless',
  ],

  // Generic technique
  default: [
    '{actor} uses {technique} on {target}',
    '{actor} unleashes {technique}',
    '{actor} executes {technique} against {target}',
  ],
};

// =============================================================================
// STANCE CHANGE PHRASES
// =============================================================================

export const STANCE_PHRASES: Record<string, string[]> = {
  'Flowing Stance': [
    '{actor} shifts to Flowing Stance',
    '{actor} becomes like water',
    '{actor} adopts Flowing Stance',
  ],

  'Weathered Stance': [
    '{actor} shifts to Weathered Stance',
    '{actor} becomes like stone',
    '{actor} adopts Weathered Stance',
  ],

  'Hungry Stance': [
    '{actor} shifts to Hungry Stance',
    '{actor}\'s movements become desperate',
    '{actor} adopts Hungry Stance',
  ],
};

// =============================================================================
// DEFEND PHRASES
// =============================================================================

export const DEFEND_PHRASES = [
  '{actor} takes a defensive stance',
  '{actor} focuses on defense',
  '{actor} guards carefully',
  '{actor} prepares to defend',
];

// =============================================================================
// CHI FOCUS PHRASES
// =============================================================================

export const CHI_FOCUS_PHRASES = [
  '{actor} focuses their chi',
  '{actor} centers their energy',
  '{actor} meditates briefly',
  '{actor} draws in chi',
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get a random phrase from an array
 */
function getRandomPhrase(phrases: string[]): string {
  return phrases[Math.floor(Math.random() * phrases.length)] ?? phrases[0] ?? '';
}

/**
 * Replace placeholders in a phrase
 */
function fillPhrase(
  phrase: string,
  replacements: Record<string, string | number>
): string {
  let result = phrase;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(`{${key}}`, String(value));
  }
  return result;
}

/**
 * Get damage tier based on percentage of max HP
 */
function getDamageTier(damage: number, targetMaxHp: number): keyof typeof DAMAGE_PHRASES {
  const percentage = (damage / targetMaxHp) * 100;
  if (percentage < 20) return 'light';
  if (percentage < 40) return 'moderate';
  if (percentage < 70) return 'heavy';
  return 'massive';
}

// =============================================================================
// PUBLIC API
// =============================================================================

/**
 * Generate a varied attack message
 */
export function getAttackMessage(
  actorName: string,
  targetName: string,
  damage: number,
  targetMaxHp: number,
  isCritical: boolean
): string {
  const attackPhrase = isCritical
    ? getRandomPhrase(ATTACK_PHRASES.critical)
    : getRandomPhrase(ATTACK_PHRASES.basic);

  const damageTier = getDamageTier(damage, targetMaxHp);
  const damagePhrase = getRandomPhrase(DAMAGE_PHRASES[damageTier]);

  const attackPart = fillPhrase(attackPhrase, {
    actor: actorName,
    target: targetName,
  });

  const damagePart = fillPhrase(damagePhrase, {
    damage,
  });

  return `${attackPart} ${damagePart}`;
}

/**
 * Generate a varied technique usage message
 */
export function getTechniqueMessage(
  actorName: string,
  targetName: string,
  techniqueName: string,
  techniqueId: string
): string {
  const phrases = TECHNIQUE_PHRASES[techniqueId] ?? TECHNIQUE_PHRASES.default ?? [];
  const phrase = getRandomPhrase(phrases);

  return fillPhrase(phrase, {
    actor: actorName,
    target: targetName,
    technique: techniqueName,
  });
}

/**
 * Generate a varied stance change message
 */
export function getStanceMessage(actorName: string, stanceName: string): string {
  const phrases = STANCE_PHRASES[stanceName] ?? [`{actor} changes to ${stanceName}`];
  const phrase = getRandomPhrase(phrases);

  return fillPhrase(phrase, {
    actor: actorName,
  });
}

/**
 * Generate a varied defend message
 */
export function getDefendMessage(actorName: string): string {
  const phrase = getRandomPhrase(DEFEND_PHRASES);
  return fillPhrase(phrase, { actor: actorName });
}

/**
 * Generate a varied chi focus message
 */
export function getChiFocusMessage(actorName: string): string {
  const phrase = getRandomPhrase(CHI_FOCUS_PHRASES);
  return fillPhrase(phrase, { actor: actorName });
}

/**
 * Generate a varied defeat message
 */
export function getDefeatMessage(targetName: string): string {
  const phrase = getRandomPhrase(DEFEAT_PHRASES);
  return fillPhrase(phrase, { target: targetName });
}
