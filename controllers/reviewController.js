const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.checkBooking = catchAsync(async (req, res, next) => {
  // console.log(req.body.tour, req.body.user);
  const booking = await Booking.find({
    tour: req.body.tour,
    user: req.body.user,
  });
  if (booking.length === 0)
    return next(new AppError(`User haven't booked this tour yet!`, 400));

  next();
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
