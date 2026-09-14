"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RealtimeProvider } from "@upstash/realtime/client";


export default function Providers({children}:{children: React.ReactNode}) {
    const queryClient = new QueryClient();
  return (
    <RealtimeProvider>
   <QueryClientProvider client={queryClient}>
    {children}
   </QueryClientProvider>
    </RealtimeProvider>
  )
}
