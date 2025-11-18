import styles from './Modal.module.css';

export default function Modal({ title = 'Aviso', children, onClose, primaryText = 'Fechar', onPrimary, primaryDisabled = false }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handlePrimary = () => {
    if (onPrimary) onPrimary();
    else onClose?.();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handlePrimary}
            disabled={primaryDisabled}
          >
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
}
