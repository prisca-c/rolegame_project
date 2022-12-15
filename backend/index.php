<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once 'Models/Objects.php';
require_once 'Models/Characters.php';
require_once 'Models/Inventory.php';
require_once 'Models/ClassCharacter.php';

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);

// Get all routes from directory routes
require_once __DIR__ . '/routes/objects.php';
require_once __DIR__ . '/routes/characters.php';
require_once __DIR__ . '/routes/inventory.php';
require_once __DIR__ . '/routes/classCharacter.php';


$app->run();
