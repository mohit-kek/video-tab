// Open the default tab
document.getElementById("tab1").style.display = "block";
// document.getElementById("typeTab1").style.display = "block";

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
]


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



// Function to open the subtab
// function openSubTab(evt, subtabName) {

//     var subtabcontent = document.getElementsByClassName("subTabContent");
//     for (var i = 0; i < subtabcontent.length; i++) {
//         subtabcontent[i].style.display = "none";
//     }

//     var subtablinks = document.getElementsByClassName("subTablinks");
//     for (var i = 0; i < subtablinks.length; i++) {
//         subtablinks[i].className = subtablinks[i].className.replace(" active", "");
//     }

//     document.getElementById(subtabName).style.display = "block";
//     evt.currentTarget.className += " active";
// }


//for loading videos

let currentPage = 1;
var videosPerLoad = 0;
const updateVideosPerPage = () => {
    if (window.innerWidth < 600) {
        videosPerLoad = 4;
    } else {
        videosPerLoad = 8;
    }
};

updateVideosPerPage();

// Update on resize
window.addEventListener('resize', updateVideosPerPage);

const videosGrid = document.querySelector('.videosGrid');
const loadMore = document.querySelector('.loadMore');

// load videos for the current page
function loadVideos() {
    const startIndex = videosPerLoad - currentPage;
    const endIndex = startIndex + videosPerLoad;
    let videoIndex = 0;
    for (let i = startIndex; i < endIndex; i++) {
        const videoCol = document.createElement('div');
        videoCol.className = 'col';
        videoCol.innerHTML = `
        <div class="video">
        <video src=${videoSrc[videoIndex]} type="video/mp4">
        </video>
        <div class="overlay"></div>
      </div>
        `;
        videoCol.addEventListener("click", (event) => {
            popupVideo(event.currentTarget.querySelector("video"));
        });
        videosGrid.appendChild(videoCol);
        videoIndex++;

    }
}

// Load initial videos
loadVideos();

// PopupVideo
function popupVideo(video) {
    document.querySelector('.popupVideo').style.display = "block";
    document.querySelector('.popupVideo video').src = video.getAttribute('src');

    // close popupVideo
    document.querySelector('.popupVideo span').addEventListener("click", () => {
        document.querySelector('.popupVideo').style.display = 'none';
    })
}


// Load more videos when load more button is clicked
loadMore.addEventListener('click', () => {
    currentPage++;
    loadVideos();

    // Hide load more button if all videos have been loaded
    if (currentPage * videosPerLoad >= 40) {
        loadMore.style.display = 'none';
    }
});