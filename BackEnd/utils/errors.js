class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }
  
  export { ValidationError, UnauthorizedError };
  