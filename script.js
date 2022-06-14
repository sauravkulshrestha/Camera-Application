let video = document.querySelector("video");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");
let transparentColor = "transparent";
let recorder ;
let shouldRecord = false;
let chunks = [];
let constraints = {
    video : true,
    audio : false
}
   navigator.mediaDevices.getUserMedia(constraints)    
    .then((stream) => {
        video.srcObject =  stream;
         recorder = new MediaRecorder(stream);

         recorder.addEventListener("start" , ()=>{
             chunks = [];
             console.log('rec started');
         });
            

         recorder.addEventListener("dataavaliable" ,(e)=>{
             chunks.push(e.data);
             console.log('recording stored in chunks');
         });

         recorder.addEventListener("stop" , ()=>{
            //  conver video 
            console.log('recording stoped');
             let blob = new Blob(chunks , {type : 'video/mp4'});

            // download video on desktop

            let videoURL = URL.createObjectURL(blob);
            console.log(videoURL);

            let a = document.createElement('a');
            a.href = videoURL;
            a.download = 'myVideo.mp4';
            a.click();

            // store in data base;

         })

    });

       
    captureBtnCont.addEventListener("click", () => {
        console.log("camera icon clicked");
        captureBtn.classList.add("scale-capture");
        let canvas = document.createElement("canvas");
        let tool = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        tool.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        //applying filters on photo
        tool.fillStyle = transparentColor;
        tool.fillRect(0, 0, canvas.width, canvas.height);
        
        let imageURL = canvas.toDataURL();
        // let img = document.createElement("img");
        // img.src = imageURL; 
        // document.body.append(img);
        


        setTimeout(()=>{
            captureBtn.classList.remove("scale-capture");
        }, 510);

    });

    recordBtnCont.addEventListener("click" , ()=>{
        shouldRecord = !shouldRecord;
        if(shouldRecord){
            // start recording
            recorder.start();
            // start timer


            startTimer();   
        }else{
            // stop recording
            recorder.stop();
            
            // stop timer
            stopTimer();   

        }
    });

    // timer start n stop

    let timer = document.querySelector(".timer");
    let counter = 0;
    let timerID;
    function startTimer() {
        timer.style.display = 'block';
        function displayTimer(){
            let totalSeconds = counter;

            let hours = Number.parseInt(totalSeconds/3600);
            totalSeconds =   totalSeconds % 3600;

            let minute = Number.parseInt(totalSeconds/3600);
            totalSeconds =   totalSeconds % 60;
             
            let seconds = totalSeconds;

            hours = (hours < 10) ? `0 ${hours}`:hours;
            minute = (minute < 10) ? `0 ${minute}`:minute;
            seconds = (seconds < 10) ? `0 ${seconds}`:seconds;
            timer.innerText = `${hours}:${minute}:${seconds}`;
            counter++;
        }

        timerID = setInterval(displayTimer , 1000);
        counter = 0;


    }
         function stopTimer() {
             clearInterval(timerID);
             timer.innerText = "00:00:00";
              timer.style.display = 'none';
         }

let filterLayer = document.querySelector('.filter-layer');
let allFilters = document.querySelector('.filter');



allFilters.forEach((filterElem) => {
    filterElem.addEventListener('click', () => {
        transparentColor = getComputedStyle(filterElem).getPropertyValue('background-color');
        filterLayer.style.backgroundColor = transparentColor;
    })
})

