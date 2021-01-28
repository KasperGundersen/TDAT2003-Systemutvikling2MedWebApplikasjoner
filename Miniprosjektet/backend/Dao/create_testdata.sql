
INSERT INTO Kategorier(id, Navn) VALUES
    (1, "Fest"),
    (2, "Sport"),
    (3, "Kurs"),
    (4, "Sammenkomst");

INSERT INTO eventer ( id, navn ,beskrivelse ,bilde ,dato ,opprettelse ,kategori, viktighet) VALUES 
(1,"Hjemmefest", "Verdens kuleste fest", "foto.jpg", "2020-01-10","2019-10-30 20:29:00" , 1, 1 ),
(2,"Hjemmefest", "Verdens kuleste fest", "foto.jpg", "2020-01-10","2019-10-30 20:29:00" , 2, 2 ),
(3,"Hjemmefest", "Verdens kuleste fest", "foto.jpg","2020-01-10","2019-10-30 20:29:00" , 1, 3 ),
(4,"Sommerfest", "Verdens kuleste fest", "foto.jpg","2020-01-10","2019-10-30 20:29:00" , 2, 4 );

INSERT INTO Deltagere(id, email, eventId) VALUES 
(1, "kasper@kasper.kasper", 1),
(2, "nikolai@nikolai.nikolai", 2),
(3, "nils@nils.nils", 3);




