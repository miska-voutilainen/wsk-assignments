import { listAllCats, findCatById, addCat, modifyCat, removeCat, listCatsByOwner } from '../models/catModel.js';

const getCats = async (req, res, next) => {
  try {
    const rows = await listAllCats();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

const getCatById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cat = await findCatById(id);
  if (!cat) return next({ status: 404, message: 'Cat not found' });
  res.json(cat);
  } catch (err) {
    next(err);
  }
};

const postCat = async (req, res, next) => {
  try {
    const filename = req.file?.filename ?? req.body.filename ?? null;
    const cat = {
      cat_name: req.body.name || req.body.cat_name,
      weight: req.body.weight,
      owner: req.body.owner,
      filename,
      birthdate: req.body.birthdate,
    };
    const result = await addCat(cat);
  if (!result) return next({ status: 500, message: 'Insert failed' });
  res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const putCat = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cat = req.body;
    const result = await modifyCat(cat, id);
  if (!result) return next({ status: 404, message: 'Update failed' });
  res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await removeCat(id);
  if (!result) return next({ status: 404, message: 'Delete failed' });
  res.json(result);
  } catch (err) {
    next(err);
  }
};

const getCatsByUser = async (req, res, next) => {
  try {
    const ownerId = Number(req.params.userId);
    const rows = await listCatsByOwner(ownerId);
  res.json(rows);
  } catch (err) {
    next(err);
  }
};

export { getCats, getCatById, postCat, putCat, deleteCat, getCatsByUser };
