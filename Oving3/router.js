module.exports = function (app, pool) {


    app.get("/eventer", (req, res) => {
        console.log("Fikk request fra klient");
        pool.getConnection((err, connection) => {
            console.log("Connected to database");
            if (err) {
                console.log("Feil ved kobling til databasen");
                res.json({ error: "feil ved ved oppkobling" });
            } else {
                connection.query(
                    "select * from eventer",
                    (err, rows) => {
                        connection.release();
                        if (err) {
                            console.log(err);
                            res.json({ error: "error querying" });
                        } else {
                            console.log(rows);
                            res.json(rows);
                        }
                    }
                );
            }
        });
    });

    app.get("/eventer/:id", (req, res) => { // path parameter for å henge info om et bestemt event, basert på id
        console.log("Fikk request fra klient");
        pool.getConnection((err, connection) => {
            console.log("Connected to database");
            if (err) {
                console.log("Feil ved kobling til databasen");
                res.json({ error: "feil ved ved oppkobling" });
            } else {
                connection.query(
                    "select id, navn, beskrivelse, bilde, opprettelse, kategori, viktighet from eventer where id=?", req.params.id,
                    (err, rows) => {
                        connection.release();
                        if (err) {
                            console.log(err);
                            res.json({ error: "error querying" });
                        } else {
                            console.log(rows);
                            res.json(rows);
                        }
                    }
                );
            }
        });
    });

    app.post("/eventer", (req, res) => {
        console.log("Fikk POST-request fra klienten");
        console.log("Id: " + req.body.id);
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Feil ved oppkobling");
                res.json({ error: "feil ved oppkobling" });
            } else {
                console.log("Fikk databasekobling");
                var val = [req.body.navn, req.body.beskrivelse, req.body.bilde, req.body.kategori, req.body.viktighet];
                connection.query(
                    "insert into eventer (navn, beskrivelse, bilde, kategori, viktighet) values (?,?,?,?,?)",
                    val,
                    err => {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            res.json({ error: "Feil ved insert" });
                        } else {
                            console.log("insert ok");
                            res.send("");
                        }
                    }
                );
            }
        });
    });

    app.put('/eventer/:id', (req, res) => {
        console.log("Fikk PUT-request fra klienten");
        console.log("Id: " + req.body.id);
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Feil ved oppkobling");
                res.json({ error: "Feil ved oppkobling" });
            } else {
                console.log("Fikk databasekobling");
                var val = [req.body.navn, req.body.beskrivelse, req.body.bilde, req.body.kategori, req.body.viktighet, req.params.id];
                connection.query(
                    "update eventer set navn=?, beskrivelse=?, bilde=?, kategori=?, viktighet=? where id=?", val,
                    err => {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            res.json({ error: "Feil ved insert" });
                        } else {
                            console.log("insert ok");
                            res.send("");
                        }
                    }
                );
            }
        });
    });

    app.delete('/eventer/:id', (req, res) => {
        console.log("Fikk delete-request fra klient");
        console.log("Id: " + req.body.id);
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("Feil ved oppkobling");
                res.json({ error: "Feil ved oppkobling" });
            } else {
                console.log("Fikk databasetilkobling");
                var val = [req.params.id];
                connection.query(
                    "delete from eventer where id=?", val,
                    err => {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            res.json({ error: "Feil ved insert" });
                        } else {
                            console.log("insert ok");
                            res.send("");
                        }
                    }
                );
            }
        });
    });

}