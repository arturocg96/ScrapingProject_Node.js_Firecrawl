const validateAviso = (aviso) => {
    const errors = [];

    if (!aviso.title || typeof aviso.title !== 'string' || aviso.title.trim().length === 0) {
        errors.push('El título es requerido y debe ser un texto válido');
    }

    if (aviso.subtitle && typeof aviso.subtitle !== 'string') {
        errors.push('El subtítulo debe ser un texto válido');
    }

    if (aviso.link && typeof aviso.link !== 'string') {
        errors.push('El enlace debe ser un texto válido');
    }

    if (aviso.content && typeof aviso.content !== 'string') {
        errors.push('El contenido debe ser un texto válido');
    }

    if (aviso.category && typeof aviso.category !== 'string') {
        errors.push('La categoría debe ser un texto válido');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateAviso
};