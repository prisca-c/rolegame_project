<?php

class Database
{
    /* define the database connection */
    private $servername = "localhost";
    private $username = "webclient";
    private $password = "webclient";
    private $dbname = "rolegame_project";
    private $sql = "";

    /* connect to mysql database */
    public function connect()
    {
        return new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
    }

}