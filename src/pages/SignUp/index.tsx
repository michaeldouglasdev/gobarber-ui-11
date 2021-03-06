import React, { useCallback, useRef } from "react";
import { FiMail, FiUser, FiLock, FiArrowLeft } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import { useToast } from "../../context/ToastContext";

import getValidationErrors from "../../utils/getValidationErros";

import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background, AnimationContainer } from "./styles";

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();

	const handleSubmit = useCallback(
		async (data: object) => {
			try {
				formRef.current?.setErrors([]);
				const schema = Yup.object().shape({
					name: Yup.string().required("Nome obrigatório"),
					email: Yup.string()
						.required("E-mail obrigatório")
						.email("Digite um e-mail válido"),
					password: Yup.string().min(6, "No mínimo 6 dígitos"),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await api.post("/users", data);

				addToast({
					type: "success",
					title: "Cadastro realizado!",
					description: "Você já pode efetuar seu logon no GoBarber!",
				});

				history.push("/");

				return;
			} catch (err) {
				console.log(err);

				const errors = getValidationErrors(err);
				console.log("errors", errors);
				formRef.current?.setErrors(errors);
			}

			addToast({
				type: "error",
				title: "Erro no cadastro",
				description: "Ocorreu um erro ao fazer login, cheque as credenciais",
			});
		},
		[addToast, history]
	);

	return (
		<Container>
			<Background></Background>

			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber"></img>

					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Cadastro</h1>

						<Input name="name" icon={FiUser} placeholder="Nome" />

						<Input name="email" icon={FiMail} placeholder="E-mail" />

						<Input
							name="password"
							icon={FiLock}
							type="password"
							placeholder="Senha"
						/>

						<Button type="submit">Cadastrar</Button>
					</Form>

					<Link to="/">
						<FiArrowLeft />
						Voltar para login
					</Link>
				</AnimationContainer>
			</Content>
		</Container>
	);
};

export default SignUp;
