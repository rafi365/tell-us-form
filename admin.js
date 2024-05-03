let issending = false;
async function submitform(event){
    event.preventDefault()
    if(issending){
        return
    }
    issending = true;
    
    const input_password = document.getElementById("password").value;
    const formdata = new FormData();
    formdata.append("password", input_password);
    const res = await sendform(formdata);
    console.log(res);
    if(res == 'Wrong password' || res == 'error'){
        issending = false;
        alert(res);
        return
    }
    let temprender = "";
    for (let index = 0; index < res.length; index++) {
        const element = res[index];
        temprender += `<tr>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>${element.message}</td>
        <td>${element.created_at}</td>
        </tr>
        `
    }
    document.getElementById("tablebody").innerHTML = temprender;
    if(!temprender){
        document.getElementById("table").innerHTML = `<h1>NO DATA</h1>`;
    }else{
        new DataTable('#table', {
            // options
            layout: {
                topStart: {
                    buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
                }
            }
        });
    }
}

async function sendform(formdata){
    const myHeaders = new Headers();
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    try {
        const response = await fetch("http://localhost:3000/api/getdata", requestOptions);
        if(response.status == 200){
            return response.json();
        }
        return 'Wrong password';
    } catch (error) {
        alert(error);
        console.error(error);
        return 'error :' + error.message
    };
}