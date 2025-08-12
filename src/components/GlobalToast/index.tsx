import { Toast, type ToastProps } from 'primereact/toast';
import { useEffect, useRef } from 'react';

let getToastRef: ToastProps | any;
export const GlobalToast = () => {
	const toast = useRef<ToastProps | any>(null);

	useEffect(() => {
		getToastRef = toast;
	}, []);

	return <Toast ref={toast} />;
};

export const showToastError = (message: string, title?: string) => {
	if (getToastRef.current)
		getToastRef.current.show({
			severity: 'error',
			summary: title || 'Erro',
			detail: message,
		});
};

export const showToastSuccess = (message: string, title?: string) => {
	if (getToastRef)
		getToastRef.current.show({
			severity: 'success',
			summary: title || 'Sucesso',
			detail: message,
		});
};

export const showToastWarn = (message: string, title?: string) => {
	if (getToastRef)
		getToastRef.current.show({
			severity: 'warn',
			summary: title || 'Atenção',
			detail: message,
		});
};

export const showToastInfo = (message: string, title?: string) => {
	if (getToastRef)
		getToastRef.current.show({
			severity: 'info',
			summary: title || 'Informação',
			detail: message,
		});
};