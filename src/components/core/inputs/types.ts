// src/components/core/inputs/types.ts
import { TextInput } from 'react-native';

export interface InputFieldProps {
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Current input value */
  value: string;
  /** Callback when input value changes */
  onChangeText: (text: string) => void;
  /** Keyboard type for the input */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url' | 'number-pad' | 'decimal-pad';
  /** Auto-capitalization behavior */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Whether to hide input text (for passwords) */
  secureTextEntry?: boolean;
  /** Show/hide password toggle button */
  showPasswordToggle?: boolean;
  /** Callback for password toggle */
  onTogglePassword?: () => void;
  /** Error message to display (triggers error state) */
  error?: string;
  /** General feedback message */
  feedback?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is in valid state (shows green border) */
  valid?: boolean;
  /** Callback when input receives focus */
  onFocus?: () => void;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Ref to the TextInput component */
  inputRef?: React.RefObject<TextInput>;
  /** Enable multiline input */
  multiline?: boolean;
  /** Number of lines to show initially */
  numberOfLines?: number;
  /** Minimum number of lines (for dynamic growth) */
  minLines?: number;
  /** Maximum number of lines (for dynamic growth) */
  maxLines?: number;
  /** Maximum length of text */
  maxLength?: number;
  /** Return key type */
  returnKeyType?: 'default' | 'go' | 'google' | 'join' | 'next' | 'route' | 'search' | 'send' | 'yahoo' | 'done' | 'emergency-call';
  /** Callback when return key is pressed */
  onSubmitEditing?: () => void;
}

export type InputState = 'default' | 'disabled' | 'focus' | 'error' | 'valid';
