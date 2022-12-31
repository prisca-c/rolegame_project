<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->addErrorMiddleware(true, true, true);
$app->setBasePath('/rolegame_project/backend/api');

// Handle random events
$app->get('/random_events/', function (Request $request, Response $response, $args) {
    $gameLogic = new GameLogic();
    $response->getBody()->write(json_encode($gameLogic->getRandomEvent()));
    return $response;
});

// Handle random object
$app->get('/random_objects/', function (Request $request, Response $response, $args) {
    $gameLogic = new GameLogic();
    $response->getBody()->write(json_encode($gameLogic->getRandomObject()));
    return $response;
});

// Handle random enemy
$app->get('/random_enemies/', function (Request $request, Response $response, $args) {
    $gameLogic = new GameLogic();
    $response->getBody()->write(json_encode($gameLogic->getRandomEnemy()));
    return $response;
});

// Handle random event (disabled because this logic is handled in frontend, but maybe one day ...)
/*$app->get('/random_event/{id_character}', function (Request $request, Response $response, $args) {
    $gameLogic = new GameLogic();
    $event = $gameLogic->getCompleteEvent();
    if ($event) {
        if ($event['event']['type'] === 'find' or $event['type'] === 'find') {
            $gameLogic->handleEventFind($args['id_character'], $event['object']['id'], 1);
        }
    }

    $response->getBody()->write(json_encode($event));
    return $response;
});*/

$app->get('/random_event/', function (Request $request, Response $response, $args) {
    $gameLogic = new GameLogic();
    $event = $gameLogic->getMultipleCompleteEvents();
    $response->getBody()->write(json_encode($event));
    return $response;
});


