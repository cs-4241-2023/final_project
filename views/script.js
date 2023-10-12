// FRONT-END (CLIENT) JAVASCRIPT HERE

function LoadFromServer(data){
    console.log("Load from server")
    console.log(data[0])
    const score=document.createElement("Score");
    score.innerText= "Score: "+data[0].score+"\n";
    const rate=document.createElement("Rate");
    rate.innerText= "Rate: "+data[0].rate;

    let info=document.getElementById("UserInfo");
    info.replaceChildren();
    info.append(score);
    info.append(rate);
}

window.onload = async function() {
    const response = await fetch( '/loadUserInfo', {
        method:'GET'
    })
    const data = await response.json();
    console.log("On Load: "+data.toString())
    LoadFromServer(data);
}