var interval;
var j = 1;
var from = 1
var to = $(window).width();
var position;
var score=0;
var hampos;
var manpos;
var isMissed=false;
var isFullscreen=false;
var isMute=false;
var nesamani=document.getElementsByClassName("nesamaniJet")[0];
var isPaused=false;
var pausedDuration;
var powerupActivated=false;
var k=1;

window.onfocus = function (ev) {
  console.log("gained focus");
};

window.onblur = function (ev) {
  console.log("lost focus");
};

function putHammer() {
  if(!isPaused)
  {
    $('<div class="hammer" id="'+j+'">')
        .css({
            "left": Math.floor((Math.random() * (to)) + from) + 'px',
            "top": '0px'
        })
        .append($('<img src="images/hammer.png" alt="myimage" id="stone"/>'))
        .appendTo(document.body)
        .animate({ top: "100vh" },1500)
        .promise().done(function(){
            $(this).remove();
        })
    j++;
    isNesamaniHit();
  }
      
}

function putPower() {
  if(!isPaused)
  if(powerupActivated!=true)
  {
    $('<div class="powerups" id="pw'+k+'">')
        .css({
            "left": Math.floor((Math.random() * (to*5)) + from) + 'px',
            "top": '0px'
        })
        .append($('<img src="images/powerup.png" alt="myimage" id="powerbolt"/>'))
        .appendTo(document.body)
        .animate({ top: "100vh" },1500)
        .promise().done(function(){
            $(this).remove();
            setInterval("",20000);
        })
    k++;
    isPowerUpActivated();
  }
}

function ActivatePowerUp()
{
  powerupActivated=true;
  $(".nesamaniJet").attr("src","./images/nesamani_powerup.png");
  //$(".nesamaniJet").css("opacity","0.8");
  $("#time").css("background-color","lightgreen");
  setInterval(function(){powerupActivated=false;$(".nesamaniJet").attr("src","./images/nesamani.png");$(".nesamaniJet").css("opacity","1");$("#time").css("background-color","black");},5000);
  clearInterval();
}

function setBackground()
{
  let id = Math.floor((Math.random() * 6) + 1);
  $("#background-scene").attr("src","images/game-background_"+id+".png");
}
function moveNesamani(event){
  if(isPaused!=true)
    if(isMissed!=true)
    if(event.keyCode == 37 || event.keyCode == 39){
        event.preventDefault();
        position = $(".nesamaniJet").position()
        var currentLeft = position.left
        const key = event.key;
        switch (key) {
            case "ArrowLeft":
              if(currentLeft>-1100)
                $(".nesamaniJet").css('left', currentLeft-100);
                //alert(currentLeft);
                break;
            case "ArrowRight":
              if(currentLeft<1100)
                $(".nesamaniJet").css('left', currentLeft+100);
                //alert(currentLeft);
                break;
        }
    }
    isNesamaniHit();
    if(isMissed)
    {
      if(event.keyCode==13)
        window.location.reload();
    }
};
function playTime(min,sec,score){
  min=parseInt(1-min);
  sec=parseInt(60-sec);
  min=(sec<0)?0:min;
  sec=(sec<10)?("0" + sec):sec;
  $("#playtime").html("You have Played for " + min + ":" + sec + "</br>Score: " + score)
}
function goFullscreen(){
  if(!isFullscreen){
    isFullscreen=true;
    $("#fs").html("Exit Fullscreen")
    document.body.requestFullscreen();
  }
  else
    {
      isFullscreen=false;
      $("#fs").html("Fullscreen")
      document.exitFullscreen();
    }
}
function goMute(){
  var mutebtn=document.getElementById("mute");
  if(!isMute)
  {
    isMute=true;
    mutebtn.innerText="🔇Muted";
  }
  else
  {
    isMute=false;
    mutebtn.innerText="🔈Playing Sound"
  }
    
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var timeInterval = setInterval(function () {
      if((!isMissed))
      {
        
        if(!isPaused)
        {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          score+=10;
          playTime(minutes,seconds,score);
          display.textContent = minutes + ":" + seconds;
        }
        else
        {
          timer.pause();
        }
        if(score>=100)
        {
          $(".score").css("margin-left","0px");
        }
        else
        {
          $(".score").css("margin-left","10px");
        }
        $(".score").html("Score: " + score)
          isNesamaniHit();
          isPowerUpActivated();
        if (--timer < 0)
        {
            clearInterval(timeInterval)
            $('#myModal').modal('show');
            $(".nesamaniJet").hide();
        }
      }
    }, 1000);
}
function share()
{
  $("#shareModal").modal("show");
}
function closeShareModal()
{
  $('#shareModal').modal('hide');
}
function share_linkedin()
{
  window.open("https://www.linkedin.com/sharing/share-offsite/?url=deneshb.github.io");
}
function share_fb()
{
  window.open("https://www.facebook.com/sharer/sharer.php?u=deneshb.github.io");
}
function share_x()
{
  window.open("https://twitter.com/intent/tweet?text=deneshb.github.io");
}
function PauseGame()
{
  if(!isPaused)
  {
    $("#pause").text("⏵︎ Resume Game");
    $("#pausedModal").modal("show");
    isPaused=true;

  }
    
  else
  {
    $("#pause").text("⏸︎Pause Game");
    $("#pausedModal").modal("hide");
    isPaused=false;
  }
    
}

