const containerInput = document.getElementById('containerInput')
const generateBtn = document.getElementById('generate');


const dataField = {
    "Personal Information": {
        "Name": "",
        "Surname": "",
        "Date of Birth": "DD/MM/YYYY",
        "Chronological Age": "years",
        "CF": ""
    },
    "Globuli Bianchi": {
        "Baso": "",
        "EOSI": "",
        "LYMPH": "",
        "MONO": "",
        "NEUT": "",
        "WBC":  "",
        "NEUT": "",
        "LYMPH":"",
        "MONO":"",
        "EOSI":"",
        "Baso": ""
    },
    "Stress Ossidativo": {
        "D-ROMS": "Radicali Liberi",
        "PAT Test": "Potential Antioxidant Test",
        "OSI Index": "Oxidative Stress Index",
        "OBRI": "Oxidative Balance Risk Index",
        "aa_epa": "",
        "aa_dha": ""
    },
    "Stadi della Malattia Renale Cronica": {
        "GFR Stage I": ">90",
        "GFR Stage II": "60-89",
        "GFR Stage III": "30-59",
        "GFR Stage IV": "15-29",
        "GFR Stage V": "<15"
    },
    "Stato della Coagulazione": {
        "PLT": "10^3/uL",
        "MPV": "fL",
        "P-LCR": "%",
        "PCT": "%",
        "PDW": "fL"
    },
    "Assetto Lipidico": {
        "Colesterolo Totale": "mg/dL",
        "Colesterolo LDL": "mg/dL",
        "Colesterolo HDL": "mg/dL",
        "Trigliceridi": "mg/dL"
    },
    "Minerali": {
        "Sodio": "mEq/L",
        "Potassio": "mEq/L",
        "Magnesio": "mg/dL",
        "Cloruri": "mEq/L",
        "Calcio": "mg/dL",
        "Fosforo": "mg/dL"
    },
    "Assetto Marziale": {
        "Sideremia": "μg/dL",
        "Ferritina": "ng/mL",
        "Transferrina": "mg/dL"
    },
    "Assetto Diabetologico": {
        "Glicemia": "mg/dL",
        "Insulina": "μU/mL",
        "HOMA Test": ""
    },
    "Proteine": {
        "Albuminemia": "g/dL",
        "Proteine Totali": "g/dL"
    },
    "Funzionalità Epatica": {
        "Transaminasi GOT": "U/L",
        "Transaminasi GPT": "U/L",
        "Gamma GT": "U/L",
        "Fosfatasi Alcalina": "U/L"
    },
    "Bilirubina": {
        "Bilirubina Totale": "mg/dL",
        "Bilirubina Diretta": "mg/dL",
        "Bilirubina Indiretta": "mg/dL"
    },
    "Indici di Flogosi": {
        "VES": "mm/h",
        "PCR": "mg/L"
    },
    "Esame delle Urine": {
        "Colore": "",
        "Aspetto": "",
        "Peso Specifico": "",
        "pH": "",
        "Glucosio": "mmol/L",
        "Nitriti": "",
        "Proteine": "mg/dL",
        "Sangue": "ery/μL",
        "Chetoni": "mg/dL",
        "Urobilinogeno": "umol/L",
        "Bilirubina": "mg/dL",
        "Leucociti": "Leu/μL"
    },
}

/* Funzione per popolare dinamicamente tutte le sezioni e campi*/
for (const key in dataField) {
    
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('inputContainer-div');
    
    const sectionTitle = document.createElement('h3');
    sectionTitle.classList.add('tittle-section')
    sectionTitle.textContent = key;
    sectionDiv.appendChild(sectionTitle);
    
    for (const el in dataField[key]) {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('inputContainer-div-content');
        
        const label = document.createElement('p');
        label.textContent = el; 
    
        
        const input = document.createElement('input');
        input.type = 'text'; 
        input.placeholder = dataField[key][el];
        input.classList.add(el.replace(/\s+/g, '-'));
   
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);

        sectionDiv.appendChild(fieldDiv);
    }

    containerInput.appendChild(sectionDiv);
}

