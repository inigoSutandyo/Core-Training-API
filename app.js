const modal = document.getElementById("modal");

const API_URL = "http://localhost:8000/api"

const showModal = () => {
  modal.className = "fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10";
};

const hideModal = () => {
  modal.className =
    "fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10 hidden";
};
const setupCommunity = async (search) => {
  $("#communityGrid").html("LOADING");
  $.ajax({
    type: "get",
    url: `${API_URL}/community?search=${search ?? ""}`,
    dataType: "json",
    success: function (response) {
      const data = response;
      $("#communityGrid").html("");
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        $("#communityGrid").append(
          `<div key="community${element.id}" class="cursor-pointer w-full bg-white rounded-2xl shadow-md overflow-hidden flex flex-col border-2 border-transaparent hover:border-green-400 hover:shadow-lg transition-all ease-linear duration-150">
                      <img src="https://picsum.photos/id/${
                        10 + element.id
                      }/800/800" class="w-full h-32 object-cover" alt="">
                      <span class="text-lg font-bold px-4 pt-2 pb-1">
                        ${element.name}
                      </span>
                      <p class="text-sm text-gray-400 truncate px-4 pb-2">${element.description}</p>
                  </div>
              `
        );
      }
    },
    error: (xhr, status, error) => {
      $("#communityGrid").html(`
        <div class="w-full justify-center">
            <span>FETCH COMMUNITY DATA FAILED...</span>
          </div>
        `);
    },
  });
};

let current_page = 1
let last_page = 1
const setupPosts = (page) => {
  if (page > last_page || page < 1) {
    return;
  }

  $("#postContainer").html("LOADING");
  $.ajax({
    type: "get",
    url: `${API_URL}/post?page=${page ?? 1}`,
    dataType: "json",
    success: function (response) {
      const data = response.data;
      current_page = response.current_page;
      last_page = response.last_page;
      $("#page").html(`${current_page} / ${last_page}`);
      $("#postContainer").html("");
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        $("#postContainer").append(`
          <div key="post${element.id}" class="w-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer  border-2 border-transaparent hover:border-green-400 hover:shadow-lg transition-all ease-linear duration-150">
            <div class="flex w-full justify-between items-center px-4 py-2">
                <div>
                    <span class="text-lg font-bold text-start">
                        ${element.title}
                    </span>
                    <span class="text-sm font-semibold"> - ${element.user.username}</span>
                </div>
                <div>
                    <span class="text-xs text-gray-400">${element.created_at}</span>
                </div>
            </div>
            <p class="text-sm text-gray-600 truncate px-4 pb-2">
                ${element.content}
            </p>
          </div>`);
      }
    },
    error: (xhr, status, error) => {
      $("#postContainer").html(`
        <div class="w-full justify-center">
            <span>FETCH POST DATA FAILED...</span>
          </div>
        `);
    },
  });
};

$(document).ready(function () {
  $("#communitySearch").submit(function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData);
    setupCommunity(obj.communitySearch);
  });

  $("#nextPage").click(function (e) { 
    e.preventDefault();
    setupPosts(current_page+1)
  });
  $("#prevPage").click(function (e) { 
    e.preventDefault();
    setupPosts(current_page-1)
  });
  setupCommunity("");
  setupPosts(1);
});
