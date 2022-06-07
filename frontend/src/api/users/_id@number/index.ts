/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.User
  }

  put: {
    status: 200
    resBody: Types.User
    reqFormat: FormData
    reqBody: Types.User
  }

  patch: {
    status: 200
    resBody: Types.User
    reqFormat: FormData
    reqBody: Types.PatchedUser
  }

  delete: {
    status: 204
  }
}
