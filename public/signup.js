window.onload = function () {
    let formRegister = document.getElementById("form");
    
  
    formRegister.addEventListener("submit", async (e)=> {
      e.preventDefault();
    let emailAddress = document.getElementById("email address");
    let FullName = document.getElementById("FullName");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("password");
    let errorMessage=document.getElementById("error")
    
    if ( emailAddress.value === "" ||
    firstName.value === "" ||
    lastName.value === "" ||
    password.value === "" ||
    confirmPassword.value === "" ||
    mobileNumber.value==="")
    {
      errorMessage.textContent="All fields are required";
      errorMessage.style.color="red";
      //window.alert("All fields are required");
    } else if (password.value!==confirmPassword.value){
      errorMessage.textContent="Password does not match. Please check";
      errorMessage.style.color="red";
      //window.alert("Password does not match. Please check")

    }else if(FullName.value.length>30){
      errorMessage.textContent="Please check the length of the full name characters";
      errorMessage.style.color="red";
      //window.alert("Please check the length of the first name characters ")
  
  
    }else if(password.value.length>30){
      errorMessage.textContent="Please check the length of the password";
      errorMessage.style.color="red";
      //window.alert("Please check the length of the password ")
  
    }  
    else{
     
      const data={
      emailAddress:emailAddress.value ,
      FullName:FullName.value ,
      password:password.value,
      confirmPassword:confirmPassword.value ,
      
      };
      
      let options={
        method:'POST',
       headers: { "Content-type": "application/json; charset=UTF-8"  },
        body:JSON.stringify(data)
      };
      const response = await fetch('/SignUp', options);
     const id= await response.json();
     console.log(id);
     if(response.status==200){
      window.location.href="/Login"
      
     }else{
      errorMessage.innerHTML="User already Exists. Please check."
      errorMessage.style.color="red";
     }
  
      };
      
    });
    
    
    
  }