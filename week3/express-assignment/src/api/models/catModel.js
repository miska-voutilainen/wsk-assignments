import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
  if (rows.length === 0) return false;
  return rows[0];
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) return false;
  return { cat_id: result.insertId };
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
  const [result] = await promisePool.execute(sql);
  if (result.affectedRows === 0) return false;
  return { message: 'success' };
};

const removeCat = async (id) => {
  const [result] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
  if (result.affectedRows === 0) return false;
  return { message: 'success' };
};

const listCatsByOwner = async (ownerId) => {
  const [rows] = await promisePool.execute(
    'SELECT c.*, u.name as owner_name FROM wsk_cats c JOIN wsk_users u ON c.owner = u.user_id WHERE c.owner = ?',
    [ownerId]
  );
  return rows;
};

export { listAllCats, findCatById, addCat, modifyCat, removeCat, listCatsByOwner };
