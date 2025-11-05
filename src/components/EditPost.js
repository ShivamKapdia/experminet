import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePost } from '../redux/actions/postActions';

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postToEdit = useSelector(state =>
    state.posts.items.find(post => post.id === id)
  );

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setBody(postToEdit.body);
      setEmail(postToEdit.email || '');
      setContact(postToEdit.contact || '');
    }
  }, [postToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { ...postToEdit, title, body, email, contact };
    dispatch(updatePost(id, updatedPost));
    navigate('/');
  };

  if (!postToEdit) {
    return <div className="container mt-5"><h2>Post not found</h2></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className='card mt-5 shadow border border-dark' style={{ marginLeft: "500px", marginRight: "500px" }}>
        <p className="text-center mt-5 mb-4 fs-1 fw-bold">Edit Post</p>
        <div className="mb-3">
          <input type="text" className="form-control w-75 mx-auto d-block shadow border border-dark" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <textarea className="form-control w-75 mx-auto d-block shadow border border-dark" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control w-75 mx-auto d-block shadow border border-dark" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="tel" className="form-control w-75 mx-auto d-block shadow border border-dark" placeholder="Contact (e.g., 9745647398)" value={contact} onChange={(e) => setContact(e.target.value)} required pattern="[0-9]{10}" title="Please enter a contact number in the format XXXXXXXXXX" />
        </div>
        <div className="text-center mb-5">
          <button type="submit" className="btn btn-primary mt-5 btn-lg">Update</button>
          <button type="button" className="btn btn-secondary mt-5 ms-2 btn-lg" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default EditPost;