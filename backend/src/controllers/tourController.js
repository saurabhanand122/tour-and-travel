import Tour from '../models/Tour.js';

// @desc    Get all tours with filtering & searching
// @route   GET /api/tours
// @access  Public
export const getAllTours = async (req, res) => {
  try {
    const queryObj = {};

    // 1. Search by Destination (case-insensitive regex)
    if (req.query.destination) {
      queryObj.destination = { $regex: req.query.destination, $options: 'i' };
    }

    // 2. Filter by max price
    if (req.query.maxPrice) {
      queryObj.price = { $lte: Number(req.query.maxPrice) };
    }

    // 3. Filter by duration (days)
    if (req.query.duration) {
      queryObj.duration = { $lte: Number(req.query.duration) };
    }

    // 4. Featured filter
    if (req.query.featured) {
      queryObj.featured = req.query.featured === 'true';
    }

    const tours = await Tour.find(queryObj);

    return res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    console.error('Get All Tours Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single tour by ID
// @route   GET /api/tours/:id
// @access  Public
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.query.id || req.params.id).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'name email',
      },
    });

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    return res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    console.error('Get Tour By ID Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new tour package
// @route   POST /api/tours
// @access  Private/Admin
export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    return res.status(201).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    console.error('Create Tour Error:', error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a tour package
// @route   PUT /api/tours/:id
// @access  Private/Admin
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    return res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    console.error('Update Tour Error:', error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a tour package
// @route   DELETE /api/tours/:id
// @access  Private/Admin
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Tour package successfully deleted',
    });
  } catch (error) {
    console.error('Delete Tour Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
