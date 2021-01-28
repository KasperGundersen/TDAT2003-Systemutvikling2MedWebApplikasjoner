DROP TABLE IF EXISTS eventer;
DROP TABLE IF EXISTS Kategorier;
DROP TABLE IF EXISTS Deltagere;

CREATE TABLE Kategorier (
    id int(11) NOT NULL AUTO_INCREMENT,
    Navn varchar(30) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE eventer  (
  id int(11) NOT NULL AUTO_INCREMENT,
  navn varchar(256) NOT NULL,
  beskrivelse text NOT NULL,
  bilde varchar(256) NOT NULL,
  dato varchar(256) NULL,
  opprettelse TIMESTAMP DEFAULT '2019-10-30 20:29:00',
  kategori int(11) NULL,
  viktighet int(1) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (kategori) REFERENCES Kategorier(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE Deltagere (
    id int(11) NOT NULL AUTO_INCREMENT,
    email varchar(30) NOT NULL,
    eventId int(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (eventId) REFERENCES eventer(id)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE Deltagere
  ADD CONSTRAINT fk_eventId FOREIGN KEY (eventId) REFERENCES eventer (id) ON DELETE CASCADE;
