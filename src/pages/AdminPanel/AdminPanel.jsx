import React, { useState, useMemo } from 'react';
import { Table, Input, Button } from 'antd';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import styles from './AdminPanel.module.css';

const { Search } = Input;

export const AdminPanel = () => {
  const { value: usersData, updateValue: setUsersData } = useLocalStorage('users', []);
  const [searchText, setSearchText] = useState('');

  const toggleUserStatus = userId => {
    const updatedUsers = usersData.map(user => {
      if (user.id === userId) {
        return { ...user, status: user.status === 'active' ? 'banned' : 'active' };
      }
      return user;
    });
    setUsersData(updatedUsers);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Роли',
      dataIndex: 'roles',
      key: 'roles',
      render: roles => roles.join(', '),
      sorter: (a, b) => a.roles[0].localeCompare(b.roles[0]),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        let color = text === 'active' ? 'green' : 'red';
        return <span style={{ color: color }}>{text.charAt(0).toUpperCase() + text.slice(1)}</span>;
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Действие',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => toggleUserStatus(record.id)}>
          {record.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
        </Button>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    return searchText
      ? usersData.filter(user => user.email.toLowerCase().includes(searchText.toLowerCase()))
      : usersData;
  }, [usersData, searchText]);

  return (
    <div className={styles.adminPanel}>
      <Search
        placeholder='Поиск пользователя по email'
        onChange={e => setSearchText(e.target.value)}
        className={`${styles.adminSearch}`}
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey='id'
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30'] }}
      />
    </div>
  );
};
