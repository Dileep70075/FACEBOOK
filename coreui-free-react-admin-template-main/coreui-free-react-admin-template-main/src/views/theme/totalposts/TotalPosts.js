import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormLabel, CButton} from '@coreui/react';
import axios from 'axios';

const AddPhoto = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  // const [comment, setComment] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:3001/post/get-posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        console.log(response.data);
        if (response.data.success === true) {
          setPosts(response.data.data);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (error) {
        setError('Internal error: ' + error.message);
      }
    };

    fetchData();
  }, []);

  const handleLike = async (post,index) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(`http://localhost:3001/likecomment/like`, { postId: post._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
     if(post.mylike){
      posts[index].mylike = false;
     } else {
      posts[index].mylike = true;
     }
     setPosts(posts)

      console.log(response);
      // Optional: Update UI to reflect the like action
    } catch (error) {
      console.error('Failed to like the post:', error.message);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.post(`http://localhost:3001/likecomment/comment`, { postId, comment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // Optional: Update UI to reflect the comment action
    } catch (error) {
      console.error('Failed to comment on the post:', error.message);
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        User Photos and Details
      </CCardHeader>
      <CCardBody>
        {error ? (
          <p>{error}</p>
        ) : (
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Photo</CTableHeaderCell>
                <CTableHeaderCell>Details</CTableHeaderCell>
                <CTableHeaderCell>Posted At</CTableHeaderCell>
                <CTableHeaderCell>Like</CTableHeaderCell>
                <CTableHeaderCell>Comment</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {posts.map((post, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <CFormLabel>{post.user.email}</CFormLabel>
                  </CTableDataCell>
                  <CTableDataCell>
                    {post.photo ? (
                      <img src={`http://localhost:3001/${post.photo}`} alt="User Post" style={{ height: '200px' }} />
                    ) : (
                      'No Photo'
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {post.detail}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormLabel>{new Date(post.createdAt).toLocaleString()}</CFormLabel>
                  </CTableDataCell>
                  <CTableDataCell>
                    {/* <CButton color="primary" onClick={() => handleLike(post._id)}>Like</CButton> */}
                    <CButton
                      color={post.mylike ? 'danger' : 'secondary'}
                      onClick={() => handleLike(post,index)}
                    >
                      {likedPosts.has(post._id) ? 'Unlike' : 'Like'}
                    </CButton>
                    <div>{post.likeCount} </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormLabel>
                      <input type="text" placeholder="Add a comment" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleComment(post._id, e.target.value);
                          e.target.value = '';
                        }
                      }} />
                    </CFormLabel>
                     {/* <CFormLabel>
                      <input
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} // Update comment state
                      />
                      <CButton
                        color="primary"
                        onClick={() => {
                          handleComment(post._id, comment);
                          setComment(''); // Clear input field after submitting
                        }}
                      >
                        Submit Comment
                      </CButton>
                    </CFormLabel> */}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
};

export default AddPhoto;






// import React, { useEffect, useState } from 'react';
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
//   CButton,
//   CForm,
//   CFormInput,
// } from '@coreui/react';
// import axios from 'axios';

// const AddPhoto = () => {
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [commentInput, setCommentInput] = useState({}); // Store comment input per post

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('userToken');
//                 const response = await axios.get('http://localhost:3001/post/get-posts', {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   }
//                 });
//                 console.log(response.data);
//                         if (response.status === 200) {
//                           setPosts(response.data);
//                         } else {
//                           setError('Failed to fetch posts');
//                         }
//       } catch (error) {
//         setError('Internal error: ' + error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLike = async (postId) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const response = await axios.post(`http://localhost:3001/likes/${postId}`, {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.data.success) {
//         setPosts((prevPosts) =>
//           prevPosts.map((post) =>
//             post._id === postId ? { ...post, likes: post.likes + 1 } : post
//           )
//         );
//       } else {
//         setError('Failed to like the post');
//       }
//     } catch (error) {
//       setError('Internal error: ' + error.message);
//     }
//   };

//   const handleCommentChange = (postId, value) => {
//     setCommentInput({ ...commentInput, [postId]: value });
//   };

//   const handleCommentSubmit = async (postId) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const comment = commentInput[postId];
//       const response = await axios.post(`http://localhost:3001/comments/${postId}`, { comment }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.data.success) {
//         setPosts((prevPosts) =>
//           prevPosts.map((post) =>
//             post._id === postId
//               ? { ...post, comments: [...post.comments, comment] }
//               : post
//           )
//         );
//         setCommentInput({ ...commentInput, [postId]: '' }); // Clear comment input after submission
//       } else {
//         setError('Failed to submit comment');
//       }
//     } catch (error) {
//       setError('Internal error: ' + error.message);
//     }
//   };

//   return (
//     <CCard className="mb-4">
//       <CCardHeader>User Photos and Details</CCardHeader>
//       <CCardBody>
//         {error ? (
//           <p>{error}</p>
//         ) : (
//           <CTable>
//             <CTableHead>
//               <CTableRow>
//                 <CTableHeaderCell>Email</CTableHeaderCell>
//                 <CTableHeaderCell>Photo</CTableHeaderCell>
//                 <CTableHeaderCell>Detail</CTableHeaderCell>
//                 <CTableHeaderCell>Posted At</CTableHeaderCell>
//                 <CTableHeaderCell>Likes</CTableHeaderCell>
//                 <CTableHeaderCell>Comments</CTableHeaderCell>
//               </CTableRow>
//             </CTableHead>
//             <CTableBody>
//               {posts.map((post, index) => (
//                 <CTableRow key={index}>
//                   <CTableDataCell>{post.email}</CTableDataCell>
//                   <CTableDataCell>
//                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                       <img src={`http://localhost:3001/${post.photo}`} alt="User Photo" style={{ height: '200px' }} />
//                     </div>
//                   </CTableDataCell>
//                   <CTableDataCell>{post.detail}</CTableDataCell>
//                   <CTableDataCell>{post.likes || 0}</CTableDataCell>
//                   {/* <CTableDataCell>
//                     {post.comments.map((comment, idx) => (
//                       <div key={idx}>{comment}</div>
//                     ))}
//                     <CForm onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(post._id); }}>
//                       <CTableDataCell>
//                         <CFormInput
//                           type="text"
//                           placeholder="Add a comment"
//                           value={commentInput[post._id] || ''}
//                           onChange={(e) => handleCommentChange(post._id, e.target.value)}
//                         />
//                       </CTableDataCell>
//                       <CButton type="submit" color="primary">
//                         Comment
//                       </CButton>
//                     </CForm>
//                   </CTableDataCell> */}
//                   <CTableDataCell>
//                     <CButton
//                       color="primary"
//                       onClick={() => handleLike(post._id)}
//                     >
//                       Like
//                     </CButton>
//                   </CTableDataCell>
//                 </CTableRow>
//               ))}
//             </CTableBody>
//           </CTable>
//         )}
//       </CCardBody>
//     </CCard>
//   );
// };

// export default AddPhoto;
