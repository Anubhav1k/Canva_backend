
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";


export const check = async (req, res) => {
  try {


    var file = "https://assests.glp-connect.org/admin/6368b12f3362a9634b17a983/pdf/9504aa1b-2f69-4040-9657-6d2b8a0957fe.pdf";

    var filename = path.basename(file);
    console.log(filename, "filename");
    var ssl = file.split(':')[0];
    console.log(ssl, "ssl");

    const dest = path.join(`arvind.pdf`);
    var stream = fs.createWriteStream(dest);
    console.log(stream, "stream");

    if (ssl == 'https') {
      https.get(file, function (resp) {
        resp.pipe(stream);
      }).on('error', function (e) {
        res.status(500).json(e);
      });
    } else {
      http.get(file, function (resp) {
        resp.pipe(stream);
      }).on('error', function (e) {
        res.status(500).json(e);
      });
    }

    stream.on('finish', function () {
      res.download(dest, function (err) {
        if (err) {
          res.status(500).json(err);
        }
        // Delete the file once it has been sent
        fs.unlink(dest, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });
    });



  } catch (error) {
    res.status(500).json(error);
  }
};