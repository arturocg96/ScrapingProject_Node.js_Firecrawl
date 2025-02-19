const categorizeAviso = (aviso) => {
    const textoCompleto = aviso.title.toLowerCase();

    if (
        textoCompleto.includes("corte de agua") ||
        textoCompleto.includes("agua") ||
        textoCompleto.includes("suministro") ||
        textoCompleto.includes("abastecimiento") ||
        textoCompleto.includes("reparación de tubería") ||
        textoCompleto.includes("reparacion de tuberia") ||
        textoCompleto.includes("avería de agua") ||
        textoCompleto.includes("averia de agua") ||
        textoCompleto.includes("tubería") ||
        textoCompleto.includes("tuberia") ||
        textoCompleto.includes("fontanería") ||
        textoCompleto.includes("fontaneria")
    ) {
        return "Suministros";
    }

    if (
        textoCompleto.includes("tráfico") ||
        textoCompleto.includes("trafico") ||
        textoCompleto.includes("circulación") ||
        textoCompleto.includes("circulacion") ||
        textoCompleto.includes("corte de calle") ||
        textoCompleto.includes("corte de tráfico") ||
        textoCompleto.includes("corte de trafico") ||
        textoCompleto.includes("calle cortada") ||
        textoCompleto.includes("carril") ||
        textoCompleto.includes("vial") ||
        textoCompleto.includes("estacionamiento") ||
        textoCompleto.includes("aparcamiento") ||
        textoCompleto.includes("semáforo") ||
        textoCompleto.includes("semaforo")
    ) {
        return "Tráfico";
    }

    return "Sin categoría";
};

module.exports = { categorizeAviso };
