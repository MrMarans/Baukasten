let jsonData; // Die globale Variable, in der die JSON-Daten gespeichert werden
const container = document.getElementById('AuswahlParent');
let projectDiv = null;
let paragraph = null;
let fullscreenDiv = null;

// JSON-Daten aus einer Datei im Browser laden
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Speichere die geladenen JSON-Daten in der Variable jsonData
        jsonData = data;

        // Hier kannst du mit den geladenen JSON-Daten arbeiten
        console.log(jsonData);
    })
    .catch(error => {
        console.error('Fehler beim Laden der JSON-Daten:', error);
    });

// Funktion, die auf die JSON-Daten zugreifen kann
function doSomethingWithJsonData() {
    if (TestJson) {
        // Hier kannst du jsonData verwenden
        console.log('Daten verfügbar:', TestJson);

        // Iteriere durch jedes Projekt und greife auf die "phase" zu
        Object.keys(TestJson).forEach(projekt => {
            const phase = TestJson[projekt].phase;
            console.log(`Projekt: ${projekt}`);
            console.log(`Phase: ${phase.join(', ')}`);
        });

    } else {
        console.log('Daten sind noch nicht geladen.');
    }
}

function showProjects(technologie, phase, potential) { //variables are null if you come from nothing. If you come from the menu, all is null 
    if (TestJson) { //if json is not empty

        deleteAllBoxes(container);//delete every object

        if (technologie == null && phase == null && potential == null) //coming from home Menu
        {
            // go through each project
            Object.keys(TestJson).forEach(projektName => {

                //create divs for the project
                projectDiv = document.createElement('div');
                container.appendChild(projectDiv);
                projectDiv.className = "Auswahl";

                //create the text element for the project name
                paragraph = document.createElement('p');
                paragraph.innerText = (`${projektName}`);
                projectDiv.appendChild(paragraph);

                //read Beschreibung and place it
                showMoreData(`${projektName}`, "Beschreibung", projectDiv)

                //create other buttons !this could be its own function because we need it more often. or dont, probably makes it simpler, I already duplicated it
                for (let i = 0; i < 3; i++) {
                    let newDiv = document.createElement('div');
                    newDiv.className = "button";
                    switch (i) {
                        case 0:
                            newDiv.innerHTML = "Technologie";
                            newDiv.addEventListener("click", function () {
                                readTechnologies(`${projektName}`, null, null)
                            }, false);
                            break;
                        case 1:
                            newDiv.innerHTML = "Phase";
                            newDiv.addEventListener("click", function () {
                                readPhase(`${projektName}`, null, null)
                            }, false);


                            break;
                        case 2:
                            newDiv.innerHTML = "Funktion & Potential";
                            newDiv.addEventListener("click", function () {
                                readPotential(`${projektName}`, null, null)
                            }, false);
                            break;
                    }
                    projectDiv.appendChild(newDiv);
                }
            });


        }
        else { //not coming from home Menu

            //look through each Project if it has either the technologie, phase or potential
            //if it has, show it

        }
    } else {
        console.log('Daten sind noch nicht geladen.');
    }
}

function readTechnologies(project, phase, potential) {
    deleteAllBoxes(container);

    if (project == null && phase == null && potential == null) //coming from home Menu
    {
        searchProjectFromMenu("NotwendigTechnologie");
    }
    else { //coming from somewhere else but the homescreen


        //create a div
        fullscreenDiv = document.createElement('div');
        container.appendChild(fullscreenDiv);
        fullscreenDiv.className = "fullscreenDiv";

        //create the text element
        paragraph = document.createElement('p');
        let innerTextOfDiv = "Technologien";

        if (project != null) {
            innerTextOfDiv += " von " + project; //if we come from something, write the name of it in the text element.
        }
        if (phase != null) {
            innerTextOfDiv += " von " + phase;
        }
        if (potential != null) {
            innerTextOfDiv += " von " + potential;
        }

        showMoreData(project, "NotwendigTechnologie", fullscreenDiv) //show all technologies --- yet missing: pressing on them should do something

        //place the text element at the right position
        paragraph.innerText = (innerTextOfDiv);
        fullscreenDiv.insertBefore(paragraph, fullscreenDiv.firstChild);

        for (let i = 0; i < 3; i++) {
            let newDiv = document.createElement('div');
            newDiv.className = "button";
            switch (i) {
                case 0:
                    newDiv.innerHTML = "Projekte";
                    newDiv.addEventListener("click", function () {
                        showProjects(null, null, null)
                    }, false);
                    break;
                case 1:
                    newDiv.innerHTML = "Phase";
                    newDiv.addEventListener("click", function () {
                        readPhase(project, null, null)
                    }, false);
                    break;
                case 2:
                    newDiv.innerHTML = "Funktion & Potential";
                    newDiv.addEventListener("click", function () {
                        readPotential(project, null, null)
                    }, false);
                    break;
            }
            fullscreenDiv.appendChild(newDiv);
        }
    }
}

