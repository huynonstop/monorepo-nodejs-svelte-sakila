import ActorService from "./actor.service.js";
export const test = (req, res) => {
  res.json({
    message: "Loaded actor",
  });
};

export const get = async (req, res) => {
  const { actorId } = req.params;
  const actor = await ActorService.getById(actorId);
  res.json(actor);
};

export const getAll = async (req, res) => {
  const actors = await ActorService.getAll();
  res.json(actors);
};

export const create = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({
      message: "Must have firstname and lastname",
      error: "BadRequest",
    });
  }
  const actor = await ActorService.create({ firstName, lastName });
  res.json(actor);
};

export const update = async (req, res) => {
  const { actorId } = req.params;
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({
      message: "Must have firstname and lastname",
      error: "BadRequest",
    });
  }
  const updatedActor = await ActorService.update(actorId, {
    firstName,
    lastName,
  });
  res.json(updatedActor);
};

export const remove = async (req, res, next) => {
  const { actorId } = req.params;
  const removedActor = await ActorService.remove(actorId).catch((err) =>
    next(err)
  );
  if (removedActor) res.json(removedActor);
};
