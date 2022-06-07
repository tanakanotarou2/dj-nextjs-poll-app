/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
  get: {
    status: 200;
    resBody: Types.User[];
  };

  post: {
    status: 201;
    resBody: Types.User;
    reqFormat: FormData;
    reqBody: Types.User;
  };
};
