import express from 'express'
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))

app.get('/',function(req,res){
    res.render('home.ejs',{blog:blogs})
})

app.get('/newBlog.ejs',function(req,res){
    res.render('newBlog.ejs')
})

app.post('/newBlog',function(req,res){

    addBlog(req.body);
    res.redirect('/')
})

app.listen(port,function(){
    console.log("running")
})


const blogs=[];
function addBlog(blog){
 blogs.push(blog)
}


