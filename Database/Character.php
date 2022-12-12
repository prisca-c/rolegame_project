<?php

class Character
{

    public function createCharacterTable($conn)
    {
        $sql = "CREATE TABLE IF NOT EXISTS characters (
            id INT(6) AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            class VARCHAR(30) NOT NULL,
            hp INT(6) NOT NULL,
            ability INT(6) NOT NULL,
            strength INT(6) NOT NULL
        )";
        if ($conn->query($sql) === TRUE) {
            echo "Table characters created successfully";
        } else {
            echo "Error creating table: " . $conn->error;
        }
    }
}