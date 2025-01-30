import React from 'react';

import { Banner } from '@/modules/home/components/banner';
import Welcome from '@/modules/home/components/welcome';

export default function SitePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Banner />
      <Welcome />
    </div>
  );
}
