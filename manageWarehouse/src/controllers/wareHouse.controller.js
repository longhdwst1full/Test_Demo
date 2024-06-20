import WareHouse from "../models/wareHouse.model.js";

/***
 * body:  
 *    location,
      nameWareHouse
      status
  parameters : id
 */
export const createWh = async (req, res) => {
  try {
    const { location, nameWareHouse } = req.body;

    const wareHouse = await WareHouse.create({
      location,
      nameWareHouse,
    });

    res.status(201).json(wareHouse);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the WareHouse.",
    });
  }
};

export const updateWh = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, nameWareHouse, status } = req.body;
    console.log(id, location, nameWareHouse, status, ":ddata");
    const wareHouse = await WareHouse.findByIdAndUpdate(
      { _id: id },
      {
        location,
        nameWareHouse,
        status,
      }
    );

    res.status(201).json(wareHouse);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Product.",
    });
  }
};

export const deletWh = async (req, res) => {
  try {
    const { id } = req.params;

    const wareHouse = await WareHouse.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating the WareHouse.",
    });
  }
};

export const findAllWh = async (req, res) => {
  try {
    const wareHouses = await WareHouse.find().populate("items.product_id");
    res.status(200).json(wareHouses);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving WareHouse.",
    });
  }
};
