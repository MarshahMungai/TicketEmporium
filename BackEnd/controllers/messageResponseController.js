import db from '../models/index.js';
const MessageResponse = db.MessageResponse;

const getAllMessageResponses = async (req, res) => {
  try {
    const response = await MessageResponse.findAll();
    if (response.length === 0) {
      res.status(404).json({"message": "No message responses found"});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getMessageResponseById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await MessageResponse.findByPk(id);
    if (response === null) {
      res.status(404).json({"message": "Message response not found."});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createMessageResponse = async (req, res) => {
  const messageResponse = req.body;

  try {
    const response = await MessageResponse.create(messageResponse);
    if (!response) {
      res.status(500).json({"message": "Internal server error"});
    } else if (response) {
      res.status(201).json({"message": "Message response created."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateMessageResponseById = async (req, res) => {
  const { id } = req.params;
  const { text, responder, timestamp } = req.body;

  try {
    const [response] = await MessageResponse.update(
      { "text": text, "responder": responder, "timestamp": timestamp },
      { where: { id: id } }
    );
    if (response === 0) {
      res.status(404).json({"message": "Message response not found"});
    } else if (response) {
      res.status(201).json({"message": "Message response updated."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteMessageResponseById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await MessageResponse.destroy({where: {id: id}});
    if (response === 0) {
      res.status(404).json({"message": "Message response not found"});
    } else if (response) {
      res.status(200).json({"message": "Message response deleted."})
    }
  } catch (error) {
    res.status(400).json(error);
  }
};


const getResponsesByUserId = async (req, res) => {
  const user_id  = req.params.user_id;
  try {
    const response = await MessageResponse.findAll({
      where: { user_id }, // Filter by user_id
    });

    if (response.length === 0) {
      res.status(404).json({"message": "No message responses found"});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    // Handle errors, such as database connection issues
    res.status(400).json(error);
  }
};




export { createMessageResponse, getAllMessageResponses, getMessageResponseById, updateMessageResponseById, deleteMessageResponseById, getResponsesByUserId };
