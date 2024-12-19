import CustomError from "../CustomError";
import handleErrorResponse from "../handleErrorResponse";

export const fetchMostLike = async () => {
  try {
    const response = await fetch('/api/blog/mostlike', { cache: 'no-store' });
    if (!response.ok) {
      const errorMessage = handleErrorResponse(response);
      throw new CustomError(errorMessage, response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(
        `Custom Error: ${error.message} (Status: ${error.statusCode})`
      );
    } else {
      console.error(`Unexpected Error: ${error.message}`);
    }
    throw error;  
  }
};