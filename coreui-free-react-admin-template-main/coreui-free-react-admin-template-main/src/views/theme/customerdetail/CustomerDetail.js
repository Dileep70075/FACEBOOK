
import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerDetail = () => {
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    async function fetchCustomerDetails() {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:3001/customer', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCustomers(response.data.data);
      }
    }
    fetchCustomerDetails();
  }, []);
const Navigate = useNavigate()
  const handleDelete = async (id) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.delete(`http://localhost:3001/customer/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id
      }
    });
    if (response.data.success) {
      setCustomers(customers.filter((customer) => customer._id !== id));
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>User Dashboard</CCardHeader>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Customer Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Mobile Number</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Items</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {customers.map((customer) => (
              <CTableRow key={customer._id}>
                <CTableDataCell>{customer.name}</CTableDataCell>
                <CTableDataCell>{customer.email}</CTableDataCell>
                <CTableDataCell>{customer.mobileNumbar}</CTableDataCell>
                <CTableDataCell>{customer.address}</CTableDataCell>
                <CTableDataCell>{customer.items}</CTableDataCell>
                <CTableDataCell>{customer.price}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" onClick={() => handleDelete(customer._id)}>
                    Delete
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="success" onClick={() => Navigate(`/theme/customer/${customer._id}`)}>
                    Edit
                  </CButton>
                </CTableDataCell>

              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default CustomerDetail;









