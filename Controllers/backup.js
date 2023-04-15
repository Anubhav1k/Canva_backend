// import info from '../data/data.json' assert { type: 'json' };
import info from "../data/info.json" assert { type: "json" };

function makeid() {
  var text = "";
  var char_list =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 21; i++) {
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  return text;
}

export const Backup = async (req, res) => {
  try {
    console.log(req.body.tempid);
    var data = req.body.json;
    var targetid =  req.body.targetid;;
    var height = data.frame.height;
    var width = data.frame.width;
    var screans = data.scenes;
    var layers = data.scenes[data.scenes.length - 1].layers;
    var backgroundlayer = data.scenes[data.scenes.length - 1].layers[0];
    var target;
    // console.log(layers.length)
    layers.forEach(function (layer) {
      if (layer.preview == targetid) {
        target = layer;
      }
    });
    if (target != "") {
      // var targetheight = (target.height) * 2.54
      // var targetwigth = (target.width) * 2.54
      // var targetwigth = target.width * (4 / 13) * 2;
      // var targetheight = target.height * (4 / 13) * 2;
      var targetwigth = target.width*target.scaleX
      var targetheight =target.height * target.scaleY

      var targettop = target.top;
      var targetleft = target.left;
      layers.push();

      var response = await fetch(
        "https://renewbuy.techtonic.asia/api/shared/getlistoftags"
      )
        .then((res) => res.json())
        .then((response) => {
          return response;
        })
        .catch(function (err) {
          console.log("Unable to fetch -", err);
        });
      // await response.data.forEach(function (data1) {
      for (let i = 0; i < 100; i++) {
        let newObj = Object.assign({}, target);
        if (newObj.left < width) {
          //for left
          newObj.left = targetwigth + newObj.left;
          newObj.top = newObj.top;
          target = newObj;
          layers.push(newObj);
        } else if (newObj.top < height) {
          // for down
          newObj.left = 0;
          newObj.top = targetheight + newObj.top;
          target = newObj;
          layers.push(newObj);
        } else {
          // for new screan
          let newscreen = {
            id: makeid(),
            layers: [],
          };
          newscreen.layers.push(backgroundlayer);
          screans.push(newscreen);
          newObj.left = 0;
          newObj.top = 0;
          target = newObj;
          layers = data.scenes[data.scenes.length - 1].layers;

          layers.push(newObj);
          // console.log(layers);
        }
      } // );
      console.log(layers.length);
      res.status(200).send(data);
    } else {
      res.status(404).send("data not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
