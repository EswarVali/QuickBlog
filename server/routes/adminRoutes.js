import express from "express";
import {
  adminLogin,
  adminAuth,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
  deleteCommentById,
  approveCommentById,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

// Protect all routes below
adminRouter.use(adminAuth);

adminRouter.get("/blogs", getAllBlogsAdmin);
adminRouter.get("/comments", getAllComments);
adminRouter.get("/dashboard", getDashboard);

// RESTful routes with :id param
adminRouter.delete("/comments/:id", deleteCommentById);
adminRouter.patch("/comments/:id/approve", approveCommentById);

export default adminRouter;
