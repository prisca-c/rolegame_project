<?php
require_once 'Database.php';

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
                VALUES (?, ?, ?, ?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $type, $description, $property]);
        $stmt = null;
    }

    public function displayAll(): array|false
    {
        $sql = "SELECT * FROM objects";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function modify($id, $name, $type, $description, $property):void
    {
        $sql = "UPDATE objects
                SET name=?, type=?, description=?, property=?
                WHERE id=?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $type, $description, $property, $id]);
        $stmt = null;
    }

    public function delete($id):void
    {
        $sql = "DELETE FROM objects WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $stmt = null;
    }
}