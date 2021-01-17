import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, AnimationContainer, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);


  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatorio')
            .email('Digite um e-mail valido')
        });

        await schema.validate(data, { abortEarly: false });

        api.post('/password/forgot',{
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
        })

        //recuperacao de senha
        //history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na recuperção de senha',
          description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            {/* <img src={logo} alt="GoBarber" /> */}
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Recuperar senha</h1>
              <Input
                name="email"
                type="text"
                icon={FiMail}
                placeholder="Email"
              />
    
              <Button type="submit">Recuperar</Button>
            </Form>
            <Link to="/">
              <FiLogIn />
              Voltar ao login
            </Link>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ForgotPassword;
