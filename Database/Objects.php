<?php
require_once 'Database.php';

class Objects
{
    private PDO $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function createObject($name, $type, $description, $property):void
    {
        $sql = "INSERT INTO objects (name, type, description, property)
                VALUES (?, ?, ?, ?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $type, $description, $property]);
        $stmt = null;
    }

    public function displayAllObjects(): array|false
    {
        $sql = "SELECT * FROM objects";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function modifyObject($id, $name, $type, $description, $property):void
    {
        $sql = "UPDATE objects
                SET name=?, type=?, description=?, property=?
                WHERE id=?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $type, $description, $property, $id]);
        $stmt = null;
    }

    public function deleteObject($id):void
    {
        $sql = "DELETE FROM objects WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $stmt = null;
    }
}