import dados from "../models/dados.js";
const {bruxos} = dados;

const getAllBruxos = (req,res) => {
    const {casa} = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = bruxos.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }

    res.status(200).json({
        mensagem: " 🪄Lista de Bruxos convocada com sucesso !",
        total: resultado.length,
        data: resultado,
    });
};

 const getBruxoById = (req,res) => {
    const id = parseInt(req.params.id);
    const bruxo = bruxos.find(b => b.id === id);

    if (!bruxo) {
        return res.status(404).json({ mensagem: "Nenhum bruxo foi encontrado no Beco Diagonal"})
    }

     res.status(200).json(bruxo);
 };

const createBruxo = (req, res) => {
    const { nome, idade, casa, varinha } = req.body;

    if (!nome || !idade || !casa || !varinha) {
        return res.status(400).json({
            mensagem: "Feitiço mal executado! Verifique os ingredientes."
        });
    }

    if (varinha.length < 3) {
        return res.status(400).json({
            mensagem: "Feitiço mal executado! Verifique os ingredientes."
        });
    }

    const existe = bruxos.find(b => b.nome.toLowerCase() === nome.toLowerCase());
    if (existe) {
        return res.status(409).json({
            mensagem: "Já existe um bruxo com esse nome!"
        });
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        idade,
        casa,
        varinha
    };

    bruxos.push(novoBruxo);

    res.status(201).json({
        mensagem: "Novo bruxo matriculado em Hogwarts!",
        bruxo: novoBruxo
    });
};


const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade, casa} = req.body;

    if (isNaN(id)) {
        return res.status(400).json({
            mensagem: "Feitiço mal executado! Verifique os ingredientes."
        });
    }

    let bruxoEncontrado = null;

    for (let i = 0; i < bruxos.length; i++) {
        if (bruxos[i].id === id) {
            if (nome) bruxos[i].nome = nome;
            if (idade) bruxos[i].idade = idade;
            if (casa) bruxos[i].casa = casa;
    

            bruxoEncontrado = bruxos[i];
            break;
        }
    }

    if (!bruxoEncontrado) {
        return res.status(404).json({
            mensagem: "Não é possível reparar o que não existe!"
        });
    }

    res.status(200).json({
        mensagem: "Bruxo atualizado com sucesso!",
        bruxo: bruxoEncontrado
    });
};

const deleteBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { admin } = req.query;

    if (admin !== "true") {
        return res.status(403).json({
            mensagem: "Somente o Diretor pode executar essa magia!"
        });
    }

    if (isNaN(id)) {
        return res.status(400).json({
            mensagem: "Feitiço mal executado! Verifique os ingredientes."
        });
    }

    const bruxo = bruxos.find(b => b.id === id);

    if (!bruxo) {
        return res.status(404).json({
            mensagem: "Nenhum bruxo foi encontrado no Beco Diagonal!"
        });
    }

    const novaLista = bruxos.filter(b => b.id !== id);
    bruxos.splice(0, bruxos.length, ...novaLista);

    res.status(200).json({
        mensagem: "Bruxo expulso de Hogwarts com sucesso!"
    });
};

 export { getAllBruxos, getBruxoById,createBruxo, deleteBruxo, updateBruxo};