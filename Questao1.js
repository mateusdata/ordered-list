const fs = require("fs");
let lerArquivo = fs.readFileSync('L1Q1.in', 'utf-8');

let valores = lerArquivo.split(/\r\n/);


for(let x = 0; x < valores.length; x++) {    
    valores[x] = valores[x].split(" ");    
}

let Valores = [];
let listaOrdenada = [];

function separadorStarts(valores) {
    let a = [];
    a.push(valores.shift());

    while (true) {
        if (valores[0] == "start" || valores.length == 0) {
            break;
        }
        a.push(valores.shift()) 
    }
    return a
}

for (let x = 0; x < valores.length; x++) {
    let separador = [];
    while (valores[x].length != 0) {
        separador.push(separadorStarts(valores[x]))
    }
    Valores.push(separador);
}

for (let x = 0; x < Valores.length; x++) {
    for (y = 0; y < Valores[x].length; y++) {
        var armazenar = [];
        armazenar.push(Valores[x][y][0]);

        for (let z = 1; z < Valores[x][y].length; z++) {
            if (!armazenar.includes(Valores[x][y][z])) {
                armazenar.push(Valores[x][y][z])
            }
        }
        Valores[x][y] = armazenar;
    }
}

function ordenarListas(ordenar) {
    let armazenar = ordenar.shift();    
    let auxiliar = ordenar;    
    let n = auxiliar.length;

    for (let x = 1; x < n; x++) {
        let auxiliar2 = auxiliar[x];
        let y = x - 1; 
        while ((y > -1) && (parseInt(auxiliar2) < parseInt(auxiliar[y]))) {
            auxiliar[y + 1] = auxiliar[y];
            y--;
        }
        auxiliar[y + 1] = auxiliar2;
    }
    ordenar.unshift(armazenar);
}

for (let x = 0; x < Valores.length; x++) {
    for (y = 0; y < Valores[x].length; y++) {
        ordenarListas(Valores[x][y]);
    }
}

let adicionar = [];

function somarValores(Valores, adicionar) {
    for (let x = 0; x < Valores.length; x++) {
        let auxiliar = [];
        for (let y = 0; y < Valores[x].length; y++) {
            let i = 0;
    
            for (let z = 1; z < Valores[x][y].length; z++) {
                if (Valores[x][y][z] > 0){
                    i += parseInt(Valores[x][y][z])
                }
            }    
            auxiliar.push({i, x, y});
        }
        adicionar.push(auxiliar);
    }

    let quantidade = [];
    for (let x = 0; x < adicionar.length; x++) {
        let armazenar = [];
        let auxiliar2 = [];

        for (let y = 0; y < adicionar[x].length; y++) {
            for (let z = 0; z < armazenar.length; z++) {
                if (armazenar[z].i == adicionar[x][y].i) {
                    if (!auxiliar2.includes(adicionar[x][y])) {
                        auxiliar2.push(adicionar[x][y]);
                    }
                    if (!auxiliar2.includes(armazenar[z])) {
                        auxiliar2.push(armazenar[z]);
                    }
                }
            }
            armazenar.push(adicionar[x][y]);
        }
        quantidade.push(auxiliar2);
    }

    for (let x = 0; x < quantidade.length; x++) {
        for (let y = 0; y < quantidade[x].length; y++) {
            for (let z = 1; z < Valores[quantidade[x][y].x][quantidade[x][y].y].length; z++) {
                if (Valores[quantidade[x][y].x][quantidade[x][y].y][z] < 0) {
                    quantidade[x][y].i = quantidade[x][y].i + parseInt(Valores[quantidade[x][y].x][quantidade[x][y].y][z]);
                }
            }
        }
    }
}

somarValores(Valores, adicionar);

function ordenarSomas(ordenar) {
    let i = ordenar.length;

    for (let x = 1; x < i; x++) {
        let auxiliar = ordenar[x];
        let y = x - 1; 
        while ((y > -1) && (auxiliar.soma < ordenar[y].soma)) {
            ordenar[y + 1] = ordenar[y];
            y--;
        }
        ordenar[y + 1] = auxiliar;
    }
}


for (let x = 0; x < adicionar.length; x++) {
    ordenarSomas(adicionar[x]);
}

for (let x = 0; x < adicionar.length; x++) {
    let i = [];
    for (let y = 0; y < adicionar[x].length; y++) {
        i.push(Valores[adicionar[x][y].x][adicionar[x][y].y]);
    }
    listaOrdenada.push(i);
}

function imprimirLista(auxiliar) {
    var values = "";
    
    for (let x = 0; x < auxiliar.length; x++) {
        var i = auxiliar[x].toString()
        i = i.split(",").join(" ")
        if (x+1 != auxiliar.length) {
            i = i + "\n";
        }
        values += i;
    }
    return values
}

fs.writeFileSync("L1Q1.out", imprimirLista(listaOrdenada));

console.log("Arquivo criando!");