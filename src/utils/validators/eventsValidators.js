const validateEvent = (event) => {
    const errors = [];

    if (!event.title || typeof event.title !== 'string' || event.title.trim().length === 0) {
        errors.push('El título es requerido y debe ser un texto válido');
    }

    if (!event.date || typeof event.date !== 'string' || event.date.trim().length === 0) {
        errors.push('La fecha es requerida y debe ser un texto válido');
    }

    if (event.hour && typeof event.hour !== 'string') {
        errors.push('La hora debe ser un texto válido');
    }

    if (event.location && typeof event.location !== 'string') {
        errors.push('La ubicación debe ser un texto válido');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateEvent
};