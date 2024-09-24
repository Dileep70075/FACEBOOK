import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormLabel } from '@coreui/react';
import axios from 'axios';

const AddPhoto = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const userId = JSON.parse(localStorage.getItem('userData'))._id;
        const response = await axios.get('http://localhost:3001/post/get-my-posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId },
        }

        );
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        setError('Internal error: ' + error.message);
      }
    };

    fetchData();
  }, []);

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
                <CTableHeaderCell>Photo</CTableHeaderCell>
                {/* <CTableHeaderCell>Detail</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((user, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    {/* <img src={`http://localhost:3001/${user.photo}`} alt="User Photo" style={{ maxWidth: '100px' }} /> */}
                    <div key={index} style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <div>
                        <img src={`http://localhost:3001/${user.photo}`} alt="User Photo" style={{ height: '200px' }} />
                      </div>
                      <CFormLabel>{user.detail}</CFormLabel>
                    </div>
                  </CTableDataCell>
                  {/* <CTableDataCell>{user.detail}</CTableDataCell> */}
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
