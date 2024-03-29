<?php
require_once "./Database/Database.php";
class Characters
{
    private PDO $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function createCharacter($name, $class, $hp, $ability, $strength):void
    {
        $sql = "INSERT INTO characters (name, class, hp, ability, strength)
                VALUES (?,?,?,?,?)";
        echo $sql;

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $class, $hp, $ability, $strength]);
    }

    public function displayAllCharacters(): array|false
    {
        $sql = "SELECT characters.* , class_character.name AS class_name
                FROM characters
                INNER JOIN class_character ON characters.class = class_character.id
                ORDER BY characters.id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function displaySpecificCharacter($id): array|false
    {
        $sql = "SELECT * FROM characters WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function displayCharacterByClass($class): array|false
    {
        $class_param = $class . '%'; // To get all classes that start with $class
        $sql = "SELECT characters.*, class_character.name AS class_name
                FROM characters
                INNER JOIN class_character ON characters.class = class_character.id
                WHERE class_character.name LIKE ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$class_param]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function modifyCharacter($id, $name, $class, $hp, $ability, $strength):void
    {
        $sql = "UPDATE characters
                SET name=?, class=?, hp=?, ability=?, strength=?
                WHERE id=?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $class, $hp, $ability, $strength, $id]);
        echo $sql;
    }

    public function deleteCharacter($id):void
    {
        $sql = "DELETE FROM characters WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
    }
}