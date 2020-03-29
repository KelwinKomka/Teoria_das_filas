const ipcRenderer = require('electron').ipcRenderer; 
       
function simular() {
    var minutos = document.getElementById('ipMinutos').value,
    chegadaA = document.getElementById('ipChegada1A').value,
    chegadaB = document.getElementById('ipChegada1B').value,
    chegadaC = document.getElementById('ipChegada1C').value,
    servicoA = document.getElementById('ipServico1A').value,
    servicoB = document.getElementById('ipServico1B').value,
    servicoC = document.getElementById('ipServico1C').value,
    probClientes = document.getElementById('ipProbabClientes').value,
    textoErro = document.getElementById('divErro')

    textoErro.innerHTML = ''
    if (!minutos || !chegadaA || !chegadaB || !chegadaC || !servicoA || !servicoB || !servicoC) {
        textoErro.innerHTML = '<strong>Todos os campos devem estar preenchidos!</strong>'
        return
    }

    if ((chegadaA < servicoA) || (chegadaB < servicoB) || (chegadaC < servicoC)) {
        textoErro.innerHTML = '<strong>A chegada deve ter valor maior que o serviço!</strong>'
        return
    }

    if ((minutos < 1) || (servicoA < 1) || (servicoB < 1) || (servicoC < 1)) {
        textoErro.innerHTML = '<strong>Os valores devem ser maiores que zero!</strong>'
        return
    }

    var totalChegadaA = (minutos/chegadaA).toFixed(2),
        totalChegadaB = (minutos/chegadaB).toFixed(2),
        totalChegadaC = (minutos/chegadaC).toFixed(2),
        totalServicoA = (minutos/servicoA).toFixed(2),
        totalServicoB = (minutos/servicoB).toFixed(2),
        totalServicoC = (minutos/servicoC).toFixed(2)

    document.getElementById('ipChegada2A').value = totalChegadaA
    document.getElementById('ipChegada2B').value = totalChegadaB
    document.getElementById('ipChegada2C').value = totalChegadaC

    document.getElementById('ipServico2A').value = totalServicoA
    document.getElementById('ipServico2B').value = totalServicoB
    document.getElementById('ipServico2C').value = totalServicoC

    var subtrA = (totalServicoA-totalChegadaA) > 0 ? (totalServicoA-totalChegadaA) : 1,
        subtrB = (totalServicoB-totalChegadaB) > 0 ? (totalServicoB-totalChegadaB) : 1,
        subtrC = (totalServicoC-totalChegadaC) > 0 ? (totalServicoC-totalChegadaC) : 1

    document.getElementById('ipNumeroMedioA').value = (totalChegadaA/subtrA).toFixed(2)
    document.getElementById('ipNumeroMedioB').value = (totalChegadaB/subtrB).toFixed(2)
    document.getElementById('ipNumeroMedioC').value = (totalChegadaC/subtrC).toFixed(2)

    document.getElementById('ipTempoMedioA').value = (1.0/subtrC).toFixed(2)
    document.getElementById('ipTempoMedioB').value = (1.0/subtrB).toFixed(2)
    document.getElementById('ipTempoMedioC').value = (1.0/subtrC).toFixed(2)

    document.getElementById('ipTaxaMediaA').value = (totalChegadaA/totalServicoA).toFixed(2)
    document.getElementById('ipTaxaMediaB').value = (totalChegadaB/totalServicoB).toFixed(2)
    document.getElementById('ipTaxaMediaC').value = (totalChegadaC/totalServicoC).toFixed(2)

    var tableProb = document.getElementById('tbProb')
    while (tableProb.rows.length > 1) {
        tableProb.deleteRow(1);
    }

    var count = 0;
    if (probClientes) {
        for (var i = 0; i < probClientes; i++) {
            let pA = ((1-(totalChegadaA/totalServicoA))*Math.pow((totalChegadaA/totalServicoA), i)).toFixed(2),
                pB = ((1-(totalChegadaB/totalServicoB))*Math.pow((totalChegadaB/totalServicoB), i)).toFixed(2),
                pC = ((1-(totalChegadaC/totalServicoC))*Math.pow((totalChegadaC/totalServicoC), i)).toFixed(2)

            if (count == 2)
                break

            if (pA <= 0 && pB <= 0 && pC <= 0)
                count++
            
            var tableRow = tableProb.insertRow(-1);
            tableRow.id = "tr"+i;

            let tableCell1 = tableRow.insertCell(-1);
            tableCell1.id = "td"+i+1
            tableCell1.innerHTML = i;

            let tableCell2 = tableRow.insertCell(-1);
            tableCell2.id = "td"+i+2
            tableCell2.innerHTML = 'P('+i+')';

            let tableCellA = tableRow.insertCell(-1);
            tableCellA.id = "td"+i+1
            tableCellA.innerHTML = pA;

            let tableCellB = tableRow.insertCell(-1);
            tableCellB.id = "td"+i+1
            tableCellB.innerHTML = pB;

            let tableCellC = tableRow.insertCell(-1);
            tableCellC.id = "td"+i+1
            tableCellC.innerHTML = pC;
        }
    }
};