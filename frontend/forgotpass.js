async function forgot_pass(e){
    e.preventDefault();

    const email = e.target.email.value;
    console.log(email);
    axios.post('http://localhost:3000/userforgotpassword', {email}).then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
    }).catch((err) => {
        console.log(err)
        alert(err.response.data.message);
    });
}