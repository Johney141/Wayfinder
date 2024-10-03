'use strict';
const { Organization } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Organization.bulkCreate([
      {
        name: 'Example Org 1'
      },
      {
        name: 'Example Org 2'
      },
      {
        name: 'Example Org 3'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Organizations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Example Org 1', 'Example Org 2', 'Example Org 3'] }
    }, {});
  }
};
