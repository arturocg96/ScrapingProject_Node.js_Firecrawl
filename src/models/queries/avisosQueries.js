module.exports = {
    insertAviso: `
      INSERT INTO avisos (title, subtitle, link, content, category)
      VALUES (?, ?, ?, ?, ?)
    `,
    
    selectAllAvisos: `
      SELECT * FROM avisos
    `,
    
    selectAvisoById: `
      SELECT * FROM avisos WHERE id = ?
    `,
    
    updateAviso: `
      UPDATE avisos
      SET title = ?, subtitle = ?, link = ?, content = ?, category = ?
      WHERE id = ?
    `,
    
    deleteAviso: `
      DELETE FROM avisos WHERE id = ?
    `
  };