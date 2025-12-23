const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:5000";

const CATEGORY_FOLDER_MAP = {
  ac: "AC",
  washingmachine: "WASHINGMACHINE",
};

const getProductImages = (category, brand, imageKey) => {
  if (!category || !brand || !imageKey) {
    return { thumbnails: [], description: [] };
  }

  const folder = CATEGORY_FOLDER_MAP[category];
  if (!folder) return { thumbnails: [], description: [] };

  const safeBrand = brand.toUpperCase();

  const basePath = path.join(
    process.cwd(),
    "..",
    "public",
    "Products",
    folder,
    safeBrand,
    imageKey
  );

  const readImages = (type) => {
    const dir = path.join(basePath, type);
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir).map(file =>
      `${BASE_URL}/Products/${folder}/${safeBrand}/${imageKey}/${type}/${file}`
    );
  };

  return {
    thumbnails: readImages("thumbnails"),
    description: readImages("description"),
  };
};

module.exports = { getProductImages };