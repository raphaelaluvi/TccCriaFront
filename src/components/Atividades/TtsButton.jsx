import React, { useCallback } from "react";
import styles from "./Atividades.module.css";

const normalizeText = (text) => {
  if (Array.isArray(text)) return text.filter(Boolean).join(" ");
  return text || "";
};

const TtsButton = ({ text }) => {
  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const phrase = normalizeText(text);
    if (!phrase.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }, [text]);

  if (!text) return null;

  return (
    <button type="button" className={styles.ttsButton} onClick={speak}>
      🔊 Ouvir
    </button>
  );
};

export default TtsButton;
