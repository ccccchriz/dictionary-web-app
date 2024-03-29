const searchFrom = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const searchError = document.getElementById("form-error");

const notFound = document.getElementById("not-found");
const found = document.getElementById("found");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const displayNotFound = () => {
  notFound.classList.remove("hidden");
};

const displayData = (data) => {
  console.log(data);
  found.classList.remove("hidden");
  document.getElementById("word").textContent = data.word;
};

if (urlParams.has("search")) {
  const item = urlParams.get("search");
  if (item != "") {
    searchInput.value = item;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${item}`)
      .then((resp) => resp.json())
      .then((data) =>
        data.hasOwnProperty("title") ? displayNotFound() : displayData(data[0])
      );
  }
}

searchFrom.addEventListener("submit", (event) => {
  if (searchInput.value == "") {
    event.preventDefault();
    searchError.textContent = "Whoops, can’t be empty…";
    searchFrom.querySelector(".form__con").classList.add("form__con--error");
  }
});
