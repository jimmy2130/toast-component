import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ messages, removeMessage }) {
	return (
		<ol className={styles.wrapper}>
			{messages.map(({ id, variant, message }) => (
				<li className={styles.toastWrapper} key={id}>
					<Toast variant={variant} removeMessage={removeMessage} id={id}>
						{message}
					</Toast>
				</li>
			))}
		</ol>
	);
}

export default ToastShelf;
