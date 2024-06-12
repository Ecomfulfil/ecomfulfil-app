import { ReactNode, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

interface NoAuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const NoAuthGuard = (props: NoAuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (auth?.user) {
      router.replace('/');
    }
  }, [router, auth]);

  if (auth?.user) {
    return fallback;
  }

  return <>{children}</>;
};

export default NoAuthGuard;
