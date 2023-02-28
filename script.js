// Open the default tab
document.getElementById("tab1").style.display = "block";
document.getElementById("typeTab1").style.display = "block";

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
function openSubTab(evt, subtabName) {

    var subtabcontent = document.getElementsByClassName("subTabContent");
    for (var i = 0; i < subtabcontent.length; i++) {
        subtabcontent[i].style.display = "none";
    }

    var subtablinks = document.getElementsByClassName("subTablinks");
    for (var i = 0; i < subtablinks.length; i++) {
        subtablinks[i].className = subtablinks[i].className.replace(" active", "");
    }

    document.getElementById(subtabName).style.display = "block";
    evt.currentTarget.className += " active";
}


//for loading videos

let currentPage = 1;
let videosPerPage = 0;
const updateVideosPerPage = () => {
    if (window.innerWidth < 600) {
      videosPerPage = 5;
    } else {
      videosPerPage = 15;
    }
  };

  updateVideosPerPage();
  
  // Update on resize
  window.addEventListener('resize', updateVideosPerPage);

const videosGrid = document.querySelector('.videosGrid');
const loadMore = document.querySelector('.loadMore');

// load videos for the current page
function loadVideos() {
    const startIndex = currentPage - 1 * videosPerPage;
    const endIndex = startIndex + videosPerPage;

    for (let i = startIndex; i < endIndex; i++) {
        const videoCol = document.createElement('div');
        videoCol.className = 'col';
        videoCol.innerHTML = `
        <div>
        <video class="video"  controls muted>
          <source src="./assets/sample.mp4" type="video/mp4" />
        </video>
      </div>
        `;
        videosGrid.appendChild(videoCol);
    }
}

// Load initial videos
loadVideos();

// Load more videos when load more button is clicked
loadMore.addEventListener('click', () => {
    currentPage++;
    loadVideos();

    // Hide load more button if all videos have been loaded
    if (currentPage * videosPerPage >= 45) {
        loadMore.style.display = 'none';
    }
});