export interface IQuestion {
    id: string,
    question: string,
    answer: string
}

export interface IQuestionsList {
    questionsList: Array<IQuestion>
}
