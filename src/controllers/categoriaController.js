import Categoria from "../schemas/categoria.js";

class CategoriaController {
  async getAllCategories(req, res) {
    const categories = await Categoria.find().exec();
    res.send(categories);
  }

  async createCategorie(req, res) {
    const newCategory = await new Categoria(req.body);

    try {
      await newCategory.validate();

      newCategory.save();

      res.status(200).send({
        success: "ok",
        message: "Categoria guardada con exito",
        status: 200,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteCategorie(req, res) {
    const { id } = req.params;
    const deleteCategory = await Categoria.findByIdAndDelete(id);
    if (deleteCategory) {
      res.status(200).send({
        success: "ok",
        message: "Categoria eliminada con exito",
        status: 200,
      });
    } else {
      res.status(404).send({
        success: "false",
        message: "Categoria no encontrada",
        status: 404,
      });
    }
  }

  async deleteSubCategory(req, res) {
    const { categoryid, subcategoryid } = req.params;
  
    const categories = await Categoria.findById(categoryid);
    await categories.subcategorias.forEach((subcategoria) => {
      if (subcategoria._id == subcategoryid) {
        subcategoria.deleteOne({ _id: subcategoryid });
      }
    });

    await categories.save();

    res.status(200).send({
      success: "ok",
      message: "Subcategoria eliminada con exito",
      status: 200,
    });
  }

  async deleteTheme(req, res) {
    const { categoryid, subcategoryid, themeid } = req.params;

    const categories = await Categoria.findById(categoryid);
    await categories.subcategorias.forEach((subcategoria) => {
      if (subcategoria._id == subcategoryid) {
        subcategoria.temas.forEach((tema) => {
          if (tema._id == themeid) {
            tema.deleteOne({ _id: themeid });
          }
        });
      }
    });

    await categories.save();
    res.status(200).send({
      success: "ok",
      message: "Tema eliminado con exito",
      status: 200,
    });
  }

  async updateCategory(req, res) {
    const { id } = req.params;

    const toUpdate = await Categoria.findOne({ _id: id });

    if (!toUpdate) {
      res.status(404).send({
        success: "false",
        message: "categoria no encontrada",
        status: 404,
      });
    } else {
      try {
        await Categoria.validate(req.body);
        Categoria.findByIdAndUpdate(id, req.body);

        res.status(200).send({
          success: "ok",
          message: "Categoria actualizada",
          status: 200,
        });
      } catch (error) {
        res.status(500).send(error);
      }
    }
  }

  async updateSubCategory(req, res) {
    const { categoryid } = req.params;
    const { activo, nombre, temas } = req.body;
 
    const toUpdate = await Categoria.findById({ _id: categoryid });
    if (toUpdate) {
      toUpdate.subcategorias.push({
        activo: activo,
        nombre: nombre,
        temas: temas,
      });

      toUpdate.save();
      res
        .status(200)
        .send({ success: "ok", message: "Subcategoria agregada", status: 200 });
    } else {
      res.status(404).send({
        success: "false",
        message: "No se encontro la categoria a agregar la subcategoria",
        status: 404,
      });
    }
  }

  async updateThemes(req, res) {
    const { categoryid, subcategoryid } = req.params;
    const  temas  = req.body;
    console.log(req.body);
    const category = await Categoria.findById({ _id: categoryid });
    if (category) {
      const subcategory = category.subcategorias.id(subcategoryid);
      if (subcategory) {
        temas.forEach((tema) => {
          subcategory.temas.push(tema);
        });

        category.save();
        res.status(200).send({
          success: "ok",
          message: "Tema agregado",
          status: 200,
        });
      } else {
        res.status(404).send({
          success: "false",
          message: "No se encontro la subcategoria a agregar el tema",
          status: 404,
        });
      }
    } else {
      res.status(404).send({
        success: "false",
        message: "No se encontro la categoria a la cual asignarle el tema",
        status: 404,
      });
    }
  }

  async changeStatusCategory(req, res) {
    const { categoryid } = req.params;
    const category = await Categoria.findById(categoryid);
    if (category) {
      const currentStatus = category.activo;
      await Categoria.findByIdAndUpdate(categoryid, { activo: !currentStatus });
      res.status(200).send({
        success: "ok",
        message: "Se cambio el estado de la categoria",
        status: 200,
      });
    } else {
      res.status(404).send({
        success: "false",
        message: "No se encontro la categoria",
        status: 404,
      });
    }
  }

  async changeStatusSubCategory(req, res) {
    const { categoryid, subcategoryid } = req.params;
    const category = await Categoria.findById(categoryid);
    if (category) {
      const subcategory = category.subcategorias.id(subcategoryid);
      if (subcategory) {
        const currentStatus = subcategory.activo;
        subcategory.activo = !currentStatus;
        category.save();
        res.status(200).send({
          success: "ok",
          message: "Se cambio el estado de la subcategoria",
          status: 200,
        });
      } else {
        res.status(404).send({
          success: "false",
          message: "Subcategoria no encontrada",
          status: 404,
        });
      }
    } else {
      res.status(404).send({
        success: "false",
        message: "No se encontro la categoria",
        status: 404,
      });
    }
  }
}

const categoriaController = new CategoriaController();
export default categoriaController;
