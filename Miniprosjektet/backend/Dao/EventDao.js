const Dao = require("./Dao.js");

module.exports = class EventDao extends Dao {
  getAllEvents(callback) {
    super.query("select * from eventer order by dato limit 20", [], callback);
  }

  getOneEvent(id, callback) {
    super.query("select * from eventer where id=?", [id], callback);
  }

  createEvent(json, callback) {
    var val = [
      json.navn,
      json.beskrivelse,
      json.bilde,
      json.dato,
      json.kategori,
      json.viktighet
    ];

    super.query(
      "insert into eventer (navn, beskrivelse, bilde, dato, kategori, viktighet) values (?,?,?,?,?,?)",
      val,
      callback
    );
  }

  updateEvent(json, callback) {
    var val = [
      json.navn,
      json.beskrivelse,
      json.bilde,
      json.dato,
      json.kategori,
      json.viktighet,
      json.id
    ];
    super.query(
      "update eventer set navn=?, beskrivelse=?, bilde=?, dato=?, kategori=?, viktighet=? where id=?",
      val,
      callback
    );
  }
  
  deleteEvent(id, callback) {
    super.query("delete from eventer where id=?", [id], callback);
  }
  searchEvent(search, callback) {
    super.query(
      "SELECT * FROM eventer WHERE navn LIKE ? limit 5",
      ["%" + search + "%"],
      callback
    );
  }
};
