window.addEventListener("load", function(){

    // cell1 = document.querySelector("table tr:nth-child(1) td:nth-child(1)");
    // cell2 = document.querySelector("table tr:nth-child(1) td:nth-child(2)");
    // cell3 = document.querySelector("table tr:nth-child(2) td:nth-child(1)");
    // cell4 = document.querySelector("table tr:nth-child(2) td:nth-child(2)");

    // cell1.addEventListener("mouseenter", skiftFarve)
    // cell2.addEventListener("mouseenter", skiftFarve)
    // cell3.addEventListener("mouseenter", skiftFarve)
    // cell4.addEventListener("mouseenter", skiftFarve)


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

    function klikPaaBrik(){
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
                    markerStik(this, vendtBrik);
                    this.removeEventListener("click", klikPaaBrik);
                    vendtBrik.removeEventListener("click", klikPaaBrik);
                    vendtBrik = null;
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
                        1000
                    );
                    vendtBrik = null;
                }
            }
        }
        else{
            vendtBrik = this;
        }
    }

    var tds = document.querySelectorAll("table tr td");
    for (var i = 0; i < tds.length; i++ ){
        this.console.log("i:", i, "tds[i]", tds[i]);
        //tds[i].addEventListener("mouseenter", skiftFarve);
        //tds[i].addEventListener("mouseleave", fjernFarve);

        tds[i].addEventListener("click", klikPaaBrik);

    }
});

function visNummer(element) {
    element.querySelector("span.blind").style.display = "none";
    element.querySelector("span.number").style.display = "inline";
}

function skjulNummer(element) {
    element.querySelector("span.blind").style.display = "inline";
    element.querySelector("span.number").style.display = "none";
}