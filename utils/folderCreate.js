const fs = require("fs");

const createFolder = (path) => {
  const folders = path.split("/");
  let pathToCreate = "";
  folders.forEach(async (folder) => {
      pathToCreate = `${pathToCreate}${folder}/`;
      console.log(pathToCreate);
    const isExist = await fs.existsSync(pathToCreate);
    if (!isExist) {
        await fs.mkdirSync(pathToCreate, { recursive: true });
        console.log("Created");
    }
  });
};

module.exports = createFolder;
