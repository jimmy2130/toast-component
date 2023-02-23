import React from 'react';

export const ToastContext = React.createContext();
export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([]);
	const [message, setMessage] = React.useState('');
	const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

	function handleDismiss(id) {
		setToasts(toasts.filter(toast => toast.id !== id));
	}

	function handleCreateToast(event) {
		event.preventDefault();
		setToasts([
			...toasts,
			{
				message,
				variant,
				id: crypto.randomUUID(),
			},
		]);
		setMessage('');
		setVariant(VARIANT_OPTIONS[0]);
	}

	const value = {
		message,
		setMessage,
		variant,
		setVariant,
		toasts,
		handleDismiss,
		handleCreateToast,
	};

	return (
		<ToastContext.Provider value={value}>{children}</ToastContext.Provider>
	);
}

export default ToastProvider;
