export const parseArrayFields = (fields = []) => {
  return (req, res, next) => {
    try {
      fields.forEach((field) => {
        const value = req.body[field];

        if (!value) return;

        // Caso 1: viene como string JSON → parsear
        if (typeof value === "string") {
          req.body[field] = JSON.parse(value);
        }

        // Caso 2: viene como un solo valor → convertir a array
        else if (!Array.isArray(value)) {
          req.body[field] = [value];
        }
      });

      next();
    } catch (error) {
      return res.status(400).json({
        mensaje: "Error parseando campos de tipo array",
        detalle: error.message
      });
    }
  };
};