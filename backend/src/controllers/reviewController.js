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
    return res.status(400).json({ success: false, message: error.message });
  }
};
