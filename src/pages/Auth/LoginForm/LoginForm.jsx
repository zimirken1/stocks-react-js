import React from 'react';
import { Typography, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

import { useMeContext } from 'src/context/meContext';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

export const LoginForm = ({ formik, toggleForm }) => {
  const navigate = useNavigate();
  const { login } = useMeContext();
  const { value: usersData } = useLocalStorage('users', []);

  const handleLogin = async () => {
    const user = usersData.find(u => u.email === formik.values.email && u.password === formik.values.password);
    if (user) {
      toast.success('Вход выполнен успешно!');
      navigate('/');
      login(usersData);
    } else {
      toast.error('Неверный email или пароль.');
    }
  };

  return (
    <>
      <form className={styles.form_outer} onSubmit={formik.handleSubmit}>
        <Typography.Title level={2} className={styles.form_title}>
          <strong>Авторизация</strong>
        </Typography.Title>
        <Input
          className={styles.input_field}
          id='email'
          name='email'
          type='email'
          placeholder='Введите email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          className={styles.input_field}
          id='password'
          name='password'
          type='password'
          placeholder='Введите пароль'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className={styles.form_buttons}>
          <Typography.Text>
            Нет аккаунта? <a onClick={() => toggleForm()}>Зарегистрироваться</a>
          </Typography.Text>
          <Button type='primary' htmlType='submit' onClick={() => handleLogin()}>
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};
