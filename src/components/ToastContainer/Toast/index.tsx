import React, { useCallback, useEffect } from "react";
import {
	FiAlertCircle,
	FiCheckCircle,
	FiInfo,
	FiXCircle,
} from "react-icons/fi";
import { Container } from "./styles";
import { ToastMessage, useToast } from "../../../context/ToastContext";

interface ToastProps {
	message: ToastMessage;
	style: object;
}

const icons = {
	info: <FiInfo size={24} />,
	success: <FiCheckCircle size={24} />,
	error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({
	message: { id, type, title, description },
	style,
}) => {
	const { removeToast } = useToast();

	useEffect(() => {
		const timer = setTimeout(() => {
			removeToast(id);
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [removeToast, id]);
	const handleRemoveToast = useCallback(
		(id: string) => {
			removeToast(id);
		},
		[removeToast]
	);

	return (
		<Container id={id} type={type} style={style}>
			{icons[type || "info"]}

			<div>
				<strong>{title}</strong>
				{description && <p>{description}</p>}
			</div>

			<button onClick={() => handleRemoveToast(id)} type="button">
				<FiXCircle size={18} />
			</button>
		</Container>
	);
};

export default Toast;
