<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->addErrorMiddleware(true, true, true);
$app->setBasePath('/rolegame_project/backend/api');

$app-> map(['GET', 'POST'], '/objects/', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $object = new Objects();
    if ($requestMethod == 'POST') {
        $data = $request->getParsedBody();
        $object->createObject($data['name'], $data['type'], $data['description'], $data['property']);
    }
    $response->getBody()->write(json_encode($object->displayAllObjects()));
    return $response;
});

$app-> map(['GET', 'PUT', 'DELETE'], '/objects/{id}', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $object = new Objects();
    if ($requestMethod == 'PUT') {
        $data = $request->getParsedBody();
        $object->modifyObject($args['id'], $data['name'], $data['type'], $data['description'], $data['property']);
    } elseif ($requestMethod == 'DELETE') {
        $object->deleteObject($args['id']);
    }
    $response->getBody()->write(json_encode($object->displaySpecificObject($args['id'])));
    return $response;
});