import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './api/polls/questions'
import type { Methods as Methods1 } from './api/polls/questions/_id@number'
import type { Methods as Methods2 } from './api/schema'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/api/polls/questions'
  const PATH1 = '/api/schema'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    api: {
      polls: {
        questions: {
          _id: (val3: number) => {
            const prefix3 = `${PATH0}/${val3}`

            return {
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix3, GET, option).json(),
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              patch: (option: { body: Methods1['patch']['reqBody'], config?: T | undefined }) =>
                fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(prefix, prefix3, PATCH, option, 'FormData').json(),
              $patch: (option: { body: Methods1['patch']['reqBody'], config?: T | undefined }) =>
                fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(prefix, prefix3, PATCH, option, 'FormData').json().then(r => r.body),
              /**
               * Questionデータを削除します
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix3, DELETE, option).send(),
              /**
               * Questionデータを削除します
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix3, DELETE, option).send().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          },
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
          post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option, 'FormData').json(),
          $post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option, 'FormData').json().then(r => r.body),
          $path: () => `${prefix}${PATH0}`
        }
      },
      schema: {
        /**
         * OpenApi3 schema for this API. Format can be selected via content negotiation.
         *
         * - YAML: application/vnd.oai.openapi
         * - JSON: application/vnd.oai.openapi+json
         */
        get: (option?: { query?: Methods2['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH1, GET, option).json(),
        /**
         * OpenApi3 schema for this API. Format can be selected via content negotiation.
         *
         * - YAML: application/vnd.oai.openapi
         * - JSON: application/vnd.oai.openapi+json
         */
        $get: (option?: { query?: Methods2['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods2['get']['query'] } | undefined) =>
          `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
