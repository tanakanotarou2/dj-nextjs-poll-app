/* eslint-disable */
export type Choice = {
  id: number
  choice_text: string
  votes?: number | undefined
  question: number
}

export type PatchedQuestionDetail = {
  id?: number | undefined
  choice_set?: Choice[] | undefined
  question_text?: string | undefined
  pub_date?: string | undefined
}

export type Question = {
  id: number
  code: string
  question_text: string
  pub_date: string
}

export type QuestionDetail = {
  id: number
  choice_set: Choice[]
  question_text: string
  pub_date: string
}

export type QuestionEdit = {
  pub_date: string
  question_text: string
}
