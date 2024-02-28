import styles from './App.module.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import Sider from "./components/components/Layout/Sider/Sider.jsx";

function App() {
  return (
    <div className={styles.container}>
      <Sider />
      <div className={styles.content}>
        <header className={styles.header}></header>

        <section className={styles.section}>
          <RouterProvider router={router} />
        </section>
      </div>
    </div>
  );
}

export default App;
