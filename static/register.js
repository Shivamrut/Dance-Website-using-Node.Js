const btn = document.getElementById('registerBtn');
const form = document.getElementById('loginContainer');
const name = document.getElementById('name');
const password = document.getElementById('password');
const username = document.getElementById('username');
const email = document.getElementById('email');

form.addEventListener('submit', function(event){

    event.preventDefault();
    console.log('clicked');
    const registerInfo = {
        name: name.value,
        email: email.value,
        username: username.value,
        password: password.value
    }
    console.log(registerInfo);
    fetch('http://127.0.0.1/register',{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body: JSON.stringify( registerInfo)
    })
    .then(res=> res.json())
    .then(data=>{
        console.log(data);
        location.reload();
    })
    .catch(err=>{
        console.log('Error in register submit');
    })
})
