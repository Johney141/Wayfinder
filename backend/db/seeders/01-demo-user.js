'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'Lition',
        hashedPassword: bcrypt.hashSync('password'),
        isAdmin: true,
        orgId: 1,
      },
      {
        email: 'user1@user.io',
        firstName: 'Fake',
        lastName: 'User1',
        hashedPassword: bcrypt.hashSync('password'),
        isAdmin: false,
        orgId: 1
      },
      {
        email: 'user2@user.io',
        firstName: 'Fake',
        lastName: 'User2',
        hashedPassword: bcrypt.hashSync('password'),
        isAdmin: true,
        orgId: 2,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
