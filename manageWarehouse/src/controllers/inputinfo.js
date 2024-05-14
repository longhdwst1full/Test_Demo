import InfoInput from "../module/input.js";

export const InfoInputController = {
  // get all
  getAllInfoInput: async (req, res) => {
    try {
      const InfoInputs = await InfoInput.find().populate("idProduct");
      if (InfoInputs.length === 0) {
        return res.json({
          message: "Không có InfoInput nào",
        });
      }

      return res.status(200).json(InfoInputs);
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },

  getInfoInput: async (req, res) => {
    try {
      const { id } = req.params;
      const InfoInput = await InfoInput.findById(id).populate("idProduct");
      if (!InfoInput) {
        return res
          .status(500)
          .json({ message: "Không tìm thấy thông tin người dùng" });
      }

      return res.status(200).json({
        message: "Lấy thông tin người dùng thành công",
        InfoInput,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },

  updateInfor: async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      let dataUpdate = {
        name: body.InfoInputname,

        inputPrice: body.inputPrice,
        outputPrice: body.outputPrice,

        idProduct: body.idProduct,
        
      };
     
      const updateInfoInput = await InfoInput.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      if (!updateInfoInput) {
        return res.status(400).json({ message: "Cập nhật thất bại" });
      }
      res.status(200).json({
        message: "Update Success",
        InfoInput: updateInfoInput,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteInfoInput: async (req, res) => {
    try {
      const InfoInputDelete = await InfoInput.findByIdAndDelete(req.params.id);

      res.json({
        message: "InfoInput deleted successfully",
        InfoInput: InfoInputDelete,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /* create InfoInput */
  createInfoInput: async (req, res) => {
    try {
      const body = req.body;

      /* check InfoInputname exists */
      const infoInputNameExits = await InfoInput.findOne({ name: body.name });
      if (infoInputNameExits) {
        return res.status(400).json({
          message: "InfoInputname đã tồn tại",
        });
      }

      const infoInput = await InfoInput.create({
        ...req.body,
      });

      return res.status(200).json({
        message: "Created success",
        infoInput,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
};