function clearInputFields() {
    const inputs = document.querySelectorAll('input'); 
    inputs.forEach(input => {
        input.value = ''; 
    });
}
/* Funzione di Estrapolazione dei dati input */
generateBtn.addEventListener('click',()=>{
    const allDataField = document.querySelectorAll('input')

    calculateAndSave()
    clearInputFields();
})








// Funzioni di calcolo dell'età biologica
function adjustAgeObri(obriIndex) {
    if (obriIndex === null) return 0;
    if (obriIndex >= 0.8 && obriIndex <= 1.2) return 0; 
    if (obriIndex >= 1.3 && obriIndex <= 1.7) return 2; 
    if (obriIndex >= 1.8 && obriIndex <= 2.2) return 5; 
    if (obriIndex > 2.2) return 10; 
    return 0;
}
function adjustAgeDRoms(dRoms) {
    if (dRoms === null) return 0;
    if (dRoms >= 250 && dRoms <= 300) return 0;
    if (dRoms >= 301 && dRoms <= 320) return 1; 
    if (dRoms >= 321 && dRoms <= 340) return 1;
    if (dRoms >= 341 && dRoms <= 400) return 3; 
    if (dRoms > 400) return 6; 
    return 0;
}
function adjustAgeAAEpa(aaEpa) {
    if (aaEpa === null) return 0;
    if (aaEpa >= 1 && aaEpa <= 3) return 0; 
    if (aaEpa > 3 && aaEpa <= 15) return 2; 
    if (aaEpa > 15) return 4; 
    return 0;
}
function adjustAgeAADha(aaDha) {
    if (aaDha === null) return 0;
    if (aaDha >= 1.6 && aaDha <= 3.6) return 0; 
    if (aaDha > 3.6 && aaDha <= 4.3) return 2; 
    if (aaDha > 4.3) return 4; 
    return 0;
}
function adjustAgeHoma(homaTest) {
    if (homaTest === null) return 0;
    if (homaTest >= 0.23 && homaTest <= 2.5) return 0; 
    return 5; 
}
function adjustAgeCardio(cardiovascularRisk) {
    if (cardiovascularRisk === null) return 0;
    if (cardiovascularRisk < 3) return 0; 
    if (cardiovascularRisk >= 3 && cardiovascularRisk <= 20) return 2; 
    return 5; 
}
function adjustAgeOsi(osi) {
    if (osi === null) return 0;
    if (osi >= 0 && osi <= 40) return 0; 
    if (osi >= 41 && osi <= 65) return 2; 
    if (osi >= 66 && osi <= 120) return 5; 
    return 10; 
}
function adjustAgePat(pat) {
    if (pat === null) return 0;
    if (pat < 1800) return 10; 
    if (pat >= 1800 && pat < 2700) return 5; 
    if (pat >= 2700 && pat < 2270) return 2; 
    if (pat >= 2270 && pat < 2800) return 0; 
    return -5; 
}
function adjustAgeExams(exams) {
    const normalValues = {
        'BASO %': [0, 2.5],
        'EOSI %': [0, 7],
        'LYMPH %': [15, 45],
        'MONO %': [0, 10],
        'NEUT %': [45, 70],
        'WBC': [4.0, 10.0],
        'HCT %': [38, 48],
        'HGB': [12, 16],
        'MCH': [27, 32],
        'MCHC': [32, 37],
        'MCV': [82, 98],
        'RBC': [4.0, 5.5],
        'RDW-SD': [38.0, 48.0],
        'RDW-CV': [11.0, 15.0],
        'AZOTEMIA': [16.6, 48.5],
        'CREATININA': [0.5, 0.9],
        'PLT': [150, 450],
        'MPV': [9.1, 12.3],
        'PDW': [10, 16],
        'COLESTEROLO TOTALE': [0, 200],
        'COLESTEROLO HDL': [0, 100],
        'COLESTEROLO LDL': [45, 65],
        'TRIGLICERIDI': [0, 150],
        'SODIO': [136, 145],
        'POTASSIO': [3.5, 5.1],
        'MAGNESIO': [1.6, 2.6],
        'CLORURI': [98, 107],
        'CALCIO': [8.6, 10.0],
        'FOSFORO': [0.8, 1.5],
        'SIDEREMIA': [37, 150],
        'FERRITINA': [13, 150],
        'TRANSFERRINA': [270, 360],
        'GLICEMIA': [70, 105],
        'INSULINA': [3, 16],
        'HOMA TEST': [0.23, 2.5],
        'ALBUMINEMIA': [3.50, 5.20],
        'TRANSAMINASI (GOT)': [0, 31],
        'TRANSAMINASI (GPT)': [0, 38],
        'GAMMA GT': [8, 31],
        'FOSFATASI ALCALINA': [100, 290],
        'VES': [0, 20],
        'PCR': [0, 5],
        'OMOICISTEINA': [5, 15],
        'PESO SPECIFICO': [1000, 1030],
        'PH': [5.0, 9.0],
        'GLUCOSIO': [0, 5],
        'PROTEINE': [0, 0.15],
        'SANGUE': [0, 0],
        'CHETONI': [0, 0.5],
        'BILIRUBINA': [0, 17],
        'UROBILINOGENO': [0, 17],
        'LEUCOCITI': [0, 15],
        'IR TEST': [0, 1],
        'Proteine totali': [6.6, 8.7],
        'Albumina': [52.7, 67.4],
        'Alfa 1': [3.6, 8.0],
        'Alfa 2': [6.4, 11.5],
        'Beta 1': [5.2, 8.3],
        'Beta 2': [2.2, 8.0],
        'Gamma': [8.7, 18.0],
        'Albumina*': [3.48, 5.86],
        'Alfa 1*': [0.24, 0.70],
        'Alfa 2*': [0.42, 1.0],
        'Beta 1*': [0.34, 0.72],
        'Beta 2*': [0.15, 0.70],
        'Gamma*': [0.57, 1.56],
        'Rapporto A/G': [1.20, 2.06],
    };

    let ageAdjustment = 0;
    for (const exam in exams) {
        const value = exams[exam];
        if (value === null) continue;
        const normalRange = normalValues[exam];
        if (normalRange && !(value >= normalRange[0] && value <= normalRange[1])) {
            ageAdjustment += 1; 
        }
    }
    return ageAdjustment;
}

