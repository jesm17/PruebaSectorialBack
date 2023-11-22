import mongoose from "mongoose";

// Definir el esquema para Tema
const temaSchema = new mongoose.Schema({
  nombre: String,
});

// Definir el esquema para Subcategoría
const subcategoriaSchema = new mongoose.Schema({
  nombre: String,
  activo: Boolean,
  temas: [temaSchema], // Un array de Temas
});

// Definir el esquema para Categoría
const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  activo: { type: Boolean, default: true },
  subcategorias: [subcategoriaSchema], // Un array de Subcategorías
});

// Crear el modelo basado en el esquema
const Categoria = mongoose.model("Categoria", categoriaSchema);

// Exportar el modelo
export default Categoria;
