import { Request, Response } from "express";
import mongoose from "mongoose";
import Review from "../models/Review.model";


// 🟢 Add a review
export const addReviewController = async (req: Request, res: Response) => {
  try {
    const { productId, variantId, name, email, title, comment, rating, image } = req.body;

    if (!productId || !name || !comment || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const review = new Review({
      productId,
      variantId,
      name,
      email,
      title,
      comment,
      rating,
      image,
      date: new Date(),
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: "Failed to add review", error: (error as Error).message });
  }
};

// 🟢 Get reviews by product ID
export const getReviewsByProductController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const reviews = await Review.find({ productId })
      .sort({ date: -1 })
      .limit(limit);

    const reviewCount = await Review.countDocuments({ productId });
    const averageRating =
      reviewCount === 0
        ? 0
        : (await Review.aggregate([
            { $match: { productId: new mongoose.Types.ObjectId(productId) } },
            { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } },
          ]))[0]?.avgRating ?? 0;

    res.json({ reviews, reviewCount, averageRating });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reviews", error: (error as Error).message });
  }
};

// 🟢 Delete review by ID
export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted successfully" });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete review", error: (error as Error).message });
  }
};
