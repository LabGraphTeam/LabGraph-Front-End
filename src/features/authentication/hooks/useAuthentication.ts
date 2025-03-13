import { AuthFormData, ValidationError } from '@/features/authentication/types/Auth';
import { authService } from '@/services/auth-service';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useAuth = (isLogin: boolean) => {
  const [formData, setFormData] = useState<AuthFormData>({
    identifier: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /[!@#$%^&*]/;

    const PASSWORD_REQUIRED_LENGTH = 6;

    if (isLogin) {
      if (!formData.identifier) {
        errors.push({ field: 'identifier', message: 'Identifier is required.' });
      }

      if (!formData.password) {
        errors.push({ field: 'password', message: 'Password is required.' });
      }

      return errors;
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push({ field: 'email', message: 'A valid email address is required.' });
    }

    if (
      !formData.password ||
      formData.password.length < PASSWORD_REQUIRED_LENGTH ||
      !passwordRegex.test(formData.password)
    ) {
      errors.push({
        field: 'password',
        message: `Password must be at least ${PASSWORD_REQUIRED_LENGTH} characters long and include one special character.`,
      });
    }

    if (!formData.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Confirm Password is required.' });
    }

    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match.',
      });
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleAuth = async (isLoginRequest: boolean) => {
    try {

      if (isLoginRequest) {
        const response = await authService.signIn({
          identifier: formData.identifier.trim(),
          password: formData.password,
          remember: rememberMe,
        });

        if (response.success) {
          return router.push('/charts/hematology');
        }

      }

      const response = await authService.signUp({
        identifier: formData.identifier.trim(),
        email: formData.email?.trim() ?? '',
        password: formData.password,
      });

      if (response.ok) {
        return router.push('/auth/login');
      }

      if (response.status === 409) {
        throw new Error('Signup was unsuccessful. Please verify your details and try again.');
      }

      throw new Error('Please verify your details and try again.');
    } catch (err) {
      console.error('Auth error:', err);
      let errorMessage = 'An unknown error occurred.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      throw new Error(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await handleAuth(isLogin);
    } catch (err) {
      setErrors([
        { field: 'general', message: err instanceof Error ? err.message : 'Server error.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    rememberMe,
    setRememberMe,
    handleChange,
    handleSubmit,
  };
};
