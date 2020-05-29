import { HttpHeaders } from '@angular/common/http';

export enum HttpHeader {
  CONTENT_TYPE = 'Content-Type',
}

export enum ContentType {
  JSON = 'application/json',
}

export abstract class HttpRestService {
  constructor(private headers: HttpHeaders = new HttpHeaders()) {
    this.headers.append(HttpHeader.CONTENT_TYPE, this.getDefaultContentType());
  }

  // TODO: Move to a configuration dependency
  protected abstract getDefaultContentType(): string;

  protected getHeaders(
    additionalHeaders: {
      [key: string]: string;
    } = {},
  ): HttpHeaders {
    let headers = this.headers;

    // tslint:disable-next-line: forin
    for (const header in additionalHeaders) {
      headers = headers.append(header, additionalHeaders[header]);
    }

    return headers;
  }
}
