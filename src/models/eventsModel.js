const { connect } = require('../config/dbSQL');
const queries = require('./queries/eventsQueries');

const insertEvents = async (events) => {
    const connection = await connect();
    try {
        let duplicados = [];
        let nuevos = [];

        for (const event of events) {
            const [existingEvents] = await connection.query(
                queries.selectExistingEvents,
                [event.title, event.date]
            );

            if (existingEvents.length > 0) {
                duplicados.push(event);
            } else {
                nuevos.push(event);
            }
        }
        if (nuevos.length > 0) {
            const values = nuevos.map(event => [
                event.title,
                event.date,
                event.hour || null,
                event.location || null
            ]);

            await connection.query(queries.insertEvents, [values]);
        }

        return {
            success: true,
            resumen: {
                total: events.length,
                nuevos: nuevos.length,
                duplicados: duplicados.length
            },
            nuevosEventos: nuevos,
            eventosduplicados: duplicados
        };

    } catch (error) {
        console.error('Error al procesar eventos:', error);
        return {
            success: false,
            error: error.message,
            resumen: {
                total: events.length,
                nuevos: 0,
                duplicados: events.length
            }
        };
    } finally {
        if (connection) await connection.end();
    }
};

const getAllEvents = async (page = 1, limit = 10) => {
    const connection = await connect();
    try {
        const offset = (page - 1) * limit;
        const [events] = await connection.query(
            queries.selectAllEvents,
            [limit, offset]
        );
        const [total] = await connection.query(queries.selectTotalEvents);
        
        return {
            success: true,
            events,
            pagination: {
                total: total[0].count,
                page,
                limit,
                totalPages: Math.ceil(total[0].count / limit)
            }
        };
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        return {
            success: false,
            error: error.message
        };
    } finally {
        if (connection) await connection.end();
    }
};

const getEventById = async (id) => {
    const connection = await connect();
    try {
        const [event] = await connection.query(
            queries.selectEventById,
            [id]
        );
        
        return {
            success: true,
            event: event[0] || null
        };
    } catch (error) {
        console.error('Error al obtener evento:', error);
        return {
            success: false,
            error: error.message
        };
    } finally {
        if (connection) await connection.end();
    }
};

const updateEvent = async (id, eventData) => {
    const connection = await connect();
    try {
        const [result] = await connection.query(
            queries.updateEvent,
            [eventData.title, eventData.date, eventData.hour || null, eventData.location || null, id]
        );
        
        if (result.affectedRows === 0) {
            return {
                success: false,
                error: 'Evento no encontrado'
            };
        }
        
        return {
            success: true,
            message: 'Evento actualizado correctamente'
        };
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        return {
            success: false,
            error: error.message
        };
    } finally {
        if (connection) await connection.end();
    }
};

const deleteEvent = async (id) => {
    const connection = await connect();
    try {
        const [result] = await connection.query(
            queries.deleteEvent,
            [id]
        );
        
        if (result.affectedRows === 0) {
            return {
                success: false,
                error: 'Evento no encontrado'
            };
        }
        
        return {
            success: true,
            message: 'Evento eliminado correctamente'
        };
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        return {
            success: false,
            error: error.message
        };
    } finally {
        if (connection) await connection.end();
    }
};

module.exports = {     
    insertEvents,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent 
};