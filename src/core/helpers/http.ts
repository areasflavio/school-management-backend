export interface HttpResponse {
  statusCode: number;
  body?: any;
}

export interface HttpRequest {
  params?: any;
  body?: any;
  accessToken?: string;
  base64File?: string;
}
