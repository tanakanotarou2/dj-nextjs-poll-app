import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods0 } from '.';
import type { Methods as Methods1 } from './_id@number';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/polls/questions';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    _id: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(
            prefix,
            prefix0,
            GET,
            option,
          ).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
        patch: (option: { body: Methods1['patch']['reqBody']; config?: T | undefined }) =>
          fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(
            prefix,
            prefix0,
            PATCH,
            option,
            'FormData',
          ).json(),
        $patch: (option: { body: Methods1['patch']['reqBody']; config?: T | undefined }) =>
          fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(
            prefix,
            prefix0,
            PATCH,
            option,
            'FormData',
          )
            .json()
            .then((r) => r.body),
        /**
         * Questionデータを削除します
         */
        delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).send(),
        /**
         * Questionデータを削除します
         */
        $delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option)
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      };
    },
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option)
        .json()
        .then((r) => r.body),
    post: (option: { body: Methods0['post']['reqBody']; config?: T | undefined }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(
        prefix,
        PATH0,
        POST,
        option,
        'FormData',
      ).json(),
    $post: (option: { body: Methods0['post']['reqBody']; config?: T | undefined }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(
        prefix,
        PATH0,
        POST,
        option,
        'FormData',
      )
        .json()
        .then((r) => r.body),
    $path: () => `${prefix}${PATH0}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;