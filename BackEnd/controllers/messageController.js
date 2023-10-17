import db from '../models/index.js';
const Message = db.Message;

const getAllMessages = async (req, res) => {
  try {
    const response = await Message.findAll();
    if (response.length === 0) {
      res.status(404).json({"message": "No messages found"});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Message.findByPk(id);
    if (response === null) {
      res.status(404).json({"message": "Message not found."});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createMessage = async (req, res) => {
  const { message, user_email, user_id } = req.body;

  try {
    // Check if user_id is provided in the request
    if (user_id) {
      // Case 1: If user_id is provided, create a message associated with the user
      const response = await Message.create({
        message,
        user_id,
        user_email: null,
      });
      if (!response) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(201).json({ message: "Message created." });
      }
    } else if (user_email) {
      // Case 2: If email is provided, create a message without checking the database
      const response = await Message.create({
        message,
        user_email,
        user_id: null,
        // Optionally, you can add some other logic here if needed
      });
      if (!response) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(201).json({ message: "Message created." });
      }
    } else {
      // Invalid request format, both user_id and user_email are missing
      res.status(400).json({ message: "Invalid request format" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};


const updateMessageById = async (req, res) => {
  const { id } = req.params;
  const { text, sender, timestamp } = req.body;

  try {
    const [response] = await Message.update(
      { "text": text, "sender": sender, "timestamp": timestamp },
      { where: { id: id } }
    );
    if (response === 0) {
      res.status(404).json({"message": "Message not found"});
    } else if (response) {
      res.status(201).json({"message": "Message updated."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Message.destroy({where: {id: id}});
    if (response === 0) {
      res.status(404).json({"message": "Message not found"});
    } else if (response) {
      res.status(200).json({"message": "Message deleted."})
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export { createMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById };
