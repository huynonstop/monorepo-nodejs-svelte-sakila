import {
  findAll,
  findById,
  create as createActor,
  update as updateActor,
  remove as removeActor,
} from "./actor.model.js";

export const test = (req, res) => {
  res.json({
    message: "Loaded actor",
  });
};

export const get = async (req, res) => {
  const { actorId } = req.params;
  const actor = await findById(actorId);
  res.json(actor);
};

export const getAll = async (req, res) => {
  const actors = await findAll();
  res.json(actors);
};

export const create = async (req, res) => {
  const { firstName, lastName } = req.body;
  const actor = await createActor(firstName, lastName);
  res.json(actor);
};

export const update = async (req, res) => {
  const { actorId } = req.params;
  const { firstName, lastName } = req.body;
  const updatedActor = await updateActor(actorId, {
    firstName,
    lastName,
  });
  res.json(updatedActor);
};

export const remove = async (req, res) => {
  const { actorId } = req.params;
  const removedActor = await removeActor(actorId);
  res.json(removedActor);
};
