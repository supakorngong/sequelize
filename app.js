const express = require("express");
const { sequelize, User, Order } = require("./models");

const app = express();
app.use(express.json());

app.get("/user", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post("/user/order", async (req, res) => {
  const { firstName, lastName, email, price } = req.body;

  const t = await sequelize.transaction();
  try {
    const user = await User.create({ firstName, lastName, email }, { transaction: t });
    const order = await Order.create({ price, userId: user.id }, { transaction: t });
    await t.commit();
    res.json({ user, order });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).send({ message: error.errors.map((e) => e.message) });
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const result = await User.destroy({ where: { id } });
  res.json({ result });
});

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
});
