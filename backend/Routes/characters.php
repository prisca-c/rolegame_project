<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->addErrorMiddleware(true, true, true);
$app->setBasePath('/rolegame_project/backend/api');

$app->map(['GET', 'POST'], '/characters/', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $character = new Characters();
    if ($requestMethod == 'POST') {
        $data = $request->getParsedBody();
        trigger_error("Data: " . json_encode($data),E_USER_WARNING );
        $character->createCharacter($data['name'], $data['class'], $data['hp'], $data['ability'], $data['strength']);
    }
    $response->getBody()->write(json_encode($character->displayAllCharacters()));
    return $response;
});

$app->map(['GET', 'PUT', 'DELETE'], '/characters/{id}', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $character = new Characters();
    if ($requestMethod == 'PUT') {
        $data = $request->getParsedBody();
        $character->modifyCharacter($args['id'], $data['name'], $data['class'], $data['hp'], $data['ability'], $data['strength']);
    } elseif ($requestMethod == 'DELETE') {
        $character->deleteCharacter($args['id']);
    }
    $response->getBody()->write(json_encode($character->displaySpecificCharacter($args['id'])));
    return $response;
});