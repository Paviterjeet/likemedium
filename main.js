import e from "express";

const port = 3000
const app = e()

app.get("/",(req, res)=>{
    res.send("<h1>Hello World !<h1>")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})