type Methods = "POST" | "GET";

interface SendRequest {
  method: Methods;
  url: string;
  body?: Record<string, string | number>;
  headers?: Record<string, string | number>;
}

export type { Methods, SendRequest }