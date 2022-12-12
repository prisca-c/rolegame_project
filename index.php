<?php
    include 'Database/Database.php';

    echo "Hello World!";

    $db = new Database();
    $db->createDatabase();
    $conn = $db->connect();
    $db->createTables();