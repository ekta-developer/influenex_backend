module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('business_types', [
      {
        id: 1,
        name: 'Private Ltd',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Public Ltd',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Partnership',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('business_types', null, {});
  },
};