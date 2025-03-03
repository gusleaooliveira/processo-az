import type { Metadata } from 'next';
import { Providers } from './providers';
import '@mantine/core/styles.css';

export const metadata: Metadata = {
  title: 'AZ Suite',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
