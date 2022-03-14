'use strict';

export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
 await queryInterface.bulkInsert('Role',[
   {
     name: "client",
     level: 1,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     name: "admin",
     level: 3,
     createdAt: new Date(),
     updatedAt: new Date()
   },
  {
    name:"agent",
    level: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
 ])
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
