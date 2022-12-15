<?php
require_once 'Database.php';

class ClassCharacter
{
    private PDO $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function createClass($name, $hp, $ability, $strength):void
    {
        $sql = "INSERT INTO class_character (name, hp, ability, strength)
                VALUES (?, ?, ?, ?)";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $hp, $ability, $strength]);
        $stmt = null;
    }

    public function displayAllClasses(): array|false
    {
        $sql = "SELECT * FROM class_character";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function displaySpecificClass($id): array|false
    {
        $sql = "SELECT * FROM class_character WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function modifyClass($id, $name, $hp, $ability, $strength):void
    {
        $sql = "UPDATE class_character
                SET name=?, hp=?, ability=?, strength=?
                WHERE id=?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $hp, $ability, $strength, $id]);
        $stmt = null;
    }

    public function deleteClass($id):void
    {
        $sql = "DELETE FROM class_character WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $stmt = null;
    }
}