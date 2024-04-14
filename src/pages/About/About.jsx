import React from 'react';
import { Button, Typography, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './About.module.css';

const { Title, Paragraph } = Typography;

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landing_page}>
      <div className='hero-section'>
        <Title level={1}>Мониторинг котировок акций в режиме реального времени</Title>
        <Paragraph>
          Будьте в курсе последних новостей рынка акций и управляйте своими инвестициями эффективно.
        </Paragraph>
        <Button type='primary' size='large' onClick={() => navigate('/auth')}>
          Регистрация
        </Button>
      </div>

      <div className={styles.features_section}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title='Обновления в реальном времени' bordered={false}>
              Получайте живые обновления цен на акции и изменений рынка по мере их появления.
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Подробная аналитика' bordered={false}>
              Анализируйте производительность акций с помощью детальных графиков и метрик.
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Оповещения и уведомления' bordered={false}>
              Настройте индивидуальные оповещения для своих акций и никогда не пропустите важные рыночные движения.
            </Card>
          </Col>
        </Row>
      </div>

      <div className={styles.testimonial_section}>
        <Title level={2}>Отзывы наших пользователей</Title>
        <Paragraph>
          "Это приложение стало незаменимым в моей ежедневной торговой рутине. Система реального времени и оповещений
          невероятно надежна."
        </Paragraph>
        <Paragraph>- Довольный инвестор</Paragraph>
      </div>
    </div>
  );
};
