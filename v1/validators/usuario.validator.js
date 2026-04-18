import Joi from "joi";

// Esquema para crear usuario
export const crearUsuarioSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "El nombre no puede estar vacío",
      "string.min": "El nombre debe tener al menos 2 caracteres",
      "string.max": "El nombre no puede superar los 50 caracteres",
      "any.required": "El nombre es obligatorio"
    }),

  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.empty": "El email no puede estar vacío",
      "string.email": "El email debe ser válido",
      "any.required": "El email es obligatorio"
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "La contraseña no puede estar vacía",
      "string.min": "La contraseña debe tener al menos 6 caracteres",
      "any.required": "La contraseña es obligatoria"
    }),

  rol: Joi.string()
    .valid("usuario", "administrador")
    .optional()
    .messages({
      "any.only": "El rol debe ser 'usuario' o 'administrador'"
    }),

  plan: Joi.string()
    .valid("plus", "premium")
    .optional()
    .messages({
      "any.only": "El plan debe ser 'plus' o 'premium'"
    })
});


// Esquema para modificar usuario (todos opcionales)
export const modificarUsuarioSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .messages({
      "string.empty": "El nombre no puede estar vacío",
      "string.min": "El nombre debe tener al menos 2 caracteres",
      "string.max": "El nombre no puede superar los 50 caracteres"
    }),

  email: Joi.string()
    .trim()
    .email()
    .messages({
      "string.email": "El email debe ser válido"
    }),

  password: Joi.string()
    .min(6)
    .messages({
      "string.min": "La contraseña debe tener al menos 6 caracteres"
    }),

  rol: Joi.string()
    .valid("usuario", "administrador")
    .messages({
      "any.only": "El rol debe ser 'usuario' o 'administrador'"
    }),

  plan: Joi.string()
    .valid("plus", "premium")
    .messages({
      "any.only": "El plan debe ser 'plus' o 'premium'"
    })

}).min(1).messages({
  "object.min": "Debes enviar al menos un campo para modificar"
});