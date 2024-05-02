import express from 'express'
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import jsdom from "jsdom";
import jQuery from 'jquery';

import { log } from 'console';
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))

const dom = new jsdom.JSDOM("")
const $ = jQuery(dom.window)

app.get('/',function(req,res){
   
    res.render('home.ejs',{blog:blogs})
})

app.get('/newBlog.ejs',function(req,res){
    res.render('newBlog.ejs')
})

app.post('/newBlog',function(req,res){
   
    addBlog( {id:blogs.length+1,
        blog:req.body}  );

    res.redirect('/')

   
})

app.post('/moreread/',function(req,res){
  
    console.log(req.body)
   //blogs.forEach(blog => {
    
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


