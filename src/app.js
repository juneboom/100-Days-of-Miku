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
    if (i === 0) {
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

prev.addEventListener("click", function(e) {
    changeSlide(-1);
})
next.addEventListener("click", function(e) {
    changeSlide(1);
})

function checkChildren() {
    if (children > 1) {
        lightbox.removeChild(lightbox.lastChild);
        children--;
    }
}

//how the slides actually work
function changeSlide(n) {
    //basically increment or decrement by 1
    slideIndex += n;
    //slideshow will loop
    if (slideIndex > 100) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = 100;
    }
    //console.log(slideIndex);
    checkChildren();
    const img = document.createElement("img");
    // a little unelegant. slide version of lazy load. check if img has been loaded yet
    if (images[slideIndex - 1].classList == null || images[slideIndex - 1].className == "") {
        img.src = images[slideIndex - 1].src;
    } else {
        //console.log("this image hasn't loaded yet");
        img.src = images[slideIndex - 1].dataset.src;
        img.classList.remove('lazy');
    }
    lightbox.appendChild(img);
    children++;
}

//detect click for each image, add active class to lightbox
let children = 1; //number of lightbox child nodes
images.forEach(function(image) {
    image.addEventListener("click", function(e) {
        //remove images so that multiple don't show up, but keep buttons div
        checkChildren();
        lightbox.classList.add("active")
        for (i = 0; i < slides; i++) {
            if (images[i] === image) {
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
lightbox.addEventListener("click", function(e) {
    /*comparing the element that triggered the event vs 
    the element that the event listener is attached to*/
    if (e.target !== e.currentTarget) {
        return;
    }
    lightbox.classList.remove("active");
})


//lazy load images because 100 images at once is a lot of images
//thanks to this demo for a basic way to do it: https://imagekit.io/blog/lazy-loading-images-complete-guide/#what-is-image-lazy-loading
//first 10 or so images not marked as lazy for better UI experience
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy");
    var lazyloadThrottleTimeout;

    function lazyload() {
        //scrolling will rapidly trigger the event so there should be some buffer time to pause it
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                //check if the images are within the viewport
                if (((window.innerHeight + scrollTop) / img.offsetTop) > .85) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
            //stop listening once all images are loaded
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);

})

var rootElement = document.documentElement;
var scrollBtn = document.getElementById("to-top");

function scrollToTop() {
    //scroll back to top
    rootElement.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        //console.log("clicked")
}

scrollBtn.addEventListener("click", scrollToTop);