function getTimeString(time) {
  const hours = parseInt(time / 3600);
  const minutes = parseInt((time % 3600) / 60);

  return `${hours}hrs ${minutes}min ago`;
}

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

const displayVideos = (videos) => {
  //   console.log(videos);
  const videosContainer = document.getElementById("videos");
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
                <p></p>
            </div>
        </div>
    `;

    videosContainer.appendChild(videoDiv);
  });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoriesContainer.appendChild(button);
  });
};

loadCategories();
loadVideos();
