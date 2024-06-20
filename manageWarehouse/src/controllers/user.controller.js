import User from "../models/user.model.js";

/***
 * body:  
 *     username: 
    password: 
    role_id:  
    email: 
    phone: 
    status: 
  parameters : id
 */
export const createuser = async (req, res) => {
  try {
    const { username, password, role_id, email, phone } = req.body;

    const user = await User.create({
      username,
      password,
      role_id,
      email,
      phone,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

export const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role_id, email, phone, status } = req.body;
    console.log(
      id,
      username,
      password,
      role_id,
      email,
      phone,
      status,
      ":ddata"
    );
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        username,
        password,
        role_id,
        email,
        phone,
        status,
      }
    );

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

export const findAlluser = async (req, res) => {
  try {
    const users = await User.find().populate("role_id");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving User.",
    });
  }
};
