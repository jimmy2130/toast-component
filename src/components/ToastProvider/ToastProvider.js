import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([]);

	React.useEffect(() => {
		function handleKeyDown(event) {
			if (event.code === 'Escape') {
				setToasts([]);
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

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
