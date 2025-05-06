class Tura{
    constructor(naziv, duzina, opis, tagovi){
        this.naziv= naziv
        this.duzina=duzina
        this.opis=opis
        this.tagovi= tagovi
    }
}

let ture = []

function prikazTure(){
    let listaDiv = document.getElementById("tura-lista")
    listaDiv.innerHTML = ""

    for (let i=0; i < ture.length; i++){
        let tura = ture[i]

        let kartica = document.createElement("div")
        kartica.className = "tura-kartica"
        kartica.textContent = tura.naziv + " (" + tura.duzina + " km)"

        kartica.addEventListener("click", function(){
            prikaziDetaljeTure(tura)
        })
        listaDiv.appendChild(kartica)
    }
}

function prikaziDetaljeTure(tura){
    let detaljiDiv= document.getElementById("tura-detalji")
    detaljiDiv.innerHTML= ""

    let p = document.createElement("p")
    p.innerHTML = "<strong>Opis:</strong> " + tura.opis + "<br>" +
    "<strong>Tagovi:</strong> " + tura.tagovi.join(", ")

    detaljiDiv.appendChild(p)
}
function sacuvajTureULocalStorage() {
    localStorage.setItem("ture", JSON.stringify(ture));
  }

function inicijalizujTure(){
    const sacuvaneTure= localStorage.getItem("ture")

    if(sacuvaneTure){
        const niz = JSON.parse(sacuvaneTure)
        ture = niz.map(t => new Tura(t.naziv, t.duzina, t.opis, t.tagovi))
    }
    else
    {
        ture = [
        new Tura("Gradska šetnja", 5, "Vođena tura kroz centar grada.", ["gradska", "istorijska"]),
        new Tura("Planinska avantura", 12, "Pešačka tura sa prelepim pogledom.", ["priroda", "planinarenje"]),
        new Tura("Kulturna ekspedicija", 8, "Muzeji, galerije i spomenici kulture.", ["kultura", "umetnost"])
        ]
        sacuvajTureULocalStorage();
    }
    prikazTure();
}
function obradiFormu(){
    const forma = document.getElementById("forma")

    forma.addEventListener("submit", function(event){
        event.preventDefault()

        const podaci = new FormData(forma)
        const naziv = podaci.get("naziv")
        const duzina = podaci.get("duzina")
        const opis = podaci.get("opis")

        const unosTaga = document.querySelectorAll('input[name="tagovi"]')
        const tagovi = Array.from(unosTaga).map(input => input.value.trim()).filter(tag => tag !== "")

        const novaTura = new Tura (naziv, duzina, opis, tagovi)
        ture.push(novaTura)

        sacuvajTureULocalStorage()
        prikazTure()
        forma.reset();

        document.getElementById("tagContainer").innerHTML = `
        <label>Tagovi (npr: gradska, istorijska):</label>
        <div class="tag-unos">
        <input type="text" name="tagovi" placeholder="Unesite tag">
        <button type="button" onclick="addTagField()">+</button>
        </div>`
    })
}
function dodajTagPolje(){
    const tagContainer = document.getElementById("tagContainer")

    const novaGrupa = document.createElement("div")
    novaGrupa.className = "tag-unos"

    const noviUnos = document.createElement("input")
    noviUnos.type = "text"
    noviUnos.name = "tagovi"
    noviUnos.placeholder = "Unesite tag"

    novaGrupa.appendChild(noviUnos)
    tagContainer.appendChild(novaGrupa)
}


document.addEventListener("DOMContentLoaded", function(){
    inicijalizujTure()
    obradiFormu()
})