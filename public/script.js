// Get modal element
var modal = document.getElementById("Landing-pop");

// Get the <span> element that closes the modal
var closeBtn = document.getElementById("closeLandingPop");

// Open the modal when the page loads
window.onload = function() {
    modal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close the modal if the user clicks outside the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
