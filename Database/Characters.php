<?php
require_once "Database.php";
class Characters
{
    private $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function create($name, $class, $hp, $ability, $strength):void
    {
        $sql = "INSERT INTO characters (name, class, hp, ability, strength)
                VALUES (?,?,?,?,?)";
        echo $sql;

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $class, $hp, $ability, $strength]);
    }

    public function displayAll(): array|false
    {
        $sql = "SELECT * FROM characters";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function modify($id, $name, $class, $hp, $ability, $strength):void
    {
        $sql = "UPDATE characters
                SET name=?, class=?, hp=?, ability=?, strength=?
                WHERE id=?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $class, $hp, $ability, $strength, $id]);
        echo $sql;
    }

    public function delete($id):void
    {
        $sql = "DELETE FROM characters WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
    }
}