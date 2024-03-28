import React from 'react';
import { Typography, Input, Button } from 'antd';

import styles from './LoginForm.module.css';

export const LoginForm = ({ formik, toggleForm }) => {
  return (
    <>
      <form className={styles.form_outer} onSubmit={formik.handleSubmit}>
        <Typography.Text>
          <strong>Авторизация</strong>
        </Typography.Text>
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
        <Typography.Text>
          Нет аккаунта? <span onClick={() => toggleForm()}>Зарегистрироваться</span>
        </Typography.Text>
        <Button type='primary' htmlType='submit'>
          Войти
        </Button>
      </form>
    </>
  );
};
