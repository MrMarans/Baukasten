let jsonData; // Die globale Variable, in der die JSON-Daten gespeichert werden

// JSON-Daten aus einer Datei im Browser laden
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Speichere die geladenen JSON-Daten in der Variable jsonData
    jsonData = data;

    // Hier kannst du mit den geladenen JSON-Daten arbeiten
    console.log(jsonData);

    // Du kannst jsonData jetzt überall in deinem Code verwenden
    doSomethingWithJsonData();
  })
  .catch(error => {
    console.error('Fehler beim Laden der JSON-Daten:', error);
  });

// Funktion, die auf die JSON-Daten zugreifen kann
function doSomethingWithJsonData() {
  if (jsonData) {
    // Hier kannst du jsonData verwenden
    console.log('Daten verfügbar:', jsonData);
  } else {
    console.log('Daten sind noch nicht geladen.');
  }
}