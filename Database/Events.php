<?php

class Events
{
    public function createEventsTable($conn)
    {
        $sql = "CREATE TABLE IF NOT EXISTS events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        )";
        if ($conn->query($sql) === TRUE) {
            echo "Table events created successfully";
        } else {
            echo "Error creating table: " . $conn->error;
        }
    }
}