<?php

class Objects
{
    public function createObjectsTable($conn)
    {
        $sql = "CREATE TABLE IF NOT EXISTS objects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            description VARCHAR(255) NOT NULL,
            property VARCHAR(30) NOT NULL
        )";
        if ($conn->query($sql) === TRUE) {
            echo "Table inventory created successfully";
        } else {
            echo "Error creating table: " . $conn->error;
        }
    }
}