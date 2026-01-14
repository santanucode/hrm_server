// src/models/index.js
const sequelize = require("../config/db");

const Role = require("./role.model");
const Employee = require("./employee.model");

const db = {};
db.sequelize = sequelize;
db.Sequelize = require("sequelize");

db.Employee = Employee;
db.Role = Role;

module.exports = db;
