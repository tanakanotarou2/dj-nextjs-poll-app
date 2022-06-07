/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.QuestionDetail
  }

  put: {
    status: 200
    resBody: Types.QuestionDetail
    reqFormat: FormData
    reqBody: Types.QuestionDetail
  }

  patch: {
    status: 200
    resBody: Types.QuestionDetail
    reqFormat: FormData
    reqBody: Types.PatchedQuestionDetail
  }

  /** Questionデータを削除します */
  delete: {
    status: 204
  }
}
