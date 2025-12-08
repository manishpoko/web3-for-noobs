import express from 'express';
import type {Request, Response} from 'express'



const app = express();
const port = 3001;

app.use(express.json())





app.get('/', (req: Request, res: Response) => {
    res.send("backend server initiated!")
})

app.listen(port, ()=> {
    console.log('listening from port 3001')
})