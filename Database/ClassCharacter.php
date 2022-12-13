<?php

class ClassCharacter
{
    public function createClassCharacterTable($conn)
    {
        $sql = "CREATE TABLE IF NOT EXISTS class_character (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            hp INT NOT NULL,
            ability INT NOT NULL,
            strength INT NOT NULL
        )";
        if ($conn->query($sql) === TRUE) {
            echo "Table ClassCharacter created successfully";
        } else {
            echo "Error creating table: " . $conn->error;
        }
    }
}