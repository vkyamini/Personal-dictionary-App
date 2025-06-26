// need an app that can show the meaning of the word and i can save it for future rerferences
// need phonetics - done
//need definations available - done
//need an audio output - done
//image would be great too(future project)
//need Examples - done
// need synonyms - done
// need annonyms - done
// a button to save my search 
// a page to see my saved words.

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
var state = displaySec.getAttribute('display');
function checkState(){
       if(state == "none"){
          displaySec.setAttribute("style","display:block;");
          getWord();
       }
   }

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

     }
     if(data.phonetic && data.phonetics.length>0){
      console.log(data.phonetic,data.phonetics.length)
      phonetics.textContent ="phonetics: " +data.phonetic;
      phonetics.setAttribute("style", "font-family: 'Quicksand', sans-serif; font-size: 15px;font-weight: bold;")
     }
    // printing definations
     data.meanings.forEach((meanings)=> {
     let p = document.createElement('p')
     defdis.append(p);
     p.textContent = " "+meanings.partOfSpeech + " = "+ meanings.definitions[0].definition;
  
   });
   // printing synonyms if it exsists----------------------------
   data.meanings.forEach((meanings)=>{
      if(meanings.synonyms && meanings.synonyms.length>0){
         headingsyn.setAttribute("style","display:block;");
         let psyn = document.createElement('p')
      headingsyn.append(psyn);
      psyn.textContent = meanings.synonyms
      }
     })
   data.meanings.forEach((meanings)=>{
      if(meanings.antonyms && meanings.antonyms.length > 0){
         headinganto.setAttribute("style","display:block;");
         let panto = document.createElement('p')
         headinganto.append(panto);
         panto.textContent = meanings.antonyms;
      }
   })
   data.meanings[0].definitions.forEach((definitions)=> {
      if(definitions.example&&definitions.example.length>0){
         let pexm = document.createElement('p')
         defdis.append(pexm);
         pexm.textContent ="example: " +definitions.example;
      }
     
      
    });
     
     })
}


searchBtn.addEventListener("click",checkState);