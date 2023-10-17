import db from '../models/index.js';
const Withdrawal = db.Withdrawal;

const getAllWithdrawals = async (req, res) => {
    try {
        const response = await Withdrawal.findAll();
        if(response.length === 0){
            res.status(404).json({"message": "No withdrawal record found"});
        }
        else if(response){
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getWithdrawalById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Withdrawal.findByPk(id);
        if(response === null ){
            res.status(404).json({"message": "Withdrawal record not found."});
        }else if(response){
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const createWithdrawal = async (req, res) => {
    const withdrawal = req.body;

    try {
        const response = await Withdrawal.create(withdrawal);
        if(response){
            res.status(201).json({"message": "Withdrawal record created.", "data": response});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateWithdrawalById = async (req, res) => {
    const { id } = req.params;
    const { amount, withdrawalDate, withdrawalTime, paymentMethod, withdrawalStatus, transactionId, accountNumber } = req.body;
    try {
        const [ response ] = await Withdrawal.update(
            {
               "amount":amount,
               "withdrawalDate":withdrawalDate,
               "withdrawalTime":withdrawalTime,
               "paymentMethod":paymentMethod,
               "withdrawalStatus":withdrawalStatus,
               "transactionId":transactionId,
               "accountNumber":accountNumber    
            },
                { where: { id: id}});
        if(response === 0){
            res.status(404).json({"message": "User not found"});
        }else if(response){
            res.status(201).json({"message": "User updated."});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteWithdrawalById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Withdrawal.destroy({ where: { id: id } });
        if (response === 1) {
            res.status(200).json({ "message": "Withdrawal record deleted." });
        } else {
            res.status(404).json({ "message": "Withdrawal record not found." });
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

export { createWithdrawal, getAllWithdrawals, getWithdrawalById, updateWithdrawalById, deleteWithdrawalById };
