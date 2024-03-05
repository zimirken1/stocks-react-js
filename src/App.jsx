import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import Sider from './components/components/Layout/Sider/Sider.jsx';
import About from './pages/About/About.jsx';
import Stocks from './pages/Stocks/Stocks.jsx';
import Header from './components/components/Layout/Header/Header.jsx';

function App() {
  return (
    <div className={styles.container}>
      <Sider />
      <div className={styles.content}>
        <Header />
        <section className={styles.section}>
          <Routes>
            <Route path={'/'} element={<About />} />
            <Route path={'/favourite'} element={<Stocks />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
