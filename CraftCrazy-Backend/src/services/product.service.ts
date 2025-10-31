import { Product } from "../models/product.model";
import { IProduct } from "../types/productTypes";

export const createProductService = async (data: IProduct) => {
  const newProduct = new Product(data);
  return await newProduct.save();
};

export const getAllProductsService = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export const getProductByIdService = async (id: string) => {
  return await Product.findById(id);
};

export const updateProductService = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProductService = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
