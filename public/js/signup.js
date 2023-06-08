/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts.js';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const signupBtn = document.getElementById('signup-btn');
    signupBtn.textContent = 'Processing...';
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    console.log(res);

    signupBtn.textContent = 'Signup';

    if (res.data.status === 'success') {
      showAlert('success', 'Created account successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