function isNesamaniHit(){
    // Your code goes here..
    // ---Tips---
    // Loop through all the on screen hammers.
    // Find if any of them is as close as to hit nesamani's hit.
    // The find function should be called recursively.
    var hammers=document.getElementsByClassName('hammer');
    var i;
    var isThumbsup=false;
    for(i=0;i<hammers.length;i++)
    {
        //alert(hammers[i].id);
        hampos=$("#" + hammers[i].id).offset();
        manpos=$(".nesamaniJet").offset();
        if(powerupActivated!=true)
        if((hampos.top>=190) && ((hampos.left-manpos.left)<60) && ((hampos.left-manpos.left)>0))
        {
          var audio=new Audio("images/hammer.wav");
          if(!isMissed)
            if(isMute!=true)
            {
              setInterval(audio.play(),1000);
            }
          $(".nesamaniJet").attr("src","images/nesamani_hit.png");
          setTimeout(function(){$('#missedModal').modal('show');},500);
          isMissed=true;
        }
        if(isMissed)
          {
            break;
          }
        if(powerupActivated!=true)
        if((hampos.top>=190) && (((hampos.left-manpos.left)>=-30)) && ((hampos.left-manpos.left)<=-5))
        {
        $(".nesamaniJet").attr("src","images/nesamani_thumbs_up.png");
        isThumbsup=true;
        setInterval(function(){if(!powerupActivated)if(isThumbsup){$(".nesamaniJet").attr("src","images/nesamani.png");isThumbsup=false;}},5000);
          //setInterval(function(){if(!isThumbsup){isThumbsup=true;}},10000);
          setInterval(function(){if(!powerupActivated)isThumbsup=true;},10000);
        }
     
    }
}

function isPowerUpActivated(){
  // Your code goes here..
  // ---Tips---
  // Loop through all the on screen hammers.
  // Find if any of them is as close as to hit nesamani's hit.
  // The find function should be called recursively.
  var powerups=document.getElementsByClassName('powerups');
  var i;
  //var isThumbsup=false;
  for(i=0;i<powerups.length;i++)
  {
      //alert(hammers[i].id);
      pupos=$("#" + powerups[i].id).offset();
      manpos=$(".nesamaniJet").offset();
      if(powerupActivated!=true)
      if((pupos.top>=200) && ((pupos.left-manpos.left)<60) && ((pupos.left-manpos.left)>-2))
      {
        ActivatePowerUp();
      }
     /* if(isMissed)
        {
          break;
        }*/
   
  }
} 

document.oncontextmenu=()=>{return false;};
window.onload = function () {
    setBackground();
    var duration = 119,
    display = document.querySelector('#time');
    startTimer(duration, display);
    isNesamaniHit();
};
$(window).blur(function(){
  if(!isPaused)
    PauseGame();
});
$(document).ready(function(){
    var i = 1;
    (function myLoop (i) {
        setTimeout(function () {
          if(!isMissed)
          {
             putHammer();
             putPower();
            if (i <= 20) myLoop(i);
          }
        }, 300)
        })(10);
})
