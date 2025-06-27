'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
const queryClient = new QueryClient;
type Props = PropsWithChildren;
const Providers = ({children}: Props) => {
  return (
    //cần phải bọc QueryClientProvider để có thể dùng hook tanstack
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
};

export default Providers;