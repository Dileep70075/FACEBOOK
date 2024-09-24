import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CForm, CInputGroup, CButton,CFormInput } from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Colors = () => {
  const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    photo: null,
    detail: '',
  });
  const handleChange = (e) => {

    console.log(e)
    setFormData({ 
      ...formData,
      [e.target.name] : e.target.value,
    })

    console.log(formData)

  }
  const handlePhotoChange = (e) =>{
    setFormData({
      ...formData,
        photos : e.target.files[0],
    })
    console.log(formData)

  }
const handleSubmit = async (e) =>{
  e.preventDefault();
try{
  const token =  localStorage.getItem('userToken')
  const userId = JSON.parse(localStorage.getItem('userData'))._id;
  const response = await axios.post('http://localhost:3001/post',formData,{
  headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },  params: { userId },
});
if( response.data.success === true){
  console.log(response.data)
  Navigate('/theme/addphoto')
}
else{
  console.error('Upload failed:', response.data.message)
}
}
catch(error){
console.error("internal error",error);
}
}
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CForm onSubmit={handleSubmit} >
            <CInputGroup className="mb-3">
              <CFormInput
                name="photo"
                type="file"
                placeholder="Upload Photo"
                onChange={handlePhotoChange}
              />
              <CFormInput
                name="detail"
                type="text"
                value={formData.detail}
                placeholder="detail"
                onChange={handleChange}
              />
            </CInputGroup>
            <CButton type="submit" color="success">Upload photo</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors


