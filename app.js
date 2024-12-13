// Importazioni
const express = require('express');
const path = require('path');
const app = express();

// Configurazione di Express
app.use(express.json()); // Per gestire le richieste con corpo JSON
app.use(express.static(path.join(__dirname, 'public'))); // Serve i file statici come JS, CSS

// Dati mock (per esempio, utenti e missioni)
let users = {};
let missions = [
  { title: 'Find Will Byers', completed: false },
  { title: 'Explore the Upside Down', completed: false },
  { title: 'Help Eleven find waffles', completed: false }
];

// Rotta per registrare un nuovo utente
app.post('/register', (req, res) => {
  const { username } = req.body;
  if (users[username]) {
    return res.status(400).json({ message: 'User already exists!' });
  }
  users[username] = { username, missionsCompleted: [], inventory: [] };
  res.status(200).json({ message: `Welcome, ${username}!` });
});

// Rotta per ottenere la lista delle missioni
app.get('/missions', (req, res) => {
  res.status(200).json(missions);
});

// Rotta per segnare una missione come completata
app.post('/missions/complete', (req, res) => {
  const { username, missionIndex } = req.body;
  if (!users[username]) {
    return res.status(404).json({ message: 'User not found!' });
  }
  if (missionIndex < 0 || missionIndex >= missions.length) {
    return res.status(400).json({ message: 'Invalid mission index.' });
  }
  const mission = missions[missionIndex];
  if (!mission.completed) {
    mission.completed = true;
    users[username].missionsCompleted.push(mission.title);
    res.status(200).json({ message: `Mission "${mission.title}" completed!` });
  } else {
    res.status(400).json({ message: 'Mission already completed.' });
  }
});

// Rotta per "parlare" con Undici
app.post('/talk_to_undici', (req, res) => {
  const { input } = req.body;
  const responses = [
    "Friends don't lie.",
    "No more waffles!",
    "I don't understand.",
    "I'm here to help.",
    "Are you afraid of the Upside Down?",
    "Mike is safe."
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];
  res.status(200).json({ response });
});

// Rotta per servire il frontend (HTML)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});