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

      if (el.hasOwnProperty("example")) {
        const div = document.createElement("div");
        div.classList.add("type__list-con");
        const span = document.createElement("span");
        span.textContent = el.definition;
        span.classList.add("type__list-item");
        div.appendChild(span);
        const span2 = document.createElement("span");
        span2.textContent = `"${el.example}"`;
        span2.classList.add("type__list-item");
        span2.classList.add("type__list-item--example");
        div.appendChild(span2);
        element.appendChild(div);
      } else {
        element.classList.add("type__list-item");
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

  const source = document.createElement("h3");
  source.classList.add("type__source");
  source.textContent = "Source";

  found.appendChild(source);

  const link = document.createElement("a");
  link.classList.add("type__link");
  link.setAttribute("href", data.sourceUrls[0]);
  link.setAttribute("target", "_blank");
  link.textContent = data.sourceUrls[0];

  found.appendChild(link);
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
