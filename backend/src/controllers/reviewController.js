import Review from '../models/Review.js';

// @desc    Add review for a tour
// @route   POST /api/reviews/:tourId
// @access  Private
export const addReview = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;
    const tourId = req.params.tourId;
    const userId = req.user._id;

    // Check if user already reviewed this tour (handled by schema index, but good to check or catch)
    const existingReview = await Review.findOne({ tour: tourId, user: userId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review for this tour package.',
      });
    }

    const review = await Review.create({
      tour: tourId,
      user: userId,
      reviewText,
      rating: Number(rating),
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Review added.',
      data: review,
    });
  } catch (error) {
    console.error('Add Review Error:', error);
    // Handle unique index error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this tour.',
      });
    }
    return res.status(200).json({ success: false, message: error.message });
  }
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Private/Admin
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('tour', 'title')
      .sort('-createdAt');

    return res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error('Get All Reviews Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    const tourId = review.tour;
    await review.deleteOne();

    // Recalculate tour average rating manually to be absolutely sure Mongoose hooks run
    await Review.calcAverageRatings(tourId);

    return res.json({
      success: true,
      message: 'Review deleted successfully and ratings updated.',
    });
  } catch (error) {
    console.error('Delete Review Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
