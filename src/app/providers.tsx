"use client";

import { ButtonComponent } from "@/components";
import { useCanGoBack } from "@/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { FC, useEffect, useState } from "react";

const Providers: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      {canGoBack && <ButtonComponent title="Back" onClick={router.back} />}

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default Providers;
