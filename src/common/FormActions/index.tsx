import styles from './styles.module.css';

function FormActions({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={styles.formActions}>{children}</div>;
}

export default FormActions;
