const btn = document.getElementById('submitContact');
const name = document.querySelector('input[name="name"]');
const phone = document.querySelector('input[name="phone"]');
const email = document.querySelector('input[name="email"]');
const address = document.querySelector('input[name="address"]');
const concern = document.querySelector('input[name="desc"]');                  

name.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        phone.focus();
    }
})
phone.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        email.focus();
    }
})
email.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        address.focus();
    }
})
address.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        concern.focus();
    }
})
btn.addEventListener('click',function(event){
    const data = JSON.stringify({
        name: name.value,
        phone:phone.value,
        email:email.value,
        address:address.value,
        concern: concern.value
    });
    // console.log('click: ',data);
    event.preventDefault();
    fetch('http://127.0.0.1/contact',{
        method:'POST',
        headers: {'Content-type':'application/json'},
        body: data
    })
    .then(res => res.json())
    .then(data=>{
        if(data.data.success){
            location.reload();
        }

    })
    .catch(err=>{
        console.log('Error in submitting');
        // console.log(err);
    })
})