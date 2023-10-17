import db from '../models/index.js';
const ReviewResponse = db.ReviewResponse;

const getAllReviewResponses = async (req, res) => {
  try {
    const response = await ReviewResponse.findAll();
    if (response.length === 0) {
      res.status(404).json({"message": "No review responses found"});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getReviewResponseById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ReviewResponse.findByPk(id);
    if (response === null) {
      res.status(404).json({"message": "Review response not found."});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createReviewResponse = async (req, res) => {
  const reviewResponse = req.body;

  try {
    const response = await ReviewResponse.create(reviewResponse);
    if (!response) {
      res.status(500).json({"message": "Internal server error"});
    } else if (response) {
      res.status(201).json({"message": "Review response created."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateReviewResponseById = async (req, res) => {
  const { id } = req.params;
  const { content, author, timestamp } = req.body;

  try {
    const [response] = await ReviewResponse.update(
      { "content": content, "author": author, "timestamp": timestamp },
      { where: { id: id } }
    );
    if (response === 0) {
      res.status(404).json({"message": "Review response not found"});
    } else if (response) {
      res.status(201).json({"message": "Review response updated."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteReviewResponseById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await ReviewResponse.destroy({where: {id: id}});
    if (response === 0) {
      res.status(404).json({"message": "Review response not found"});
    } else if (response) {
      res.status(200).json({"message": "Review response deleted."})
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export { createReviewResponse, getAllReviewResponses, getReviewResponseById, updateReviewResponseById, deleteReviewResponseById };
