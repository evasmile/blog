import express from 'express'
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import jsdom from "jsdom";
import jQuery from 'jquery';
import axios from "axios";

import { log } from 'console';
const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
app.use(express.static('public'))

let config = {Headers:{'Content-Type':'application/x-www-form-urlencode'}}

const dom = new jsdom.JSDOM("")
const $ = jQuery(dom.window)
let id ="";


app.get('/',function(req,res){

    res.render('login.ejs')
})

app.post('/login',async function(req,res){

   
    try {
        const result = await axios.post(`${API_URL}/login`, req.body)

       
        if(result.data.status){
            id = result.data.data.rows[0].id
            res.redirect('/home')
        }else{
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
    }
  


})

app.get('/register',function(req,res){
    res.render('register.ejs')
})

app.post('/api/register',async function(req,res){

    const data =req.body;

    try {
        const result = await axios.post(`${API_URL}/register`, data)
        if(result.data=="REGISTERD"){
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
    }



})


app.get('/home',async function(req,res){

    try {
        
        const result = await axios.get(`${API_URL}/post/?id=${id}`)

        console.log(result.data)
          res.render('home.ejs',{blog:result.data})
      
    } catch (error) {
        console.log(error)
    }
   
  
})

app.get('/newBlog.ejs',function(req,res){
    res.render('newBlog.ejs')
})

app.post('/newBlog',async function(req,res){
   

    try {
        const result = await axios.post(`${API_URL}/newpost`,{body:req.body,id:id})
    } catch (error) {
        console.log(error)
    }
    addBlog( {id:blogs.length+1,
        blog:req.body}  );

    res.redirect('/')

   
})

app.post('/moreread',async function(req,res){
  
      console.log(req.query.id)
    try {
        
        const result = await axios.get(`${API_URL}/post/id/?id=${req.query.id}`)
        console.log(result.data)
        res.render('blog.ejs',{blog:result.data[0]})
    } catch (error) {
        console.log(error)
    }
    //if(blog.id.toString()===req.params.id){
        
      // res.render('blog.ejs',{blog:blog})
       
        
   // }
   //});
  
})

app.get('/edit/:id',function(req,res){
    blogs.forEach(blog => {
    if(blog.id.toString()===req.params.id){  
           
            res.render('editBlog.ejs',{blog:blog})
         return
        
    }
});

app.post('/blog/edit/:id',function(req,res){

    blogs.forEach(blog => {
    
        
        if(blog.id.toString()===req.params.id){

            
            blog.blog.author = req.body.author;
            blog.blog.title = req.body.title;
            blog.blog.message = req.body.message;
         
            res.render('blog.ejs',{blog:blog})
            return
        }
       });
})



})

app.get('/delete/:id',function(req,res){
    for (let index = 0; index < blogs.length; index++) {
        if(blogs[index].id.toString()===req.params.id){
           blogs= blogs.slice(index)
            res.redirect('/')
            return
        }
        
    }
})

app.listen(port,function(){
    console.log("running")
})


let blogs=[];
function addBlog(blog){
 blogs.push(blog)
}


