import sequelize from '../db/db.js';
import Templates from "../models/user-templates.js"



export const Alltemplates = async (req, res) => {
    try {
        sequelize.sync().then(() => {
            Templates.findAll().then(response => {
              res.status(200).send(response)
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
        
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    //   res.status(200).send("info")
    } catch (error) {
      res.status(500).json(error);
    }
  };
  