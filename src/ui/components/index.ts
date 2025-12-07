/**
 * UI Components
 * Reusable UI building blocks
 */

// Core containers
export {
  MenuContainer,
  ScreenBox,
  MessageDisplay,
  SectionHeader,
  type MenuContainerProps,
  type MessageDisplayProps,
  type SectionHeaderProps,
} from './MenuContainer';

// Polished UI components
export {
  CenteredScreen,
  PolishedBox,
  MessageBox,
  useTerminalHeight,
  type CenteredScreenProps,
  type PolishedBoxProps,
} from './PolishedBox';

// Menu system
export {
  SelectMenu,
  type MenuItem,
  type SelectMenuProps,
} from './Menu';

// Decorative elements
export {
  Divider,
  Header,
  TopBorder,
  Spacer,
  type DividerProps,
  type HeaderProps,
  type BorderProps,
} from './Decorative';

// SelectInput wrapper
export { SelectInputComponent } from './SelectInputWrapper';
