'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  AppShell,
  Box,
  Button,
  Group,
  Text,
  ThemeIcon,
  ActionIcon,
  Menu,
} from '@mantine/core';
import { useState } from 'react';
import {
  IconLayoutDashboard,
  IconAntennaBars5,
  IconChartBarPopular,
  IconShoppingCart,
  IconLogout,
  IconMenu2,
} from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { Azape, Logo, Profile } from './assets';
import { signOut } from 'next-auth/react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [opened, setOpened] = useState(false);

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  if (!session) {
    redirect('/login');
  }

  if (!!session) {
    console.log(session);
  }

  return (
    <AppShell
      layout="alt"
      aside={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Navbar p="md" style={{ width: 250 }}>
        <Group
          style={{
            marginTop: '24px',
            marginLeft: '65px',
            marginRight: '65px',
            marginBottom: '29px',
          }}
        >
          <ThemeIcon variant="white" size="lg">
            <Image src={Logo} alt="Logo da AZ suite" width={120} height={51} />
          </ThemeIcon>
        </Group>
        <Button
          style={{
            width: '100%',
            height: 48,
            backgroundColor: '#fe7c6e',
            paddingLeft: '16px',
          }}
          href="dashboard"
          component={Link}
        >
          <Group align="center">
            <ThemeIcon variant="transparent">
              <IconChartBarPopular color="white" />
            </ThemeIcon>
            <Text
              style={{
                marginLeft: '16px',
                fontFamily: 'Nunito Sans',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '0%',
                color: '#FFFFFF',
              }}
            >
              Dashboard
            </Text>
          </Group>
        </Button>
      </AppShell.Navbar>

      <AppShell.Header
        style={{
          width: 'calc(100% - 250px)',
          height: '80px ',
          left: 'auto',
          right: 0,
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            paddingTop: '20px',
            paddingRight: '41.22px',
            paddingBottom: '20px',
          }}
        >
          <Box
            style={{
              display: 'flex',
            }}
          >
            <Box>
              <Text
                style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0%',
                  textAlign: 'right',
                  color: '#59666F',
                }}
              >
                Olá,
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: 700,
                  fontSize: '19px',
                  lineHeight: '22.8px',
                  letterSpacing: '0%',
                  textAlign: 'right',
                  color: '#59666F',
                }}
              >
                {session?.user?.name?.split(' ')[0]}
              </Text>
            </Box>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  style={{
                    marginLeft: '16.49px',
                    width: 41.22,
                    height: 40,
                  }}
                >
                  <Image
                    src={Profile}
                    alt="Foto de perfil"
                    width={41.22}
                    height={40}
                  />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={14} />}
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  Sair
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Box>
      </AppShell.Header>

      <AppShell.Main
        style={{
          backgroundColor: '#fafafa',
          width: 'calc(100% - 250px)',
          marginLeft: '250px',
          marginTop: '80px',
        }}
      >
        {children}
      </AppShell.Main>

      <AppShell.Footer
        style={{
          width: 'calc(100% - 250px)',
          height: '56px ',
          left: 'auto',
          right: 0,
          backgroundColor: '#f5f5f5',
          paddingTop: '19px',
          paddingBottom: '19px',
          paddingLeft: '41.22px',
          paddingRight: '41.22px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Link
            href="terms-of-use"
            style={{
              fontFamily: 'Nunito Sans',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '18px',
              letterSpacing: '0%',
              textDecoration: 'underline',
              textDecorationStyle: 'solid',
              textDecorationOffset: 'auto',
              textDecorationThickness: 'auto',
              color: '#97A1A8',
              marginRight: '32.98px',
            }}
          >
            Termos de Uso
          </Link>
          <Link
            href="privacy-policy"
            style={{
              fontFamily: 'Nunito Sans',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '18px',
              letterSpacing: '0%',
              textDecoration: 'underline',
              textDecorationStyle: 'solid',
              textDecorationOffset: 'auto',
              textDecorationThickness: 'auto',
              color: '#97A1A8',
            }}
          >
            Política de Privacidade
          </Link>
        </Box>
        <Image src={Azape} alt="Icone da azape" width={190.65} height={24.27} />
      </AppShell.Footer>
    </AppShell>
  );
}
