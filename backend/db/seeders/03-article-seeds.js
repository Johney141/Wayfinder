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
        title: 'How to Create an article',
        body: `
          1. Click on the profile menu in the nav-bar
          2. Select the "Create a new Article" button"
          3. Enter in the article details
          4. Select the Create Article button
          *Note Admin privlages are required to create an article
        `,
        plainText:`
          1. Click on the profile menu in the nav-bar
          2. Select the "Create a new Article" button"
          3. Enter in the article details
          4. Select the Create Article button
          *Note Admin privlages are required to create an article
        ` ,
        orgId: 1,
        userId: 1
      },
      {
        title: 'How to Create a new user account for your Organization',
        body: `
          1. Click on the profile menu in the nav-bar
          2. Select the "Create a new user" button"
          3. Enter in the user credentials
          4. Select the Create Article button
          *Note Admin privlages are required to create a new user account
      `,
      plainText: `
          1. Click on the profile menu in the nav-bar
          2. Select the "Create a new Article" button"
          3. Enter in the article details
          4. Select the Create Article button
          *Note Admin privlages are required to create an article
        ` ,
        orgId: 1,
        userId: 1
      },
      {
        title: 'Example Article',
        body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel felis nec lorem scelerisque accumsan. Sed ut nisl eget nunc fermentum tincidunt ut sit amet elit. Etiam auctor, urna non elementum dapibus, risus lorem maximus arcu, vitae auctor dolor urna sit amet ante. Aenean interdum sit amet nisi vel luctus. Suspendisse suscipit ultricies mauris a mollis. Pellentesque consectetur nisl ac neque dignissim, ut efficitur lacus dapibus.
    
        Curabitur eget purus a odio efficitur vehicula non eget lacus. Mauris non ex in elit gravida vehicula nec id risus. Quisque auctor, tortor sed iaculis fermentum, odio libero volutpat nulla, at malesuada lorem ipsum in lacus. Ut nec est orci. Maecenas lobortis ligula vitae augue luctus, in consequat lectus efficitur. Aliquam erat volutpat. Nam suscipit cursus arcu, sit amet pharetra leo aliquam eget.
    
        Fusce ac libero eget elit malesuada accumsan at sed ipsum. Duis vulputate nunc risus, non varius velit dapibus vel. Praesent vulputate metus in turpis dignissim, non consequat leo efficitur. Pellentesque convallis feugiat nulla. Donec in fermentum ex, sit amet malesuada sapien. Phasellus vehicula varius velit, ac sollicitudin magna tincidunt eget. Mauris vitae diam arcu.
      `,
        plainText: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel felis nec lorem scelerisque accumsan. Sed ut nisl eget nunc fermentum tincidunt ut sit amet elit. Etiam auctor, urna non elementum dapibus, risus lorem maximus arcu, vitae auctor dolor urna sit amet ante. Aenean interdum sit amet nisi vel luctus. Suspendisse suscipit ultricies mauris a mollis. Pellentesque consectetur nisl ac neque dignissim, ut efficitur lacus dapibus.
    
        Curabitur eget purus a odio efficitur vehicula non eget lacus. Mauris non ex in elit gravida vehicula nec id risus. Quisque auctor, tortor sed iaculis fermentum, odio libero volutpat nulla, at malesuada lorem ipsum in lacus. Ut nec est orci. Maecenas lobortis ligula vitae augue luctus, in consequat lectus efficitur. Aliquam erat volutpat. Nam suscipit cursus arcu, sit amet pharetra leo aliquam eget.
    
        Fusce ac libero eget elit malesuada accumsan at sed ipsum. Duis vulputate nunc risus, non varius velit dapibus vel. Praesent vulputate metus in turpis dignissim, non consequat leo efficitur. Pellentesque convallis feugiat nulla. Donec in fermentum ex, sit amet malesuada sapien. Phasellus vehicula varius velit, ac sollicitudin magna tincidunt eget. Mauris vitae diam arcu.
      `,
        orgId: 1,
        userId: 1
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Articles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['How to Create an article', 'How to Create a new user account for your Organization', 'Example Article'] }
    }, {});
  }
};
