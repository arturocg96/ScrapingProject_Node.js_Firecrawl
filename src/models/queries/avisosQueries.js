const queries = {
  insertAviso: `
      INSERT INTO avisos (
          title,
          subtitle,
          link,
          content,
          category,
          created_at
      ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          CURRENT_TIMESTAMP
      )
  `,

  selectAllAvisos: `
      SELECT 
          id,
          title,
          subtitle,
          link,
          content,
          category,
          created_at,
          updated_at
      FROM avisos
      ORDER BY created_at DESC
  `,

  selectAvisoById: `
      SELECT 
          id,
          title,
          subtitle,
          link,
          content,
          category,
          created_at,
          updated_at
      FROM avisos
      WHERE id = ?
  `,

  updateAviso: `
      UPDATE avisos
      SET 
          title = ?,
          subtitle = ?,
          link = ?,
          content = ?,
          category = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
  `,

  deleteAviso: `
      DELETE FROM avisos
      WHERE id = ?
  `
};

module.exports = queries;