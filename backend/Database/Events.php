<?php
require_once 'Database.php';

class Events
{
    private PDO $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function createEvent($type, $description):void
    {
        $sql = "INSERT INTO events (type, description)
                VALUES (?, ?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$type, $description]);
        $stmt = null;
    }

    public function displayAllEvents(): array|false
    {
        $sql = "SELECT * FROM events";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function displayAllEventsByType($type): array|false
    {
        $sql = "SELECT * FROM events WHERE type = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$type]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function displaySpecificEvent($id): array|false
    {
        $sql = "SELECT * FROM events WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function modifyEvent($id, $type, $description):void
    {
        $sql = "UPDATE events
                SET type=?, description=?
                WHERE id=?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$type, $description, $id]);
        $stmt = null;
    }

    public function deleteEvent($id):void
    {
        $sql = "DELETE FROM events WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $stmt = null;
    }
}