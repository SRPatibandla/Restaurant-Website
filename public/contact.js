window.onload=function(){
    let formContact=document.getElementById("form");
    let Name=document.getElementById("name");
    let Email=document.getElementById("emailAddress");
    let mobileNo=document.getElementById("mobileNumber");
    let message=document.getElementById("textarea");
    let errorMessage=document.getElementById("error")
    let successMessage=document.getElementById("success")
    
    formContact.addEventListener("submit", async (event)=>{
        event.preventDefault();
      
    if(Name.value=== "" || Email.value=== "" || message.value=== ""){
    errorMessage.textContent="Please fill all the fields";
    errorMessage.style.color="red";       
        }else if(Name.value.length>30) {
            errorMessage.textContent="Please check the length of the characters";
    errorMessage.style.color="red";
    
          }else if(mobileNo.value.length!==10){
    errorMessage.textContent="Please check the length of the mobile number";
    errorMessage.style.color="red";
        }else if(isNaN(mobileNo.value) ){
           errorMessage.textContent="Please check the number. It should be only number";
    errorMessage.style.color="red";
          }else if(message.value.length>200){
    errorMessage.textContent="Please check the maximum length of characters";
    errorMessage.style.color="red";
          }
        else{ 
           const data2={
            Name:Name.value,
            Email:Email.value,
            mobileNo:mobileNo.value,
            message:message.value    
           };
           console.log(data2)
           successMessage.textContent="Success";
           successMessage.style.color="green";
          
           let options={
            method:'POST',
           headers: { "Content-type": "application/json; charset=UTF-8" },
           body:JSON.stringify(data2)
            // body:JSON.parse(JSON.stringify(data2))
          
        };
        const response = await fetch('/contact', options);
       
      const id= await response.json();
      console.log(id);
      if(response.status==200){
        window.alert("thank you for your feedback")
        window.location.href="/"
      }else{
        console.log("error message",error)
        errorMessage.style.color="red";
       }


        }  
    });

    };

   

    