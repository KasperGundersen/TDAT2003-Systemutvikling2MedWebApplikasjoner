const Dao = require("./Dao.js");

module.exports = class DeltagereDao extends Dao {
  
  createDeltager(id, json, callback) {
    console.log("daoTEst" + id + " json " + json.email);
    var val = [json.email, id];
    super.query(
      "insert into Deltagere (email, eventID) values(?, ?)",
      val,
      callback
    );
  }

  countDeltagere(eventId, callback) {
    console.log("ConutDeltager request");
    super.query(
      "select count(id) as antallDeltakere from Deltagere where eventId=?",
      [eventId],
      callback
    );
  }
};
