
export class contractAiError extends Error {
  private _code?: number;
  private _traceId?: string;
  private _payload?: object | string;

  constructor(message: string, metaData?: { code?: number; payload?: object | string }) {
    super(message);
    this._code = metaData?.code;
    this._payload = metaData?.payload;
    this.name = this.constructor.name;
  }

  get code(): number | undefined {
    return this._code;
  }

  get traceId(): string | undefined {
    return this._traceId;
  }

  get payload(): object | string | undefined {
    return this._payload;
  }
}

export class ServiceError extends Error {
  private _status: number = 500;
  private _contractAiError: contractAiError;

  constructor(contractAiError: contractAiError, status?: number) {
    super(contractAiError.message);
    this._contractAiError = contractAiError;
    this._status = status || 500;
  }

  get status(): number {
    return this._status;
  }

  get arkaError(): contractAiError {
    return this._contractAiError;
  }
}
