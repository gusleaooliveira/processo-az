'use client';

import { Container, Title, Text, Stack, Button, Box } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function TermsOfUse() {
  const router = useRouter();

  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        <Title order={1}>Termos de Uso</Title>

        <Box>
          <Title order={2} size="h3" mb="md">
            1. Aceitação dos Termos
          </Title>
          <Text>
            Ao acessar e utilizar este serviço, você concorda em cumprir e estar
            vinculado a estes termos e condições de uso. Se você não concordar
            com qualquer parte destes termos, não deverá usar nosso serviço.
          </Text>
        </Box>

        <Box>
          <Title order={2} size="h3" mb="md">
            2. Uso do Serviço
          </Title>
          <Text>
            Nosso serviço deve ser usado apenas para fins legais e de acordo com
            estes termos. Você concorda em não usar o serviço:
          </Text>
          <Text component="ul" mt="xs">
            <li>De maneira que viole leis ou regulamentos aplicáveis</li>
            <li>
              Para transmitir material ilegal, difamatório ou que viole direitos
              de terceiros
            </li>
            <li>Para enviar spam ou conteúdo malicioso</li>
          </Text>
        </Box>

        <Box>
          <Title order={2} size="h3" mb="md">
            3. Privacidade
          </Title>
          <Text>
            O uso de nosso serviço está também sujeito à nossa Política de
            Privacidade, que descreve como coletamos e utilizamos suas
            informações pessoais.
          </Text>
        </Box>

        <Box>
          <Title order={2} size="h3" mb="md">
            4. Modificações
          </Title>
          <Text>
            Reservamos o direito de modificar ou substituir estes termos a
            qualquer momento. Continuando a acessar ou usar nosso serviço após
            quaisquer revisões se tornarem efetivas, você concorda em estar
            vinculado aos termos revisados.
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
