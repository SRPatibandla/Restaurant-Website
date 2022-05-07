window.onload = function async (req,res) {
let formRegister = document.getElementById("form");
    
  
formRegister.addEventListener("submit", async (e)=> {
      e.preventDefault();
   let   emailAddress=document.getElementById("emailAddress");
    let   password=document.getElementById("password");
    let errorMessage = document.getElementById("error")
    let successMessage = document.getElementById("success")
    
    if ( emailAddress.value == "" ||
    password.value == "" )
    {
      errorMessage.textContent="All fields are required";
      errorMessage.style.color="red";

  
    }  
    else{
     
    const  data = {
      emailAddress:emailAddress.value ,
      password:password.value,    
      
        };
      console.log("data",data);
      successMessage.textContent="Success";
      successMessage.style.color="green";
     
      
      
       let options={
         method:'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
         body:JSON.stringify(data)
     };
      
     const response = await fetch('/login', options);
       
      const id= await response.json();
      console.log(id);
      if(response.status==200){
       window.location.href="/menu"
      
      
      }else{
       errorMessage.innerHTML="invalid username/password."
       errorMessage.style.color="red";
      }
  //   .catch(error=>{
  //      window.alert(error);
  //      return;
  //   })

  // } 
      };
      
    });
    
    
    
   }