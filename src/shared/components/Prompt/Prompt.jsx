import { useState } from 'react';
import PromptIcon from 'shared/icons/PromptIcon';
import styles from './Prompt.module.scss';

export default function Prompt({ children, ...props }) {
  const [promptIsOpen, setPromptIsOpen] = useState(false);

  const togglePrompt = () => {
    setPromptIsOpen(!promptIsOpen);
  };

  return (
    <div className={styles.container}>
      <PromptIcon
        className={styles.icon}
        onMouseEnter={togglePrompt}
        onMouseLeave={togglePrompt}
      />
      {promptIsOpen && <p className={styles.prompt}>{children}</p>}
    </div>
  );
}
