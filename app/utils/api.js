import CustomError from './CustomError';
import handleErrorResponse from './handleErrorResponse';

export const fetchPosts = async () => {
  try {
    const response = await fetch('/api/blog');
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

export const fetchCategories = async () => {
  try {
    const response = await fetch('/api/categories');
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

export const uploadImage = async (formData) => {
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dakqa3htw/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new CustomError(handleErrorResponse(response), response.status);
    }
    const uploadedImageData = await response.json();
    return uploadedImageData;
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

export const submitPost = async ({
  method,
  postId,
  title,
  body,
  image,
  authorEmail,
  categoryId,
  links,
  publishedAt,
}) => {
  try {
    const url = method === 'POST' ? '/api/blog' : `/api/blog/${postId}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        image,
        authorEmail,
        categoryId,
        links,
        publishedAt,
      }),
    });

    if (!response.ok) {
      throw new CustomError(handleErrorResponse(response), response.status);
    }
    const updatedData = await response.json();
    return updatedData;
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
