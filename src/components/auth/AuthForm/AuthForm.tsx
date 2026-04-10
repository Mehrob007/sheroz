'use client';

import { useState, FormEvent } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
  onSubmit?: (data: { login: string; password: string }) => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
  error?: string;
  success?: string;
}

export default function AuthForm({
  onSubmit,
  onForgotPassword,
  isLoading = false,
  error,
  success,
}: AuthFormProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!login.trim()) {
      setLoginError('Введите логин');
      isValid = false;
    } else {
      setLoginError('');
    }

    if (!password.trim()) {
      setPasswordError('Введите пароль');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit?.({ login, password });
    }
  };

  // Иконки
  const UserIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const LockIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const ErrorIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );

  const SuccessIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.errorAlert}>
          {ErrorIcon}
          {error}
        </div>
      )}

      {success && (
        <div className={styles.successAlert}>
          {SuccessIcon}
          {success}
        </div>
      )}

      <Input
        label="Логин:"
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        error={loginError}
        placeholder="Введите логин"
        icon={UserIcon}
        disabled={isLoading}
      />

      <Input
        label="Пароль:"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        placeholder="Введите пароль"
        icon={LockIcon}
        disabled={isLoading}
      />

      {onForgotPassword && (
        <button
          type="button"
          className={styles.forgotPassword}
          onClick={onForgotPassword}
        >
          Забыли пароль?
        </button>
      )}

      <Button
        type="submit"
        fullWidth
        className={styles.submitButton}
        loading={isLoading}
        disabled={isLoading}
      >
        Войти
      </Button>
    </form>
  );
}
