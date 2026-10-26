const Course = require('../models/Course');

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;
    if (!title || !description || !price || !category) {
      res.status(400);
      throw new Error('Please fill in all required fields (title, description, price, category)');
    }

    const course = await Course.create({ title, description, price, category });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('category', 'name');
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('category', 'name');
    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }
    res.status(200).json(course);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(404);
      return next(new Error('Course not found (Invalid ID format)'));
    }
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};