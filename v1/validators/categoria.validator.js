import Joi from "joi";

export const crearCategoriaSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "El nombre de la categoría no puede estar vacío",
      "string.min": "El nombre de la categoría debe tener al menos 2 caracteres",
      "string.max": "El nombre de la categoría no puede superar los 100 caracteres"
    }),
    descripcion: Joi.string()
      .trim()
      .min(10)
      .max(300)
      .required()
      .messages({
        "string.min": "La descripción de la categoría debe tener al menos 10 caracteres",
        "string.max": "La descripción de la categoría no puede superar los 300 caracteres"
      })

});

// Esquema para modificar una categoría (todos los campos son opcionales)
export const modificarCategoriaSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      "string.empty": "El nombre de la categoría no puede estar vacío",
      "string.min": "El nombre de la categoría debe tener al menos 2 caracteres",
      "string.max": "El nombre de la categoría no puede superar los 100 caracteres"
    }),

  descripcion: Joi.string()
    .trim()
    .min(10)
    .max(300)
    .optional()
    .messages({
      "string.min": "La descripción de la categoría debe tener al menos 10 caracteres",
      "string.max": "La descripción de la categoría no puede superar los 300 caracteres"
    })
})
.min(1)
.messages({
  "object.min": "Debes enviar al menos un campo para modificar"
});