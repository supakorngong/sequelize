## Installation

Initiate Sequelize

```bash
with cli
    pnpm add sequelize
    pnpm add --save-dev sequelize-cli
    pnpm sequelize-cli init
create Database
    pnpm add pg         (for postgresql) สร้างตาม config ที่กําหนดไว้
    pnpm add mysql2     (for mysql)
    pnpm sequelize-cli db:create
create model
    pnpm sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
    pnpm sequelize-cli db:migrate

seed(optional)
    pnpm sequelize-cli seed:generate --name demo-product

ในไฟล์ ./model/sth.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert demo user data
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

    // Insert demo product data
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Coffee Beans',
        price: 150,
        description: 'Freshly ground coffee beans from Thailand',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};

pnpm sequelize-cli db:seed:all
note : ทําเเยกได้ เเล้วรันคําสั่งนี้เพื่อ ทําการ seed

ConnectDB And Start Crud

  models/index.js
  ถูกออกแบบมาให้ โหลดทุก Model อัตโนมัติ

  app.js
const express = require("express");
const { sequelize, User, Order, Address } = require("./models");
const app = express();
app.use(express.json());
    .
    .
    .
app.listen(3001, async () => {
  console.log("Server is running on port 3001");
});




Without cli
 pnpm add sequelize

 database.js
 const sequelize = new Sequelize(process.env.DATABASE_URL);

 const User = sequelize.define(
  "users",
  {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

const Address = sequelize.define(
  "addresses",
  {
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
  },
  {}
);

User.hasMany(Address, { onDelete: "cascade" });
Address.belongsTo(User);

module.exports = { User, Address, sequelize };


ConnectDB.js
const { sequelize } = require("./user");

const connectDb = async () => {
  try {
     await sequelize.authenticate();
     console.log("connect to db successfully.");
    await sequelize.sync({});
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectDb };

app.js
const express = require("express");
const { connectDb } = require("./model/testConnection");
const { sequelize, User, Address } = require("./model/user");
const { Sequelize } = require("sequelize");
const app = express();
app.use(express.json());
.
.
.
app.listen(3000, async () => {
  await connectDb();
  console.log("Server is running on port 3000");
});
```

## Documentation

[Documentation](https://sequelize.org/docs/v6/getting-started/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`="postgresql://root:qwerty@localhost:5432/tutorialpostgresequelize"

## Acknowledgements

raw query in sequelize

const result = await sequelize.query(`INSERT INTO users (username,  password ,createdAt,updatedAt) VALUES (:username,  :password , :createdAt , :updatedAt) `, {
replacements: { username, password, createdAt: createddate, updatedAt: updateddate },
type: Sequelize.QueryTypes.INSERT,
});

ผูก project เเล้ว push ขึ้นไปในกรณีที่ เผลอกดก่อนที่จะเอา code ใน repo มาวาง
git remote add origin <URL ของ repository>
git branch -M main # ตั้งชื่อ branch เป็น main (ถ้ายังไม่ได้ตั้ง)
git config pull.rebase false  
git push -u origin main
