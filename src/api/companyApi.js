import { useApi } from './baseApi';

const useCompany = ({id} = {}) => {
  const {
    isLoading,
    error,
    data,
    fetch,
    post,
    patch,
    put,
    remove,
  } = useApi({
    id,
    url: 'company',
  })

  const getCompanyOption = async (inputValue) => {
    const res = await fetch([
      {
        name: 'q',
        value: inputValue,
      }
    ]);
    const resData = res.data.data.map((item) => ({
      value: item._id,
      label: item.name
    }));
    return resData;
  }

  return {
    isLoading,
    error,
    data,

    fetch,
    post,
    patch,
    put,
    remove,
    getCompanyOption
  };
};

export default useCompany;
