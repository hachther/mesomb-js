import RestError from "./RestError";
export default class ServiceNotFoundError extends RestError {
    name: string;
}
