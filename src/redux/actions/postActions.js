import { FETCH_POSTS, NEW_POST, UPDATE_POST, DELETE_POST } from './actionTypes';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/posts';

export const fetchPosts = () => dispatch => {
  axios.get(apiUrl)
    .then(response => dispatch({
      type: FETCH_POSTS,
      payload: response.data
    }))
    .catch(error => console.error('Error fetching posts:', error));
};

//Redux Thunk allows an action creator to return a function instead of an action object.
//dispatch changes the state and getState reads current state
export const createPost = (postData) => (dispatch, getState) => {
  console.log("current state is:",getState());
  const { items } = getState().posts;

  // Find the highest existing ID to ensure the new ID is unique.
  const maxId = items.reduce((max, post) => Math.max(Number(post.id) || 0, max), 0);

  const newPost = {
    ...postData,
    userId: 10,
    id: String(maxId + 1),
  };

  axios.post(apiUrl, newPost)
    .then(response => dispatch({
      type: NEW_POST,
      payload: response.data
    }))
    .catch(error => console.error('Error creating post:', error));
};

export const updatePost = (id, postData) => dispatch => {
  axios.put(`${apiUrl}/${id}`, postData)
    .then(response => {
        // The API returns the updated object.
        dispatch({
            type: UPDATE_POST,
            payload: response.data
        });
    })
    .catch(error => console.error('Error updating post:', error));
};


export const deletePost = (id) => dispatch => {
  axios.delete(`${apiUrl}/${id}`)
    .then(() => {
        dispatch({
            type: DELETE_POST,
            payload: id
        });
    })
    .catch(error => console.error('Error deleting post:', error));
};