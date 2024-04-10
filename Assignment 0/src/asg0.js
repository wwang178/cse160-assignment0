var canvasCenterX = 200;
var canvasCenterY = 200;

var canvas;
var ctx;

var v1Color = "red"
var v2Color = "blue"
var v34Color = "green"

// DrawRectangle.js
function main() {
    // Retrieve <canvas> element
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    // Get the rendering context for 2DCG
    ctx = canvas.getContext('2d');

    // black rectangle background
    drawCanvasBackground()
}

function drawVector(v, color){
    ctx.beginPath();
    ctx.moveTo(canvasCenterX, canvasCenterY);
    ctx.strokeStyle = color;
    ctx.lineTo(canvasCenterX + (v.elements[0] * 20), canvasCenterY - (v.elements[1] * 20));
    ctx.stroke();
}

function handleDrawEvent(){
    drawCanvasBackground();

    let x1 = document.getElementById("x1").value;
    let y1 = document.getElementById("y1").value;
    let vector1 = new Vector3([x1, y1, 0]);
    let x2 = document.getElementById("x2").value;
    let y2 = document.getElementById("y2").value;
    let vector2 = new Vector3([x2, y2, 0]);

    drawVector(vector1, v1Color);
    drawVector(vector2, v2Color);
}

function handleDrawOperationEvent(){
    drawCanvasBackground();

    let x1 = document.getElementById("x1").value;
    let y1 = document.getElementById("y1").value;
    let vector1 = new Vector3([x1, y1, 0]);
    let x2 = document.getElementById("x2").value;
    let y2 = document.getElementById("y2").value;
    let vector2 = new Vector3([x2, y2, 0]);

    drawVector(vector1, v1Color);
    drawVector(vector2, v2Color);

    let operation = document.getElementById("operation").value;
    let scalar = document.getElementById("scalar").value;

    let vector3 = null;
    let vector4 = null;
    switch(operation){
        case "Add":
            vector3 = vector1.add(vector2);
            break;
        case "Subtract":
            vector3 = vector1.sub(vector2);
            break;
        case "Multiply":
            vector3 = vector1.mul(scalar);
            vector4 = vector2.mul(scalar);
            break;
        case "Divide":
            vector3 = vector1.div(scalar);
            vector4 = vector2.div(scalar);
            break;
        case "AngleBetween":
            console.log("Angle: " + angleBetween(vector1, vector2));
            break;
        case "Area":
            console.log("Area of the triangle: " + areaTriangle(vector1, vector2));
            break;
        case "Magnitude":
            console.log("Magnitude v1: " + vector1.magnitude());
            console.log("Magnitude v2: " + vector2.magnitude());
            break;
        case "Normalize":
            vector3 = vector1.normalize();
            vector4 = vector2.normalize();
            break;
    }

    if(vector3 != null)
        drawVector(vector3, v34Color);
    if(vector4 != null)
        drawVector(vector4, v34Color);
}

function angleBetween(v1, v2){
    let dot = Vector3.dot(v1, v2);
    dot /= v1.magnitude();
    dot /= v2.magnitude();
    return Math.acos(dot) * (180 / Math.PI);
}

function areaTriangle(v1, v2){
    let area = Vector3.cross(v1, v2);
    area = area.magnitude();
    area /= 2;
    return area;
}

function drawCanvasBackground(){
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 400, 400);
}