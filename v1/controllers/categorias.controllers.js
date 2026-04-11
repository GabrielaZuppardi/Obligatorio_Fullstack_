import express from 'express';


export const obtenerCategorias = (req, res) => {
    res.json({ mensaje: "Obtener todas las categorías" });
}   

export const obtenerCategoriaPorId = (req, res) => {
    const { id } = req.params;
    res.json({ mensaje: `Obtener categoría con ID: ${id}` });
}   

export const crearCategoria = (req, res) => {
       res.json({ mensaje: `Crear categoría` });
}

export const actualizarCategoria = (req, res) => {
    const { id } = req.params;
    res.json({ mensaje: `Actualizar categoría` });
}

export const eliminarCategoria = (req, res) => {
    const { id } = req.params;
    res.json({ mensaje: `Eliminar categoría` });
}

