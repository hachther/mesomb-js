import RestError from "./RestError.js";

export default class ServerError extends RestError {
  name = 'ServerError';
}
