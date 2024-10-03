'use strict';
const { Articles } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Articles.bulkCreate([
      {
        title: 'How to do thing',
        body: 'This is how you do the thing',
        orgId: 1,
        userId: 1
      },
      {
        title: 'How to do thing2',
        body: 'Here is another way to do the thing',
        orgId: 1,
        userId: 1
      },
      {
        title: 'Not doing the thing',
        body: 'You shouldnt do this thing',
        orgId: 2,
        userId: 3
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Articles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['How to do thing', 'How to do thing2', 'Not doing the thing'] }
    }, {});
  }
};
