import React, { createContext, useContext, useCallback, useState } from "react";
import ToastContainer from "../components/ToastContainer";
import { uuid } from "uuidv4";

export interface ToastMessage {
	id: string;
	type?: "success" | "error" | "info";
	title: string;
	description?: string;
}

interface ToastContextState {
	addToast(message: Omit<ToastMessage, "id">): void;
	removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextState>({} as ToastContextState);

const ToastProvider: React.FC = ({ children }) => {
	const [messages, setMessages] = useState<ToastMessage[]>([]);

	const addToast = useCallback(
		({ type, title, description }: Omit<ToastMessage, "id">) => {
			const id = uuid();

			const toast = { id, type, title, description };

			//setMessages([...messages, toast]);
			setMessages((oldMessages) => [...oldMessages, toast]);
		},
		[]
	);

	const removeToast = useCallback(
		(id: string) => {
			setMessages((state) => state.filter((message) => message.id !== id));
		},
		[setMessages]
	);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<ToastContainer messages={messages}></ToastContainer>
		</ToastContext.Provider>
	);
};

function useToast(): ToastContextState {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error("useToast must be within a ToastProvider");
	}

	return context;
}

export { ToastProvider, useToast };
