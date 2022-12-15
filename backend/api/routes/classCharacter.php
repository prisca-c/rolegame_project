<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->addErrorMiddleware(true, true, true);
$app->setBasePath('/rolegame_project/backend/api');

$app->map(['GET', 'POST'], '/class/', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $class = new ClassCharacter();
    if ($requestMethod == 'POST') {
        $data = $request->getParsedBody();
        $class->createClass($data['name'], $data['hp'], $data['ability'], $data['strength']);
    }
    $response->getBody()->write(json_encode($class->displayAllClasses()));
    return $response;
});

$app->map(['GET', 'PUT', 'DELETE'], '/class/{id}', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $class = new ClassCharacter();
    if ($requestMethod == 'PUT') {
        $data = $request->getParsedBody();
        $class->modifyClass($args['id'], $data['name'], $data['hp'], $data['ability'], $data['strength']);
    } elseif ($requestMethod == 'DELETE') {
        $class->deleteClass($args['id']);
    }
    $response->getBody()->write(json_encode($class->displaySpecificClass($args['id'])));
    return $response;
});