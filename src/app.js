import express,{json} from "express";


const app = express();
const port = 5001;

app.use(express.json());

const items = [{
    id: 1,
    name: "Pêra",
    quantity: 3,
    type: "Fruta",
}]


app.post("/items", (req, res) => {
    const item = req.body
    if(item.name && typeof item.name === 'string' &&
        item.quantity && typeof item.quantity === 'number' &&
        item.type && typeof item.type === 'string') {
            for(let i = 0; i < items.length; i++){
                if(item.name === items[i].name){
                    res.status(409).send("Item já existente")
                }
            }
            items.push({
                id: items.length + 1,
                ...item
            })
            res.status(201).send("Item criado com sucesso")
        }else{
            res.status(422).send("Unprocessable entity")
        }
})

app.get("/items",(req,res) => {
    res.send(items);
})

app.get("/items/:id", (req,res) => {
    const id = Number(req.params.id);
    console.log(id);
    const response = items.filter(item => item.id === id)
    if(response.length === 0){
        if(id <= 0){
            res.status(400).send("ID inválido")
        }else{
            res.status(404).send("Nenhum item encontrado")
        }
    }
    else{
        res.status(200).send(response)
    }
})


app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
