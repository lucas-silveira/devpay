import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export const interceptAndTransformIOData = (httpService: HttpService): void => {
  httpService.axiosRef.interceptors.request.use((req: AxiosRequestConfig) => {
    if (req.data) {
      req.data = snakecaseKeys(req.data, {
        deep: true,
      });
    }
    return req;
  });
  httpService.axiosRef.interceptors.response.use((res: AxiosResponse) => {
    if (res.data) {
      res.data = camelcaseKeys(res.data, {
        deep: true,
      });
    }
    return res;
  });
};
