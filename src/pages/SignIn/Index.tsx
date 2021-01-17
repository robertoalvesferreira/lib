import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AnimationContainer, Background } from './styles';
import logo from '../../assets/img/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
  profileType: string;
  domain: string;
  uniqueId: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(

    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatorio')
            .email('Digite um e-mail valido'),
          password: Yup.string().required('Senha obrigatoria'),
          domain: Yup.string().required('Dominio obrigatorio'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
          domain: data.domain,
          profileType: 'IsCompany',
          uniqueId: '',
        });
        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Error na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            {/* <img src={logo} alt="GoBarber" /> */}
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon</h1>
              <Input name="profileType" type="text" placeholder="Empresa" />
              <Input
                name="domain"
                type="text"
                placeholder="Domain"
                //  value="trial"
              />
              <Input
                name="email"
                type="text"
                icon={FiMail}
                placeholder="Email"
                // value="robertoferreira@gmail.com"
              />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
                // value="123456"
              />
              <Button type="submit">Entrar</Button>
              <Link to="forgot-password">Esqueci minha senha</Link>
            </Form>
            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
