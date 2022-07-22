import { useApi } from './baseApi';

const useUploadApi = () => {
  const {
    isLoading,
    error,
    data,
    post: upload
  } = useApi({
    url: 'upload',
    noFetch: true,
  });

  return {
    isLoading,
    error,
    data,
    upload
  };
};

export default useUploadApi;
