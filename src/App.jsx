import styles from './App.module.css';
import Sider from './components/UI/Layout/Sider/Sider.jsx';
import Header from './components/UI/Layout/Header/Header.jsx';
import Section from './components/UI/Layout/Section/Section.jsx';

function App() {
  return (
    <div className={styles.container}>
      <Sider />
      <div className={styles.content}>
        <Header />
        <Section />
      </div>
    </div>
  );
}

export default App;
