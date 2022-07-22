import { useApi } from './baseApi';

const useTraining = ({id}) => {
  const {
    isLoading,
    error,
    data,
    api,
    url,

    fetch,
    post,
    patch,
    put,
    remove,
    handleChangeLoading,
    handleChangeError
  } = useApi({
    url: 'training',
    id,
  });

  const bulkPost = async (req) => {
    handleChangeLoading(true);
    return api.post(`${url}/bulk`, req)
      .then((res) => {
        handleChangeLoading(false);
        return res;
      })
      .catch((err) => {
        handleChangeError(err);
        handleChangeLoading(false);
        throw err;
      });
  };

  const sendPassword = async (customId) => {
    const sendId = customId || id;

    if (sendId) {
      handleChangeLoading(true);
      return api.post(`${url}/${sendId}/send-password`)
        .then((res) => {
          handleChangeLoading(false);
          return res;
        })
        .catch((err) => {
          handleChangeError(err);
          handleChangeLoading(false);
          throw err;
        });
    }
  };

  return {
    isLoading,
    error,
    data,

    fetch,
    post,
    patch,
    put,
    remove,
    bulkPost,
    sendPassword
  };
};

export default useTraining;
