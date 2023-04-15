
import sequelize from '../db/db.js';
import Templates from "../models/user-templates.js"




export const Template = async (req, response) => {
  try {

    console.log(req.body.json);
    sequelize.sync().then(() => {
      console.log('Book table created successfully!');
      Templates.create({
        preview:req.body.preview,
        json:JSON.stringify(req.body.json)
      }).then(res => {
        console.log(res);
        // response.status(200).send("Success");
      }).catch((error) => {
        console.error('Failed to create a new record : ', error);
      });
    

    }).catch((error) => {
      console.error('Unable to create table : ', error);
    });


    response.status(200).send("success fully save to database")
  } catch (error) {
    response.status(500).json(error);
  }
};
