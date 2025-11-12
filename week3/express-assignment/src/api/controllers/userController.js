import bcrypt from 'bcrypt';
import { listAllUsers, findUserById, addUser, modifyUser, removeUser } from '../models/userModel.js';

const getUsers = async (req, res, next) => {
  try {
    const rows = await listAllUsers();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await findUserById(id);
  if (!user) return next({ status: 404, message: 'User not found' });
  res.json(user);
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    // Hash the password before saving
    if (req.body && req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const user = req.body;
    const result = await addUser(user);
  if (!result) return next({ status: 500, message: 'Insert failed' });
  res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const putUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = req.body;
    const result = await modifyUser(user, id);
  if (!result) return next({ status: 404, message: 'Update failed' });
  res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await removeUser(id);
  if (!result) return next({ status: 404, message: 'Delete failed' });
  res.json(result);
  } catch (err) {
    next(err);
  }
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
