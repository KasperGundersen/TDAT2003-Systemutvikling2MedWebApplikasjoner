module.exports = function(app, pool) {
  const EventDao = require("./Dao/EventDao.js");
  const KategoriDao = require("./Dao/KategoriDao.js");
  const DeltagereDao = require("./Dao/DeltagereDao.js");

  let eventDao = new EventDao(pool);
  let kategoriDao = new KategoriDao(pool);
  let deltagereDao = new DeltagereDao(pool);

  app.get("/eventer", (req, res) => {
    console.log("/eventer-- Fikk request fra klient");
    eventDao.getAllEvents((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/eventer/:id", (req, res) => {
    console.log("/eventer/:id-- Fikk request fra klient");
    eventDao.getOneEvent(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.post("/register", (req, res) => {
    console.log(" Fikk POST-request fra klient");
    eventDao.createEvent(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.put("/eventer/:id", (req, res) => {
    console.log("Fikk PUT-request fra klienten");
    console.log("Id: " + req.params.id);
    eventDao.updateEvent(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.delete("/eventer/:id", (req, res) => {
    console.log("Fikk DELETE-request fra klienten");
    eventDao.deleteEvent(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });
  app.get("/kategorier", (req, res) => {
    console.log("/kategorier-- Fikk request fra klient");
    kategoriDao.getAllCategories((status, data) => {
      res.status(status);
      res.json(data);
    });
  });
  app.get("/deltagere", (req, res) => {
    console.log("/deltagere-- Fikk request fra klient");
    deltagereDao.getAllDeltagere((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.post("/deltagere/:eventId", (req, res) => {
    console.log(" Fikk POST-request fra klient");
    console.log("ROUTWE KJSDFIDBFHJDSFJBDBFJDF");
    console.log(req.params.eventId + ", " + req.body.email);
    deltagereDao.createDeltager(
      req.params.eventId,
      req.body,
      (status, data) => {
        res.status(status);
        res.json(data);
      }
    );
  });

  app.get("/deltagere/:eventId", (req, res) => {
    deltagereDao.countDeltagere(req.params.eventId, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/eventer/search/:searchWord", (req, res) => {
    eventDao.searchEvent(req.params.searchWord, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });
};
