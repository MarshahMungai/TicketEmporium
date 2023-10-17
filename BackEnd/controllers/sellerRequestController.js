import db from '../models/index.js';


const SellerRequest = db.SellerRequest;


const createSellerRequest = async (req, res) => {
  const {
      sellerEmail,
      sellerName,
      sellerPhone,
      companyName,
      companyAddress,
      companyPhone,
      companyEmail,
      sellerIdNumber,
      user_id
  } = req.body;

  try {
      // Create a new seller request in the database
      const newSellerRequest = await SellerRequest.create({
          sellerEmail,
          sellerName,
          sellerPhone,
          companyName,
          companyAddress,
          companyPhone,
          companyEmail,
          sellerIdNumber,
          user_id
      });

      // Check if the seller request was created successfully
      if (newSellerRequest) {
          res.status(201).json({ message: "Seller request created successfully" });
      } else {
          res.status(500).json({ message: "Internal server error" });
      }
  } catch (error) {
      console.error("Error creating seller request:", error);
      res.status(400).json({ message: "Bad request", error: error.message });
  }
};


  

// Get all seller requests
const getAllSellerRequests = async (req, res) => {
  try {
    const response = await SellerRequest.findAll();
    if (response.length === 0) {
      res.status(404).json({"message": "No Seller Requests found"});
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get a single seller request by ID
const getSellerRequestById = async (req, res) => {
  try {
    const sellerRequest = await SellerRequest.findById(req.params.id);
    if (!sellerRequest) {
      return res.status(404).json({ message: 'Seller request not found' });
    }
    res.status(200).json(sellerRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a seller request by ID
const updateSellerRequestById = async (req, res) => {
  try {
    // Find the seller request by ID
    const sellerRequest = await SellerRequest.findByPk(req.params.id); // Assuming the ID is in the request parameters

    if (!sellerRequest) {
      return res.status(404).json({ message: 'Seller request not found' });
    }

    // Update the sellerVerificationStatus to 'verified'
    sellerRequest.sellerVerificationStatus = 'verified';

    // Save the changes to the database
    await sellerRequest.save();

    res.status(200).json({ message: 'Seller request updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Delete a seller request by ID
const deleteSellerRequestById = async (req, res) => {
  try {
    const sellerRequest = await SellerRequest.findByIdAndDelete(req.params.id);
    if (!sellerRequest) {
      return res.status(404).json({ message: 'Seller request not found' });
    }
    res.status(200).json({ message: 'Seller request deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createSellerRequest, getAllSellerRequests, getSellerRequestById, updateSellerRequestById, deleteSellerRequestById };
