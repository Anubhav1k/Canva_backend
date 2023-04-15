import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createCanvas, loadImage } from  'canvas';
import router from './Routes/route.js';
import { get } from './Controllers/get-controller.js';
import fs from 'fs';
import info from "./data/info.json" assert { type: "json" };
import PDFDocument from 'pdfkit';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true , limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);



app.get('/', (req, res) => {

  console.log("hello");
  const designData = info // JSON data
  

 
const doc = new PDFDocument({
  autoFirstPage: false,
});

const canvas = createCanvas(designData.frame.width, designData.frame.height);
const ctx = canvas.getContext('2d');
ctx.font = '20px Arial';

// Collect all the image loading promises
const loadingPromises = [];

designData.scenes.forEach((scene) => {
  scene.layers.forEach((layer) => {
    switch (layer.type) {
      case 'Background':
        ctx.fillStyle = layer.fill;
        ctx.fillRect(layer.left, layer.top, layer.width, layer.height);
        break;
      case 'StaticImage':
        const imgPromise = loadImage(layer.src).then((img) => {
          ctx.drawImage(img, layer.left, layer.top, layer.left+layer.scaleX, layer.top+layer.scaleY);
        }).catch((err) => {
          console.error(`Error loading image: ${err.message}`);
        });
        loadingPromises.push(imgPromise);
        break;
      // Add other cases for other layer types as needed
    }

    
  });
  
});

Promise.all(loadingPromises).then(() => {
  console.log("add"),

  doc.pipe(fs.createWriteStream('design.pdf'));
  doc.addPage({
    size: [designData.frame.width, designData.frame.height],
    margin: 0,
  });
  doc.image(canvas.toBuffer(), 0, 0);

  doc.end(() => {
    res.send("send")
    console.log('PDF file written successfully.');
  });
});
  });
// });


let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 5000;
}


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));


// loadImage('https://images.pexels.com/photos/2894944/pexels-photo-2894944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940').then((img) => {
//   ctx.drawImage(img, 0, 0, 1200, 1200);
//   res.set('Content-Type', 'image/png');
//   res.send(canvas.toBuffer());
// });
// loadImage('https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940').then((img) => {
//   ctx.drawImage(img, 2.460000000000008, 0, 1200, 1200);
//   // res.set('Content-Type', 'image/png');
//   res.send(canvas.toBuffer());
// });
//   loadImage('https://ik.imagekit.io/scenify/1635011325399_603749.png').then((img) => {
//   ctx.drawImage(img, 872.03, 870, 60, 60);
//   // res.set('Content-Type', 'image/png');
//   res.send(canvas.toBuffer());
// });
//   loadImage('https://ik.imagekit.io/scenify/1635011325399_603749.png').then((img) => {
//   ctx.drawImage(img, 683.66, 0, 512, 512);
//   // res.set('Content-Type', 'image/png');
//   res.send(canvas.toBuffer());
// });
  // res.send(









