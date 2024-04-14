import React from 'react';
import { Form, Input, Button, Avatar, Upload } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './Profile.module.css';

export const Profile = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const onAvatarUpload = info => {
    console.log(info);
  };

  return (
    <div className={styles.user_profile}>
      <div className={styles.user_profile_form}>
        <div className={styles.user_profile_avatar}>
          <Avatar size={90} icon={<UserOutlined />} />
          <Upload onChange={onAvatarUpload}>
            <Button icon={<UploadOutlined />}>Изменить аватар</Button>
          </Upload>
        </div>
        <Form name='profile' onFinish={onFinish} layout='vertical'>
          <Form.Item name='email' rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
            <Input prefix={<MailOutlined />} placeholder='Email' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]} hasFeedback>
            <Input.Password prefix={<LockOutlined />} placeholder='Пароль' />
          </Form.Item>
          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Подтвердите пароль' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Обновить профиль
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
