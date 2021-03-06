var q1,q2,mark=0;
var cheq,snd;
var arr=new Array;

var end=0;

var pass_2,tab,keypress;

var id=0,ms=0,went=0;

var real_sec;

var time_switch_before,time_switch_back,total_time;

var acct=0;

var started;    

var resizing;

var h,w;


// Local Storage Configuration
document.addEventListener("DOMContentLoaded", function() {
    started=localStorage.getItem("started");
    if(started!=0){
        end=1;
        //window.open("quiz-entry.html","_self");
    }
    else{
        started=1;
        localStorage.setItem("started",started);
    }
    pass_2=localStorage.getItem("student_name");
    tab=localStorage.getItem("time_start");
    resizing=tab;
    real_sec=localStorage.getItem("clock");
    keypress=localStorage.getItem("keypress");
    document.getElementById("general").innerHTML=" General Quiz - "+pass_2;
});



// KeyBoard Configurations
window.addEventListener('keydown', (event) => {
    if(event.key){
        keypress++;
        if(keypress==3){
            end=1;
            keypress=0;
            localStorage.setItem("keypress",keypress);
            window.open("quiz-reattend.html","_self","toolbar=no");
        }
        localStorage.setItem("keypress",keypress);
        document.getElementsByTagName("BODY")[0].style.display = "none";
        setTimeout(function(){
            alert("Don't use Keyboard");
            document.getElementsByTagName("BODY")[0].style.display = "block";
        }, 100);
    }
});

// Right Click Configuration
document.addEventListener('contextmenu',function(e) {
    e.preventDefault();
});


// Cut and Copy Configuration
document.addEventListener('copy',function(e) {
    e.preventDefault();
});
document.addEventListener('cut',function(e) {
    e.preventDefault();
});


// Tab switching Configuration
document.addEventListener("visibilitychange",function (){
    if(!document.hidden){
        document.getElementsByTagName("BODY")[0].style.display = "none";
        setTimeout(function(){
            alert("Don't switch to other window or tab");
            document.getElementsByTagName("BODY")[0].style.display = "block";
        }, 100);
        if((time_switch_before-real_sec)>=10){
            end=1;
            tab=0;
            localStorage.setItem("time_start",tab);
            window.open("quiz-reattend.html","_self","toolbar=no");
        }
        tab++;
        localStorage.setItem("time_start",tab);
        if(tab==3){
            end=1;
            tab=0;
            localStorage.setItem("time_start",tab);
            window.open("quiz-reattend.html","_self","toolbar=no");
        }
    }
    else{
        time_switch_before=real_sec;
    }
    
});


// Window Resized
h=screen.availHeight;
w=screen.availWidth;
function resized(){
    document.getElementsByTagName("BODY")[0].style.display = "none";
    setTimeout(function(){
        alert("Don't resize the window");
        document.getElementsByTagName("BODY")[0].style.display = "block";
    }, 100);
    resizing++;
    if(resizing==200){
            end=1;
            resizing=0;
            localStorage.setItem("resizing",resizing);
            window.open("quiz-reattend.html","_self","toolbar=no");
    }
    localStorage.setItem("resizing",resizing);
}

window.onresize = resized;


//Timer Settings Configuration
var min,sec;
function rendertime(){
   real_sec--; 

   //Evaluate After Time Out
   if(real_sec==0){
    for(var i=0;i<20;i++){
        arr[i]=document.getElementById("q"+i);
        if(arr[i].checked==true){
            mark++;
        }
    }

    if(mark>=15){
        end=1;
        window.open("quiz-congrats.html","_self","toolbar=no");
    }
    else{
        end=1;
        window.open("quiz-reattend.html","_self","toolbar=no");
    }

   }


   min=Math.floor(real_sec/60),sec=real_sec%60;
   if(min<10){
       min="0"+min;
   }
   if(sec<10){
       sec="0"+sec;
   }
   if(min<=19){
       localStorage.setItem("clock",real_sec);
   }
   if(min<=1){
       document.getElementById("timings").style.color="red";
       document.getElementById("timings").innerHTML="Time Left - "+min+" "+sec;
   }
   else{
       document.getElementById("timings").innerHTML="Time Left - "+min+" "+sec;
   }
   setTimeout("rendertime()",1000);
}
rendertime();



//Results Evaluating Configuration
function func(){
    for(var i=0;i<20;i++){
        arr[i]=document.getElementById("q"+i);
        if(arr[i].checked==true){
            mark++;
        }
    }
    cheq=document.getElementById("cheq").checked;
    snd=document.getElementById("aud");
    if(cheq==true){
        document.getElementById("apt").style.color="green";
        if(mark>=15){
            end=1;
            window.open("quiz-congrats.html","_self");
        }
        else{
            end=1;
            window.open("quiz-reattend.html","_self","toolbar=no");
        }
    }
    else{
        snd.play();
        document.getElementById("apt").style.color="red";
        alert("Accept the above Condition");
    }
    mark=0;
}

// Terms and conditions Checked state
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

// Page Reload Configuration
window.onbeforeunload = function(e) {
    if(end==1){
      window.location.reload(false); 
    }
    else{
        return "Are you sure";
    }
};