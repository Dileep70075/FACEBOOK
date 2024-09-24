import React, { useState } from 'react';
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react';
import {
  cilUser,
  cilLockLocked,
  cilSettings,
  cilCreditCard,
  cilFile,
  cilTask,
  cilCommentSquare,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import avatar8 from './../../assets/images/avatars/8.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumbar: '',
    address: '',
    items: '',
    price: '',
  });

  const handleLogout = async () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const toggleModal = () => {
    console.log('called')
    setModalVisible(!modalVisible);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };



  const handleNumberChange = (e) => {
    const { id, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (id === 'mobileNumbar' && numericValue.length <= 10) {
      setFormData({ ...formData, [id]: numericValue });
    } 
  };

  const addCustomer = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const userId = JSON.parse(localStorage.getItem('userData'))._id;
      const response = await axios.post('http://localhost:3001/customer', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId },
      });

      if (response.data.success) {
        alert('Customer added successfully');
        // Clear form data or handle success case
        setFormData({
          name: '',
          email: '',
          mobileNumbar: '',
          address: '',
          items: '',
          price: '',
        });
        setModalVisible(false);
        navigate('/theme/customers')
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add customer');
    }
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle> 
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem onClick={toggleModal} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilUser} className="me-2" />
          Add Customer
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem style={{ cursor: 'pointer' }} onClick={() => navigate('/theme/userprofile')}>
          <CIcon icon={cilUser} className="me-2" />
          My Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" style={{ cursor: 'pointer' }}/>
          Logout
        </CDropdownItem>
      </CDropdownMenu>

      {/* Modal for Add Customer Form */}
      <CModal visible={modalVisible}>
        <CModalHeader>
          <CModalTitle>Add Customer</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="name">Name</CFormLabel>
            <CFormInput type="text" id="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />

            <CFormLabel htmlFor="email" className="mt-3">Email</CFormLabel>
            <CFormInput type="email" id="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />

            <CFormLabel htmlFor="mobileNumbar" className="mt-3">Mobile Number</CFormLabel>
            <CFormInput type="text" id="mobileNumbar" placeholder="Enter mobile number" value={formData.mobileNumbar} onChange={handleNumberChange} />

            <CFormLabel htmlFor="address" className="mt-3">Address</CFormLabel>
            <CFormInput type="text" id="address" placeholder="Enter address" value={formData.address} onChange={handleChange} />

            <CFormLabel htmlFor="items" className="mt-3">Items</CFormLabel>
            <CFormInput type="text" id="items" placeholder="Enter items" value={formData.items} onChange={handleChange} />

            <CFormLabel htmlFor="price" className="mt-3">Price</CFormLabel>
            <CFormInput type="text" id="price" placeholder="Enter price" value={formData.price} onChange={handleChange} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleModal}>Close</CButton>
          <CButton color="primary" onClick={addCustomer}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
