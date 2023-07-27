import RestError from "./RestError";
export default class InvalidClientRequestError extends RestError {
    name: string;
}
