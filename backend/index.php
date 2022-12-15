<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once 'Database/Objects.php';
require_once 'Database/Characters.php';
require_once 'Database/Inventory.php';
require_once 'Database/ClassCharacter.php';

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);

// Get all routes from directory routes
require_once __DIR__ . '/api/routes/objects.php';
require_once __DIR__ . '/api/routes/characters.php';
require_once __DIR__ . '/api/routes/inventory.php';
require_once __DIR__ . '/api/routes/classCharacter.php';


$app->run();
