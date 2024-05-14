import User from "../module/user.js";

export const userController = {
  // get all
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.json({
          message: "Không có user nào",
        });
      }

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(500)
          .json({ message: "Không tìm thấy thông tin người dùng" });
      }

      return res.status(200).json({
        message: "Lấy thông tin người dùng thành công",
        user,
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
        name: body.username,

        phone: body.phone,
        address: body.address, 
        
        moreInfo: body.moreInfo,
      };
      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ error: "Update error" });
      }

      const updateUser = await User.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      if (!updateUser) {
        return res.status(400).json({ message: "Cập nhật thất bại" });
      }
      res.status(200).json({
        message: "Update Success",
        user: updateUser,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userDelete = await User.findByIdAndDelete(req.params.id);

      res.json({
        message: "User deleted successfully",
        user: userDelete,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /* create user */
  createUser: async (req, res) => {
    try {
      const body = req.body;

      /* validate */

      /* check account exists */
      const accountExit = await User.findOne({ email: body.email });

      if (accountExit) {
        return res.status(400).json({
          message: "Account đã tồn tại",
        });
      }
      /* check username exists */
      const userNameExits = await User.findOne({ name: body.name });
      if (userNameExits) {
        return res.status(400).json({
          message: "Username đã tồn tại",
        });
      }

    //   const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({
        ...req.body,
      });

      return res.status(200).json({
        message: "Created success",
        user,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
};
