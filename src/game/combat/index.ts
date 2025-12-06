/**
 * Combat Module
 * Exports all combat-related functionality
 */

export { CombatEngine } from './CombatEngine';
export { AIController } from './AIController';
export {
  getTechnique,
  getAllTechniques,
  getPlayerTechniques,
  getTechniquesForCharacter,
  canUseTechnique,
  getComboFollowups,
  getStarterTechniques,
  getFinisherTechniques,
} from './TechniqueRegistry';
