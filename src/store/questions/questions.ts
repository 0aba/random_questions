import { NotFoundEQuestionError, InvalidSliceError } from "./errors.ts";
import { IQuestion, IQuestionsList } from "./types.ts";
import { defineStore } from "pinia";
import {v4 as uuid4} from "uuid";


export const useQuestionsStore = defineStore("questions", {
    state: (): IQuestionsList => ({
        questionsList: []
    }),
    getters: {
        getLength: (state): number => state.questionsList.length,
        getElementById(state): (id: string) => IQuestion {
            return (id: string): IQuestion => {
                const found = state.questionsList.find(question => question.id === id);

                if (found === undefined) {
                    throw new NotFoundEQuestionError("Not found question");
                }

                return found;
            }
        },
        getSliceElement(state): (start?: number, end?: number) => Array<IQuestion> {
            return (start?: number, end?: number): Array<IQuestion> => {
                if (start !== undefined && end !== undefined && start > end) {
                    throw new InvalidSliceError("The start index is not included in the range of the array");
                }

                return state.questionsList.slice(start, end);
            }
        }
    },
    actions: {
        addNewQuestion(question: string, answer: string): string {
            const id = uuid4();
            this.questionsList.push({id: id, question, answer});

            return id;
        },
        delQuestion(id: string): void {
            const idx = this.questionsList.findIndex(question => question.id === id);

            if (idx === -1) {
                throw new NotFoundEQuestionError("Not found question");
            }

            this.questionsList.splice(idx, 1);
        },
        changeQuestion(id: string, question?: string, answer?: string): void {
            const idx = this.questionsList.findIndex(question => question.id === id);

            if (idx === -1) {
                throw new NotFoundEQuestionError("Not found question");
            }

            if (question !== undefined) { this.questionsList[idx].question = question; }
            if (answer !== undefined) { this.questionsList[idx].answer = answer; }
        },
        isValidData(data: any): boolean {
            return Array.isArray(data) && data.every(item =>
            item.hasOwnProperty("id") && typeof item.id === "string"  &&
            item.hasOwnProperty("question") && typeof item.question === "string" &&
            item.hasOwnProperty("answer") && typeof item.answer === "string"
            );
        }
    }
})