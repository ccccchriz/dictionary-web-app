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
  document.getElementById("top-word").textContent = data.word;

  let phonetic = data.phonetics.filter((el) => el.audio != "")[0];

  if (phonetic) {
    document.getElementById("top-phonetics").textContent = phonetic.text;
    document.getElementById("top-sound").addEventListener("click", () => {
      new Audio(phonetic.audio).play();
    });
  } else {
    document.getElementById("top-phonetics").textContent = data.phonetic;
    document.getElementById("top-sound").classList.add("hidden");
  }

  data.meanings.forEach((el) => {
    const element = document.createElement("div");
    element.classList.add("found__type");
    element.id = `type-${el.partOfSpeech}`;

    found.appendChild(element);

    const title = document.createElement("h3");
    title.classList.add("type__title");
    title.textContent = el.partOfSpeech;

    element.appendChild(title);

    const meaning = document.createElement("h4");
    meaning.classList.add("type__subtitle");
    meaning.textContent = "Meaning";

    element.appendChild(meaning);

    const list = document.createElement("ul");
    list.classList.add(`type__list`);

    el.definitions.forEach((el) => {
      const element = document.createElement("li");
      element.classList.add("type__list-item");

      if (el.hasOwnProperty("example")) {
        const span = document.createElement("span");
        span.textContent = el.definition;
        element.appendChild(span);
        const span2 = document.createElement("span");
        span2.textContent = `"${el.example}"`;
        element.appendChild(span2);
      } else {
        element.textContent = el.definition;
      }
      list.appendChild(element);
    });

    found.appendChild(list);

    const synonyms = document.createElement("h4");
    synonyms.classList.add("type__subtitle");
    synonyms.textContent = "Synonyms";

    if (el.synonyms != 0) found.appendChild(synonyms);

    const synonymList = document.createElement("ul");
    synonymList.classList.add(`type__list--secondary`);

    el.synonyms.forEach((el) => {
      const item = document.createElement("li");
      item.textContent = el;
      synonymList.appendChild(item);
    });

    found.appendChild(synonymList);

    const antonyms = document.createElement("h4");
    antonyms.classList.add("type__subtitle");
    antonyms.textContent = "Antonyms";

    if (el.antonyms != 0) found.appendChild(antonyms);

    const antonymList = document.createElement("ul");
    antonymList.classList.add(`type__list--secondary`);

    el.antonyms.forEach((el) => {
      const item = document.createElement("li");
      item.textContent = el;
      antonymList.appendChild(item);
    });

    found.appendChild(antonymList);
  });
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
