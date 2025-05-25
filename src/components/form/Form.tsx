import { ReactNode } from 'react';
import styles from './Form.module.scss';

type FormProps = {
	children: ReactNode;
};

export const Form = ({ children }: FormProps) => {
	return <div className={styles.formWrapper}>{children}</div>;
};
