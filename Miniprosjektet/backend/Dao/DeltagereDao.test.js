var mysql = require("mysql");

const DeltagereDao = require("./DeltagereDao.js");
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

let deltagereDao = new DeltagereDao(pool);

beforeAll(done => {
  runsqlfile("Dao/create_tables.sql", pool, () => {
    runsqlfile("Dao/create_testdata.sql", pool, done);
  });
});
afterAll(() => {
  pool.end();
});



test("add participant to db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  deltagereDao.createDeltager(
    2,
    {
      email: "test@test.test"
    },
    callback
  );
});
