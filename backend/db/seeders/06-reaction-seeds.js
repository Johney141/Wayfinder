'use strict';
const { Reactions } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Reactions.bulkCreate([
      {
        type: 'like',
        articleId: 1,
        userId: 1
      },
      {
        type: 'dislike',
        articleId: 2,
        userId: 1
      },
      {
        type: 'like',
        articleId: 1,
        userId: 2
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reactions';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
