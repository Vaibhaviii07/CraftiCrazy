import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinary";
import * as productService from "../services/product.service";

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage }).single("image");

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("product Api is running in backend...");

    const data = req.body;
    console.log(data);
    let imageUrl: string | null = req.body?.imageUrl || null;

    // If no file and no URL
    if (!req.file && !imageUrl) {
      return res.status(400).json({
        message: "Image is required (either file or imageUrl)",
      });
    }

    console.log("product image api is running...");

    // Upload file to Cloudinary
    if (req.file) {
      const cloudinaryResult: any = await uploadToCloudinary(
        req.file.buffer,
        "Craftcrazy-products"
      );
      imageUrl = cloudinaryResult.secure_url;
    }

    // Create product
    const newProduct = await productService.createProductService({
      ...data,
      imageUrl, // will NEVER be undefined
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);
    next(error);
  }
};

export const getAllProdutsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProudcts = await productService.getAllProductsService();
    res.status(200).json({ allProudcts });
  } catch (error) {
    next(error);
  }
}

// Get Product By ID
export const getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

//  Update Product
export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let updateData = req.body;

    if (req.file) {
      const cloudinaryResult: any = await uploadToCloudinary(req.file.buffer, "products");
      updateData.imageUrl = cloudinaryResult.secure_url;
    }

    const updatedProduct = await productService.updateProductService(req.params.id, updateData);

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// Delete Product
export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productService.deleteProductService(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};