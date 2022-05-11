//require dependencies
const express= require("express")
const bcrypt=require("bcrypt")
const cors = require('cors')
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017"
const port = process.env.PORT || 3000;
const urlencodedParser = express.urlencoded({ extended: true });


//intializing app express
const app = express();

//use middleware
app.use(cors())
app.use(express.json())
app.use(urlencodedParser)
app.use(express.static("public"))

//routes
const userrouter = require('./routes/user.routes');
app.use('/users',userrouter)

//connecting to server
MongoClient.connect(url, function (err, client) {
  console.log("Connected successfully to DATABASE");
});


////Routes for home page
app.get('/', (req,res)=>{
  res.sendFile(__dirname +'/public/index.html');//Route handler
 
});

//Routes for signup page

app.get('/signup', (req,res)=>{
  res.sendFile(__dirname +'/public/signup.html');//Route handler
 
});

//Routes for Login Page
app.get('/login', (req,res)=>{
  res.sendFile(__dirname +'/public/login.html')//Route handler
 
});


//Routes for contact page
app.get('/contact', (req,res)=>{
  res.sendFile(__dirname +'/public/contact.html');//Route handler
 
});

//Routes for menu page
app.get('/menu', (req,res)=>{
  res.sendFile(__dirname +'/public/menu.html');//Route handler
 
});
//Routes for About page
app.get('/about', (req,res)=>{
  res.sendFile(__dirname +'/public/about.html');//Route handler
 
});
app.get('/logout', (req, res)=>{
  // req.logOut();
   res.redirect('/')
 })
/** */

app.post ('/signup', urlencodedParser,  async (req, res)=>{
  //console.log(req.body);
 try{
   let email=req.body.emailAddress;
  console.log(req.body)
  let fullName=req.body.fullName;
  let password=req.body.password;
  let confirmPassword=req.body.confirmPassword;
  
  if(email && fullName && password && confirmPassword)
  { //res.status(200).send({status:'ok'})
    //console.log(req.body)
    
    MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client)=> {
    const db=client.db("restaurantApp")
     
    const collection =db.collection("users")
    const doc={email:email , fullName:fullName, password:password, confirmPassword:confirmPassword};
    const findUser= await collection.findOne({email:req.body.emailAddress})
    console.log(findUser)
        if(findUser){
         console.log("User already exists")
          return res.status(400).send({message:'User already exists'})
        }else{
          const newUser=await collection.insertOne(doc) 
              res.send (newUser)}
      
     })    
   
  }else{
     res.status(400).send("bad request");
    }

 }catch(ex){
    return res.status(500).send("error");
  }
});


app.post ('/login', urlencodedParser, async (req, res)=>{
  
  try{
    let email=req.body.emailAddress;
    let password=req.body.password;
    if(email && password ){
        MongoClient.connect(url, { useUnifiedTopology: true },  async (err, client)=> {
        const db=client.db("restaurantApp")
        const collection =db.collection("users")
        const doc={email:email , password:password };
        const loginFindUser=await collection.findOne(doc)
        console.log(loginFindUser)
        if(!loginFindUser){
         return res.status(400).send({message: "Invalid username/password"})
      }else {
          //const newLoginUser= await collection.insertOne(doc)
          //res.send(newLoginUser)
          console.log(`Welcome ${email}`)
          return res.json({status:'ok', message:`<p>Welcome ${email}</p>`})
        }
        collection.insertOne(doc, (error,result) =>{
          if(!error){
            client.close();
            console.log(result.ops)
            res.send (doc)
          }else{
            client.close();
            res.send("is an error")
          }
          
        });
      });

    }else{
      return res.status(400).send("bad request");

    }
  }catch(ex){
    return res.status(500).send("error");
  }
 });


app.post ('/contact', urlencodedParser,  async (req, res)=>{
    try{  
    let Name=req.body.Name;
    console.log("Name is", Name)
    let Email=req.body.Email;
    console.log("Email is", Email)
    let mobileNo= req.body.mobileNo;
    console.log("mobileNo is",mobileNo)
    let message=req.body.message;
    console.log(" message is",message)
   if(Name && Email && mobileNo && message)
    { //res.status(200).send({status:'ok'})
      MongoClient.connect(url, { useUnifiedTopology: true }, async (err, client)=> {
        const db=client.db("restaurantApp")
        const collection =db.collection("contactusers")
        const doc={
          Name:Name,
          Email:Email,
          mobileNo:mobileNo,
          message:message
        };

        console.log("doc",doc)
        collection.insertOne(doc, (error,result) =>{
      if(!error){
        client.close();
        res.send (doc)

      }else{
        client.close();
        res.send("is an error")
      }
      
    });
  });
                
}else{
  return res.status(400).send("bad request");

}
}catch(ex){
return res.status(500).send("error");
}
}); 

app.listen(port, () => {
  console.log(`Server is running on port:${port} `);
});