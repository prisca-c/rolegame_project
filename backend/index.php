<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once 'Models/Objects.php';
require_once 'Models/Characters.php';
require_once 'Models/Inventory.php';
require_once 'Models/ClassCharacter.php';

require __DIR__ . '/vendor/autoload.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: content-type, authorization, origin, x-requested-with');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);

// Get all Routes from directory Routes
require_once __DIR__ . '/Routes/objects.php';
require_once __DIR__ . '/Routes/characters.php';
require_once __DIR__ . '/Routes/inventory.php';
require_once __DIR__ . '/Routes/classCharacter.php';


$app->run();
