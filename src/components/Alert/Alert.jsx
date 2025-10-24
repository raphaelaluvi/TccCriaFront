import styles from './Alert.module.css';

export default function Alert({ type = 'info', children }) {
  const cls = `${styles.alert} ${styles[type] || styles.info}`;
  return <div className={cls}>{children}</div>;
}

