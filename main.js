status=""
objects=""

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);

}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
    document.getElementById("status").innerHTML="Status = Detecting Object";
}
function gotPoses(error,results){
    if(error){
        console.error(error);
    }
    if(results){
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        objectDetector.detect(video, gotPoses);
        r= random(255);
        g= random(255);
        b= random(255);

        for(counter=0; counter<objects.length;counter++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("presence_of_baby").innerHTML="Baby Found"+objects.length;
            fill(r,g,b);
            percent=floor(objects[counter].confidence*100);
            text(objects[counter].label+" "+percent+"%",objects[counter].x+15,objects[counter].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[counter].x,objects[counter].y,objects[counter].width,objects[counter].height);
        }
    }
}
