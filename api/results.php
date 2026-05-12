<?php
header('Content-Type: application/json');

// On lit le fichier database.json
 $dbFile = __DIR__ . '/../database.json';
 $data = file_get_contents($dbFile);

// On l'affiche pour que le JavaScript puisse le lire
echo $data;
?>
