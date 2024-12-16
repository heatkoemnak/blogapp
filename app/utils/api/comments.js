export const fetchComments = async () => {
  try {
    const response = await fetch(`/api/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
