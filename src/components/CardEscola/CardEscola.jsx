import React from 'react';
import { createPortal } from 'react-dom';
import styles from './CardEscola.module.css';

// Para alinhar com o uso anterior, CardEscola aceita:
// title, primaryText, primaryDisabled, onPrimary, onClose, children.
const CardEscola = ({ 
    isOpen, 
    title, 
    primaryText, 
    primaryDisabled, 
    onPrimary, 
    onClose, 
    children, 
    isAlert = false // Adicionando uma prop para modais de alerta (Ex: Exclusão)
}) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const PrimaryButton = (
    <button 
      className={`${styles.primaryButton} ${isAlert ? styles.danger : ''}`}
      onClick={onPrimary} 
      disabled={primaryDisabled}
    >
      {primaryText}
    </button>
  );

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.cardModal}>
        
        <header className={styles.cardHeader}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Fechar Modal">
            &times;
          </button>
        </header>

        <div className={styles.cardContent}>
          {children}
        </div>
        
        {/* Rodapé com botões de ação */}
        <footer className={styles.cardActions}>
            <button className={styles.secondaryButton} onClick={onClose}>
                {isAlert ? 'Cancelar' : 'Fechar'}
            </button>
            {onPrimary && PrimaryButton}
        </footer>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body 
  );
};

export default CardEscola;