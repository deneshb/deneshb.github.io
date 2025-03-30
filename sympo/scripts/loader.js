window.onload=function(){
    this.load();
}
function load()
{
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.getElementsByClassName('option')[0].addEventListener("click",ontechnical);
    document.getElementsByClassName('option')[1].addEventListener("click",onnontechnical);
    document.getElementsByClassName('option')[2].addEventListener("click",onpaper);
    document.getElementsByClassName('option')[3].addEventListener("click",register);
    document.getElementsByClassName('option')[4].addEventListener("click",mail);
    document.getElementsByClassName('option')[4].style.setProperty('cursor','pointer');
    document.getElementsByClassName('goback')[0].addEventListener("click",ontechnical);
    document.getElementsByClassName('goback')[1].addEventListener("click",onnontechnical);
    document.getElementsByClassName('goback')[2].addEventListener("click",onpaper);
}
function ontechnical()
{
    var maindiv = document.getElementById("maindiv");  
    var div = document.getElementById("technical");
    if (event.button == 0)  
         if (div.style.display !== "none") 
         {  
             div.style.display = "none";
             maindiv.style.display="block";  
         }  
         else
         {  
             div.style.display = "block";
             maindiv.style.display="none";    
         }  
}
function onnontechnical()
{
    var maindiv = document.getElementById("maindiv");  
    var div = document.getElementById("nontechnical");
    if (event.button == 0)  
         if (div.style.display !== "none") 
         {  
             div.style.display = "none";
             maindiv.style.display="block";  
         }  
         else
         {  
             div.style.display = "block";
             maindiv.style.display="none";    
         }  
}
function onpaper()
{
    var maindiv = document.getElementById("maindiv");  
    var div = document.getElementById("paper");
    if (event.button == 0)  
         if (div.style.display !== "none") 
         {  
             div.style.display = "none";
             maindiv.style.display="block";  
         }  
         else
         {  
             div.style.display = "block";
             maindiv.style.display="none";    
         }  
}
function register()
{
    if (event.button == 0)
    window.open("https://forms.gle/mXTwJPP98Bq6tPMG6","_blank");
}
function mail()
{
    if (event.button == 0)
        window.open("mailto:quantanovus2020@psvpec.in","_blank");
}