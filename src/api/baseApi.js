import { useEffect, useState } from 'react';
import axios from 'axios';

export const baseURL = 'http://localhost:80';

const access_token = localStorage.getItem('access_token')

export const baseApiConfig = {
  baseURL,
  timeout: 30000,
  headers: { 
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${access_token}`
  },
};

const baseApi = axios.create(baseApiConfig);

const createQueryString = (param) => {
  if (param) {
    return param.reduce((string, current) => {
      if (string === '?') {
        return `${string}${current.name}=${current.value}`
      }
      else {
        return `${string}&${current.name}=${current.value}`
      }
    }, '?');
  } else {
    return '';
  }
}

const getResponseData = (res) => {
  try {
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const useApi = ({
  url, id, fetchParam, option, noFetch,
  getResponseCallback = getResponseData
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const api = axios.create({
    ...baseApiConfig,
    ...option
  });

  const getSome = async (param) => {
    setIsLoading(true);
    const queryString = createQueryString(param);

    return api.get(`${url}${queryString}`)
      .then((res) => {
        const resData = getResponseCallback(res)
        setData(resData);
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
        throw err;
      });
  };

  const getOne = async (param) => {
    setIsLoading(true);
    const queryString = createQueryString(param); 

    return api.get(`${url}/${id}${queryString}`)
      .then((res) => {
        const resData = getResponseCallback(res)
        setData(resData);
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
        throw err;
      });
  };

  const fetch = (param = fetchParam) => {
    if (id) {
      return getOne(param);
    } else {
      return getSome(param);
    }
  }

  const post = async (req) => {
    setIsLoading(true);
    return api.post(url, req)
      .then((res) => {
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
        throw err;
      });
  };

  const patch = async (req) => {
    if (id) {
      setIsLoading(true);
      return api.patch(`${url}/${id}`, req)
        .then((res) => {
          setIsLoading(false);
          return res;
        })
        .catch((err) => {
          setIsLoading(false);
          throw err;
        });
    }
  };

  const put = async (req) => {
    if (id) {
      setIsLoading(true);
      return api.put(`${url}/${id}`, req)
        .then((res) => {
          setIsLoading(false);
          return res;
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
          throw err;
        });
    }
  };

  const remove = async (deleteId) => {
    setIsLoading(true);
    return api.delete(`${url}/${deleteId}`)
      .then((res) => {
        fetch();
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
        throw err;
      });
  };

  const getOption = async (inputValue) => {
    const res = await fetch([
      {
        name: 'q',
        value: inputValue,
      }
    ]);
    const resData = getResponseData(res);
    return resData;
  }

  const handleChangeLoading = (status) => {
    setIsLoading(status)
  }

  const handleChangeError= (err) => {
    setError(err)
  }

  useEffect(() => {
    if (noFetch) {
      setIsLoading(false);
    } else {
      fetch();
    }
    // eslint-disable-next-line
  }, [])

  return {
    isLoading,
    error,
    data,
    api,
    url,
    id,
    fetchParam,
    option,
    noFetch,

    fetch,
    post,
    patch,
    put,
    remove,
    getOption,
    handleChangeLoading,
    handleChangeError,
  };
};

export default baseApi;
