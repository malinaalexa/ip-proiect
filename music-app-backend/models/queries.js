const { poolPromise } = require("../config/db");

// Generic function to execute queries
const executeQuery = async (query, params = []) => {
  try {
    const pool = await poolPromise;
    const request = pool.request();
    params.forEach(({ name, type, value }) => request.input(name, type, value));
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error("SQL error", error);
    throw error;
  }
};

// Exported functions for CRUD operations
module.exports = {
  // Get all rows from a table
  getAll: (table) => executeQuery(`SELECT * FROM ${table}`),

  // Insert data
  insert: (table, columns, values) => {
    const cols = columns.join(", ");
    const vals = values.map((_, i) => `@val${i}`).join(", ");
    const query = `INSERT INTO ${table} (${cols}) VALUES (${vals})`;
    const params = values.map((val, i) => ({
      name: `val${i}`,
      type: sql.NVarChar, // Adjust type as needed
      value: val,
    }));
    return executeQuery(query, params);
  },

  // Update data
  update: (table, updates, condition) => {
    const setClause = Object.keys(updates)
      .map((col, i) => `${col} = @val${i}`)
      .join(", ");
    const whereClause = Object.keys(condition)
      .map((col, i) => `${col} = @cond${i}`)
      .join(" AND ");
    const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    const params = [
      ...Object.values(updates).map((val, i) => ({
        name: `val${i}`,
        type: sql.NVarChar,
        value: val,
      })),
      ...Object.values(condition).map((val, i) => ({
        name: `cond${i}`,
        type: sql.NVarChar,
        value: val,
      })),
    ];
    return executeQuery(query, params);
  },

  // Delete data
  delete: (table, condition) => {
    const whereClause = Object.keys(condition)
      .map((col, i) => `${col} = @cond${i}`)
      .join(" AND ");
    const query = `DELETE FROM ${table} WHERE ${whereClause}`;
    const params = Object.values(condition).map((val, i) => ({
      name: `cond${i}`,
      type: sql.NVarChar,
      value: val,
    }));
    return executeQuery(query, params);
  },

  executeQuery,
};
