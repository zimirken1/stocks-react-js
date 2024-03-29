import React from 'react';
import { Typography, Input, Button } from 'antd';

import styles from './LoginForm.module.css';

export const LoginForm = ({ formik, toggleForm }) => {
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
          <Button type='primary' htmlType='submit'>
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};
