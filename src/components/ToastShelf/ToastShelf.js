import React from 'react';
import { ToastContext } from '../ToastProvider';
import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf() {
	const { toasts, dismissAllToasts } = React.useContext(ToastContext);

	React.useEffect(() => {
		function handleKeyDown(event) {
			if (event.code === 'Escape') {
				dismissAllToasts();
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [dismissAllToasts]);

	return (
		<ol
			className={styles.wrapper}
			role="region"
			aria-live="assertive"
			aria-label="Notification"
		>
			{toasts.map(({ id, variant, message }) => (
				<li className={styles.toastWrapper} key={id}>
					<Toast variant={variant} id={id}>
						{message}
					</Toast>
				</li>
			))}
		</ol>
	);
}

export default ToastShelf;
