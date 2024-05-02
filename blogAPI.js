import express from 'express'
import pg from 'pg'
import bodyParser from "body-parser";
const app = express();


app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "BLOG",
    password: "Jesus",
    port: 5432,
  });
  db.connect();


app.post('/register',async function(req,res){

    console.log(req.body)
    try{
     const result =  await db.query('INSERT INTO users (email,password,name,surname,cellphone) VALUES ($1,$2,$3,$4,$5)',
    [req.body.email,
    req.body.password ,
    req.body.name,
    req.body.surname,
    req.body.cellphone 
    ]);
    if(result.rowCount == 1){ res.send("REGISTERD") }
   
    }catch(err){
    res.send(err)
    
}
})

app.post('/login', async function(req,res){

    try {
        const result = await db.query("SELECT (email , password) FROM users WHERE email = $1 AND password = $2",
        [req.body.email,req.body.password])
        res.json(true)
        
    } catch (error) {
        res.json(error)
    }
})
    




app.listen('4000',function(){
    console.log('running servor api')
})