const fs = require('fs');
let readFile = fs.readFileSync('L1Q2.in', 'utf-8');
let values = readFile.split(/\r\n/).map(line => line.split(" "));

function main(values) {
    let names = [];
    let aux = "";
        
    for (let x = 0; x < values.length; x++) {
        let removedNames = [];
        let counter = 0;     
        
        if (names.length > 0) {
            while(values[x] < names[names.length - 1]) {                 
                removedNames.push(names.pop());
                counter += 1;
            }
        }    
        names.push(values[x]);
              
        if (counter > 0) {            
            if (x != 5) {
                if(x == 6) {
                    aux += "pop-" + counter + "x";
                } else {
                    aux += " pop-" + counter + "x";   
                }
            }
            aux += " push-" + values[x]; 
                       
            while(removedNames.length > 0){                
                let armazenar = removedNames.pop();    
                                        
                if(armazenar == "Walter") {
                    aux = aux.replace("push-Maria", "");
                    aux = aux +  "\n" + "push-Maria ";  
                    break;
                }                
                aux += " push-" + armazenar;
                names.push(armazenar);  
            }       
            continue;
        }                
        aux += " push-" + values[x];
    }
    return aux
}


let output = ""
values.forEach(line => {
    output += `${main(line).trim()}\n`
});

fs.writeFileSync("L1Q2.out", output.substring(0, output.length - 1));
console.log("Arquivo criando!");