import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Avatar, Upload, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';

import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { useMeContext } from 'src/context/meContext';
import styles from './Profile.module.css';

export const Profile = () => {
  const { me } = useMeContext();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [form] = Form.useForm();
  const { value: usersData, updateValue: setUserData } = useLocalStorage('users');

  const lastUserId = me?.at(-1)?.id;

  useEffect(() => {
    const userData = usersData.find(user => user.id === lastUserId);
    if (userData) {
      form.setFieldsValue({
        email: userData.email,
      });
      if (userData.avatar) {
        setAvatarUrl(userData.avatar);
      }
    }
  }, [usersData, lastUserId, form]);

  const onFinish = values => {
    const newUserArray = usersData.map(user => {
      if (user.id === lastUserId) {
        return {
          ...user,
          email: values.email,
          password: values.password,
          avatar: avatarUrl,
        };
      }
      return user;
    });
    setUserData(newUserArray);
    message.success('Profile updated successfully');
  };

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const onAvatarUpload = event => {
    const file = event.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setAvatarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadButton = <Button icon={<UploadOutlined />}>Изменить аватар</Button>;

  return (
    <div className={styles.user_profile}>
      <div className={styles.user_profile_form}>
        <div className={styles.user_profile_avatar}>
          <Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
          <Upload beforeUpload={beforeUpload} showUploadList={false} onChange={onAvatarUpload}>
            {uploadButton}
          </Upload>
        </div>
        <Form form={form} onFinish={onFinish} layout='vertical'>
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
