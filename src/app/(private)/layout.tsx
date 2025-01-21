import Container from '@/components/Container';
import React from 'react'


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <Container>
      {children}
    </Container>

  );
}
