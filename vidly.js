//api/genres
const express=require('express');
const Joi=require('joi');
const app=express();
app.use(express.json());

const movies=[
    { name:'Jumanji',genre:'adventure'},
    {name:'Escape room',genre:'thriller'},
    {name:'Seven',genre:'Mystery'},
    {name:'Blended',genre:'romantic'},
    {name:'Hangover',genre:'Comedy'}
];

function validateMovie(movie){
    
    const schema={
        name:Joi.string().required(),
        genre:Joi.string().required()
    };
    
   return Joi.validate(movie,schema);
    
}
app.get('/api/genres',(req,res)=>{
    
    res.send(movies);
});

app.get('/api/genres/:name',(req,res)=>{
    
    const movie= movies.find(c=>c.name===req.params.name);
    if(!movie)
       return res.status(404).send('The movie was not found');
    else
        res.send(movie);
});

app.post('/api/genres',(req,res)=>{
    
    const {error}=validateMovie(req.body);
     if(error){
        
        res.status(400).send(error.details[0].message);
        return;
    }
    const movie={name:req.body.name,genre:req.body.genre};
    movies.push(movie);
    res.send(movie);
});

app.put('/api/genres/:name/:genre',(req,res)=>{
    
    const movie= movies.find(c=>c.name===req.params.name);
    if(!movie)
       return res.status(404).send('The movie was not found');
    
    const {error}=validateMovie(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    movie.name=req.body.name;
    movie.genre=req.body.genre;
    res.send(movie);
});

app.delete('/api/genres/:name',(req,res)=>{
    
    const movie= movies.find(c=>c.name===req.params.name);
    if(!movie)
       return res.status(404).send('The movie was not found');
    
   const index=movies.indexOf(movie);
    movies.splice(index,1);
    res.send(movie);
});

app.listen(3000,()=>{console.log(`listening at ${3000}` )});