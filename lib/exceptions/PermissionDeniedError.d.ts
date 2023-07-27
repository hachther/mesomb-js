import RestError from "./RestError";
export default class PermissionDeniedError extends RestError {
    name: string;
}
