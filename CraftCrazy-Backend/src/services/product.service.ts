import { Product, IProduct } from "../models/product.model";

// Create product
export const createProductService = async (data: IProduct) => {
  const newProduct = new Product(data);
  console.log(newProduct);
  return await newProduct.save();
};

// Get all products
export const getAllProductsService = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

// Get single product
export const getProductByIdService = async (id: string) => {
  return await Product.findById(id);
};

// Update product
export const updateProductService = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Delete product
export const deleteProductService = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};


export const getFilteredProductServices = async (category?: string) => {

  const filter: any = {};
  if (category) {
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }
  }
  const products = await Product.find(filter).sort({ createdAt: -1 });
  return products;

}
