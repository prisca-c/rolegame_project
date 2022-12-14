<?php
    require 'Database.php';

class Objects
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function create($name, $type, $description, $property):void
    {
        $sql = "INSERT INTO objects (name, type, description, property)
                VALUES ('$name', '$type', '$description', '$property')";

        $this->conn->exec($sql);
    }

    public function display(): array|false
    {
        $sql = "SELECT * FROM objects";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function modify($id, $name, $type, $description, $property):void
    {
        $sql = "UPDATE objects
                SET name='$name', type='$type', description='$description', property='$property'
                WHERE id='$id'";
        echo "SQL REQ: " . $sql.PHP_EOL;

        $this->conn->exec($sql);
    }

    public function delete($id):void
    {
        $sql = "DELETE FROM objects WHERE id = $id";
        $this->conn->exec($sql);
    }
}