import React from 'react';
import { Typography, Input, Button } from 'antd';

import styles from './RegistrationForm.module.css';

export const RegistrationForm = ({ formik, toggleForm }) => {
  return (
    <>
      <form className={styles.form_outer} onSubmit={formik.handleSubmit}>
        <Typography.Text>
          <strong>Регистрация</strong>
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
          Уже есть аккаунт? <span onClick={() => toggleForm()}>Войти</span>
        </Typography.Text>
        <Button type='primary' htmlType='submit'>
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
};
