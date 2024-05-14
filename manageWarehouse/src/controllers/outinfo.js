import OutInput from "../module/infoOutput.js";

export const OutInputController = {
  // get all
  getAllOutInput: async (req, res) => {
    try {
      const OutInputs = await OutInput.find().populate(["idProduct", "IdInputInfo","idUser"]);
      if (OutInputs.length === 0) {
        return res.json({
          message: "Không có OutInput nào",
        });
      }

      return res.status(200).json(OutInputs);
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },

  getOutInput: async (req, res) => {
    try {
      const { id } = req.params;
      const OutInput = await OutInput.findById(id).populate(["idProduct", "IdInputInfo", "idUser"])
      if (!OutInput) {
        return res
          .status(500)
          .json({ message: "Không tìm thấy thông tin người dùng" });
      }

      return res.status(200).json({
        message: "Lấy thông tin người dùng thành công",
        OutInput,
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
        name: body.OutInputname,

        count: body.count,
        idProduct: body.idProduct,

        idUser: body.idUser,
        IdInputInfo: body.IdInputInfo,
        
      };
     
      const updateOutInput = await OutInput.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      if (!updateOutInput) {
        return res.status(400).json({ message: "Cập nhật thất bại" });
      }
      res.status(200).json({
        message: "Update Success",
        OutInput: updateOutInput,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteOutInput: async (req, res) => {
    try {
      const outInputDelete = await OutInput.findByIdAndDelete(req.params.id);

      res.json({
        message: "OutInput deleted successfully",
        outInput: outInputDelete,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /* create OutInput */
  createOutInput: async (req, res) => {
    try {
      const body = req.body;

      /* check OutInputname exists */
      const OutInputNameExits = await OutInput.findOne({ name: body.name });
      if (OutInputNameExits) {
        return res.status(400).json({
          message: "OutInputname đã tồn tại",
        });
      }
      
      const outInput = await OutInput.create({
        ...req.body,
      });

      return res.status(200).json({
        message: "Created success",
        outInput,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
};
