import {
    jsPDF
} from "jspdf";
import fs from "fs";

export const download_pdf = async (req, response) => {
    try {
      var data = req.body;
      console.log("data");
      
      var doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        // Change format to appropriate width and height for A1 format
        format: [594, 841],
        putOnlyUsedFonts: true
      });
      
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var imgData = data[0];
      
      doc.setFontSize(40);
      data.forEach(img => {
        doc.addImage(img, 'png', 0, 0, width, height);
        doc.addPage();
      });
      
      try {
        doc.save("test1.pdf");
        response.download("./test1.pdf", function (err) {
          if (err) {
            res.status(500).json(err);
          }
          // Delete the file once it has been sent
          fs.unlink("./test1.pdf", function (err) {
            if (err) {
              console.log(err);
            }
          });
        });
      } catch (error) {
        response.status(500).json(error);
      }
      
        

    } catch (error) {
        console.error(error);
        response.status(500).json(error);
    }
};