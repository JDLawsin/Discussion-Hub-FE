import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

interface RequestConfig {
  method: Method;
  url: string;
  headers: Record<string, string>;
  params: Record<string, unknown>;
  data: unknown | null;
}

class ApiRequestBuilder<T = unknown> {
  private config: RequestConfig;

  constructor() {
    this.config = {
      method: "get",
      url: "",
      headers: {},
      params: {},
      data: null,
    };
  }

  setMethod(method: Method): this {
    this.config.method = method;
    return this;
  }

  setUrl(url: string): this {
    this.config.url = url;
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }

  setParams(params: Record<string, unknown>): this {
    this.config.params = params;
    return this;
  }

  setData(data: unknown): this {
    this.config.data = data;
    return this;
  }

  async send(): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios(
        this.config as AxiosRequestConfig,
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
}

export default ApiRequestBuilder;
