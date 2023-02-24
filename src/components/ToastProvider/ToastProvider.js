import React from 'react';
import useKeydown from '../../hooks/use-keydown.hook';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([]);

	const handleEscape = React.useCallback(() => {
		setToasts([]);
	}, []);

	useKeydown('Escape', handleEscape);

	function createToast(message, variant) {
		setToasts([
			...toasts,
			{
				message,
				variant,
				id: crypto.randomUUID(),
			},
		]);
	}

	function dismissToast(id) {
		setToasts(toasts.filter(toast => toast.id !== id));
	}

	return (
		<ToastContext.Provider
			value={{
				toasts,
				createToast,
				dismissToast,
			}}
		>
			{children}
		</ToastContext.Provider>
	);
}

export default ToastProvider;
