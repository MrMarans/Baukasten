// JSON-Daten aus einer Datei im Browser laden
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Hier kannst du mit den geladenen JSON-Daten arbeiten
    console.log(data);
  })
  .catch(error => {
    console.error('Fehler beim Laden der JSON-Daten:', error);
  });