const express = require('express');
const fs = require('fs'); // Module pour lire/écrire des fichiers
const path = require('path');

const app = express();
const PORT = 3000;

// Permet au serveur de comprendre les requêtes JSON
app.use(express.json());

// Permet au serveur de servir les fichiers du dossier "public" (notre HTML/CSS/SVG)
app.use(express.static('public'));

// --- ROUTE 1 : Récupérer les résultats ---
app.get('/api/results', (req, res) => {
    // On lit le fichier database.json
    const data = fs.readFileSync(path.join(__dirname, 'database.json'), 'utf8');
    const votes = JSON.parse(data);
    res.json(votes); // On l'envoie au front-end
});

// --- ROUTE 2 : Enregistrer un vote ---
app.post('/api/vote', (req, res) => {
    const zoneId = req.body.zone; // On récupère l'ID envoyé par le front-end

    if (!zoneId) {
        return res.status(400).json({ error: "Zone manquante" });
    }

    // On lit la base de données actuelle
    const data = fs.readFileSync(path.join(__dirname, 'database.json'), 'utf8');
    const votes = JSON.parse(data);

    // On ajoute 1 au compteur de la zone
    votes[zoneId]++;

    // On sauvegarde les nouvelles données dans le fichier
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(votes, null, 2), 'utf8');

    // On confirme au front-end que c'est bon
    res.json({ success: true, votes: votes });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