// Funzione principale per calcolare l'età biologica
function calculateBiologicalAge(chronologicalAge, obriIndex, dRoms, aaEpa, aaDha, homaTest, osi, pat, exams) {
    let biologicalAge = chronologicalAge;

    biologicalAge += adjustAgeObri(obriIndex);
    biologicalAge += adjustAgeDRoms(dRoms);
    biologicalAge += adjustAgeAAEpa(aaEpa);
    biologicalAge += adjustAgeAADha(aaDha);
    biologicalAge += adjustAgeHoma(homaTest);
    biologicalAge += adjustAgeOsi(osi);
    biologicalAge += adjustAgePat(pat);
    biologicalAge += adjustAgeExams(exams);

    return biologicalAge;
}
function calculateAndSave() {
    try {
        const inputs = document.querySelectorAll('input');
        const data = {};

        inputs.forEach(input => {
            const className = input.className;
            if (className) {
                data[className.replace(/-/g, '_')] = input.value; 
            }
        });

        const chronologicalAge = parseFloat(data["Chronological-Age"]) || 0;
        const obriIndex = parseFloat(data["OBRI"]) || null;
        const dRoms = parseFloat(data["D-ROMS"]) || null;
        const aaEpa = parseFloat(data["aa_epa"]) || null;
        const aaDha = parseFloat(data["aa_dha"]) || null;
        const homaTest = parseFloat(data["HOMA-Test"]) || null;
        const osi = parseFloat(data["OSI-Index"]) || null;
        const pat = parseFloat(data["PAT Test"]) || null;

        const exams = {};
        const examElements = document.getElementsByClassName("exam-entry");
        for (const examElement of examElements) {
            const examName = examElement.name;
            exams[examName] = parseFloat(examElement.value) || null;
        }

        const biologicalAge = calculateBiologicalAge(
            chronologicalAge,
            obriIndex,
            dRoms,
            aaEpa,
            aaDha,
            homaTest,
            osi,
            pat,
            exams
        );

        data.BiologicalAge = biologicalAge;
        data.OlderThanChronologicalAge = biologicalAge > chronologicalAge ? 1 : 0;

        generatePDFReport(data);

        alert(`Calculated Biological Age: ${biologicalAge.toFixed(2)} years`);
    } catch (e) {
        console.error("Error: ", e);
        alert("An unexpected error occurred. Please check your input values.");
    }
}



