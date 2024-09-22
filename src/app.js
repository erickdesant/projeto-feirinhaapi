import express,{json} from "express";

const app = express();
const port = 5000;

app.use(express.json());

const items = [
    {
        id: 1,
        name: "Pêra",
        quantity: 3,
        type: "Fruta",
    },
    {
        id: 2,
        name: "Alface",
        quantity: 1,
        type: "Legume",
    },
    {
        id: 3,
        name: "Frango",
        quantity: 5,
        type: "Carne",
    }
]

app.post("/items", (req, res) => {
    const item = req.body
    if(item.name && typeof item.name === 'string' &&
        item.quantity && typeof item.quantity === 'number' &&
        item.type && typeof item.type === 'string') {
            for(let i = 0; i < items.length; i++){
                if(item.name === items[i].name){
                    return res.status(409).send("Item já existente")
                }
            }
            items.push({
                id: items.length + 1,
                ...item
            })
            res.status(201).send("Item criado com sucesso")
        }else{
            res.status(422).send("Body inválido")
        }
})

app.get("/items",(req,res) => {
    const { type } = req.query
    if(type){
        const response = items.filter(item => item.type === type)
        res.status(200).send(response)
    }else{
        res.status(200).send(items);
    }
})

app.get("/items/:id", (req,res) => {
    const id = Number(req.params.id);
    if(!id || id <= 0){
        res.status(400).send("ID inválido")
    }
    const response = items.find(item => item.id === id)
    if(!response){
        res.status(404).send("Nenhum item encontrado")
    }
    else{
        res.status(200).send(response)
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
