function showleaderboard(){
    const inputElement = document.createElement('input');
    inputElement.type= 'button';
    inputElement.value = 'Show Leaderboard';
    document.getElementById('message').appendChild(inputElement);
    inputElement.onclick = function(){
        window.location.replace('./leaderboard.html')
    }  
}

document.addEventListener('DOMContentLoaded', async ()=>{
    const token = localStorage.getItem('token');
    if(!token){
        window.location.replace('./login/login.html');
    }
    await axios.get('http://localhost:3000/getLatestPaymentStatus', {headers:{'Authorization':token}})
    .then((premiumdata)=>{
        if(premiumdata.data){
            console.log(premiumdata.data.status);
            console.log('Premium member');
            if(premiumdata.data.status === 'Successful'){
                console.log("a premium user");
                document.getElementById('premium_btn').style.visibility='hidden';
                document.getElementById('message').innerHTML = "Premium member";
                showleaderboard();
            }
            else{
                console.log("not a premium member");
            }
        }
        else{
            console.log("not a premium member>>>>>");
        }
    })
})

async function addNewExpense(e){

    e.preventDefault();
    const expenseDetail = {
        amount : e.target.expenseAmount.value,
        description: e.target.description.value,
        category: e.target.category.value
    }

    console.log(expenseDetail);
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/addexpense', expenseDetail, { headers:{'Authorization': token}})
    .then((response)=>{
        console.log(response.data.expense);
        addNewExpensetoUI(response.data.expense);
    })
    .catch((err)=>{
        document.body.innerHTML += `<div style='color:red;'>${err}</div>`
    });
}

function removeExpenseFromUI(id){
    const expenseid = JSON.stringify(id);
    const expenseElmId = `expense-${expenseid}`;
    console.log(expenseElmId);
    document.getElementById(expenseElmId).remove();
    
}

function deleteExpense(e, expenseid){
    axios.delete(`http://localhost:3000/deleteexpense/${expenseid}`).then(() => {
        removeExpenseFromUI(expenseid);
    }).catch((err) => {
        throw err;
    });
}

function addNewExpensetoUI(expense){
    const expenseid = JSON.stringify(expense._id);
    const parentElement = document.getElementById('expense_item_cont');
    const expenseElementId = `expense-${expenseid}`;
    parentElement.innerHTML +=` <div class="expense_item">
    <p>${expense.amount}</p>
    <p>${expense.description}</p>
    <p>${expense.category}</p>
    <p><button onclick='deleteExpense(event, ${expenseid})'>
        Delete Expense
    </button></p>

</div>`

}

window.addEventListener('DOMContentLoaded', async ()=>{
    const token = localStorage.getItem('token');
    await axios.get('http://localhost:3000/getAllExpense',{ headers:{'Authorization': token}}).then((response)=>{
        console.log(response.data.user.expense)
        response.data.user.expense.forEach(expense => {
            addNewExpensetoUI(expense);
        });
        
    })
})

function buypremium(){
    const premiumbtn = document.getElementById('premium_btn');
    premiumbtn.addEventListener('click', async (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/premiummembership', {headers:{'Authorization': token}})
        .then((response)=>{
            console.log("Response.data.key_id", response.data.key_id);
            var options = {
                'key' : response.data.key_id,
                'name' : 'Test Company',
                'order_id' : response.data.order.id,
                "prefill": {
                    "name": "Test User",
                    "email": "test.user@example.com",
                    "contact": "7003442036"
                },
                "handler": async function (response){
                    console.log(response);
                    await axios.post('http://localhost:3000/updatetransactionstatus', {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id
                    },{headers: {'Authorization': token}}).then(()=>{
                        alert('You are a premium member now');
                        window.location.reload();
                    }).catch(()=>{
                        alert('Something went wrong. Try Again!!')
                    })
                }
            }
    
            const rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();
            rzp1.on('payment.failed', function(response){
                alert("payment failed");
            })
        })
    })
}


buypremium();

function logout(){
    document.getElementById('logout_button').addEventListener('click',()=>{
        console.log('fsf')
        localStorage.clear();
        window.location.replace('./login/login.html');
    
    })
   
}
logout()