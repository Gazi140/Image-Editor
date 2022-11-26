const saturate = document.getElementById('saturate');
const contrast = document.getElementById('contrast');
const brightness = document.getElementById('brightness');
const sepia = document.getElementById('sepia');
const grayscale = document.getElementById('grayscale');
const blur = document.getElementById('blur');
const hueRotate = document.getElementById('hue-rotate');

const download = document.getElementById("download");
const img = document.getElementById('img');

const imgBox = document.querySelector(".img-box")
const upload = document.getElementById("upload");
const reset = document.querySelector("span");

const canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");

function resetValue() {
    ctx.filter = "none";
    saturate.value = "100"
    contrast.value = "100"
    brightness.value = "100"
    sepia.value = "0"
    grayscale.value = "0"
    blur.value = "0"
    hueRotate.value = "0"
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

window.onload = function() {
    resetValue()
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
}
upload.onchange = function() {

    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";

    let file = new FileReader();
    file.readAsDataURL(upload.files[0])
    file.onload = function() {
        img.src = file.result;
    }
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = "none";
    }
}

let fillters = document.querySelectorAll("ul li input");

fillters.forEach(fillter => {
    fillter.addEventListener("input", function() {
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        
        `
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    })
});

download.onclick = function() {
    download.href = canvas.toDataURL();
}