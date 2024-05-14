import Product from "../module/product.js";

export const ProductController = {
  // get all
  getAllProduct: async (req, res) => {
    try {
      const Products = await Product.find()
      .populate("idSuplier")
      .populate( "idUnit");
      if (Products.length === 0) {
        return res.json({
          message: "Không có Product nào",
        });
      }

      return res.status(200).json(Products);
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  },

  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const Product = await Product.findById(id);
      if (!Product) {
        return res
          .status(500)
          .json({ message: "Không tìm thấy thông tin" });
      }

      return res.status(200).json({
        message: "Lấy thông tin thành công",
        Product,
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
        name: body.Productname,
        idSuplier: body.idSuplier,
        idUnit: body.idUnit,
      };
      const Product = await Product.findById(id);

      if (!Product) {
        return res.status(400).json({ error: "Update error" });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      if (!updateProduct) {
        return res.status(400).json({ message: "Cập nhật thất bại" });
      }
      res.status(200).json({
        message: "Update Success",
        Product: updateProduct,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const ProductDelete = await Product.findByIdAndDelete(req.params.id);

      res.json({
        message: "Product deleted successfully",
        Product: ProductDelete,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  /* create Product */
  createProduct: async (req, res) => {
    try {
      const body = req.body; 
      /* check Productname exists */
      const ProductNameExits = await Product.findOne({ name: body.name });
      if (ProductNameExits) {
        return res.status(400).json({
          message: "Productname đã tồn tại",
        });
      }
      const product = await Product.create({
        ...req.body,
      });

      return res.status(200).json({
        message: "Created success",
       product,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  },
};
