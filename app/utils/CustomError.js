// utils/CustomError.js
class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = 'CustomError';
      this.statusCode = statusCode;
  
      // Customize the message based on status code
      if (statusCode >= 400 && statusCode < 500) {
        this.message = `Client Error: ${message}`;
      } else if (statusCode >= 500) {
        this.message = `Server Error: ${message}`;
      }
    }
  }
  
  export default CustomError;
  