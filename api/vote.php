<?php
header('Content-Type: application/json');

// On récupère les données envoyées par le JavaScript (le fetch POST)
 $input = json_decode(file_get_contents('php://input'), true);
 $zoneId = $input['zone'] ?? null;

if (!$zoneId) {
    echo json_encode(['error' => 'Zone manquante']);
    exit;
}

// On lit la base de données actuelle
 $dbFile = __DIR__ . '/../database.json';
 $data = json_decode(file_get_contents($dbFile), true);

// On ajoute 1 à la zone cliquée
if (isset($data[$zoneId])) {
    $data[$zoneId]++;
} else {
    echo json_encode(['error' => 'Zone invalide']);
    exit;
}

// On sauvegarde dans le fichier database.json
// Le flag LOCK_EX permet d'éviter les bugs si deux personnes votent exactement à la même seconde
file_put_contents($dbFile, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);

// On répond au JavaScript que c'est un succès, et on lui renvoie les nouveaux compteurs
echo json_encode(['success' => true, 'votes' => $data]);
?>
