dataAtualFormatada = () => {
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return mesF+"/"+diaF+"/"+anoF;
};

dataMesPassadoFormatada = () => {
    var data = new Date(),
    dia  = (data.getDate() - 2).toString(),
    diaF = (dia.length == 1) ? '0'+dia : dia,
    mes  = (data.getMonth()).toString(), //Sem o +1 pois no getMonth Janeiro começa com zero e queremos o mês passado.
    mesF = (mes.length == 1) ? '0'+mes : mes,
    anoF = data.getFullYear();
    return mesF+"/"+diaF+"/"+anoF;
};

module.exports = {
    dataAtualFormatada: dataAtualFormatada(),
    dataMesPassadoFormatada: dataMesPassadoFormatada()
}