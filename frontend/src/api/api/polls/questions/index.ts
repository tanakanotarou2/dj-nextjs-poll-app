/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.QuestionDetail[]
  }

  post: {
    status: 201
    resBody: Types.Question
    reqFormat: FormData
    reqBody: Types.QuestionEdit
  }
}
