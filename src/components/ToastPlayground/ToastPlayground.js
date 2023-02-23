import React from 'react';
import Button from '../Button';
import Toast from '../Toast';
import styles from './ToastPlayground.module.css';
import useToggle from '../../hooks/use-toggle.hook';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
	const [message, setMessage] = React.useState('');
	const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
	const [isRendered, toggle] = useToggle(false);

	return (
		<div className={styles.wrapper}>
			<header>
				<img alt="Cute toast mascot" src="/toast.png" />
				<h1>Toast Playground</h1>
			</header>
			{isRendered && (
				<Toast variant={variant} onClick={toggle}>
					{message}
				</Toast>
			)}
			<form
				className={styles.controlsWrapper}
				onSubmit={event => {
					event.preventDefault();
					if (!isRendered) toggle();
				}}
			>
				<div className={styles.row}>
					<label
						htmlFor="message"
						className={styles.label}
						style={{ alignSelf: 'baseline' }}
					>
						Message
					</label>
					<div className={styles.inputWrapper}>
						<textarea
							id="message"
							className={styles.messageInput}
							value={message}
							onChange={event => setMessage(event.target.value)}
						/>
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label}>Variant</div>
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						{VARIANT_OPTIONS.map(option => {
							const id = `variant-${option}`;
							return (
								<label htmlFor={id} key={id}>
									<input
										id={id}
										type="radio"
										name="variant"
										value={option}
										checked={option === variant}
										onChange={event => setVariant(event.target.value)}
									/>
									{option}
								</label>
							);
						})}
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label} />
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						<Button>Pop Toast!</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ToastPlayground;
