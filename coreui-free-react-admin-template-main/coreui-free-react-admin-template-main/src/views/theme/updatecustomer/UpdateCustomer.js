import React, { useState,useEffect } from 'react';
import { CCard, CCardBody, CForm, CInputGroup, CButton, CFormInput } from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateCustomer = () => {
  const navigate = useNavigate();
  const { userId } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobileNumbar: '',
    email: '',
    items: '',
    price: '',
  });



  useEffect(() => {
    async function fetchData() {
    try{
        const token =  localStorage.getItem('userToken')
        const response = await axios.get(`http://localhost:3001/customer/get-customer-by-id?customerId=${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        if (response.data.success) {
            setFormData(response.data.data);
          } else {
           
          }
    }
 catch(error){
    setError("internal error",error);
 }
    }
    fetchData()
  }, [userId])


  const handleChanges = (e) => {
    const { name, value } = e.target;
  
    // Allow only digits and restrict to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const {  name, address, mobileNumbar, email, items, price } = formData;

      const response = await axios.put('http://localhost:3001/customer', {
        userId, name, address, mobileNumbar, email, items, price
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log(response.data);
        navigate('/theme/customers');
      } else {
        console.error('Update failed:', response.data.message);
      }
    } catch (error) {
      console.error('Internal error:', error);
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CInputGroup className="mb-3">
              <CFormInput
                name="name"
                type="text"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
              />
              <CFormInput
                name="address"
                type="text"
                value={formData.address}
                placeholder="Address"
                onChange={handleChange}
              />
              <CFormInput
                name="mobileNumbar"
                type="Number"
                value={formData.mobileNumbar}
                placeholder="Mobile Number"
                onChange={handleChanges}
              />
              <CFormInput
                name="email"
                type="text"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
              />
              <CFormInput
                name="items"
                type="text"
                value={formData.items}
                placeholder="Items"
                onChange={handleChange}
              />
              <CFormInput
                name="price"
                type="text"
                value={formData.price}
                placeholder="Price"
                onChange={handleChange}
              />
            </CInputGroup>
            <CButton type="submit" color="success">Update Customer</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default UpdateCustomer;










