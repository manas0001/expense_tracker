async function login(e){
    e.preventDefault();
    
    const loginDetails = {
        email : e.target.email.value,
        password : e.target.password.value
    }

    await axios.post('http://localhost:3000/login', loginDetails)
    .then((response) => {
        if(response.status === 200){
            alert('Logged in Successfully');
            localStorage.setItem('token', response.data.token);
            console.log(response.data.token);
            window.location.href = ('../index.html')
        }
        else if (response.status === 404){
            alert('User not found')
            console.log("User not found");
        }
        else if (response.status === 401){
            alert('Incorrect password');
            console.log("Incorrect password");
        }
    }).catch((err) => {
        throw err;
    })
    .catch ((err) => {
        console.log(JSON.stringify(err));
        document.body.innerHTML += `<div style ='color:red';>${err.message}</div>`
    })
}