function readPhase(project, technologie, potential) {
    deleteAllBoxes(container);
    if (project == null && technologie == null && potential == null) //coming from home Menu
    {
        searchProjectFromMenu("phase");
    }
    else {
        //when comming from somewhere else

        //create a div
        fullscreenDiv = document.createElement('div');
        container.appendChild(fullscreenDiv);
        fullscreenDiv.className = "fullscreenDiv";

        //create the text element
        paragraph = document.createElement('p');
        let innerTextOfDiv = "Phasen";

        if (project != null) {
            innerTextOfDiv += " von " + project; //if we come from something, write the name of it in the text element.
        }
        if (technologie != null) {
            innerTextOfDiv += " von " + phase;
        }
        if (potential != null) {
            innerTextOfDiv += " von " + potential;
        }

        showMoreData(project, "phase", fullscreenDiv) //show all technologies --- yet missing: pressing on them should do something

        //place the text element at the right position
        paragraph.innerText = (innerTextOfDiv);
        fullscreenDiv.insertBefore(paragraph, fullscreenDiv.firstChild);

        for (let i = 0; i < 3; i++) {
            let newDiv = document.createElement('div');
            newDiv.className = "button";
            switch (i) {
                case 0:
                    newDiv.innerHTML = "Projekte";
                    newDiv.addEventListener("click", function () {
                        showProjects(null, null, null)
                    }, false);

                    break;
                case 1:
                    newDiv.innerHTML = "Technologie";
                    newDiv.addEventListener("click", function () {
                        readTechnologies(project, null, null)
                    }, false);
                    break;
                case 2:
                    newDiv.innerHTML = "Funktion & Potential";
                    newDiv.innerHTML = "Funktion & Potential";
                    newDiv.addEventListener("click", function () {
                        readPotential(project, null, null)
                    }, false);

                    break;
            }
            fullscreenDiv.appendChild(newDiv);
        }
    }
}

function readPotential(project, technologie, phase) {
    deleteAllBoxes(container);
    if (project == null && technologie == null && phase == null) //coming from home Menu
    {
        searchProjectFromMenu("Potential");
    }
    else {
        //when comming from somewhere else

        //create a div
        fullscreenDiv = document.createElement('div');
        container.appendChild(fullscreenDiv);
        fullscreenDiv.className = "fullscreenDiv";

        //create the text element
        paragraph = document.createElement('p');
        let innerTextOfDiv = "Potential";

        if (project != null) {
            innerTextOfDiv += " von " + project; //if we come from something, write the name of it in the text element.
        }
        if (technologie != null) {
            innerTextOfDiv += " von " + phase;
        }
        if (phase != null) {
            innerTextOfDiv += " von " + potential;
        }

        showMoreData(project, "Potential", fullscreenDiv) //show all technologies --- yet missing: pressing on them should do something

        //place the text element at the right position
        paragraph.innerText = (innerTextOfDiv);
        fullscreenDiv.insertBefore(paragraph, fullscreenDiv.firstChild);

        for (let i = 0; i < 3; i++) {
            let newDiv = document.createElement('div');
            newDiv.className = "button";
            switch (i) {
                case 0:
                    newDiv.innerHTML = "Projekte";
                    newDiv.addEventListener("click", function () {
                        showProjects(null, null, null)
                    }, false);
                    break;
                case 1:
                    newDiv.innerHTML = "Technologie";
                    newDiv.addEventListener("click", function () {
                        readTechnologies(project, null, null)
                    }, false);
                    break;

                case 2:
                    newDiv.innerHTML = "Phasen";
                    newDiv.addEventListener("click", function () {
                        readPhase(project, null, null)
                    }, false);
                    break;

            }
            fullscreenDiv.appendChild(newDiv);
        }
    }
}

