// Video source array
const videoSrc = [
    "./assets/Video1.mp4",
    "./assets/Video2.mp4",
    "./assets/Video3.mp4",
    "./assets/Video4.mp4",
    "./assets/Video5.mp4",
    "./assets/Video6.mp4",
    "./assets/Video7.mp4",
    "./assets/Video8.mp4",
    "./assets/Video9.mp4",
    "./assets/Video10.mp4",
    "./assets/Video11.mp4",
]

// Open the default tab
document.getElementById("tab1").style.display = "block";

// Function to open the tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

//for loading videos

var currentPage = 1;
var videosPerLoad = 8;
const updateVideosPerPage = () => {
    if (window.innerWidth < 600) {
        videosPerLoad = 4;
    }

    return videosPerLoad    
};

updateVideosPerPage();

// Update on resize
window.addEventListener('resize', updateVideosPerPage);

const videosGrid = document.querySelector('.videos-grid');
const loadMore = document.querySelector('.load-more');

// load videos for the current page
function loadVideos() {
    const startIndex = currentPage * videosPerLoad - videosPerLoad;
    const endIndex = startIndex + videosPerLoad;
    for (let i = startIndex; i < endIndex; i++) {

        if (i < videoSrc.length) {

            const videoCol = document.createElement('div');
            videoCol.className = 'col';
            videoCol.innerHTML = `
            <div class="video">
            <video src=${videoSrc[i]} type="video/mp4">
            </video>
            
            </div>
            <div class="play-container">
            <i class='bx bx-play-circle'></i>
            </div>
            `;
        
            videoCol.addEventListener("click", (event) => {
                popupVideo(event.currentTarget.querySelector("video"));
            });
            videosGrid.appendChild(videoCol);

        }
    }
}

// Load initial videos
loadVideos();

function closePopupVideo() {
    document.querySelector('.popup-video').style.display = 'none';
    const video = document.querySelector(".popup-video video");
    video.pause();
    
}

var popup = document.querySelector(".popup-video");

// PopupVideo
function popupVideo(video) {
    document.querySelector('.popup-video').style.display = "flex";
    document.querySelector('.popup-video video').src = video.getAttribute('src');

    // close popupVideo
    document.querySelector('.popup-video span').addEventListener("click", closePopupVideo)


    window.addEventListener("click", function (e) {
        if (e.target === popup) {
            closePopupVideo();
        }
    });
}


// Load more videos when load more button is clicked
loadMore.addEventListener('click', () => {
    currentPage++;
    loadVideos();

    // Hide load more button if all videos have been loaded
    if (currentPage * videosPerLoad >= videoSrc.length) {
        loadMore.style.display = 'none';
    }
});