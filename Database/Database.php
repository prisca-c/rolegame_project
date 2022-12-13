<?php
include 'Database/Character.php';

class Database
{
    /* define the database connection */
    private $servername = "localhost";
    private $username = "root";
    private $password = "root";
    private $dbname = "rolegame_project";
    private $sql = "";

    /* connect to mysql database */
    public function connect()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        return $conn;
    }

    /* close connection to mysql database */
    public function close($conn)
    {
        $conn->close();
    }

    /* create database */
    public function createDatabase()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password);
        $this->sql = "CREATE DATABASE IF NOT EXISTS " . $this->dbname;

        if ($conn->query($this->sql) === TRUE) {
            echo "Database created successfully";
        } else {
            echo "Error creating database: " . $conn->error;
        }
        $this->close($conn);
    }

    /* create tables */
    public function createTables()
    {
        $conn = $this->connect();
        $character = new Character();
        $character->createCharacterTable($conn);
    }

}