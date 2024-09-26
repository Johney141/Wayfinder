'use strict';
const { Comments } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Comments.bulkCreate([
      {
        comment: 'Comment Text',
        articleId: 1,
        userId: 1
      },
      {
        comment: 'Another comments text',
        articleId: 1,
        userId: 2
      },
      {
        comment: 'Another Org comment',
        articleId: 3,
        userId: 3
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      comment: { [Op.in]: ['Comment Text', 'Another comments text', 'Another Org comment'] }
    }, {});
  }
};
