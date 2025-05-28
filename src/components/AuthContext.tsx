import { createContext, type ReactNode, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios.ts';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axiosInstance.get('/me');
      return response.data;
    },
    retry: 1,
  });

  return (
    <AuthContext.Provider
      value={{
        data,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
