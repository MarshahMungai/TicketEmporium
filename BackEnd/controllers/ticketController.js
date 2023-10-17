import db from "../models/index.js";
const { Ticket } = db;

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTicketById = async (req, res) => {
  const { ticket_id } = req.params;
  try {
    const ticket = await Ticket.findByPk(ticket_id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createTicket = async (req, res) => {
  const { ticketType, quantity, price, eventName, event_id } = req.body;

  try {
    const createdTickets = await Promise.all(
      Array.from({ length: quantity }).map(async () => {
        return await Ticket.create({
          ticketType,
          price,
          eventName,
          event_id,
        });
      })
    );

    res.status(201).json(createdTickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateTicketById = async (req, res) => {
  const { id } = req.params;
  const { price, ticketType } = req.body;

  try {
    const [ response ] = await Ticket.update(
      { "price": price,
        "ticketType": ticketType },
      { where: { id: id } }
    );
    if(response === 0) {
      res.status(404).json({"message": "Ticket not found"});
    } else if(response) {
      res.status(201).json({"message": "Ticket updated."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTicketById = async (req, res) => {
  const { ticket_id } = req.params;
  try {
    const deletedTicket = await Ticket.destroy({ where: { ticket_id } });
    if (deletedTicket === 1) {
      res.status(200).json({ message: 'Ticket deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Ticket not found.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getAllTickets, getTicketById, createTicket, updateTicketById, deleteTicketById };
