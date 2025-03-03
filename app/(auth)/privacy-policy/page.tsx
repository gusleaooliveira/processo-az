'use client';

import { Container, Title, Text, Stack, Button, Box } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        <Title order={1}>Política de Privacidade</Title>

        <Box>
          <Title order={2} size="h3" mb="md">
            1. Coleta de Informações
          </Title>
          <Text>
            Coletamos informações quando você se registra em nosso site, realiza
            um pedido ou insere informações em nosso formulário. As informações
            coletadas incluem seu nome, e-mail, endereço, telefone e dados de
            pagamento quando necessário.
          </Text>
        </Box>

        <Box>
          <Title order={2} size="h3" mb="md">
            2. Uso das Informações
          </Title>
          <Text>As informações que coletamos são utilizadas para:</Text>
          <Text component="ul" mt="xs">
            <li>Personalizar sua experiência</li>
            <li>Melhorar nosso site</li>
            <li>Processar transações</li>
            <li>Enviar e-mails periódicos</li>
          </Text>
        </Box>

        <Box>
          <Title order={2} size="h3" mb="md">
            3. Proteção de Informações
          </Title>
          <Text>
            Implementamos uma variedade de medidas de segurança para manter a
            segurança de suas informações pessoais. Utilizamos criptografia
            avançada para proteger informações sensíveis transmitidas online.
          </Text>
        </Box>

        <Box>
          <Title order={2} size="h3" mb="md">
            4. Cookies
          </Title>
          <Text>
            Utilizamos cookies para melhorar o acesso ao nosso site e
            identificar visitantes frequentes. Nossos cookies melhoram a
            experiência do usuário rastreando e direcionando seus interesses.
          </Text>
        </Box>

        <Box>
          <Title order={2} size="h3" mb="md">
            5. Compartilhamento de Informações
          </Title>
          <Text>
            Não vendemos, comercializamos ou transferimos suas informações
            pessoais para terceiros. Isso não inclui terceiros confiáveis que
            nos auxiliam na operação do site, desde que concordem em manter
            essas informações confidenciais.
          </Text>
        </Box>

        <Button
          size="md"
          style={{
            backgroundColor: '#fe7c6e',
          }}
          onClick={() => router.back()}
        >
          Voltar
        </Button>
      </Stack>
    </Container>
  );
}
