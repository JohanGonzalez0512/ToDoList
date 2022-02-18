const { where } = require("sequelize");
const {ToDo} = require("../models/index");

const getTodosByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const todos = await ToDo.findAll({
      where: { user_id },
      order : [['id','desc']],
    });
    res.json({
      ok: true,
      todos,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const createTodoForUser = async (req, res) => {
  const { body } = req;
  const { user_id } = req.params;

  try {
    const todo = new ToDo({ ...body, user_id });
    const todoDB = await todo.save();

    res.status(201).json({
      ok: true,
      msg: "Todo created successfully",
      id: todoDB.id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const updateTodo = async (req, res) => {
  const { todo_id } = req.params;
  const { body } = req;

  try {
    await ToDo.update(body, { where: { id: todo_id } });
    res.json({
      ok: true,
      msg: "Todo updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const deleteTodo = async (req, res) => {
  const { todo_id } = req.params;
  try {
    const todo = await ToDo.findByPk(todo_id);
    await todo.destroy();
    res.json({
      ok: true,
      msg: "Todo deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};
module.exports = {
  getTodosByUserId,
  createTodoForUser,
  updateTodo,
  deleteTodo,
};
