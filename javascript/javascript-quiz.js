var x,y,z;
var count=0,snd;

var end=0,tab=0,keypress=0;

var user,seconds=1200;

var acct=0;

var started;

document.addEventListener("DOMContentLoaded", function() {
var pass=localStorage.getItem("email_id");
user=localStorage.getItem("user_attempt");
if(user>=1){
    document.getElementById("btn-start").style.visibility="hidden";
    document.getElementById("ready").innerHTML="You have already taken the Quiz";
    alert("You have already attempted the Quiz");
    started=1;
    localStorage.setItem("started",started);
}
else{
    started=0;
    localStorage.setItem("started",started);
}
user++;
localStorage.setItem("user_attempt",user);
document.getElementById("h11").innerHTML=pass;
});


function accepted(){
    if(acct==0){
        document.getElementById("cheq").checked=true;
        acct=1;
    }
    else{
        document.getElementById("cheq").checked=false;
        acct=0;
    }
}

function start(){
    x=document.getElementById("studname").value;
    y=document.getElementById("clgname").value;
    z=document.getElementById("cheq").checked;
    snd=document.getElementById("aud");
    x=x.trim();
    y=y.trim();
    if(x==""){
        snd.play();
        alert("Enter your name");
        document.getElementById("studname").style.border="solid 4px red";
    }
    else if(x.length<5){
        snd.play();
        alert("Enter your full name");
        document.getElementById("studname").style.border="solid 4px red";
    }
    else{
        localStorage.setItem("student_name",x);
        localStorage.setItem("time_start",tab);
        localStorage.setItem("clock",seconds);
        localStorage.setItem("keypress",keypress);
        document.getElementById("studname").style.border="solid 3px green";
        count++;
    }
    if(y.trim()==""){
        snd.play();
        alert("Enter your Institution name");
        document.getElementById("clgname").style.border="solid 4px red";
    }
    else if(y.length<8){
        snd.play();
        alert("Enter your full Institution name");
        document.getElementById("clgname").style.border="solid 4px red";
    }
    else{
        document.getElementById("clgname").style.border="solid 3px green";
        count++;
    }
    if(z==true){
        document.getElementById("apt").style.color="green";
        count++;
    }
    else{
        snd.play();
        alert("Accept the terms and conditions");
        document.getElementById("apt").style.color="red";
    }
    if(count==3){
        end=1;
        document.getElementById("btn-start").style.visibility="hidden";
        window.open("quiz-start.html","newWin", "width="+screen.availWidth+",height="+screen.availHeight);
    }
    count=0;
}

window.onbeforeunload = function(e) {
    if(end==1){
      window.location.reload(false); 
    }
    else{
        return "Are you sure";
    }
};