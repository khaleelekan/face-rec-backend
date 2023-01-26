const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const postgres = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'postgres',
      password : 'Raheemjr@123',
      database : 'face-rec'
    }
  });

  console.log(postgres.select('*').from('public.login'))


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    const database = {
   users: [
        {
            id:123,
            username: 'khaleel',
            email: 'khaleel@gmail.com',
            password: 'khaleel' ,
            entries: 0,
            joined: new Date ()    
           },
        {
            id:124,
            username: 'lekan',
            email: 'lekan@gmail.com',
            password: 'cookies' ,
            entries: 0,
            joined: new Date ()    
           }
    ]
}
})


//for signin
app.post('/signin',(req,res)=>{
    if(req.body.email == database.users[1].email && req.body.password == database.users[1].password){
        res.json('success')
    }else{
        res.status(400).json('error logging in');
    }
   // res.json('you just signed in')
})

//for register
app.post('/register',(req,res)=>{
    const{name,email,password} = req.body
    bcrypt.hash(password, null,null ,function(err, hash){
        console.log(hash)
    })
    database.users.push({
        id:125,
        username: name,
        email: email,
        entries: 0,
        joined: new Date ()
    })
    res.json(database.users[database.users.length-1]);
})

//for profile
app.get('/profile/:id', (req,res)=>{
    const {id} = req.params
      let found = false
    database.users.forEach(user=>{
        if(user.id == id){
            found = true
           return res.json(user)
        }
    })
    if (!found){
        res.status(400).json("user not found")

    }

})

//for entries
app.post('/image',(req, res)=>{
    const {id} = req.body
      let found = false
    database.users.forEach(user=>{
        if(user.id == id){
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found){
        res.status(400).json("user not found")
}
})


app.listen(3000, ()=>{
    console.log('app is running on port 3000')
})