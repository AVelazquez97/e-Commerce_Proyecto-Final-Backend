import { LoggerError, LoggerWarn } from '../config/log4.js';
const errorHandler = (error, req, res, next) => {
  const notFoundedErrors = [
    /* -------------------- Errores relacionados a productos -------------------- */
    'Error al insertar: no se pudo cargar el producto.',
    'Error al listar: no se encontró el producto con el id indicado.',
    'Error al listar: no hay productos cargados en el sistema.',
    'Error al actualizar: no se encontró el producto con el id indicado.',
    'Error al borrar: no se encontró el producto con el id indicado.',
    'Error al buscar: no hay productos que coincidan con los filtros.',
    /* --------------------- Errores relacionados a carritos -------------------- */
    'Error al insertar: no existe un producto con el id indicado.',
    'Error al insertar: no existe un carrito con el id indicado.',
    'Error al listar: no existe un carrito con el id indicado.',
    'Error al listar: el carrito seleccionado no tiene productos.',
    'Error al listar: el carrito no tiene un producto con el id indicado.',
    'Error al borrar: no existe un carrito con el id indicado.',
    'Error al borrar: no existe en el carrito un producto con el id indicado.',
    /* --------------------- Errores relacionados a ordenes --------------------- */
    'Error al listar: no hay ordenes adjuntas al cliente.',
    'Error al generar orden: no hay productos en el carrito.',
    'Error al borrar: no existe una orden con el id indicado.',
    'Error al confirmar: no se pudo procesar la orden.',
    /* ---------------- Errores relacionados con inicio de sesión --------------- */
    'Error al iniciar sesión: No existe el usuario con el mail ingresado.',
    'Error al iniciar sesión: La contraseña no coincide.',
  ];
  if (notFoundedErrors.includes(error)) {
    LoggerWarn.warn(error);
    res.status(404).json({ error });
  } else {
    LoggerError.error(error);
    res.status(500).render('error', { error });
  }
};

export default errorHandler;
