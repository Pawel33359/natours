/* eslint-disable */

// updateData
import axios from 'axios';
import { showAlert } from './alerts.js';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${type === 'data' ? 'updateMe' : 'updateMyPassword'}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${type[0].toUpperCase() + type.slice(1)} updated successfully`
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
