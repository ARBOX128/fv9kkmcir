img = "";
status ="";
objects = [];
function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
     canvas = createCanvas(300,300);
     canvas.center();
     video = createCapture(VIDEO);
     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Estatus: detectando objetos";
     video.hide();
}

function modelLoaded(){
    console.log("¡modelo cargado!")
    status = true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0,0,300,300);

    if(status != ""){
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "estatus: objeto detectado";
            document.getElementById("number_of_objects").innerHTML = "numero de objetos detectados" + objects.length;

            fill(r,b,g);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            text("perro", 45,75);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
