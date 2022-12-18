<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->addErrorMiddleware(true, true, true);
$app->setBasePath('/rolegame_project/backend/api');

$app->map(['GET', 'POST'], '/inventory/', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $inventory = new Inventory();
    if ($requestMethod == 'POST') {
        $data = $request->getParsedBody();
        $inventory->createInventoryItem($data['id_character'], $data['id_object'], $data['quantity']);
    } else if ($requestMethod == 'DELETE') {
        $data = $request->getParsedBody();
        $inventory->deleteInventoryObject($data['id']);
    }
    $response->getBody()->write(json_encode($inventory->displayAllInventories()));
    return $response;
});

$app->map(['GET', 'DELETE'], '/inventory/{id_character}', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $inventory = new Inventory();
    if ($requestMethod == 'DELETE') {
        $inventory->deleteInventoryCharacter($args['id_character']);
    }
    $response->getBody()->write(json_encode($inventory->displaySpecificInventory($args['id_character'])));
    return $response;
});

$app->map(['GET', 'PUT', 'DELETE'], '/inventory/{id_character}/{id}', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $inventory = new Inventory();
    if ($requestMethod == 'PUT') {
        $data = $request->getParsedBody();
        $inventory->modifyInventoryObjectQuantity($data['id'], $data['id_character'], $data['id_object'], $data['quantity']);
    } elseif ($requestMethod == 'DELETE') {
        $inventory->deleteInventoryObject($args['id']);
    }
    $response->getBody()->write(json_encode($inventory->displaySpecificInventoryObject($args['id_character'], $args['id_object'])));
    return $response;
});