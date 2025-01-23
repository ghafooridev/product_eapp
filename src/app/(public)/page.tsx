import React from "react";
import { Button } from "@/components/ui";
import { MonitorSmartphone } from "lucide-react";
import Link from "next/link";

export default function SitePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span>Welcome to</span>
      <div className="flex items-center gap-3">
        <MonitorSmartphone />
        <h1 className="text-2xl font-bold text-gray-800">Digital Shop</h1>
      </div>
      <Button asChild variant="default" className="mt-6">
        <Link href="/products">
          Go to Products
        </Link>
      </Button>

    </div>
  );
}
