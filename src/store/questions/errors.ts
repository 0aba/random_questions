export class NotFoundEQuestionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundEQuestionError";
    }
}

export class InvalidSliceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidSliceError";
    }
}
