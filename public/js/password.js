/* eslint-disable */

import axios from 'axios';
// import { TokenExpiredError } from 'jsonwebtoken';
import { showAlert } from './alerts.js';

export const forgotPassword = async (email) => {
  try {
    const forgotBtn = document.getElementById('forgot-btn');
    forgotBtn.textContent = 'Processing...';
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });
    forgotBtn.textContent = 'Send';
    if (res.data.status === 'success') {
      showAlert('success', 'Email succesfully sent!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const resetPassword = async (password, passwordConfirm) => {
  try {
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.textContent = 'Processing...';
    const token = window.location.pathname.split('/').pop();
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });
    resetBtn.textContent = 'Reset';
    if (res.data.status === 'success') {
      showAlert('success', 'Password changed!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    // console.log(TokenExpiredError);
    // showAlert('error', err);
    showAlert('error', err.response.data.message);
  }
};
