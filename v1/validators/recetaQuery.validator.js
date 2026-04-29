import Joi from "joi";

export const filtrosRecetaSchema = Joi.object({
  dificultad: Joi.string()
    .valid("facil", "media", "dificil")
    .messages({
      "any.only": "La dificultad debe ser 'facil', 'media' o 'dificil'"
    }),

  categoria: Joi.string()
    .hex()
    .length(24)
    .messages({
      "string.hex": "La categoría debe ser un ObjectId válido",
      "string.length": "La categoría debe tener 24 caracteres"
    }),

  tiempoMin: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.base": "tiempoMin debe ser un número",
      "number.integer": "tiempoMin debe ser un número entero",
      "number.min": "tiempoMin debe ser mayor a 0"
    }),

  tiempoMax: Joi.number()
    .integer()
    .min(1)
    .messages({
      "number.base": "tiempoMax debe ser un número",
      "number.integer": "tiempoMax debe ser un número entero",
      "number.min": "tiempoMax debe ser mayor a 0"
    }),

  ingrediente: Joi.string()
    .trim()
    .min(1),

  ingredientes: Joi.string()
    .trim()
    .min(1),

  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .default(3)
})
.unknown(false);