function generatePDFReport(data) { 
    console.log(data);
    const { jsPDF } = window.jspdf;

    // Crea un nuovo documento PDF
    const pdf = new jsPDF();

    // Ottieni le dimensioni della pagina
    const pageWidth = pdf.internal.pageSize.getWidth(); 
    const pageHeight = pdf.internal.pageSize.getHeight(); 
    
    // Definisci le immagini per le varie pagine
    const images = [
        'referto/page1.jpg', 
        'referto/page2.jpg', 
        'referto/page3.jpg', 
        'referto/page4.jpg', 
        'referto/page5.jpg', 
        'referto/page6.jpg', 
        'referto/page7.jpg'
    ]; 

    // Funzione per caricare un'immagine e restituire una promessa
    function loadImage(imgSrc) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgSrc;
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(error);
        });
    }

    // Funzione asincrona per creare il PDF
    async function createPDF() {
        for (let i = 0; i < images.length; i++) {
            try {
                // Carica l'immagine
                const img = await loadImage(images[i]);

                // Calcola le dimensioni dell'immagine in base alla pagina
                let imgWidth = pageWidth; 
                let imgHeight = (img.height / img.width) * imgWidth;

                // Ridimensiona l'immagine se è più grande della pagina
                if (imgHeight > pageHeight) {
                    const scaleFactor = pageHeight / imgHeight;
                    imgHeight *= scaleFactor;
                    imgWidth *= scaleFactor;
                }

                // Aggiungi una nuova pagina solo se non è la prima
                if (i > 0) {
                    pdf.addPage();
                }

                // Aggiungi l'immagine alla pagina corrente
                pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);

                // Se è la prima pagina, aggiungi il testo
                if (i === 0) {
                    const textData = [
                        { text: data.Name, x: 110, y: 58, fontSize: 12, color: [0, 0, 0] },
                        { text: data.Date_of_Birth, x: 110, y: 65, fontSize: 12, color: [0, 0, 0] },
                        { text: data.CF, x: 110, y: 71, fontSize: 12, color: [0, 0, 0] },
                        { text: data.Chronological_Age, x: 50, y: 71, fontSize: 12, color: [0, 0, 0] },
                        { text: data.Baso, x: 90, y: 97, fontSize: 12, color: [0, 0, 0] },
                        { text: data.EOSI, x: 90, y: 104, fontSize: 12, color: [0, 0, 0] },
                        { text: data.LYMPH, x: 90, y: 111, fontSize: 12, color: [0, 0, 0] },
                        { text: data.MONO, x: 90, y: 118, fontSize: 12, color: [0, 0, 0] },
                        { text: data.NEUT, x: 90, y: 124, fontSize: 12, color: [0, 0, 0] },
                        { text: data.WBC, x: 90, y: 130, fontSize: 12, color: [0, 0, 0] },
                        { text: data.NEUT, x: 90, y: 137, fontSize: 12, color: [0, 0, 0] },
                        { text: data.LYMPH, x: 90, y: 144, fontSize: 12, color: [0, 0, 0] },
                        { text: data.MONO, x: 90, y: 151, fontSize: 12, color: [0, 0, 0] },
                        { text: data.EOSI, x: 90, y: 158, fontSize: 12, color: [0, 0, 0] },
                        { text: data.Baso, x: 90, y: 164, fontSize: 12, color: [0, 0, 0] }
                    ];

                    // Aggiungi il testo alla prima pagina
                    textData.forEach(item => {
                        pdf.setFontSize(item.fontSize); // Imposta la dimensione del font
                        pdf.setTextColor(...item.color); // Imposta il colore del testo
                        pdf.text(item.text, item.x, item.y); // Aggiungi il testo alla pagina
                    });
                }
                if (i === 1) {
                    const textData = [
                        { text: data.Colore, x: 90, y: 57, fontSize: 12, color: [0, 0, 0] }
                    ];

                    // Aggiungi il testo alla seconda pagina
                    textData.forEach(item => {
                        pdf.setFontSize(item.fontSize); // Imposta la dimensione del font
                        pdf.setTextColor(...item.color); // Imposta il colore del testo
                        pdf.text(item.text, item.x, item.y); // Aggiungi il testo alla pagina
                    });
                }
                if (i === 2) {
                    const textData = [
                        { text: data.Colore, x: 90, y: 57, fontSize: 12, color: [0, 0, 0] }
                    ];

                    // Aggiungi il testo alla terza pagina
                    textData.forEach(item => {
                        pdf.setFontSize(item.fontSize); // Imposta la dimensione del font
                        pdf.setTextColor(...item.color); // Imposta il colore del testo
                        pdf.text(item.text, item.x, item.y); // Aggiungi il testo alla pagina
                    });
                }
                if (i === 3) {
                    const textData = [
                        { text: data.Colore, x: 90, y: 57, fontSize: 12, color: [0, 0, 0] }
                    ];

                    // Aggiungi il testo alla quanrta pagina
                    textData.forEach(item => {
                        pdf.setFontSize(item.fontSize); // Imposta la dimensione del font
                        pdf.setTextColor(...item.color); // Imposta il colore del testo
                        pdf.text(item.text, item.x, item.y); // Aggiungi il testo alla pagina
                    });
                }
                if (i === 4) {
                    const textData = [
                        { text: data.Colore, x: 90, y: 57, fontSize: 12, color: [0, 0, 0] }
                    ];

                    // Aggiungi il testo alla quinta pagina
                    textData.forEach(item => {
                        pdf.setFontSize(item.fontSize); // Imposta la dimensione del font
                        pdf.setTextColor(...item.color); // Imposta il colore del testo
                        pdf.text(item.text, item.x, item.y); // Aggiungi il testo alla pagina
                    });
                }
                if (i === 5) {
                    const textData = [
                        { text: data.Colore, x: 90, y: 57, fontSize: 12, color: [0, 0, 0] }
                    ];

                    // Aggiungi il testo alla sesta pagina
                    textData.forEach(item => {
                        pdf.setFontSize(item.fontSize); // Imposta la dimensione del font
                        pdf.setTextColor(...item.color); // Imposta il colore del testo
                        pdf.text(item.text, item.x, item.y); // Aggiungi il testo alla pagina
                    });
                }
                if (i === 6) {
                    const textData = [
                        { text: data.Colore, x: 90, y: 57, fontSize: 12, color: [0, 0, 0] }
                    ];

                    // Aggiungi il testo alla settima pagina
                    textData.forEach(item => {
                        pdf.setFontSize(item.fontSize); // Imposta la dimensione del font
                        pdf.setTextColor(...item.color); // Imposta il colore del testo
                        pdf.text(item.text, item.x, item.y); // Aggiungi il testo alla pagina
                    });
                }
            } catch (error) {
                console.error("Errore nel caricamento dell'immagine: ", error);
            }
        }

        // Salva il PDF dopo aver aggiunto tutte le pagine
        pdf.save('report_multipagina.pdf');
    }

    // Chiama la funzione per creare il PDF
    createPDF();
}


  


