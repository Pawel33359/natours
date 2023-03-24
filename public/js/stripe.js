/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';

const stripe = Stripe(
  'pk_test_51MnlgALoWQNLaTPB0KjvezW9oCw5sf9rzjh7IsMttSiRy5FMx8NdKTVmYZiK5CI49bzej60vRgqt4ZBRx8ns2O9100Tu94fkdI'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
