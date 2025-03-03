'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  Grid,
  Table,
  Title,
  Text,
  LoadingOverlay,
  Pagination,
  Select,
  Group,
  Anchor,
  Box,
} from '@mantine/core';
import { redirect } from 'next/navigation';
import { axiosInstance } from '../../../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import '@mantine/core/styles.css';
import Image from 'next/image';
import { Pedidios, Ticket, Vendas } from './assets/index';
import { Order } from './types';
import { IconChevronDown } from '@tabler/icons-react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<string | null>('6');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard', currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosInstance.get('/proof/dashboard', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      return res.data;
    },
    enabled: !!session?.accessToken,
  });

  if (!session) {
    redirect('/login');
  }

  if (isLoading) {
    return <LoadingOverlay visible={true} zIndex={1000} />;
  }

  if (isError) {
    return <Text color="red">Erro ao carregar dados</Text>;
  }

  if (!!data) {
    console.log(data);
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', {
      locale: ptBR,
    });
  };

  const renderMethod = (method: string) => {
    switch (method.toLowerCase()) {
      case 'pix':
        return 'Pix';
        break;
      case 'credit_installments':
        return 'Crédito a prazo';
        break;
      case 'credit':
        return 'Crédito à vista';
        break;
      case 'boleto':
        return 'Boleto';
        break;
      default:
        return 'Pix';
        break;
    }
  };

  const renderStatusPayment = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return 'Aprovado';
        break;
      case 'aprovada':
        return 'Aprovado';
        break;
      case 'canceled':
        return 'Cancelado';
        break;
      case 'pending':
        return 'Pendente';
        break;
      default:
        return 'Aprovado';
        break;
    }
  };

  const renderStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return 'Pagamento aprovado';
        break;
      case 'aprovada':
        return 'Aprovado';
        break;
      case 'canceled':
        return 'Cancelado';
        break;
      case 'pending':
        return 'Pendente';
        break;
      default:
        return 'Pagamento aprovado';
        break;
    }
  };

  return (
    <>
      <Text
        style={{
          fontFamily: 'Nunito Sans',
          fontWeight: 400,
          fontSize: '19px',
          lineHeight: '22.8px',
          letterSpacing: '0%',
          color: '#59666F',
          marginBottom: '49px',
          marginTop: '24px',
        }}
      >
        Resumo dos pedidos
      </Text>

      <Box
        style={{
          width: '1110px',
          height: '676px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '60px',
          }}
        >
          <Box
            style={{
              marginRight: '16px',
            }}
          >
            <Card
              padding="lg"
              style={{
                width: 359.3,
                height: 174,
                paddingTop: '24px',
                paddingLeft: '24px',
                paddingBottom: '24px',
                borderRadius: 8,
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Image
                src={Pedidios}
                alt="Icone de pedidos"
                style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '24px',
                }}
              />
              <Text
                style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: '400',
                  fontSize: '19px',
                  lineHeight: '22.8px',
                  letterSpacing: '0%',
                  color: '#59666F',
                }}
              >
                {data?.orders_count} Pedidos
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: '700',
                  fontSize: '19px',
                  lineHeight: '22.8px',
                  letterSpacing: '0%',
                  color: '#59666F',
                }}
              >
                {' '}
                {formatCurrency(data?.orders_total)}
              </Text>
            </Card>
          </Box>

          <Box
            style={{
              marginRight: '16px',
            }}
          >
            <Card
              padding="lg"
              style={{
                width: 359.3,
                height: 174,
                paddingTop: '24px',
                paddingLeft: '24px',
                paddingBottom: '24px',
                borderRadius: 8,
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Image
                src={Vendas}
                alt="Icone de vendas"
                style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '24px',
                }}
              />
              <Text
                style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: '400',
                  fontSize: '19px',
                  lineHeight: '22.8px',
                  letterSpacing: '0%',
                  color: '#59666F',
                }}
              >
                {data?.sales_count} Vendas
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: '700',
                  fontSize: '19px',
                  lineHeight: '22.8px',
                  letterSpacing: '0%',
                  color: '#59666F',
                }}
              >
                {' '}
                {formatCurrency(data?.sales_total)}
              </Text>
            </Card>
          </Box>

          <Box>
            <Card
              padding="lg"
              style={{
                width: 359.3,
                height: 174,
                paddingTop: '24px',
                paddingLeft: '24px',
                paddingBottom: '24px',
                borderRadius: 8,
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Image
                src={Ticket}
                alt="Icone de tickets"
                style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '24px',
                }}
              />
              <Text
                style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: '400',
                  fontSize: '19px',
                  lineHeight: '22.8px',
                  letterSpacing: '0%',
                  color: '#59666F',
                }}
              >
                Ticket Médio
              </Text>
              <Title
                style={{
                  fontFamily: 'Nunito Sans',
                  fontWeight: '700',
                  fontSize: '19px',
                  lineHeight: '22.8px',
                  letterSpacing: '0%',
                  color: '#59666F',
                }}
              >
                {formatCurrency(data?.average_ticket)}
              </Title>
            </Card>
          </Box>
        </Box>

        <Box>
          <Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Box
                style={{
                  width: 147,
                  height: 58,
                  backgroundColor: '#FE877A',
                  top: '410px',
                  left: '290px',
                  borderTopLeftRadius: '8px',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 42,
                    height: 42,
                  }}
                >
                  ID do Pedido
                </Text>
              </Box>
              <Box
                style={{
                  backgroundColor: '#FE7C6E',
                  width: 129,
                  height: 58,
                  top: '410px',
                  left: '437px',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 42,
                    height: 42,
                  }}
                >
                  ID na Loja
                </Text>
              </Box>
              <Box
                style={{
                  width: 81,
                  height: 58,
                  top: '410px',
                  left: '566px',
                  backgroundColor: '#FE877A',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 49,
                    height: 21,
                  }}
                >
                  Criação
                </Text>
              </Box>
              <Box
                style={{
                  width: 180,
                  height: 58,
                  top: '410px',
                  left: '647px',
                  backgroundColor: '#FE7C6E',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 106,
                    height: 21,
                  }}
                >
                  Nome do cliente
                </Text>
              </Box>
              <Box
                style={{
                  width: 131,
                  height: 58,
                  top: '410px',
                  left: '827px',
                  backgroundColor: '#FE877A',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 64,
                    height: 42,
                  }}
                >
                  CPF/CNPJ do cliente
                </Text>
              </Box>
              <Box
                style={{
                  width: 142,
                  height: 58,
                  top: '410px',
                  left: '958px',
                  backgroundColor: '#FE7C6E',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 111,
                    height: 21,
                  }}
                >
                  Status do pedido
                </Text>
              </Box>
              <Box
                style={{
                  width: 100,
                  height: 58,
                  top: '410px',
                  left: '1100px',
                  backgroundColor: '#FE877A',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 74,
                    height: 42,
                  }}
                >
                  Status do pagamento
                </Text>
              </Box>
              <Box
                style={{
                  width: 100,
                  height: 58,
                  top: '410px',
                  left: '1200px',
                  backgroundColor: '#FE7C6E',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 74,
                    height: 42,
                  }}
                >
                  Método de paramento
                </Text>
              </Box>
              <Box
                style={{
                  backgroundColor: '#FE877A',
                  width: 100,
                  height: 58,
                  top: '410px',
                  left: '1300px',
                  borderTopRightRadius: '8px',
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito Sans',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '21px',
                    letterSpacing: '0%',
                    color: '#FFFFFF',
                    width: 34,
                    height: 21,
                  }}
                >
                  Total
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              marginTop: '19px',
              marginBottom: '19px',
            }}
          >
            {data?.orders?.map((order: Order, index: number) => (
              <Box
                key={order._id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '37px',
                  borderBottom: '1px solid #F5F5F5',
                  marginBottom:
                    index == data?.orders?.lenght - 1 ? '0px' : '19px',
                }}
              >
                <Box
                  style={{
                    width: 147,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {order._id}
                </Box>
                <Box
                  style={{
                    backgroundColor: '#fcfcfc',
                    width: 129,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {order.order_seller_id}
                </Box>
                <Box
                  style={{
                    width: 81,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {formatDate(order.createdAt)}
                </Box>
                <Box
                  style={{
                    backgroundColor: '#fcfcfc',
                    width: 180,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {order.customer.name}
                </Box>
                <Box
                  style={{
                    width: 131,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {order.customer.doc.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    '$1.$2.$3-$4',
                  )}
                </Box>
                <Box
                  style={{
                    backgroundColor: '#fcfcfc',
                    width: 142,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {renderStatus(order.delivery.status)}{' '}
                </Box>
                <Box
                  style={{
                    width: 100,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {renderStatusPayment(order.payment.status)}
                </Box>
                <Box
                  style={{
                    backgroundColor: '#fcfcfc',
                    width: 100,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {renderMethod(order.payment.method)}
                </Box>
                <Box
                  style={{
                    width: 100,
                    fontFamily: 'Nunito Sans',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '0%',
                    paddingLeft: '8px',
                  }}
                >
                  {formatCurrency(order.payment.amount)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '48px',
            backgroundColor: '#F5F5F5',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            padding: 8,
          }}
        >
          <Pagination
            total={data?.pagination?.total_pages || 1}
            value={currentPage}
            onChange={setCurrentPage}
            color="#FE7C6E"
            radius="xl"
            withEdges
            styles={(theme) => ({
              control: {
                border: 'none',
                '&[dataActive]': {
                  backgroundColor: '#FE7C6E',
                  color: 'white',
                  borderRadius: '50%',
                },
              },
            })}
          />

          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Nunito Sans',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '0%',
                color: '#97A1A8',
                marginRight: '8px',
              }}
            >
              Linhas por página
            </Text>
            <Select
              value={itemsPerPage}
              onChange={(value) => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
              data={['3', '6', '12', '24', '48', '96', '192']}
              style={{
                width: 87,
                height: 32,
                borderRadius: 8,
                fontFamily: 'Nunito Sans',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
                letterSpacing: '0%',
              }}
              rightSection={<IconChevronDown size={14} />}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
