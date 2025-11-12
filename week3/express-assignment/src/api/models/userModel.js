import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
  if (rows.length === 0) return false;
  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE username = ?', [username]);
  if (rows.length === 0) return false;
  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, role, password } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, role, password];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) return false;
  return { user_id: result.insertId };
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [user, id]);
  const [result] = await promisePool.execute(sql);
  if (result.affectedRows === 0) return false;
  return { message: 'success' };
};

// Delete user and their cats in a transaction to ensure integrity
const removeUser = async (id) => {
  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [result] = await conn.execute('DELETE FROM wsk_users WHERE user_id = ?', [id]);
    if (result.affectedRows === 0) {
      await conn.rollback();
      conn.release();
      return false;
    }
    await conn.commit();
    conn.release();
    return { message: 'success' };
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  }
};

export { listAllUsers, findUserById, findUserByUsername, addUser, modifyUser, removeUser };
