import db from '../models/index.js';
const Order = db.Order;

const getAllOrders = async (req, res) => {
    try {
        const response = await Order.findAll();
        if(response.length === 0){
            res.status(404).json({"message": "No order found"});
        }
        else if(response){
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Order.findByPk(id);
        if(response === null ){
            res.status(404).json({"message": "Order not found."});
        }else if(response){
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const createOrder = async (req, res) => {
    const order = req.body;

    try {
        const response = await Order.create(order);
            if(!response){
                res.status(500).json({"message": "Internal server error"});
            }else if(response){
                res.status(201).json({"message": "Order created."});
            }
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateOrderById = async (req, res) => {
    const { id } = req.params;
    const { quantity, amount, orderDate, orderTime, status } = req.body;
    try {
        const [ response ] = await Order.update(
            {
                "quantity": quantity,
                "amount": amount,
                "orderDate": orderDate,
                "orderTime": orderTime,
                "status": status
            },
                { where: { id: id}});
        if(response === 0){
            res.status(404).json({"message": "Order not found"});
        }else if(response){
            res.status(201).json({"message": "Order updated."});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Order.destroy({where: {id: id}})
        if(response === 0){
            res.status(404).json({"message": "Order not found"});
        }else if(response){
            res.status(200).json({"message": "Order deleted."})
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

const getOrderCount = async (req, res) => {
    try {
        const count = await Order.count(); 
        res.json(count);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Server error" });
    }
}

const getOrdersByUserId = async (req, res) => {
    const user_id  = req.params.user_id;
    try {
      const response = await Order.findAll({
        where: { user_id }, // Filter by user_id
      });
  
      if (response.length === 0) {
        res.status(404).json({"message": "No orders responses found"});
      } else if (response) {
        res.status(200).json(response);
      }
    } catch (error) {
      // Handle errors, such as database connection issues
      res.status(400).json(error);
    }
  };

const getOrdersBySellerId = async (req, res) => {
    const seller_id  = req.params.user_id;
    try {
      const response = await Order.findAll({
        where: { seller_id }, // Filter by seller_id
      });
  
      if (response.length === 0) {
        res.status(404).json({"message": "No orders responses found"});
      } else if (response) {
        res.status(200).json(response);
      }
    } catch (error) {
      // Handle errors, such as database connection issues
      res.status(400).json(error);
    }
  };

  const getTotalAmountByUserId = async (req, res) => {
    const seller_id = req.params.user_id;
    try {
      const sum = await Order.sum('amount', {
        where: { seller_id }, // Filter by user_id
      });
  
      res.json(sum);
    } catch (error) {
      // Handle errors, such as database connection issues
      res.status(400).json(error);
    }
  };


  const getOrderCountByUserId = async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const count = await Order.count({
        where: { user_id }, // Filter by user_id
      });
      
        res.json(count);
    
    } catch (error) {
      // Handle errors, such as database connection issues
      res.status(400).json(error);
    }
  };
  


  

export { 
    createOrder, 
    getAllOrders, 
    getOrderById, 
    updateOrderById, 
    deleteOrderById, 
    getOrderCount, 
    getOrdersByUserId, 
    getTotalAmountByUserId,
    getOrderCountByUserId,
    getOrdersBySellerId
 };
