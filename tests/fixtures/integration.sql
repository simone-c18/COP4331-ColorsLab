DROP TABLE IF EXISTS Colors;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  ID INT NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  Login VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Colors (
  ID INT NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  Name VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID),
  CONSTRAINT fk_colors_user
    FOREIGN KEY (UserID) REFERENCES Users(ID)
    ON DELETE CASCADE
);

INSERT INTO Users (ID, FirstName, LastName, Login, Password)
VALUES (1, 'Integration', 'User', 'integration-user', 'testpass123');

INSERT INTO Colors (UserID, Name)
VALUES
  (1, 'Ocean Blue'),
  (1, 'Forest Green');
