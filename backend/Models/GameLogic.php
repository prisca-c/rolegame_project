<?php
require_once "./Database/Database.php";

class GameLogic
{
    private PDO $conn;

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getRandomEvent(): array|false
    {
        $sql = "SELECT * FROM events ORDER BY RAND() LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getRandomObject(): array|false
    {
        $sql = "SELECT * FROM objects ORDER BY RAND() LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getRandomEnemy(): array|false
    {
        $sql = "SELECT characters.*, class_character.name AS class_name
                FROM characters
                INNER JOIN class_character ON characters.class = class_character.id
                WHERE class_character.name LIKE 'enemy%'
                ORDER BY RAND() LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCompleteEvent(): array|false
    {
        $getRandomEvent = $this->getRandomEvent();
        $event = [
            'type'=>$getRandomEvent[0]['type'],
            'description'=>json_decode($getRandomEvent[0]['description'])
        ];
        $getRandomObject = $this->getRandomObject();
        $object = [
            'id'=>$getRandomObject[0]['id'],
            'name'=>$getRandomObject[0]['name'],
            'type'=>$getRandomObject[0]['type'],
            'description'=>$getRandomObject[0]['description'],
            'property'=>json_decode($getRandomObject[0]['property'])
        ];
        $enemy = $this->getRandomEnemy();
        if ($event) {
            if (str_contains($getRandomEvent[0]['type'], 'fight')) {
                $complete_event = [
                    'event' => $event,
                    'enemy' => $enemy
                ];
            } elseif ($getRandomEvent[0]['type'] === 'find') {
                $complete_event = [
                    'event' => $event,
                    'object' => $object
                ];
            } else {
                $complete_event = $event;
            }
        }
        return $complete_event;
    }

    public function handleEventFind($id_character, $id_object, $quantity): void
    {
        $inventory = new Inventory();
        $getInventory = $inventory->displaySpecificInventoryObject($id_character, $id_object);
        if($getInventory) {
            $inventory->modifyInventoryObjectQuantity(
                $getInventory['id'],
                $getInventory['id_character'],
                $getInventory['id_object'],
                $getInventory['quantity'] + $quantity
            );
        } else {
            $inventory->createInventoryItem($id_character, $id_object, $quantity);
        }
    }
}