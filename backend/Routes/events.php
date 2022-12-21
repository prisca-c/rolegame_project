<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->addErrorMiddleware(true, true, true);
$app->setBasePath('/rolegame_project/backend/api');

$app->map(['GET', 'POST'], '/events/', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $event = new Events();
    if ($requestMethod == 'POST') {
        $data = $request->getParsedBody();
        trigger_error("Data: " . json_encode($data),E_USER_WARNING );
        $event->createEvent($data['type'], $data['description']);
    }
    $response->getBody()->write(json_encode($event->displayAllEvents()));
    return $response;
});

$app->map(['GET', 'PUT', 'DELETE'], '/events/{id}', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $event = new Events();
    if ($requestMethod == 'PUT') {
        $data = $request->getParsedBody();
        $event->modifyEvent($args['id'], $data['type'], $data['description']);
    } elseif ($requestMethod == 'DELETE') {
        $event->deleteEvent($args['id']);
    }
    $response->getBody()->write(json_encode($event->displaySpecificEvent($args['id'])));
    return $response;
});

$app->map(['GET'], '/events/type/{type}', function (Request $request, Response $response, $args) {
    $event = new Events();
    $response->getBody()->write(json_encode($event->displayAllEventsByType($args['type'])));
    return $response;
});