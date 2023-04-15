import { jsPDF } from "jspdf";
import JSZip from "jszip"
// const JSZip = require('jszip');
import fs from "fs"

export const download_image = async (req, response) => {
  

    try {   

        var qrCodes=req.body
        // console.log("data");
        const zip = new JSZip();
    
        for (let i = 0; i < qrCodes.length; i++) {
          const filename = `qrcode_${i + 1}.png`;
          zip.file(filename, qrCodes[i].split(',')[1], { base64: true });
        }
    
        const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
    
        response.set({
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="qrcodes.zip"',
        });
    
        response.status(200).send(zipContent);
    
    } catch (error) {
      response.status(500).json(error);
    }
  
  
  };



  // var data=req.body
  // console.log("data");

        // var doc = new jsPDF({
        //     orientation: 'p',
        //     unit: 'mm',
        //     format: 'a1',
        //     putOnlyUsedFonts:true
        //    });
        // var width = doc.internal.pageSize.getWidth();
        // var height = doc.internal.pageSize.getHeight();
        // var imgData = data[0]
        // // console.log(imgData);
        // doc.setFontSize(40);
        // data.forEach(img => {

        // doc.addImage(img, 'png', 0, 0,  width, height);
        // doc.addPage(); 
        // });
        // // doc.text(30, 20, 'Hello world!');
        // doc.save('a1.pdf');