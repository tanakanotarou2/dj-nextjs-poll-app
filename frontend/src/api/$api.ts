import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './api/schema'
import type { Methods as Methods1 } from './polls/questions'
import type { Methods as Methods2 } from './polls/questions/_id@number'
import type { Methods as Methods3 } from './users'
import type { Methods as Methods4 } from './users/_id@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/schema'
  const PATH1 = '/polls/questions'
  const PATH2 = '/users'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    api: {
      schema: {
        /**
         * OpenApi3 schema for this API. Format can be selected via content negotiation.
         *
         * - YAML: application/vnd.oai.openapi
         * - JSON: application/vnd.oai.openapi+json
         */
        get: (option?: { query?: Methods0['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
        /**
         * OpenApi3 schema for this API. Format can be selected via content negotiation.
         *
         * - YAML: application/vnd.oai.openapi
         * - JSON: application/vnd.oai.openapi+json
         */
        $get: (option?: { query?: Methods0['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods0['get']['query'] } | undefined) =>
          `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    },
    polls: {
      questions: {
        _id: (val2: number) => {
          const prefix2 = `${PATH1}/${val2}`

          return {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, prefix2, GET, option).json(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            put: (option: { body: Methods2['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods2['put']['resBody'], BasicHeaders, Methods2['put']['status']>(prefix, prefix2, PUT, option, 'FormData').json(),
            $put: (option: { body: Methods2['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods2['put']['resBody'], BasicHeaders, Methods2['put']['status']>(prefix, prefix2, PUT, option, 'FormData').json().then(r => r.body),
            patch: (option: { body: Methods2['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods2['patch']['resBody'], BasicHeaders, Methods2['patch']['status']>(prefix, prefix2, PATCH, option, 'FormData').json(),
            $patch: (option: { body: Methods2['patch']['reqBody'], config?: T | undefined }) =>
              fetch<Methods2['patch']['resBody'], BasicHeaders, Methods2['patch']['status']>(prefix, prefix2, PATCH, option, 'FormData').json().then(r => r.body),
            /**
             * Questionデータを削除します
             */
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods2['delete']['status']>(prefix, prefix2, DELETE, option).send(),
            /**
             * Questionデータを削除します
             */
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods2['delete']['status']>(prefix, prefix2, DELETE, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix2}`
          }
        },
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH1, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
        post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option, 'FormData').json(),
        $post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option, 'FormData').json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      }
    },
    users: {
      _id: (val1: number) => {
        const prefix1 = `${PATH2}/${val1}`

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          put: (option: { body: Methods4['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods4['put']['resBody'], BasicHeaders, Methods4['put']['status']>(prefix, prefix1, PUT, option, 'FormData').json(),
          $put: (option: { body: Methods4['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods4['put']['resBody'], BasicHeaders, Methods4['put']['status']>(prefix, prefix1, PUT, option, 'FormData').json().then(r => r.body),
          patch: (option: { body: Methods4['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods4['patch']['resBody'], BasicHeaders, Methods4['patch']['status']>(prefix, prefix1, PATCH, option, 'FormData').json(),
          $patch: (option: { body: Methods4['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods4['patch']['resBody'], BasicHeaders, Methods4['patch']['status']>(prefix, prefix1, PATCH, option, 'FormData').json().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods4['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods4['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      post: (option: { body: Methods3['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, PATH2, POST, option, 'FormData').json(),
      $post: (option: { body: Methods3['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, PATH2, POST, option, 'FormData').json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
