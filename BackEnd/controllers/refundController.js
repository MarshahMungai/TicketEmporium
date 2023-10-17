import db from '../models/index.js';
const Refund = db.Refund;

const getAllRefunds = async (req, res) => {
  try {
    const response = await Refund.findAll();
    if (response.length === 0) {
      res.status(404).json({"message": "No refunds found"});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getRefundById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Refund.findByPk(id);
    if (response === null) {
      res.status(404).json({"message": "Refund not found."});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createRefund = async (req, res) => {
  const refund = req.body;

  try {
    const response = await Refund.create(refund);
    if (!response) {
      res.status(500).json({"message": "Internal server error"});
    } else if (response) {
      res.status(201).json({"message": "Refund created."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateRefundById = async (req, res) => {
  const { id } = req.params;
  const { amount, reason, status } = req.body;

  try {
    const [response] = await Refund.update(
      { "amount": amount, "reason": reason, "status": status },
      { where: { id: id } }
    );
    if (response === 0) {
      res.status(404).json({"message": "Refund not found"});
    } else if (response) {
      res.status(201).json({"message": "Refund updated."});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteRefundById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Refund.destroy({where: {id: id}});
    if (response === 0) {
      res.status(404).json({"message": "Refund not found"});
    } else if (response) {
      res.status(200).json({"message": "Refund deleted."})
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export { createRefund, getAllRefunds, getRefundById, updateRefundById, deleteRefundById };
