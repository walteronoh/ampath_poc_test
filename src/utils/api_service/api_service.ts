import { SendRequest } from "./api_service_types/api_service_types";

export default class ApiService {
  // Global function for handling api requests
  SendRequest(args: SendRequest) {
    const methodRgx = /(GET)/gi;
    const headers = {
      "Content-Type": "application/json",
    };
    Object.assign(headers, args.headers);
    if (methodRgx.test(args.method)) {
      // return for 'GET' methods
      return fetch(args.url, {
        method: args.method,
        headers: headers,
      });
    }
    // return for 'POST' methods
    return fetch(args.url, {
      method: args.method,
      headers: headers,
      body: JSON.stringify(args.body),
    });
  }
}