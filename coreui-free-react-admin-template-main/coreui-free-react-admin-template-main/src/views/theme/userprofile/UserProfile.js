import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    address: '',
    photo: null
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('userToken')
        const response = await axios.get('http://localhost:3001/users/my-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.data.success) {
          setUser(response.data.data);
        } else {

        }
      }
      catch (error) {
        setError("internal error", error);
      }
    }
    fetchData()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardHeader>
        User Dashboard
      </CCardHeader>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>First Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Password</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>photo</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{user.fname}</CTableDataCell>
              <CTableDataCell>{user.lname}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.password}</CTableDataCell>
              <CTableDataCell>{user.address}</CTableDataCell>
              {/* <CTableDataCell>{user.photo}</CTableDataCell> */}
              <CTableDataCell>
                {user.photo ? (
                  <img src={`http://localhost:3001/${user.photo}`} alt="User Photo" style={{ width: '100px', height: 'auto' }} />
                ) : (
                  'No photo available'
                )}
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Dashboard
