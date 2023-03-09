import { myDataSource } from "./data-source"
import * as express from "express"
import { Request, Response } from "express"
import { Users } from "./entity/Users"

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()
app.use(express.json())

app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(Users).find()
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const userId = req.params.id as any

    const results = await myDataSource.getRepository(Users).findOneBy({ userId })

    return res.send(results)
})

app.post("/users", function (req: Request, res: Response) {
    // here we will have logic to save a user
})

app.put("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
})

app.delete("/users/:id", function (req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
})

// start express server
app.listen(3000)