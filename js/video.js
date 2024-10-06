function getTimeString(time) {
  const hours = parseInt(time / 3600);
  const minutes = parseInt((time % 3600) / 60);

  return `${hours}hrs ${minutes}min ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for (let button of buttons) {
    button.classList.remove("active");
  }
};

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};

const loadVideos = (search = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

const loadCategoriesVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();

      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((err) => console.log(err));
};

const loadDetails = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  console.log(video);
  const detailsContainer = document.getElementById("modal-content");

  detailsContainer.innerHTML = `
    <img class="w-full" src=${video.thumbnail} alt="" />
    <h1 class="text-2xl font-bold my-3">${video.title}</h1>
    <p>${video.description}</p>
  `;
  document.getElementById("showModal").click();
};

const displayVideos = (videos) => {
  //   console.log(videos);
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  if (videos.length === 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="flex flex-col justify-center items-center gap-5">
      <img src="assets/icon.png" alt="" />
      <h1 class="text-3xl font-bold">No Videos Found</h1>
      <button onclick="loadVideos()" class="btn btn-primary">Reload</button>
    </div>

    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    console.log(video);
    const videoDiv = document.createElement("div");
    videoDiv.classList = "card card-compact";
    videoDiv.innerHTML = `
      <figure class="h-[250px] relative">
            <img
            src=${video.thumbnail}
            class="w-full h-full object-cover"
            alt="Shoes" />
            ${
              video.others.posted_date?.length === 0
                ? ""
                : `<span class="absolute bottom-2 text-xs right-2 p-2 bg-black rounded text-white">${getTimeString(
                    video.others.posted_date
                  )}</span>`
            }
            
        </figure>
        <div class="py-2 px-1 flex gap-2">
            <div>
                <img src="${
                  video.authors[0].profile_picture
                }" class="w-10 h-10 rounded-full object-cover"/>
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                <p>${video.authors[0].profile_name}</p>
                ${
                  video.authors[0].verified === true
                    ? `<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5 h-5"/>`
                    : ""
                }
                </div>
                <p> <button onclick="loadDetails('${
                  video.video_id
                }')" class="btn btn-error btn-sm">Details</button> </p>
            </div>
        </div>
    `;

    videosContainer.appendChild(videoDiv);
  });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category_id}" onclick="loadCategoriesVideos('${item.category_id}')" class="btn category-btn">${item.category}</button>
    `;
    categoriesContainer.appendChild(buttonContainer);
  });
};

document.getElementById("searchInput").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});
loadCategories();
loadVideos();
