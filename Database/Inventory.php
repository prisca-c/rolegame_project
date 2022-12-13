<?php

class Inventory
{
    public function createInventoryTable($conn)
    {
        $sql = "CREATE TABLE IF NOT EXISTS inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_character INT NOT NULL,
            id_object INT NOT NULL,
            quantity INT NOT NULL,
            FOREIGN KEY (id_character) REFERENCES characters(id),
            FOREIGN KEY (id_object) REFERENCES objects(id)
        )";
        if ($conn->query($sql) === TRUE) {
            echo "Table inventory created successfully";
        } else {
            echo "Error creating table: " . $conn->error;
        }
    }
}