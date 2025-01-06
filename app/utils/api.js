export const fetchPosts = async () => {
  try {
    const response = await fetch('/api/blog', { cache: 'no-store' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch('/api/categories', { cache: 'no-store' });
    if (!response.ok) {
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadImage = async (formData) => {
  console.log(formData);
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dakqa3htw/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    const uploadedImageData = await response.json();
    console.log(uploadedImageData);
    return uploadedImageData;
  } catch (error) {
    console.log(error);
  }
};

export const removeImage = async (publicId) => {
  try {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const signature = `public_id=${publicId}&timestamp=${timestamp}prVTrK4wex5D-EDbriCKVMyVQh8`;
    const hash = CryptoJS.SHA1(signature).toString(CryptoJS.enc.Hex);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp);
    formData.append('signature', hash);
    formData.append('api_key', '491525338331826');
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dakqa3htw/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
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
// };
// export const submitPost = async ({
//   postId,
//   title,
//   content,
//   images,
//   authorEmail,
//   categoryNames,
//   links,
//   publishedAt,
// }) => {
//   console.log(
//     postId,
//     title,
//     content,
//     images,
//     authorEmail,
//     categoryNames,
//     links,
//     publishedAt
//   );
//   try {
//     const url = method === 'POST' ? '/api/blog' : `/api/blog/${postId}`;
//     const response = await fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title,
//         content,
//         images,
//         authorEmail,
//         categoryNames,
//         links,
//         publishedAt,
//       }),
//     });

//     if (!response.ok) {
//       throw new CustomError(handleErrorResponse(response), response.status);
//     }
//     const updatedData = await response.json();
//     return updatedData;
//   } catch (error) {
//     if (error instanceof CustomError) {
//       console.error(
//         `Custom Error: ${error.message} (Status: ${error.statusCode})`
//       );
//     } else {
//       console.error(`Unexpected Error: ${error.message}`);
//     }
//     throw error;
//   }
// };
export const deleteResource = async (id) => {
  console.log(id);
  try {
    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete the resource');
    }

    return await response.json(); // assuming the API returns a JSON response
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
