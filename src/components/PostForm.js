// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { createPost } from '../redux/actions/postActions';

// const PostForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [email, setEmail] = useState('');
//   const [contact, setContact] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault(); //This is a function which stops page reload and should be used in each and every forms
//     const postData = { title, body, email, contact };
//     dispatch(createPost(postData));
//     navigate('/');
//   };

//   return (
//     <>
//     <form onSubmit={handleSubmit} className="mb-4">
//       <div className='card mt-5 shadow border border-dark' style={{ marginLeft: "500px", marginRight: "500px" }}>
//         <p className="text-center mt-5 mb-4 fs-1 fw-bold">Add Post</p>
//         <div className="mb-3">
//           <input type="text" className="form-control w-75 mx-auto d-block shadow border border-dark" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <textarea className="form-control w-75 mx-auto d-block shadow border border-dark" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <input type="email" className="form-control w-75 mx-auto d-block shadow border border-dark" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div className="mb-3">
//           <input
//             type="tel"
//             className="form-control w-75 mx-auto d-block shadow border border-dark"
//             placeholder="Contact (e.g., 9745647398)" value={contact}
//             onChange={(e) => setContact(e.target.value)} required pattern="[0-9]{10}"
//             title="Please enter a contact number in the format XXXXXXXXXX" />
//         </div>
//         <div className="text-center mb-5">
//           <button type="submit" className="btn btn-primary mt-5 btn-lg">Submit</button>
//         </div>
//       </div>
//     </form>
//     </>
//   );
// };

// export default PostForm;



import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/actions/postActions';
import { toast } from "react-toastify";

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: '',
    body: '',
    email: '',
    contact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    dispatch(createPost(postData));
    toast.success("Post added successfully!");
    navigate('/');
  };

  const handleBlurName = (e) => {
    const value = e.target.value.trim();    //trim removes all extra spaces from start and end
    if (value.length < 3 || value.length > 100) {
      toast.error("Title must be 3–100 characters long.");
    } else if (!/^[A-Za-z0-9 ]+$/.test(value)) {
      toast.error("Title can only contain letters, numbers, and spaces.");
    }
  }

  const handleBlurBody = (e) => {
    const value = e.target.value.trim();
    if (value.length < 10) {
      toast.error("Body must be at least 10 characters long.");
    }
  }

  const handleBlurEmail = (e) => {
    const email = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // \s means white space and \S means any non space character, hence no white space and @ = ^\s@
    if (!regex.test(email)) {
      toast.error("Please enter a valid email address.");
    }
  }

  const handleBlurContact = (e) => {
    const phone = e.target.value.trim();
    const regex = /^[6-9]\d{9}$/;
    if (!regex.test(phone)) {
      toast.error("Enter a valid 10-digit Indian mobile number starting with 6–9.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className='card mt-5 shadow border border-dark' style={{ marginLeft: "500px", marginRight: "500px" }}>
        <p className="text-center mt-5 mb-4 fs-1 fw-bold">Add Post</p>

        <div className="mb-3">
          <input
            type="text"
            name="title"
            className="form-control w-75 mx-auto d-block shadow border border-dark"
            placeholder="Title"
            value={postData.title}
            onChange={handleChange} //react automatically passes event to function
            onBlur={handleBlurName}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="body"
            className="form-control w-75 mx-auto d-block shadow border border-dark"
            placeholder="Body"
            value={postData.body}
            onChange={handleChange}
            onBlur={handleBlurBody}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control w-75 mx-auto d-block shadow border border-dark"
            placeholder="Email"
            value={postData.email}
            onChange={handleChange}
            onBlur={handleBlurEmail}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="contact"
            className="form-control w-75 mx-auto d-block shadow border border-dark"
            placeholder="Contact (e.g., 9745647398)"
            value={postData.contact}
            onChange={handleChange}
            onBlur={handleBlurContact}
            required
            pattern="[0-9]{10}"
            title="Please enter a contact number in the format XXXXXXXXXX"
          />
        </div>

        <div className="text-center mb-5">
          <button type="submit" className="btn btn-primary mt-5 btn-lg">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
