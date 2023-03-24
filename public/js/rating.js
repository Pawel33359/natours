/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';

export const sendReview = async (review, rating, tourId) => {
  try {
    // const reviewBtn = document.getElementById('signup-btn');
    // reviewBtn.textContent = 'Processing...';
    const res = await axios({
      method: 'POST',
      url: `/api/v1/tours/${tourId}/reviews`,
      data: {
        review,
        rating,
      },
    });

    // reviewBtn.textContent = 'Send';

    if (res.data.status === 'success') {
      showAlert('success', 'Review created!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const disableActiveStar = () => {
  for (let i = 1; i <= 5; i++) {
    const star = document
      .getElementById(`star-${i}`)
      .closest('.star-container')
      .querySelector('.reviews__star-svg');
    star.classList.remove('reviews__star--active');
    star.classList.add('reviews__star--inactive');
  }
};

export const setActiveStar = (rat) => {
  for (let i = 1; i <= rat; i++) {
    const star = document
      .getElementById(`star-${i}`)
      .closest('.star-container')
      .querySelector('.reviews__star-svg');
    star.classList.add('reviews__star--active');
    star.classList.remove('reviews__star--inactive');
  }
};
