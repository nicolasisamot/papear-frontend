import React from "react";
import styles from "./Form.module.scss";

interface FormProps {
  children: React.ReactNode;
  title?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Form({ children, title, onSubmit }: FormProps) {
  return (
    <form className={styles.form + " " + styles.center} onSubmit={onSubmit}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </form>
  );
}

export default Form;
