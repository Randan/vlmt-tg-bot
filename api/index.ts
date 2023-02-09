import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleError, unsplashAppToken, unsplashUri } from '../utils';
import { IUnsplashResponse } from '../interfaces';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

const unsplashInstance: AxiosInstance = axios.create({
  baseURL: unsplashUri
});

const additionalUrls: Record<string, string> = {
  randomPhoto: '/photos/random'
};

const addParams = (
  url: string,
  params: Record<string, string | number> = {}
) => {
  if (Object.keys(params).length) {
    return `${url}?${Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')}`;
  } else {
    return url;
  }
};

const makeRequest = (method: RequestMethod, url: string, ...params: any) => {
  switch (method) {
    case 'get':
      return unsplashInstance.get(`${url}`, ...params);
    case 'post':
      return unsplashInstance.post(`${url}`, ...params);
    case 'put':
      return unsplashInstance.put(`${url}`, ...params);
    case 'delete':
      return unsplashInstance.delete(`${url}`, ...params);
  }
};

const request = (method: RequestMethod, url: string) => {
  return (...params: any) => {
    return makeRequest(method, url, ...params);
  };
};

unsplashInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (unsplashAppToken) {
    config.headers && (config.headers.Authorization = `Client-ID ${unsplashAppToken}`);

    return config;
  }

  return config;
});

unsplashInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (reject: any) => {
    handleError(JSON.stringify(reject));

    return reject;
  }
);

export const getPhoto = (
  query: string
): Promise<AxiosResponse<IUnsplashResponse, void>> =>
  request(
    'get',
    addParams(unsplashUri + additionalUrls.randomPhoto, {
      query
    })
  )();
