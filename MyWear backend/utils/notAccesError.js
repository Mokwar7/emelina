class NotAccesError extends Error { // make error from default error
  constructor(message) {
    super(message); // take default message
    this.statusCode = 403; // set status 403
  }
}

module.exports = NotAccesError; // export this error as new class
