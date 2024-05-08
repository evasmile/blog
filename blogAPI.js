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

   // console.log(req.body)
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
        const result = await db.query("SELECT id ,email , password FROM users WHERE email = $1 AND password = $2",
        [req.body.email,req.body.password])
       
        if(result.rowCount == 1){
         
            res.json({status:true, data:result})
        }else{ res.json({status:false, data:{}})}
    } catch (error) {
        res.json(error)
    }
})

app.get('/post',async function(req,res){
   
    try {
        const result = await db.query(`SELECT id,title,author,message,date from blogs WHERE user_id = $1`,[req.query.id])
        res.json(result.rows)
    } catch (error) {
        console.log(error)
        
    }
})
   
app.get('/post/id',async function(req,res){

    try {
        const result = await db.query(`SELECT id,title,author,message,date FROM blogs WHERE id = $1`,[req.query.id])
        res.json(result.rows)
    } catch (error) {
        console.log(error)
    }
  

})

app.post('/newpost',async function(req,res){

    
    try {
        const result =await db.query('INSERT INTO blogs (title,author,message,date,user_id) VALUES ($1,$2,$3,$4,$5)',
    [req.body.body.title,req.body.body.author,req.body.body.message,new Date(),req.body.id])

    if(result.rowCount == 1){
        res.json(true)
    }else{
        res.json(false)
    }
    } catch (error) {
        console.log(error)
    }

})

app.delete('/post/delete/', async function(req,res){
    console.log(req.query.id)
    try {
        const result = await db.query('DELETE FROM blogs WHERE id = $1',[req.query.id]);
      if(result.rowCount==1){
        res.json(true)
      }else{ res.json(false)}
    } catch (error) {
        
    }
})

app.patch('/blog/edit',async function(req,res){

    console.log(req.body)
    try {
        const result =await db.query('UPDATE blogs SET title = $1 , author = $2 ,message = $3 WHERE id = $4',
            [req.body.title,req.body.author,req.body.message,req.query.id]
        )

        if( result.rowCount){
            res.json(true)
        }else{res.json(false)}
    } catch (error) {
        console.log(error)
    }
})




app.listen('4000',function(){
    console.log('running servor api')
})