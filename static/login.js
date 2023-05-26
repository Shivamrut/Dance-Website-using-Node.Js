const btn = document.getElementById('loginBtn');
const name = document.getElementById('name');
const form = document.getElementById('loginContainer');
const key = document.getElementById('key');
form.addEventListener('submit', function(event){
    
    event.preventDefault();
    console.log('clicked');
    const loginInfo = {
        username: name.value,
        password: key.value
    }
    console.log(loginInfo);
    fetch('http://127.0.0.1/login',{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body: JSON.stringify( loginInfo)
    })
    .then(res=>{
        
        window.location=res.url;
    })
    
})
