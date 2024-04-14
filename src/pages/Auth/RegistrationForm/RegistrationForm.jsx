import React from 'react';
import { Typography, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

import styles from './RegistrationForm.module.css';
import { useMeContext } from 'src/context/meContext';

export const RegistrationForm = ({ formik, toggleForm }) => {
  const navigate = useNavigate();
  const { login } = useMeContext();
  const { value: usersData, updateValue: updateUsersData } = useLocalStorage('users', []);

  const handleRegistration = async () => {
    try {
      const userExists = usersData.some(user => user.email === formik.values.email);
      if (userExists) {
        toast.error('Пользователь с таким email уже зарегистрирован.');
      } else {
        const newUser = {
          id: Date.now(),
          email: formik.values.email,
          password: formik.values.password,
          roles: ['user', 'admin'],
          status: 'active',
        };
        updateUsersData([...usersData, newUser]);
        login(newUser);
        toast.success('Регистрация успешна!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <>
      <form className={styles.form_outer} onSubmit={formik.handleSubmit}>
        <Typography.Title level={2} className={styles.form_title}>
          <strong>Регистрация</strong>
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
            Уже есть аккаунт? <a onClick={() => toggleForm()}>Войти</a>
          </Typography.Text>
          <Button type='primary' htmlType='submit' onClick={() => handleRegistration()}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </>
  );
};
