// utils/handleErrorResponse.js
export default function handleErrorResponse(response) {
  let errorMessage = 'An error occurred';

  switch (response.status) {
    case 400:
      errorMessage = 'Bad Request';
      break;
    case 401:
      errorMessage = 'Unauthorized';
      break;
    case 404:
      errorMessage = 'Resource not found';
      break;
    case 500:
      errorMessage = 'Internal Server Error';
      break;
    default:
      errorMessage = 'Unexpected error';
  }

  return errorMessage;
}
