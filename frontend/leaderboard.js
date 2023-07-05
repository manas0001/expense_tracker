document.addEventListener('DOMContentLoaded', async ()=>{
    const token = localStorage.getItem('token');
    if(!token){
        window.location.replace('./login/login.html');
    }
    // const userLeaderBoardArray = 
    await axios.get('http://localhost:3000/leaderboard', {
        headers: {'Authorization': token}
    }).then((resp)=>{
        console.log(resp);
        let users = resp.data;
        users.sort((a,b)=>{
            return b.amount - a.amount;
        })
        // var leaderBoardElem = document.getElementById('leaderboard');
        // users.forEach(userDetail => {
        //     leaderBoardElem.innerHTML += `<li>Name - ${userDetail.name} Total Expense - ${userDetail.amount}</li>`
        // });
        var leaderBoardElem = document.getElementById('use_cont');
        let a = 1;
        users.forEach(userDetail => {
            leaderBoardElem.innerHTML += `<div class="users" id="users">
            <p>${a}</p>
            <p>${userDetail.name}</p>
            <p>${userDetail.amount}</p>
        </div>`
        a++;
        });
    })
})

