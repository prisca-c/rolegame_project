<?php

class Character
{

    public function createCharacterTable($conn)
    {
        $sql = "CREATE TABLE IF NOT EXISTS characters (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            class INT NOT NULL,
            hp INT,
            ability INT,
            strength INT,
            FOREIGN KEY (class) REFERENCES class_character(id)
        )";
        if ($conn->query($sql) === TRUE) {
            echo "Table characters created successfully";
        } else {
            echo "Error creating table: " . $conn->error;
        }
    }
}