import Suplier from "../models/suplier.model.js";

/***
 * body:  
 *    nameSulier,
      address
      contact_info
  parameters : id
 */
export const createSuplier = async (req, res) => {
  try {
    const { nameSulier, address, contact_info } = req.body;

    const suplier = await Suplier.create({
      nameSulier,
      address,
      contact_info,
    });

    res.status(201).json(suplier);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Suplier.",
    });
  }
};

export const updateSuplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameSulier, address, contact_info } = req.body;
    console.log(id, nameSulier, address, contact_info, ":ddata");
    const suplier = await Suplier.findByIdAndUpdate(
      { _id: id },
      {
        nameSulier,
        address,
        contact_info,
      }
    );

    res.status(201).json(suplier);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Suplier.",
    });
  }
};

export const deleteSuplier = async (req, res) => {
  try {
    const { id } = req.params;

    const suplier = await Suplier.findByIdAndDelete(id);

    res.status(200).json({
      message: "Delete success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Suplier.",
    });
  }
};

export const findAllSuplier = async (req, res) => {
  try {
    const supliers = await Suplier.find();
    res.status(200).json(supliers);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving Supliers.",
    });
  }
};
