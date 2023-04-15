import Templates from "../models/user-templates.js"

function makeid() {
  var text = "";
  var char_list =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 21; i++) {
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  return text;
}

export const get = async (req, res) => {


  var tempid = req.body.tempid;
  var data = req.body.json;
  var targetid = req.body.targetid;
  var height = data.frame.height;
  var width = data.frame.width;
  var screans = data.scenes;
  var layers = data.scenes[data.scenes.length - 1].layers;
  var backgroundlayer = data.scenes[data.scenes.length - 1].layers[0];
  var targetIndex;
  var target = "";
  if (tempid != 0) {
    const user = await Templates.findOne({
      where: {
        id: tempid
      },
    });

    var userLayers = JSON.parse(user.json).layers;

    layers.forEach(function (layer, index) {
      if (layer.preview === targetid) {
        target = layer
        targetIndex = index;
      }
    });

    if (typeof targetIndex !== "undefined") {
      layers.splice(targetIndex, 1);
    }
  }

  var start = 100
  var end = 1100
  // res.status(200).send(data);



  if (target != "") {
    var space = parseInt(req.body.space);
    var grid = req.body.grid-1;
    var targetwigth = target.width * target.scaleX
    var targetheight = target.height * target.scaleY
    console.log(space);
    start = (width - targetwigth * grid - (space * grid)) / 2
    end = start + targetwigth * grid +(space * grid)
    console.log(width, targetwigth, grid, start, end);

  }



  if (target != "" && tempid != 0) {
    // var targetheight = (target.height) * 2.54
    // var targetwigth = (target.width) * 2.54
    // var targetwigth = target.width * (4 / 13) * 2;
    // var targetheight = target.height * (4 / 13) * 2;
    var targetwigth = target.width * target.scaleX
    var targetheight = target.height * target.scaleY
    var targettop = target.top - targetheight;
    var targetleft = target.left - targetwigth;
    layers.push();
    userLayers.forEach(async function (layer) {
      layer.left = start - targetwigth - space
      layer.top = layer.top + targettop
      console.log(layer.left);
      var temp = layer
      var left = layer.left
      var top = layer.left
      console.log(layer.type);



      if (layer.type != "Background") {

        for (let i = 0; i < 25; i++) {
          let newObj = Object.assign({}, temp);
          if (newObj.left < end) {
            //for left
            newObj.left = targetwigth + newObj.left +space;
            newObj.top = newObj.top;
            temp = newObj;
            layers.push(newObj);
          } else if (newObj.top < height - targetheight) { // subtract targetheight to ensure objects are added to current screen until it is filled
            // for down
            newObj.left = start;
            newObj.top = targetheight + newObj.top;
            temp = newObj;
            layers.push(newObj);
          } else {
            // for new screen
            let newscreen = {
              id: makeid(),
              layers: [],
            };
            newscreen.layers.push(backgroundlayer);
            screans.push(newscreen);
            newObj.left = left;
            newObj.top = 0;
            temp = newObj;
            layers = newscreen.layers; // set the layers to the new screen's layers
            layers.push(newObj);
          }
        }
      }








    })

    res.status(200).send(data);
  } else {
    res.status(404).send("data not found");
  }


  try {

  } catch (error) {
    res.status(500).json(error);
  }
};






// var tempid = req.body.tempid;
// var data = req.body.json;
// var targetid = req.body.targetid;
// var height = data.frame.height;
// var width = data.frame.width;
// var screans = data.scenes;
// var layers = data.scenes[data.scenes.length - 1].layers;
// var backgroundlayer = data.scenes[data.scenes.length - 1].layers[0];
// var targetIndex;

// const user = await Templates.findOne({
//   where: { id: tempid },
// });

// var userLayers = JSON.parse(user.json).layers;

// layers.forEach(function (layer, index) {
//   if (layer.preview === targetid) {
//     targetIndex = index;
//   }
// });

// if (typeof targetIndex !== "undefined") {
//   layers.splice(targetIndex, 1, ...userLayers);
// }


// res.status(200).send(data);