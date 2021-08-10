import { AxiosError } from 'axios';
import { useState } from 'react';
import { axiosInstance } from '../axios';

const useCreateUser = () => {
  const [error, setError] = useState<AxiosError>(null);

  const createUser = (token: string, data = {}) => {
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    axiosInstance.post('user', data, headers).catch((e: AxiosError) => {
      setError(e);
    });
  };

  return { createUser, error };
};

export default useCreateUser;
