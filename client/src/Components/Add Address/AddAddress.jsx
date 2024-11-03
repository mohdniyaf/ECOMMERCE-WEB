import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/store';

function AddAddress() {
  const navigate = useNavigate();
  const { userId, token } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAddress = {
      userId,
      firstName,
      lastName,
      landmark,
      addressDetail,
      state,
      zip,
      phone,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/addAddress`,
        newAddress,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Navigate after successful submission
      navigate('/checkout');
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <div>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-5 col-lg-6 col-md-7 col-sm-9 col-11'>
          <div className='d-flex justify-content-center'>
            <h2 className='login-font'>Add Address!</h2>
          </div>
          <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label'>First Name</label>
                <input
                  type='text'
                  placeholder='Enter First Name'
                  className='form-control'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Last Name</label>
                <input
                  type='text'
                  placeholder='Enter Last Name'
                  className='form-control'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Landmark</label>
                <input
                  type='text'
                  placeholder='Enter Landmark'
                  className='form-control'
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Address Details</label>
                <input
                  type='text'
                  placeholder='Enter Address Details'
                  className='form-control'
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>State</label>
                <input
                  type='text'
                  placeholder='Enter State'
                  className='form-control'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Zip Code</label>
                <input
                  type='number'
                  placeholder='Enter Zip Code'
                  className='form-control'
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Phone Number</label>
                <input
                  type='text'
                  placeholder='Enter Phone Number'
                  className='form-control'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type='submit' className='btn form-submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
