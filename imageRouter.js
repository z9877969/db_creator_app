const axios = require("axios");
const { Router } = require("express");
const ObjectID = require("bson-objectid");
const fs = require("fs/promises");
const path = require("path");
const data = require("./data.json");

const imageRouter = Router();

async function downloadImage(url, filename) {
  const response = await axios.get(url, { responseType: "arraybuffer" });

  await fs.writeFile(filename, response.data, (err) => {
    if (err) throw err;
    console.log("Image downloaded successfully!");
  });
}

imageRouter.post("/", async (req, res, next) => {
  try {
    const { dbList, urlPropName } = req.body;
    const promiseList = dbList.map((el) => {
      return new Promise(async (resolve, reject) => {
        try {
          const id = String(ObjectID());
          const ext = el[urlPropName].split(".").reverse()[0];
          const pathToImg = path.join("ingredients", id + "." + ext);
          await downloadImage(el[urlPropName], path.join(__dirname, pathToImg));
          resolve({
            ...el,
            [urlPropName]: path.join("https://ftp.goit.study/img/", pathToImg),
          });
        } catch (error) {
          reject(error);
        }
      });
    });
    const result = await Promise.allSettled(promiseList);
    console.log("result :>> ", result);
    res.json({ message: "ok" });
  } catch (error) {
    next(error);
  }
});

module.exports = imageRouter;
