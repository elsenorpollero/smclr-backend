const User = require('../models/UserModal'); 


const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
        status: "success", // Indicating the request was successful
        data: users // The retrieved users
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        status: "error", // Indicating there was an error
        message: "Failed to retrieve users" // Error message
      });
    }
  };
  
module.exports = {getAllUsers}