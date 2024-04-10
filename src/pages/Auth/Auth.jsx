import React, { useState } from 'react';
import { useFormik } from 'formik';

import { LoginForm } from './LoginForm/LoginForm';
import styles from './Auth.module.css';
import { RegistrationForm } from './RegistrationForm/RegistrationForm';

const formTypes = ['login', 'registration'];

export const Auth = () => {
  const [formType, setFormType] = useState(formTypes[0]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      alert(values);
    },
  });

  const toggleForm = () => {
    setFormType(formType === 'login' ? 'registration' : 'login');
  };

  return (
    <div className={styles.container}>
      {formType === 'login' && <LoginForm formik={formik} toggleForm={toggleForm} />}
      {formType === 'registration' && <RegistrationForm formik={formik} toggleForm={toggleForm} />}
    </div>
  );
};
