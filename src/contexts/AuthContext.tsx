import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import {
  useGetConfigQuery,
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
} from '@/store/auth';
import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from '@/utils/cookies';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValue {
  isLoading: boolean;
  config: any;
  user: any;
  setUser: (user: any) => void;
  billingDetails: any;
  setBillingDetails: (billingDetails: any) => void;
  login: (params: any) => Promise<void>;
  register: (params: any) => Promise<void>;
  logout: () => void;
}

const initialAuthContextValue: AuthContextValue = {
  isLoading: false,
  config: null,
  user: undefined,
  setUser: () => {},
  billingDetails: null,
  setBillingDetails: () => {},
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextValue>(
  initialAuthContextValue
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<any>();
  const [billingDetails, setBillingDetails] = useState<any>();

  const { data: userData, isLoading: userLoading } = useGetMeQuery(
    {},
    {
      skip: !getSessionCookie('user'),
    }
  );

  const { data: config } = useGetConfigQuery({});
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] =
    useRegisterMutation();

  useEffect(() => {
    const u = getSessionCookie('user');
    if (userData) {
      setUser(userData);
      setSessionCookie('user', JSON.stringify(userData));
    } else if (u) {
      setUser(JSON.parse(u));
    } else if (!userLoading) {
      setUser(null);
    }
  }, [userData, userLoading]);

  const handleLogin = async (params: any) => {
    try {
      const res = await login(params).unwrap();
      setUser(res.user);
      setSessionCookie('user', JSON.stringify(res.user));
      setSessionCookie('tokens', JSON.stringify(res.tokens));
      console.log(getSessionCookie('tokens'));

      // router.replace((router.query.returnUrl as string) || '/');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleRegister = async (params: any) => {
    try {
      const res = await register(params).unwrap();
      setUser(res.user);
      setSessionCookie('user', JSON.stringify(res.user));
      setSessionCookie('tokens', JSON.stringify(res.tokens));
      router.replace((router.query.returnUrl as string) || '/');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleLogout = () => {
    deleteSessionCookie('tokens');
    deleteSessionCookie('user');
    setUser(null);
    router.push('/login');
  };

  const values = {
    isLoading:
      userLoading || loginLoading || registerLoading || false,
    config,
    user,
    setUser,
    billingDetails,
    setBillingDetails,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
