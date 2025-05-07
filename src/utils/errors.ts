type DisplayableErrorOptions = {
  statusCode?: number;
  status?: string;
};

/**
 * An error class containing an error message, and optionally a status code and status.
 * This error will be displayed to the user, while the inner error will be logged.
 */
class DisplayableError extends Error {
  #inner: unknown;
  #options: DisplayableErrorOptions;

  public constructor(message: string, inner: unknown, options: DisplayableErrorOptions = {}) {
    super(message);
    this.name = 'DisplayableError';
    this.#inner = inner;
    this.#options = options;
  }

  public get inner() {
    return this.#inner;
  }

  public get statusCode() {
    return this.#options.statusCode ?? 500;
  }

  public get status() {
    return this.#options.status ?? 'error';
  }
}

export { DisplayableError };
