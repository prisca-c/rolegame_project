<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require_once '../Database/Objects.php';
require_once '../Database/Characters.php';
require_once '../Database/Inventory.php';
require_once '../Database/ClassCharacter.php';

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);

// Get all routes from directory routes
foreach (glob(__DIR__ . "/routes/*.php") as $filename) {
    require $filename;
}

$app->run();
