// src/components/core/inputs/hooks.ts
import { useCallback, useState } from 'react';

/**
 * Hook for managing input field state with validation
 */
export const useInputField = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    if (error && isTouched) {
      setError('');
    }
  }, [error, isTouched]);

  const handleBlur = useCallback(() => {
    setIsTouched(true);
  }, []);

  const validate = useCallback((validator: (value: string) => string | null) => {
    const validationError = validator(value);
    setError(validationError || '');
    return !validationError;
  }, [value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError('');
    setIsTouched(false);
  }, [initialValue]);

  return {
    value,
    error,
    isTouched,
    isValid: !error && isTouched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setError,
  };
};

/**
 * Hook for managing password input with visibility toggle
 */
export const usePasswordInput = (initialValue: string = '') => {
  const [showPassword, setShowPassword] = useState(false);
  const inputField = useInputField(initialValue);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return {
    ...inputField,
    showPassword,
    togglePasswordVisibility,
    secureTextEntry: !showPassword,
  };
};

/**
 * Common validation functions
 */
export const validators = {
  required: (value: string) => !value.trim() ? 'This field is required' : null,
  
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  },
  
  minLength: (min: number) => (value: string) => 
    value.length < min ? `Must be at least ${min} characters` : null,
  
  maxLength: (max: number) => (value: string) => 
    value.length > max ? `Must be no more than ${max} characters` : null,
  
  password: (value: string) => {
    if (!value.trim()) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
    return null;
  },
  
  phone: (value: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!value.trim()) return 'Phone number is required';
    if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
    return null;
  },
  
  combine: (...validators: ((value: string) => string | null)[]) => (value: string) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  },
};
