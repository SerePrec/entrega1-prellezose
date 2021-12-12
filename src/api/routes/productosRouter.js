import { Router } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { productsModel } from "../../models/index.js";
import {
  validateNumericId,
  validateProductPostBody,
  validateProductPutBody
} from "../middlewares/validateData.js";
import { isAdmin } from "../middlewares/auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, fulie, cb) {
    cb(null, path.join(__dirname, "..", "..", "public", "img", "productos"));
  },
  filename: function (req, file, cb) {
    const prefix = Date.now();
    const filenameNoSpaces = file.originalname.replace(/[ ]/g, "_");
    cb(null, prefix + "-" + filenameNoSpaces);
  }
});
const upload = multer({ storage });

const router = Router();

router.get(
  "/:id?",
  async (req, res, next) => {
    if (req.params.id !== undefined) return next();
    try {
      const lista = await productsModel.getAll();
      res.json(lista);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "No se pudo recuperar la infomación"
      });
    }
  },
  validateNumericId,
  async (req, res) => {
    try {
      const producto = await productsModel.getById(req.params.id);
      producto !== null
        ? res.json(producto)
        : res.json({ error: "Producto no encontrado" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "No se pudo recuperar la infomación"
      });
    }
  }
);

router.post(
  "/",
  isAdmin,
  upload.single("imageFile"),
  validateProductPostBody,
  async (req, res) => {
    try {
      let { title, detail, code, brand, category, price, stock, thumbnail } =
        req.body;
      let newProduct = {
        title,
        detail,
        code,
        brand,
        category,
        price,
        stock,
        thumbnail
      };
      newProduct = await productsModel.save(newProduct);
      res.json({ result: "ok", newProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "No se pudo agregar el producto"
      });
    }
  }
);

router.put(
  "/:id",
  isAdmin,
  upload.single("imageFile"),
  validateNumericId,
  validateProductPutBody,
  async (req, res) => {
    try {
      const { title, detail, code, brand, category, price, stock, thumbnail } =
        req.body;
      const { id } = req.params;
      let updateProduct = {
        title,
        detail,
        code,
        brand,
        category,
        price,
        stock,
        thumbnail
      };
      updateProduct = await productsModel.updateById(id, updateProduct);
      updateProduct !== null
        ? res.json({ result: "ok", updateProduct })
        : res.json({ error: "Producto no encontrado" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "No se pudo actualizar el producto"
      });
    }
  }
);

router.delete("/:id", isAdmin, validateNumericId, async (req, res) => {
  try {
    const deletedId = await productsModel.deleteById(req.params.id);
    deletedId !== null
      ? res.json({ result: "ok", deletedId })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se pudo eliminar el producto"
    });
  }
});

export default router;
