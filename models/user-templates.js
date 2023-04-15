import sequelize from '../db/db.js';
import DataTypes from 'sequelize';
const Templates = sequelize.define("Templates", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  preview:{
    type: DataTypes.TEXT('long'),
  },
  json:{
    type: DataTypes.TEXT('long'),
  }
 });
 
 sequelize.sync().then(() => {
    console.log('Templates table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 export default Templates;