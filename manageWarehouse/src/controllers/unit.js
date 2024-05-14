import Unit from "../module/unit.js";

export const unitController = {
  // get all
  getAllunit: async (req, res) => {
    try {
      const units = await Unit.find();
      if (units.length === 0) {
        return res.json({
          message: "Không có unit nào",
        });
      }

      return res.status(200).json(units);
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },
  getunit: async (req, res) => {
    try {
      const { id } = req.params;
      const unit = await Unit.findById(id);
      if (!unit) {
        return res
          .status(500)
          .json({ message: "Không tìm thấy  " });
      }

      return res.status(200).json({
        message: "Lấy thông tin   thành công",
        unit,
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
        name: body.name,
 
      };
      const unit = await Unit.findById(id);

      if (!unit) {
        return res.status(400).json({ error: "Update error" });
      }

      const updateunit = await Unit.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      if (!updateunit) {
        return res.status(400).json({ message: "Cập nhật thất bại" });
      }
      res.status(200).json({
        message: "Update Success",
        unit: updateunit,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteunit: async (req, res) => {
    try {
      const unitDelete = await Unit.findByIdAndDelete(req.params.id);

      res.json({
        message: "Unit deleted successfully",
        unit: unitDelete,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /* create unit */
  createunit: async (req, res) => {
    try {
      const body = req.body;

      /* validate */

      /* check account exists */
      const accountExit = await Unit.findOne({ name: body.name });

      if (accountExit) {
        return res.status(400).json({
          message: "name đã tồn tại",
        });
      }
      
 
      const unit = await Unit.create({
        ...req.body,
      });

      return res.status(200).json({
        message: "Created success",
        unit,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
};
