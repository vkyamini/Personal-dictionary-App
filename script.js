var wordinput = document.querySelector('#wordinput');
var phonetics = document.querySelector('#phonetics');
var source = document.querySelector('#audioSource');
var myaudio = document.querySelector('#myAudio');
searchBtn = document.querySelector('#searchBtn');
displaySec = document.querySelector('#displaySec');
wordDis = document.querySelector("#wordDis");
defdis = document.querySelector('#defdis');
let headingsyn = document.querySelector('#headingsyn');
var headinganto =  document.querySelector('#headinganto');
var playAudioBtn = document.querySelector('#playAudioBtn')

// clears HTML for each new render.
function reset() {
   defdis.innerHTML = "";
   exampledis.innerHTML = "";
   headinganto.innerHTML ="";
   headingsyn.innerHTML = "";
};

function checkState(){
   reset();
   getWord();
}

// fetch word data and display to the user.
function getWord(){
   var input = wordinput.value
   var API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+input ;
   
   fetch(API)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("this is data",data)
      var data = data[0]; // initial declaration of the data
      var divAudioBtn = document.getElementById("audio-btn");
      divAudioBtn.innerHTML = "<button id='playAudioBtn' class='speaker-icon'> <i class='fas fa-volume-up'></i> </button>";
      var playAudioBtn = document.getElementById("playAudioBtn");
      // audio related code started here ------------------------------>
      playAudioBtn.addEventListener("click",function(){
         const url = `https://api.dictionaryapi.dev/media/pronunciations/en/${input}-uk.mp3`;
         source.src = url;
         myaudio.load();
         myaudio.play();  // important!
      })
      
       // audio related code ends here  ------------------------------>
     if(data.word && data.word.length>0){
      console.log(data.word,data.word.length)
      var uppercase = data.word.toUpperCase();
      wordDis.textContent =" The word: " +uppercase;
      wordDis.setAttribute("style", "font-family: 'Quicksand', sans-serif; font-size: 15px;font-weight: bold;");
      displaySec.setAttribute("style","display:block;");
     }
     if(data.phonetic && data.phonetics.length>0){
      console.log(data.phonetic,data.phonetics.length)
      phonetics.textContent ="phonetics: " +data.phonetic;
      phonetics.setAttribute("style", "font-family: 'Quicksand', sans-serif; font-size: 15px;font-weight: bold;")
     }else{
      phonetics.innerHTML = "";

     }
    // printing definations ---------------------------->
     data.meanings.forEach((meanings)=> {
     let p = document.createElement('p')
     defdis.append(p);
     p.textContent = " "+meanings.partOfSpeech + " = "+ meanings.definitions[0].definition;

  
   });
   // printing synonyms if it exsists ---------------------------->
   data.meanings.forEach((meanings)=>{
      
      if(meanings.synonyms && meanings.synonyms.length>0){
         headingsyn.setAttribute("style","display:block;");
         let psyn = document.createElement('p')
         headingsyn.append(psyn);
         psyn.textContent ="synonyms: " +meanings.synonyms
      }
     })
   data.meanings.forEach((meanings)=>{
      if(meanings.antonyms && meanings.antonyms.length > 0){
         headinganto.setAttribute("style","display:block;");
         let panto = document.createElement('p')
         headinganto.append(panto);
         panto.textContent ="Antonyms: " + meanings.antonyms;
      }
   })
        
   data.meanings[0].definitions.forEach((definitions)=> {
      if(definitions.example && definitions.example.length>0){
         exampledis.setAttribute("style","display:block;");
         let pexm = document.createElement('p')
         exampledis.append(pexm);
         pexm.textContent ="ex:  " + definitions.example;
      }
   });
   })
  
   
}


searchBtn.addEventListener("click",checkState);