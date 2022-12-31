<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->addErrorMiddleware(true, true, true);
$app->setBasePath('/rolegame_project/backend/api');

$app->map(['GET', 'POST'], '/characters/', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $character = new Characters();
    $class = new ClassCharacter();
    if ($requestMethod == 'POST') {
        $data = $request->getParsedBody();
        trigger_error("Data: " . json_encode($data),E_USER_WARNING );
        $getClass = $class->displaySpecificClass($data['class']); // Needed to set class property to character
        if($getClass){
            $character->createCharacter(
                $data['name'], $data['class'], $getClass[0]['hp'], $getClass[0]['ability'], $getClass[0]['strength']
            );
        }
    }
    $response->getBody()->write(json_encode($character->displayAllCharacters()));
    return $response;
});

$app->map(['GET', 'PUT', 'DELETE'], '/characters/{id}', function (Request $request, Response $response, $args) {
    $requestMethod = $request->getMethod();
    $character = new Characters();
    $class = new ClassCharacter();
    if ($requestMethod == 'PUT') {
        $data = $request->getParsedBody();
        $getClass = $class->displaySpecificClass($data['class']); // Needed to set class property to character
        if($getClass){
            $character->modifyCharacter(
                $args['id'], $data['name'], $data['class'], $getClass[0]['hp'], $getClass[0]['ability'], $getClass[0]['strength']
            );
        }
    } elseif ($requestMethod == 'DELETE') {
        $character->deleteCharacter($args['id']);
    }
    $response->getBody()->write(json_encode($character->displaySpecificCharacter($args['id'])));
    return $response;
});

$app->map(['GET'], '/characters/class/{class}', function (Request $request, Response $response, $args) {
    $character = new Characters();
    $response->getBody()->write(json_encode($character->displayCharacterByClass($args['class'])));
    return $response;
});