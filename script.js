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
         });
            

         recorder.addEventListener("dataavaliable" ,(e)=>{
             chunks.push(e.data);
         });

         recorder.addEventListener("stop" , ()=>{
            //  conver video 
            //  let blob = new Blob(chunks , {type : 'video/mp4'});

            // download video on desktop
            // store in data base;

         })

    });

    
    captureBtnCont.addEventListener("click", () => {
        console.log("camera icon clicked");
        let canvas = document.createElement("canvas");
        let tool = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        tool.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        //applying filters on photo
        tool.fillStyle = transparentColor;
        tool.fillRect(0, 0, canvas.width, canvas.height);
        
        let imageURL = canvas.toDataURL();
        let img = document.createElement("img");
        img.src = imageURL; //
        document.body.append(img);
        
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
    })
           