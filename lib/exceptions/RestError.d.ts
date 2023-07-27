export default class RestError extends Error {
    private code;
    constructor(message: string, code?: string | number);
}
