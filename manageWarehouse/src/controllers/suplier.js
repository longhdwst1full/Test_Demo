import Suplier from "../module/suplier.js";

export const SuplierController = {
  // get all
  getAllSuplier: async (req, res) => {
    try {
      const supliers = await Suplier.find();
      if (supliers.length === 0) {
        return res.json({
          message: "Không có Suplier nào",
        });
      }

      return res.status(200).json(supliers);
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },
  getSuplier: async (req, res) => {
    try {
      const { id } = req.params;
      const Suplier = await Suplier.findById(id);
      if (!Suplier) {
        return res
          .status(500)
          .json({ message: "Không tìm thấy thông tin người dùng" });
      }

      return res.status(200).json({
        message: "Lấy thông tin người dùng thành công",
        Suplier,
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
        name: body.Supliername, 
        phone: body.phone,
        address: body.address, 
        contractDate: body.contractDate,
        moreInfo: body.moreInfo,
      };
      const Suplier = await Suplier.findById(id);

      if (!Suplier) {
        return res.status(400).json({ error: "Update error" });
      }

      const updateSuplier = await Suplier.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      if (!updateSuplier) {
        return res.status(400).json({ message: "Cập nhật thất bại" });
      }
      res.status(200).json({
        message: "Update Success",
        Suplier: updateSuplier,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteSuplier: async (req, res) => {
    try {
      const SuplierDelete = await Suplier.findByIdAndDelete(req.params.id);

      res.json({
        message: "Suplier deleted successfully",
        Suplier: SuplierDelete,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /* create Suplier */
  createSuplier: async (req, res) => {
    try {
      const body = req.body; 
      const accountExit = await Suplier.findOne({ email: body.email });

      if (accountExit) {
        return res.status(400).json({
          message: "Account đã tồn tại",
        });
      }
      /* check Supliername exists */
      const SuplierNameExits = await Suplier.findOne({ name: body.name });
      if (SuplierNameExits) {
        return res.status(400).json({
          message: "Supliername đã tồn tại",
        });
      } 
      const suplier = await Suplier.create({
        ...req.body,
      });

      return res.status(200).json({
        message: "Created success",
        suplier,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
};
