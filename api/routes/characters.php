<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->addErrorMiddleware(true, true, true);
$app->setBasePath('/rolegame_project/api');

$app->get('/characters/', function (Request $request, Response $response, $args) {
    $character = new Characters();
    $response->getBody()->write(json_encode($character->displayAllCharacters()));
    return $response;
});

$app->get('/characters/{id}', function (Request $request, Response $response, $args) {
    $character = new Characters();
    $response->getBody()->write(json_encode($character->displaySpecificCharacter($args['id'])));
    return $response;
});