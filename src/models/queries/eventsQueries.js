module.exports = {
    selectExistingEvents: 'SELECT * FROM events WHERE title = ? AND date = ?',
    insertEvents: 'INSERT INTO events (title, date, hour, location) VALUES ?',
    selectAllEvents: 'SELECT * FROM events ORDER BY date DESC LIMIT ? OFFSET ?',
    selectTotalEvents: 'SELECT COUNT(*) as count FROM events',
    selectEventById: 'SELECT * FROM events WHERE id = ?',
    updateEvent: 'UPDATE events SET title = ?, date = ?, hour = ?, location = ? WHERE id = ?',
    deleteEvent: 'DELETE FROM events WHERE id = ?'
};