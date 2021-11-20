//creates lightbox div
const lightbox = document.createElement("div");
lightbox.id = "lightbox";

//select all images in document
const images = document.querySelectorAll(".media img");

//how to know which number miku we are on in order to navigate?
const slides = images.length;
let slideIndex = 1;

//add lightbox to html
//const media = document.getElementsByClassName("media-container")[0];
const footer = document.querySelector("footer");
footer.insertAdjacentElement("beforebegin", lightbox);

//create buttons div
const buttons = document.createElement("div");
buttons.className = "buttons";
//add buttons to inside lightbox div


//create left and right controls
function createButton() {
    const button = document.createElement("button");
    button.className = "controls";
    return button;
}


//make previous and next ids. add controls to buttons div
for (i = 0; i < 2; i++) {
    let control = createButton();
    if (i === 0 ) {
        control.id = "previous";
        control.innerHTML = "&lt;";
    } else {
        control.id = "next";
        control.innerHTML = "&gt;"
    }
    buttons.appendChild(control);
}
lightbox.appendChild(buttons);


//prev and next functions
const prev = document.getElementById("previous");
const next = document.getElementById("next");

prev.addEventListener("click", function (e){
    changeSlide(-1);
})
next.addEventListener("click", function (e){
    changeSlide(1);
})

function checkChildren(){
    if (children > 1 ) {
        lightbox.removeChild(lightbox.lastChild);
        children--;
    }
}

function changeSlide(n){
    slideIndex += n;
    if (slideIndex > 100) {
        slideIndex = 1; 
    } else if (slideIndex < 1){
        slideIndex = 100;
    }
    console.log(slideIndex);
    checkChildren();
    const img = document.createElement("img");
    img.src = images[slideIndex-1].src;
    lightbox.appendChild(img);
    children++;
}

//detect click for each image, add active class to lightbox
let children = 1; //number of lightbox child nodes
images.forEach(function (image) {
    image.addEventListener("click", function (e) {
        //remove images so that multiple don't show up, but keep buttons div
        checkChildren();
        lightbox.classList.add("active")
        for (i = 0; i < slides; i++){
            if (images[i] === image){
                slideIndex = i + 1;
                console.log(slideIndex);
            } 
        }
        //make image to show in the lightbox 
        const img = document.createElement("img");
        img.src = image.src;
        lightbox.appendChild(img);
        children++;
    })
})

//exit the lightbox only by clicking outside the image
lightbox.addEventListener("click", function (e) {
    /*comparing the element that triggered the event vs 
    the element that the event listener is attached to*/
    if (e.target !== e.currentTarget) {
        return;
    }
    lightbox.classList.remove("active");
})