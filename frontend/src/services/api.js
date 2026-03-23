const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Fetch posts with optional filters
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} - Posts and pagination data
 */
export const fetchPosts = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.source) queryParams.append('source', params.source);
  if (params.tags) queryParams.append('tags', params.tags);
  if (params.search) queryParams.append('search', params.search);

  const response = await fetch(`${API_URL}/posts?${queryParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return await response.json();
};

/**
 * Fetch a single post by ID
 * @param {string} id - Post ID
 * @returns {Promise<Object>} - Post data
 */
export const fetchPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found');
    }
    throw new Error('Failed to fetch post');
  }

  return await response.json();
};

/**
 * Fetch all tags
 * @returns {Promise<Object>} - Tags data
 */
export const fetchTags = async () => {
  const response = await fetch(`${API_URL}/tags`);

  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }

  return await response.json();
};

/**
 * Fetch all sources
 * @returns {Promise<Object>} - Sources data
 */
export const fetchSources = async () => {
  const response = await fetch(`${API_URL}/sources`);

  if (!response.ok) {
    throw new Error('Failed to fetch sources');
  }

  return await response.json();
};
