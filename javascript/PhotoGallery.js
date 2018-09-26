var imageSources = [];
var imageElements = Array.from(document.getElementsByClassName("galleryImage"))
var currentImageIndex = 0;
var slideshow = {}
var isSlideShowing = false

// Open the Modal
function openModal() {
  document.getElementById('myModal').style.display = "block";
}

// Close the Modal
function closeModal() {
  isSlideShowing = false
  if(isSlideShowing) stopSlideShow()
  document.getElementById('myModal').style.display = "none";
}

function showImage(index) {
  var mainImage = document.getElementById("mainImage")
  currentImageIndex = index
  mainImage.setAttribute("src", imageElements[index-1].getAttribute("src"));
}

function nextSlide() {
  var mainImage = document.getElementById("mainImage")
  currentImageIndex = (currentImageIndex + 1) % imageElements.length
  mainImage.setAttribute("src", imageElements[currentImageIndex + 1].getAttribute("src"));
}

function lastSlide() {
  var mainImage = document.getElementById("mainImage")
  currentImageIndex = (currentImageIndex + 1) % imageElements.length
  mainImage.setAttribute("src", imageElements[currentImageIndex + 1].getAttribute("src"));
}

function startSlideShow() {
  isSlideShowing = true
  var mainImage = document.getElementById("mainImage")
  slideShow = setInterval(function() {
    currentImageIndex = (currentImageIndex + 1) % imageElements.length
    mainImage.setAttribute("src", imageElements[currentImageIndex + 1].getAttribute("src"));
  }, 10000)
}

function stopSlideShow() {
  clearInterval(slideShow);
  isSlideShowing = false
}

document.onkeyup = function(e) {
  if (e.which == 37) {
    lastSlide()
  } else if (e.which == 39) {
    nextSlide()
  } else if (e.which == 27) {
    closeModal()
  } else if (e.which == 32) {
    //do the slideshow shit
    if(!isSlideShowing) {
      startSlideShow()
    } else {
      stopSlideShow()
    }
  }
};
