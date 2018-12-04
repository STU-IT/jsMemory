window.addEventListener("load", function(){

    function skiftFarve() {
        this.style.backgroundColor = "lightblue";
    }

    function fjernFarve(){
        this.style.backgroundColor = "";
    }

    function markerStik(denEne, denAnden)
    {
        denEne.style.backgroundColor = "lightgray";
        denEne.style.color = "green";

        denAnden.style.backgroundColor = "lightgray";
        denAnden.style.color = "green";
    }

    function markerAntiStik(denEne, denAnden)
    {
        denEne.style.backgroundColor = "pink";
        denEne.style.color = "red";

        denAnden.style.backgroundColor = "pink";
        denAnden.style.color = "red";
    }

    function afMarker(denEne, denAnden)
    {
        denEne.style.backgroundColor = "";
        denEne.style.color = "black";

        denAnden.style.backgroundColor = "";
        denAnden.style.color = "black";
    }

    var vendtBrik = null;
    var antalStik = 0;
    var gameState = "start"
    var antalBrikker = 4;

    function gameOver(message){
        alert(message); // TODO gør pænere
        gameState = "start";
        startGame();
    }

    function startGame(){
        buildGamePad(100);
    }

    const shuffleArray = arr => arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);

    function buildGamePad(size){
        console.log(size);
        var halfSize = size /2;
        antalBrikker = size;

        antalStik = 0;
        stik.innerHTML = antalStik;

        var numbers = Array(size);
        for (var i = 0; i < halfSize; i++){
            numbers[i] = Math.ceil(Math.random() * 90 + 10)
            numbers[halfSize+i] = numbers[i];
        }
    
        numbers = shuffleArray(numbers);
        
        // find bredde og højde
        var width = Math.sqrt(size);
        var height = width;

        // ryd tabellen
        gamePad.innerHTML = "";
        
        // lav rækker
        for (var i = 0; i < height; i++){
            // en ny række
            var row = gamePad.insertRow();

            // lav celler
            for (var j = 0; j < width; j++){
                // en ny celle
                var cell = row.insertCell();

                // tilføj spans
                cell.innerHTML = '<span class="number">'+ numbers[i*width+j] +'</span>';
                cell.innerHTML += '<span class="blind">:-)</span>';
                cell.addEventListener("click", klikPaaBrik);
            }
        }
    }

    function klikPaaBrik(){
        if (gameState != "winningState")
        {
            console.log("Brik", this);
            visNummer(this);
            
            // hvis der allerede er EN brik som er vendt
            if (vendtBrik != null) {
                if (vendtBrik != this) {
                    if (vendtBrik.querySelector("span.number").textContent 
                        == this.querySelector("span.number").textContent 
                        ) 
                    {
                        console.log("MATCH!")
                        antalStik++;
                        console.log("Du har nu", antalStik, "stik");
                        stik.innerHTML = antalStik;
                        markerStik(this, vendtBrik);
                        this.removeEventListener("click", klikPaaBrik);
                        vendtBrik.removeEventListener("click", klikPaaBrik);
                        vendtBrik = null;
                        if (antalBrikker / 2 == antalStik)
                        {
                            gameState = "winningState";
                            setTimeout(()=>gameOver("Du har gennemført"), 500);
                        }
                    }
                    else
                    {
                        console.log("NO MATCH!");
                        markerAntiStik(this, vendtBrik);
                        
                        var b1 = this;
                        var b2 = vendtBrik;

                        setTimeout( function(){
                                afMarker(b1, b2);
                                skjulNummer(b1);
                                skjulNummer(b2);
                            },
                            1800
                        );
                        vendtBrik = null;
                    }
                }
            }
            else{
                vendtBrik = this;
            }
        }
    }

    // init
    // var tds = document.querySelectorAll("table tr td");
    // for (var i = 0; i < tds.length; i++ ){
    //     this.console.log("i:", i, "tds[i]", tds[i]);
    //     //tds[i].addEventListener("mouseenter", skiftFarve);
    //     //tds[i].addEventListener("mouseleave", fjernFarve);

    //     tds[i].addEventListener("click", klikPaaBrik);
    // }

    var knapper = document.querySelectorAll("button[name=gamePadSize]");
    for (var i = 0; i < knapper.length; i++){
        knapper[i].addEventListener("click", function(){
            buildGamePad(this.value);
        })
    }

    startGame()
});

function visNummer(element) {
    element.querySelector("span.blind").style.display = "none";
    element.querySelector("span.number").style.display = "inline";
}

function skjulNummer(element) {
    element.querySelector("span.blind").style.display = "inline";
    element.querySelector("span.number").style.display = "none";
}