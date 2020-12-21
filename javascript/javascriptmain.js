
var pwd,email,x,y,snd;

var end=0;

var pass_email;

var user_attempt=0;

var turn1,turn2,turn3,turn4;

var otpfinal,temp_mail="";



function otpgenerator(){
    turn1 = Math.random() * 10;
    turn1 = Math.floor(turn1);
    turn2 = Math.random() * 10;
    turn2 = Math.floor(turn2);
    turn3 = Math.random() * 10;
    turn3 = Math.floor(turn3);
    turn4 = Math.random() * 10;
    turn4 = Math.floor(turn4);
    if(turn1==0){
        turn1=1;
    }
    if(turn2==0){
        turn2=1;
    }
    if(turn3==0){
        turn3=1;
    }
    if(turn4==0){
        turn4=1;
    }
    otpfinal=(turn1*1000)+(turn2*100)+(turn3*10)+(turn4*1);
}



function sendotp(){

    snd=document.getElementById("aud");
    email=document.getElementById("email").value;


    x=/^([a-z A-Z 0-9 \.-]+)@([a-z A-Z 0-9 -]+)\.([a-z]{2,10})(.[a-z]{2,10})?$/;
    if(x.test(email)){
        if(email==temp_mail){
            snd.play();
            alert("OTP already sent to - "+email);
        }
        else{
        temp_mail=email;
        localStorage.setItem("email_id",email);

        otpgenerator();

        Email.send({
            Host : "smtp.gmail.com",
            Username : "quizziemania@gmail.com",
            Password : "samratsyedkpq842",
            To : email,
            From : "quizziemania@gmail.com",
            Subject : "QuizzieMania - One Time Password",
            Body : "Your OTP for taking up the Quiz in QuizzieMania is "+ otpfinal + ". Do not share your OTP with anyone.<br>Happy Quizzing - QuizzieMania"
        }).then(
          message => alert("OTP has been sent to your Email-ID")
        );
        
        localStorage.setItem("user_attempt",user_attempt);
        document.getElementById("email").style.border="solid 4px green";
        }
    }
    else{
        snd.play();
        alert("Enter a Valid E-mail");
        document.getElementById("email").style.border="solid 6px red";
    }
  }





function start_quiz(){
    snd=document.getElementById("aud");
    pwd=document.getElementById("password").value;
    if(pwd.trim()==""){
        snd.play();
        alert("Enter Your OTP");
        document.getElementById("password").style.border="solid 6px red";
    }
    else if(pwd.trim()==otpfinal){
        document.getElementById("password").style.border="solid 4px green";
        end=1;
        window.open("quiz-entry.html","_self");
    }
    else{
        snd.play();
        alert("Enter the correct OTP");
        document.getElementById("password").style.border="solid 6px red";
    }
}


window.onbeforeunload = function(e) {
    if(end==1){
      window.location.reload(false); 
    }
    else{
        return "Are you sure";
    }
};

