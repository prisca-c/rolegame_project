<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once 'Models/Objects.php';
require_once 'Models/Characters.php';
require_once 'Models/Inventory.php';
require_once 'Models/ClassCharacter.php';

require __DIR__ . '/vendor/autoload.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);

// Get all Routes from directory Routes
require_once __DIR__ . '/Routes/objects.php';
require_once __DIR__ . '/Routes/characters.php';
require_once __DIR__ . '/Routes/inventory.php';
require_once __DIR__ . '/Routes/classCharacter.php';


$app->run();
