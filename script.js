let video = document.querySelector("video");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let transparentColor = "transparent";
// let recorder ;
let constraints = {
    video : true,
    audio : false 
}
   navigator.mediaDevices.getUserMedia(constraints)    
    .then((stream) => {
        video.srcObject =  stream;
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
        img.src = imageURL;
        document.body.append(img);
        
    });
    
    // captureBtnCont   .addEventListener("click" , ()=>{
    //     let canvas = document.createElement("canvas");
    //     let tool = canvas.getContext("2d");
    //     canvas.width = video.videoWidth;
    //     canvas.Height = video.videoHeight;

    //     tool.drawImage(video , 0 , 0 , videoWidth , videoHeight);
    //     tool.fillRect(0 , 0 , videoWidth , videoHeight);

    //    let imageURL = canvas.toDataURL();
    //    let img = document.createElement("img/jpg");
    //    img.src = imageURL;
    //    document.body.append(img);

    // });