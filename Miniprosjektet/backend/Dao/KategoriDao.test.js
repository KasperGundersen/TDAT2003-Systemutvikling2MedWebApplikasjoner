var mysql = require("mysql");

const KategoriDao = require("./KategoriDao.js");
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

let kategoriDao = new KategoriDao(pool);

beforeAll(done => {
  runsqlfile("Dao/create_tables.sql", pool, () => {
    runsqlfile("Dao/create_testdata.sql", pool, done);
  });
});
afterAll(() => {
  pool.end();
});

test("get all categories from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.length).toBe(4);
    done();
  }

  kategoriDao.getAllCategories(callback);
});
