import styles from './App.module.css';
import Stocks from "./pages/Stocks/Stocks.jsx";

function App() {
  return (
    <div className={styles.container}>
      <aside className={styles.sider}></aside>
      <div className={styles.content}>
        <header className={styles.header}></header>
        <section className={styles.section}>
            <Stocks />
        </section>
      </div>
    </div>
  );
}

export default App;
