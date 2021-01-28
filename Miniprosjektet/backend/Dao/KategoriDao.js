const Dao = require("./Dao.js");

module.exports = class KategoriDao extends Dao {
  getAllCategories(callback) {
    super.query("select id, Navn from Kategorier", [], callback);
  }
};
