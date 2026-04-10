'use client';

import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './AuthPage.module.scss';

export default function AuthPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!login.trim()) {
      setLoginError('Введите логин');
      isValid = false;
    } else {
      setLoginError('');
    }

    if (!password.trim()) {
      setLoginError('Введите пароль');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!login.trim()) {
      setLoginError('Введите логин');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Введите пароль');
      return;
    }

    setLoginError('');
    setPasswordError('');
    setIsLoading(true);

    // Демо-задержка
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Login:', { login, password });
    setIsLoading(false);
  };

  return (
    <div className={styles.authPage}>
      <Card>
        <Logo />
        <h1 className={styles.title}>Admin</h1>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Логин:"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
            error={loginError}
          />
          
          <Input
            label="Пароль:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            error={passwordError}
          />
          
          <Button type="submit" loading={isLoading}>
            Войти
          </Button>
        </form>
      </Card>

      <footer className={styles.footer}>
        Все права защищены © eDonish 2026
      </footer>
    </div>
  );
}
