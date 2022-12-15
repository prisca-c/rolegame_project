<?php
require_once "../Database/Database.php";

class Histories
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function createHistory($event_id, $parameters):void
    {
        $sql = "INSERT INTO history (event_id, parameters)
                VALUES (?, ?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$event_id, $parameters]);
        $stmt = null;
    }

    public function displayAllHistories(): array|false
    {
        $sql = "SELECT * FROM history";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteHistory($id):void
    {
        $sql = "DELETE FROM history WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $stmt = null;
    }
}