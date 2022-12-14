<?php

class Database
{
    /* define the database connection */
    private string $servername = "localhost";
    private string $username = "webclient";
    private string $password = "webclient";
    private string $dbname = "rolegame_project";

    /* connect to mysql database */
    public function connect(): PDO
    {
        return new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
    }

}