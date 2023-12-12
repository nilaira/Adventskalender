const firebaseConfig = {
    apiKey: "AIzaSyD6O-rKwkJWkOn_K8Uf4O662Opv8eYyx9Y",
    authDomain: "adventskalender-db698.firebaseapp.com",
    projectId: "adventskalender-db698",
    storageBucket: "adventskalender-db698.appspot.com",
    messagingSenderId: "438991547887",
    appId: "1:438991547887:web:7f592068840e50e2feda1a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addluke() {
    const lukeE = document.querySelector("#luke");
    const skriftE = document.querySelector("#skrift");
    const bildeE = document.querySelector("#bilde")
    db.collection("luke").add({
        luke: Number(lukeE.value),
        open: false,
        tekst: skriftE.value,
    })
    printluke()
}

function printluke() {
    let lukeHTML = "";
    db.collection("luke").orderBy("luke").get().then((querySnapshot) => {
        querySnapshot.forEach((luke) => {
            if (luke.data().open) {
                lukeHTML += `<div class="box2"> ${luke.data().luke} <br> ${luke.data().tekst}</div>`
            }
            else {
                lukeHTML += `<div class="box" onclick="luke('${luke.id}')">${luke.data().luke}</div>`
            }
        });
        document.querySelector("#grid-container").innerHTML = lukeHTML;
    });
}
printluke()

function luke(id) {
    const d = new Date()
    db.collection("luke").doc(id).get().then((luke) => {
        if (d.getDate() >= luke.data().luke) {
            db.collection("luke").doc(id).update({
                open: true
            });
        }
        printluke();
    });
}