import dados from "../models/dados.js";
const {bruxos} = dados;

const CasasOficiais =["Grifinória", "Sonserina", "Lufa-Lufa","Corvinal"];

const getAllBruxos = (req,res) => {
    const {casa} = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = bruxos.filter(b => b.casa === casa);
    }

    res.status(200).json({
        mensagem: " 🪄Lista de Bruxos convocada com sucesso !",
        total: resultado.length,
        data: resultado,
    });
};