function showMoreData(projekt, searchingVar, parentDiv) {
    // create divs for each technologie there is

    if (Array.isArray(TestJson[projekt][searchingVar])) {
        TestJson[projekt][searchingVar].forEach(readValue => {
            const element = document.createElement('div');
            element.textContent = readValue;
            parentDiv.appendChild(element);
        });
        console.log("WasArray", searchingVar);
    }
    else {
        paragraph = document.createElement('p');
        paragraph.innerText = (TestJson[projekt][searchingVar]);
        parentDiv.appendChild(paragraph);


        console.log("NoArray", searchingVar);
    }
}


function deleteAllBoxes(parent) {
    // Alle Kinder dieses Elements löschen
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function searchProjectFromMenu(createPanelsFor) {

    let alreadyUsed = [];
    //go through every project,
    Object.keys(TestJson).forEach(projektName => {
        TestJson[projektName][createPanelsFor].forEach(readValue => {
            //check if technology has already been written out by checking from an array
            if (!alreadyUsed.includes(readValue)) {
                //create divs for the project
                projectDiv = document.createElement('div');
                container.appendChild(projectDiv);
                projectDiv.className = "Auswahl";

                //create the text element for the project name
                paragraph = document.createElement('p');
                paragraph.innerText = (readValue);
                projectDiv.appendChild(paragraph);
                alreadyUsed.push(readValue);
            }
        });

    });
}




//this json is only for testing on local pc. To read a json from another file, it needs to be on a server like github pages.
//so this way, for testing, we can check if things work. This part is public for everyone because it can be read from the js file directly, its kind of private if its another file, so thats better
const TestJson = {
    "SmartMirror": {
        "phase": [
            "Impuls",
            "Besuch",
            "Angebot"
        ],
        "OptTechnologie": [
            "RFID",
            "Bilderkennung",
            "3D Scanner",
            "AugmentedReality"
        ],
        "NotwendigTechnologie": [
            "Microcontroller",
            "Bildschirm"
        ],
        "Mehrwert": [
            "Informationsgewinnung",
            "Hier anderer Text haben",
            "Hier letzter Cooler text"
        ],
        "Interaktion": "möglich",
        "Marktreife": 3,
        "Kundenakzeptanz": 3,
        "Anschaffungskosten": 3,
        "Bedienbarkeit": 4,
        "Innovationsgrad": 3,
        "Example1": 1,
        "Example2": 2,
        "Funktionen": [
            "Produktidentifikation und Empfehlung",
            "Andere Sachen"
        ],
        "Potential": [
            "Digitale Produktinformatione",
            "Produktkonfiguration",
            "Digitale Produktempfehlung"
        ],
        "Beschreibung": "Voll der der lange Text, der das ganze voll krass beschreibt, weil Smart Mirror halt voll der krasse Smart Shit ist, den jeder Händler braucht."
    },
    "wasd": {
        "phase": [
            "Impuls",
            "Besuch",
            "Angebot"
        ],
        "OptTechnologie": [
            "RFID",
            "Bilderkennung",
            "3D Scanner",
            "AugmentedReality"
        ],
        "NotwendigTechnologie": [
            "Microcontroller",
            "Bildschirm",
            "Programmierfähigkeiten"
        ],
        "Mehrwert": [
            "Informationsgewinnung",
            "Hier anderer Text haben",
            "Hier letzter Cooler text"
        ],
        "Interaktion": "möglich",
        "Marktreife": 3,
        "Kundenakzeptanz": 3,
        "Anschaffungskosten": 3,
        "Bedienbarkeit": 4,
        "Innovationsgrad": 3,
        "Example1": 1,
        "Example2": 2,
        "Funktionen": [
            "Produktidentifikation und Empfehlung",
            "Andere Sachen"
        ],
        "Potential": [
            "Digitale Produktinformatione",
            "Produktkonfiguration",
            "Digitale Produktempfehlung"
        ],
        "Beschreibung": "Voll der der lange Text, der das ganze voll krass beschreibt, weil Smart Mirror halt voll der krasse Smart Shit ist, den jeder Händler braucht."
    }
}

