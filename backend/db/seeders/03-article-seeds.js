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
        body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel felis nec lorem scelerisque accumsan. Sed ut nisl eget nunc fermentum tincidunt ut sit amet elit. Etiam auctor, urna non elementum dapibus, risus lorem maximus arcu, vitae auctor dolor urna sit amet ante. Aenean interdum sit amet nisi vel luctus. Suspendisse suscipit ultricies mauris a mollis. Pellentesque consectetur nisl ac neque dignissim, ut efficitur lacus dapibus.

        Curabitur eget purus a odio efficitur vehicula non eget lacus. Mauris non ex in elit gravida vehicula nec id risus. Quisque auctor, tortor sed iaculis fermentum, odio libero volutpat nulla, at malesuada lorem ipsum in lacus. Ut nec est orci. Maecenas lobortis ligula vitae augue luctus, in consequat lectus efficitur. Aliquam erat volutpat. Nam suscipit cursus arcu, sit amet pharetra leo aliquam eget.

        Fusce ac libero eget elit malesuada accumsan at sed ipsum. Duis vulputate nunc risus, non varius velit dapibus vel. Praesent vulputate metus in turpis dignissim, non consequat leo efficitur. Pellentesque convallis feugiat nulla. Donec in fermentum ex, sit amet malesuada sapien. Phasellus vehicula varius velit, ac sollicitudin magna tincidunt eget. Mauris vitae diam arcu.
      `,
        orgId: 1,
        userId: 1
      },
      {
        title: 'How to do thing2',
        body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel felis nec lorem scelerisque accumsan. Sed ut nisl eget nunc fermentum tincidunt ut sit amet elit. Etiam auctor, urna non elementum dapibus, risus lorem maximus arcu, vitae auctor dolor urna sit amet ante. Aenean interdum sit amet nisi vel luctus. Suspendisse suscipit ultricies mauris a mollis. Pellentesque consectetur nisl ac neque dignissim, ut efficitur lacus dapibus.
    
        Curabitur eget purus a odio efficitur vehicula non eget lacus. Mauris non ex in elit gravida vehicula nec id risus. Quisque auctor, tortor sed iaculis fermentum, odio libero volutpat nulla, at malesuada lorem ipsum in lacus. Ut nec est orci. Maecenas lobortis ligula vitae augue luctus, in consequat lectus efficitur. Aliquam erat volutpat. Nam suscipit cursus arcu, sit amet pharetra leo aliquam eget.
    
        Fusce ac libero eget elit malesuada accumsan at sed ipsum. Duis vulputate nunc risus, non varius velit dapibus vel. Praesent vulputate metus in turpis dignissim, non consequat leo efficitur. Pellentesque convallis feugiat nulla. Donec in fermentum ex, sit amet malesuada sapien. Phasellus vehicula varius velit, ac sollicitudin magna tincidunt eget. Mauris vitae diam arcu.
      `,
        orgId: 1,
        userId: 1
      },
      {
        title: 'Not doing the thing',
        body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel felis nec lorem scelerisque accumsan. Sed ut nisl eget nunc fermentum tincidunt ut sit amet elit. Etiam auctor, urna non elementum dapibus, risus lorem maximus arcu, vitae auctor dolor urna sit amet ante. Aenean interdum sit amet nisi vel luctus. Suspendisse suscipit ultricies mauris a mollis. Pellentesque consectetur nisl ac neque dignissim, ut efficitur lacus dapibus.
    
        Curabitur eget purus a odio efficitur vehicula non eget lacus. Mauris non ex in elit gravida vehicula nec id risus. Quisque auctor, tortor sed iaculis fermentum, odio libero volutpat nulla, at malesuada lorem ipsum in lacus. Ut nec est orci. Maecenas lobortis ligula vitae augue luctus, in consequat lectus efficitur. Aliquam erat volutpat. Nam suscipit cursus arcu, sit amet pharetra leo aliquam eget.
    
        Fusce ac libero eget elit malesuada accumsan at sed ipsum. Duis vulputate nunc risus, non varius velit dapibus vel. Praesent vulputate metus in turpis dignissim, non consequat leo efficitur. Pellentesque convallis feugiat nulla. Donec in fermentum ex, sit amet malesuada sapien. Phasellus vehicula varius velit, ac sollicitudin magna tincidunt eget. Mauris vitae diam arcu.
      `,
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
