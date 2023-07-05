async function signup(e){
    e.preventDefault();
    console.log(e.target.email.value);
    
    const signupDetails = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.pwd.value
    }
    console.log(signupDetails);
    await axios.post('http://localhost:3000/signup', signupDetails)
    .then((response) => {
        if(response.status === 201){
            alert('Signed up Successfully');
            window.location.href = './login/login.html'
        }
    }).catch((err) => {
        alert('Something went wrong. Try again!!!');
        document.body.innerHTML += `<div style='color:red;'>${err}</div>`
    });

}