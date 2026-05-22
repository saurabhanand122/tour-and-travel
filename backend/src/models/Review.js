import mongoose from 'mongoose';
import Tour from './Tour.js';

const reviewSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
    reviewText: {
      type: String,
      required: [true, 'Review cannot be empty!'],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Review must have a rating between 1 and 5.'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate reviews from the same user on the same tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Static method to calculate average rating and number of ratings
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      totalReviews: stats[0].nRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      totalReviews: 0,
      averageRating: 4.5, // Default rating
    });
  }
};

// Call calcAverageRatings after save
reviewSchema.post('save', function () {
  // 'this' points to current review
  this.constructor.calcAverageRatings(this.tour);
});

// Call calcAverageRatings after delete/update
reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.tour);
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
