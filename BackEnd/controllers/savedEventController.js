import db from '../models/index.js';
const SavedEvent = db.SavedEvent;

const getAllSavedEvents = async (req, res) => {
  try {
    const response = await SavedEvent.findAll();
    if (response.length === 0) {
      res.status(404).json({"message": "No saved events found"});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getSavedEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await SavedEvent.findByPk(id);
    if (response === null) {
      res.status(404).json({"message": "Saved event not found."});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createSavedEvent = async (req, res) => {
  const { user_id, event_id } = req.body;

  // Check if an entry with both user_id and event_id already exists
  const existingSavedEvent = await SavedEvent.findOne({
    where: { user_id, event_id },
  });

  if (existingSavedEvent) {
    res.status(400).json({ message: "This event is already saved." });
    return;
  }

  try {
    const response = await SavedEvent.create({ user_id, event_id });

    if (!response) {
      res.status(500).json({ message: "Internal server error" });
    } else if (response) {
      res.status(201).json({ message: "Saved event created." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};


const updateSavedEventById = async (req, res) => {
  const { id } = req.params;
  const { eventId, userId } = req.body;

  try {
    const [response] = await SavedEvent.update(
      { "eventId": eventId, "userId": userId },
      { where: { id: id } }
    );
    if (response === 0) {
      res.status(404).json({"message": "Saved event not found"});
    } else if (response) {
      res.status(201).json({"message": "Saved event updated."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteSavedEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await SavedEvent.destroy({where: {id: id}});
    if (response === 0) {
      res.status(404).json({"message": "Saved event not found"});
    } else if (response) {
      res.status(200).json({"message": "Saved event deleted."})
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export { createSavedEvent, getAllSavedEvents, getSavedEventById, updateSavedEventById, deleteSavedEventById };
