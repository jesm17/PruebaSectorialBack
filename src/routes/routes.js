import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";
const router = Router();
router.get("/", categoriaController.getAllCategories);

router.post("/create/category", categoriaController.createCategorie);

router.put("/update/addcategory/:id", categoriaController.updateCategory);

router.put(
  "/update/addsubcategory/:categoryid/",
  categoriaController.updateSubCategory
);

router.put(
  "/update/addtheme/:categoryid/:subcategoryid",
  categoriaController.updateThemes
);

router.put(
  "/update/changeStatusCategory/:categoryid",
  categoriaController.changeStatusCategory  
);

router.put(
  "/update/changeStatusSubCategory/:categoryid/:subcategoryid",
  categoriaController.changeStatusSubCategory
);

router.delete("/delete/category/:id", categoriaController.deleteCategorie);

router.delete(
  "/delete/subcategory/:categoryid/:subcategoryid",
  categoriaController.deleteSubCategory
);

router.delete(
  "/delete/theme/:categoryid/:subcategoryid/:themeid",
  categoriaController.deleteTheme
);
export default router;
