import db from "../models/index.js";
const Payment = db.Payment;

const createPayment = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const payment = await Payment.create({
      amount,
      orderId
    });
    res.status(201).json({ message: "Payment created", payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    if (payments.length === 0) {
      return res.status(404).json({ error: "No payments found" });
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePaymentById = async (req, res) => {
  const { id } = req.params;
  const { amount, paymentDate, paymentTime, paymentMethod, paymentStatus, transactionId, accountNumber } = req.body;
  try {
      const [ response ] = await Payment.update(
          {
              "amount": amount,
              "paymentDate": paymentDate,
              "paymentTime": paymentTime,
              "paymentMethod": paymentMethod,
              "paymentStatus": paymentStatus,
              "transactionId": transactionId,
              "accountNumber": accountNumber
          },
              { where: { id: id}});
      if(response === 0){
          res.status(404).json({"message": "Payment not found"});
      }else if(response){
          res.status(201).json({"message": "Payment updated."});
      }
  } catch (error) {
      res.status(400).json(error);
  }
}
const deletePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    await payment.destroy();
    res.status(200).json({ message: "Payment deleted", payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createPayment, getPaymentById, getAllPayments, updatePaymentById, deletePaymentById };
