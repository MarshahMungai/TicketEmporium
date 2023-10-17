import db from '../models/index.js';
const Event = db.Event;

//const Ticket = db.Ticket;

const getAllEvents = async (req, res) => {
  try {
    const response = await Event.findAll();
    if(response.length === 0) {
      res.status(404).json({"message": "No event found"});
    } else if(response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Event.findByPk(id);
    if(response === null) {
      res.status(404).json({"message": "Event not found."});
    } else if(response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createEvent = async (req, res) => {
  const event = req.body;

  try {
    const response = await Event.create(event);
    if (!response) {
      res.status(500).json({ "message": "Internal server error" });
    } else if (response) {
      const eventId = response.id;
      res.status(201).json({ "message": "Event created", "eventId": eventId });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};


const updateEventById = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, time, venue, image } = req.body;

  try {
    const [ response ] = await Event.update(
      { "name": name, "description": description, "date": date, "time": time, "venue": venue, "image": image },
      { where: { id: id } }
    );
    if(response === 0) {
      res.status(404).json({"message": "Event not found"});
    } else if(response) {
      res.status(201).json({"message": "Event updated."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Event.destroy({where: {id: id}});
    if(response === 0) {
      res.status(404).json({"message": "Event not found"});
    } else if(response) {
      res.status(200).json({"message": "Event deleted."})
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// const getAllAvailableEvents = async (req, res) => {
//   try {
//     // Query for events with associated tickets that have a 'Available' status
//     const eventsWithAvailableTickets = await Event.findAll({
      
//       include: {
//         model: db.Ticket,
//         as: 'tickets', // Use the alias for the association
//         where: {
//           ticketStatus: 'Available',
//         },
//       },
     
//     });

//     if (eventsWithAvailableTickets.length === 0) {
//       res.status(404).json({ message: 'No events found with available tickets' });
//     } else {
//       res.status(200).json(eventsWithAvailableTickets);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while fetching available events' });
//   }
// };



const getEventsByUserId = async (req, res) => {
  const user_id  = req.params.user_id;
    try {
      const response = await Event.findAll({
        where: { user_id }, // Filter by user_id
      });

    if (response.length === 0) {
      res.status(404).json({ message: 'No events found for this user' });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEventCount = async (req, res) => {
  try {
      const count = await Event.count(); 
      res.json(count);
  } catch (error) {
      console.error(error);
      res.status(500).json({ "message": "Server error" });
  }
};

const decreaseTicketQuantity = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the event by ID
    const event = await Event.findByPk(id);

    // If the event is not found, return a 404 response
    if (!event) {
      return res.status(404).json({ "message": "Event not found" });
    }

    // Decrease the ticketQuantity by 1
    if (event.ticketQuantity > 0) {
      event.ticketQuantity -= 1;
      await event.save();
      res.status(200).json({ "message": "Ticket quantity decreased." });
    } else {
      res.status(400).json({ "message": "No more tickets available." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


export { createEvent, getAllEvents, getEventById, updateEventById, deleteEventById, getEventsByUserId, getEventCount, decreaseTicketQuantity };
