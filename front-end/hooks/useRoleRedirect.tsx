'use client';

import { useAccount } from 'wagmi';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useRoleRedirect = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS?.toLowerCase();

  useEffect(() => {
    const isAdmin = address?.toLowerCase() === adminAddress;

    if (!isConnected) {
      if (pathname !== '/') router.push('/');
      return;
    }

    if (isAdmin && !pathname.startsWith('/admin')) {
      router.push('/admin');
    } else if (!isAdmin && !pathname.startsWith('/farmer')) {
      router.push('/farmer');
    }
  }, [address, isConnected, router, pathname]);
};