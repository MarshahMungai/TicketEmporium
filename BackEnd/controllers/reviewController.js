import db from '../models/index.js';
const Review = db.Review;

const getAllReviews = async (req, res) => {
    try {
        const response = await Review.findAll();
        if(response.length === 0){
            res.status(404).json({"message": "No review found"});
        }
        else if(response){
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Review.findByPk(id);
        if(response === null ){
            res.status(404).json({"message": "Review not found."});
        }else if(response){
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const createReview = async (req, res) => {
    const review = req.body;

    try {
        const response = await Review.create(review);
        if(!response){
            res.status(500).json({"message": "Internal server error"});
        }else if(response){
            res.status(201).json({"message": "Review created."});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateReviewById = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
        const [ response ] = await Review.update(
            {
                "rating": rating,
                "comment": comment
            },
            { where: { id: id } }
        );
        if(response === 0){
            res.status(404).json({"message": "Review not found"});
        }else if(response){
            res.status(201).json({"message": "Review updated."});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteReviewById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Review.destroy({where: {id: id}})
        if(response === 0){
            res.status(404).json({"message": "Review not found"});
        }else if(response){
            res.status(200).json({"message": "Review deleted."})
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

export { createReview, getAllReviews, getReviewById, updateReviewById, deleteReviewById };
