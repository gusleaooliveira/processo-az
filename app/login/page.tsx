'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Button, TextInput, PasswordInput, Box } from '@mantine/core';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Icon, LoginRight } from './assets';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      console.log(values, process.env.NEXT_PUBLIC_API_URL);

      const result = await signIn('credentials', {
        redirect: false,
        ...values,
      });

      console.log(result);

      if (result?.error) {
        toast.error('Email ou senha incorretos', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
      } else {
        toast.success('Bem-vindo! Login realizado com sucesso', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        });
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Erro ao tentar fazer login. Tente novamente.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <Box
        style={{
          width: '720px',
        }}
      >
        <Image
          src={Icon}
          alt="AZ icone"
          width={168}
          height={68}
          style={{
            marginTop: '96px',
            marginRight: '280px',
            marginLeft: '280px',
            marginBottom: '32px',
          }}
        />
        <Box
          style={{
            width: 358,
            height: 290,
            marginLeft: '181px',
            marginRight: '181px',
          }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              required
              styles={{
                label: {
                  fontFamily: 'Nunito Sans',
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0%',
                  color: '#FE7C6E',
                },
              }}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Senha"
              required
              mt="md"
              styles={{
                label: {
                  fontFamily: 'Nunito Sans',
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0%',
                  color: '#FE7C6E',
                },
              }}
              {...form.getInputProps('password')}
            />
            <Button
              type="submit"
              fullWidth
              mt="xl"
              style={{
                backgroundColor: '#fe7c6e',
                fontFamily: 'Nunito Sans',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              Entrar
            </Button>
          </form>
        </Box>
      </Box>
      <Box>
        <Image
          src={LoginRight}
          alt="Logotipo do login"
          style={{
            width: '720px',
            height: '100vh',
            objectFit: 'fill',
          }}
        />
      </Box>
    </Box>
  );
}
