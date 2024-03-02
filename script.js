let issending = false;

function addClass() {
    document.body.classList.add("sent");
    document.getElementById('submit_button').innerHTML = "Loading...."
    document.getElementById('submit_button').disabled = true
}

function sendingUI() {
    document.getElementById('submit_button').innerHTML = "Loading...."
    document.getElementById('submit_button').disabled = true
}
function removesendingUI() {
    document.getElementById('submit_button').innerHTML = "Send"
    document.getElementById('submit_button').disabled = true
}

function removeClass() {
    document.getElementById("myForm").reset();
    document.body.classList.remove("sent");
}

async function submitform(event){
    event.preventDefault()
    if(issending){
        return
    }
    issending = true;
    sendingUI();
    
    const input_msg = document.getElementById("msg").value;
    const input_name = document.getElementById("name").value;
    const input_email = document.getElementById("email").value;
    console.log(input_msg)
    console.log(input_name)
    console.log(input_email)
    const formdata = new FormData();
    formdata.append("input_msg", input_msg);
    formdata.append("input_name", input_name);
    formdata.append("input_email", input_email);
    await sendform(formdata);
    addClass();
    issending = false;
    removesendingUI();
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
        const response = await fetch("http://localhost:3000/api/submitform", requestOptions);
        const result = await response.text();
        console.log(result)
    } catch (error) {
        alert(error);
        console.error(error);
    };
}

