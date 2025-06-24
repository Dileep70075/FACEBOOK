import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CButton, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import axios from 'axios';
import { color } from 'chart.js/helpers';
// import { data } from 'autoprefixer';

const Typography = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchCustomerDetails() {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:3001/users/getLoginUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data)
      if (response.data.success) {
        setUsers(response.data.data);
      }
      else {

      }
    }
    fetchCustomerDetails();
  }, []);



  const sendRequest = async (userId) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.post('http://localhost:3001/request', { receiverId: userId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response);

  }


  const updateRequest = async (status, requestId) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.post('http://localhost:3001/request/abc', { status: status, requestId: requestId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response);
  }



  return (
    <CCard className="mb-4">
      <CCardHeader>users details</CCardHeader>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Request</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user._id}>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.fname}</CTableDataCell>
                {
                  user.myRequest === undefined && user.userRequest === undefined ?
                    <CTableDataCell>
                      <CButton style={{ color: 'white', backgroundColor: 'blue' }} onClick={() => sendRequest(user._id)}>
                        send
                      </CButton>
                    </CTableDataCell> : null
                }
                {
                  user.myRequest != undefined && user.myRequest.status === 'pending' ?
                    <CTableDataCell>
                      <CButton style={{ color: 'white', backgroundColor: 'blue' }}>waiting</CButton>
                    </CTableDataCell> : null
                }

                {
                  user.userRequest != undefined && user.userRequest.status == 'pending' ?
                    <CTableDataCell>
                      <CButton style={{ color: 'white', backgroundColor: 'blue' }} onClick={() => updateRequest('accepted', user.userRequest._id)}>
                        accept
                      </CButton>
                      <CButton style={{ color: 'white', backgroundColor: 'blue' }} onClick={() => updateRequest('rejected', user.userRequest._id)}>
                        reject
                      </CButton>
                    </CTableDataCell> : null
                }

                {
                  user.userRequest != undefined && user.userRequest.status == 'accepted' ?
                    <CTableDataCell>
                      <div>Friend</div>
                    </CTableDataCell> : null
                }

                {
                  user.myRequest != undefined && user.myRequest.status == 'accepted' ?
                    <CTableDataCell>
                      <div>Friend</div>
                    </CTableDataCell> : null
                }
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default Typography;







// import React, { useEffect, useState } from 'react';
// import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
// import axios from 'axios';

// const CustomerDetail = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function fetchUserDetails() {
//       const token = localStorage.getItem('userToken');
//       const response = await axios.get('http://localhost:3001/users/getLoginUser', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.data.success) {
//         setUsers(response.data.data);
//       }
//     }
//     fetchUserDetails();
//   }, []);

//   const SendRequest = async (userId) => {
//     const token = localStorage.getItem('userToken');
//     const response = await axios.post('http://localhost:3001/request', { receiverId: userId }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//   }
//   const updateRequest = async (status, requestId) => {
//     const token = localStorage.getItem('userToken');
//     const response = await axios.post('http://localhost:3001/request/abc', { status: status, requestId: requestId }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//   }
//   return (
//     <CCard className="mb-4">
//       <CCardHeader>User Dashboard</CCardHeader>
//       <CCardBody>
//         <CTable>
//           <CTableHead>
//             <CTableRow>
//               <CTableHeaderCell>Email </CTableHeaderCell>
//               <CTableHeaderCell>Name</CTableHeaderCell>
//               <CTableHeaderCell>Request</CTableHeaderCell>
//             </CTableRow>
//           </CTableHead>
//           <CTableBody>
//             {users.map((user) => (
//               <CTableRow key={user._id}>
//                 <CTableDataCell>{user.email}</CTableDataCell>
//                 <CTableDataCell>{user.fname}</CTableDataCell>
//                 {user.myRequest === undefined && user.userRequest === undefined ?
//                   <CTableDataCell>
//                     <CButton style={{ color: 'white', backgroundColor: 'blue' }} onClick={() => SendRequest(user._id)}>send</CButton>
//                   </CTableDataCell> : null
//                 }


//                 {user.myRequest != undefined && user.myRequest.status === "pending" ?
//                   <CTableDataCell>
//                     <CButton style={{ color: 'white', backgroundColor: 'blue' }}>waiting</CButton>
//                   </CTableDataCell> : null
//                 }


//                 {user.userRequest != undefined && user.userRequest.status === "pending" ?
//                   <CTableDataCell>
//                     <CButton style={{ color: 'white', backgroundColor: 'blue' }} onClick={() => updateRequest("accepted", user.userRequest._id)} >accept</CButton>
//                     <CButton style={{ color: 'white', backgroundColor: 'blue' }} onClick={() => updateRequest("rejected", user.userRequest._id)}>reject</CButton>
//                   </CTableDataCell> : null
//                 }




//                 {user.userRequest != undefined && user.userRequest.status === "accepted" ?
//                   <CTableDataCell>
//                     <CButton style={{ color: 'white', backgroundColor: 'blue' }}>Friend</CButton>
//                   </CTableDataCell> : null
//                 }




//                 {user.myRequest != undefined && user.myRequest.status === "accepted" ?
//                   <CTableDataCell>
//                     <CButton style={{ color: 'white', backgroundColor: 'blue' }}>Friend</CButton>
//                   </CTableDataCell> : null
//                 }
//               </CTableRow>
//             ))}
//           </CTableBody>
//         </CTable>
//       </CCardBody>
//     </CCard>
//   );
// };

// export default CustomerDetail;

