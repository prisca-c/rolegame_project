<?php

class History
{
    public function createHistoryTable($conn)
    {
        $sql = "CREATE TABLE IF NOT EXISTS history (
            id INT(6) AUTO_INCREMENT PRIMARY KEY,
            event_id INT(6) NOT NULL,
            parameters VARCHAR(255) NOT NULL,
            FOREIGN KEY (event_id) REFERENCES events(id)
        )";
        if ($conn->query($sql) === TRUE) {
            echo "Table history created successfully";
        } else {
            echo "Error creating table: " . $conn->error;
        }
    }
}