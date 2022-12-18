<?php
require_once "./Database/Database.php";
class Inventory
{
    private PDO $conn;
    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function createInventoryItem($id_character, $id_object, $quantity):void
    {
        $sql = "INSERT INTO inventory (id_character, id_object, quantity)
                VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id_character, $id_object, $quantity]);
        $stmt = null;
    }

    public function displayAllInventories(): array|false
    {
        $sql = "SELECT inventory.*, objects.name AS object_name, characters.name AS character_name
                FROM inventory
                INNER JOIN objects ON inventory.id_object = objects.id
                INNER JOIN characters ON inventory.id_character = characters.id
                ORDER BY inventory.id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function displaySpecificInventory($id_character): array|false
    {
        $sql = "SELECT inventory.*, objects.name AS object_name
                FROM inventory
                INNER JOIN objects ON inventory.id_object = objects.id
                WHERE id_character = ?
                ORDER BY inventory.id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id_character]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function displaySpecificInventoryObject($id_character, $id_object): array|false
    {
        $sql = "SELECT inventory.*, objects.name AS object_name
                FROM inventory
                INNER JOIN objects ON inventory.id_object = objects.id
                WHERE id_character = ? AND id_object = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id_character, $id_object]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function modifyInventoryObjectQuantity($id, $id_character, $id_object, $quantity): void
    {
        $sql = "UPDATE inventory
                SET quantity=? , id_character=?, id_object=?
                WHERE id=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$quantity, $id_character, $id_object, $id]);
        $stmt = null;
    }

    public function deleteInventoryCharacter($id_character): void
    {
        $sql = "DELETE FROM inventory
                WHERE id_character = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id_character]);
        $stmt = null;
    }
    
    public function deleteInventoryObject($id): void
    {
        $sql = "DELETE FROM inventory
                WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        $stmt = null;
    }
}