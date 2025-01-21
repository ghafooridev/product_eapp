import Container from '@/components/Container';
import React from 'react'


export default function SiteLayout({
  children,
  ads
}: Readonly<{
  children: React.ReactNode;
  ads: React.ReactNode;
}>) {
  return (

    <Container>
      {children}
      <div className="sticky bottom-20 mx-auto flex justify-center">  {ads}</div>
    </Container>

  );
}
