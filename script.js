var displaySec = document.querySelector('#displaySec')
var wordinput = document.querySelector('#wordinput');
var searchBtn = document.querySelector('#searchBtn');
var wordDis = document.querySelector('#wordDis');
var source = document.querySelector('#audioSource')
var myaudio = document.querySelector('#myAudio')
var Wrdefination1 = document.querySelector('#Wrdefination1');
var Wrdefination2 = document.querySelector('#Wrdefination2');
var phoneticwrd = document.querySelector('#phoneticwrd');
var example1 = document.querySelector('#example1');
var example2 = document.querySelector('#example2');
var state = displaySec.getAttribute('data-state');
console.log(state);
function checkState(){
    if(state == "hidden"){
       state == "show"
       displaySec.setAttribute("style","display:block;");
       getWord();
    }
}
function getWord(){
var inputword = wordinput.value

fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+inputword, )
.then(function(response){
    return response.json();
}).then(function(data){
var word = data[0].word;
var data = data[0];
const url = `https://api.dictionaryapi.dev/media/pronunciations/en/${inputword}-uk.mp3`;
   
   source.src = url;
   myaudio.load();  // important!
//   myaudio.play(); if needed to be played on load
   wordDis.textContent ="the word you are searching is:" +word;
   //phoneticwrd.textContent = "The phonetics of the word is:" +data.phonetics[0].text;
   Wrdefination1.textContent = "defination1 is:" + data.meanings[0].definitions[0].definition;
   Wrdefination2.textContent = "defination2 is:" + data.meanings[1].definitions[0].definition;
//    for(i=0;i<data.length;i++){
//    example1.textContent = "example is:" + data[0].meanings[1].definitions[2].example;
//    example2.textContent = "example is:" + data[0].meanings[1].definitions[1].example;

//    }
 data.phonetics.forEach((phonetics) => { phoneticwrd.textContent = phonetics.text}); // loop through the objects inside an array
 data.meanings.forEach((meanings)=> {
    let p = document.createElement('p')
    
    p.textContent= meanings.definitions[0].defination;}

) 
})

}


searchBtn.addEventListener("click",checkState);