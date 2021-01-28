var mysql = require("mysql");

const EventDao = require("./EventDao.js");
const runsqlfile = require("./runsqlfile.js");

var pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql",
  user: "root",
  password: "secret",
  database: "supertestdb",
  debug: false,
  multipleStatements: true
});

let eventDao = new EventDao(pool);

beforeAll(done => {
  runsqlfile("Dao/create_tables.sql", pool, () => {
    runsqlfile("Dao/create_testdata.sql", pool, done);
  });
});
afterAll(() => {
  pool.end();
});

test("get one event from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].navn).toBe("Hjemmefest");
    expect(data[0].dato).toBe("2020-01-10");
    expect(data[0].kategori).toBe(2);
    expect(data[0].viktighet).toBe(2);
    done();
  }
  eventDao.getOneEvent(2, callback);
});

test("get unknown event from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(0);
    done();
  }
  eventDao.getOneEvent(0, callback);
});

test("add event to db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  eventDao.createEvent(
    {
      navn: "Bortefest",
      beskrivelse: "Ikke så kul fest",
      bilde: "bilde.png",
      dato: "2020-02-02",
      kategori: 3,
      viktighet: 2
    },
    callback
  );
});

test("update event in db", done => {
  function callback(status, data) {
    console.log("Test callback: status= " + status + ", data= " + data);
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }
  eventDao.updateEvent(
    {
      navn: "OppdatertFest",
      beskrivelse: "Kul fest",
      bilde: "bilde.png",
      dato: "2020-02-02",
      kategori: 3,
      viktighet: 2,
      id: 1
    },
    callback
  );
});

test("get all events from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.length).toBeGreaterThanOrEqual(4);
    done();
  }

  eventDao.getAllEvents(callback);
});

test("delete one event from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data: " + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }
  eventDao.deleteEvent(3, callback);
});

test("search in event-name from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data: " + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
  }
  eventDao.searchEvent("Sommerfest", callback);
});
