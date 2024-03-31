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

  let list = document.getElementById("type-noun-list");

  const nouns = data.meanings.filter((el) => el.partOfSpeech == "noun")[0];

  if (nouns) {
    nouns.definitions.forEach((el) => {
      const listItem = document.createElement("li");
      listItem.classList.add("type__list-item");
      listItem.textContent = el.definition;
      list.appendChild(listItem);
    });
  } else {
    document.getElementById("type-noun").classList.add("hidden");
  }

  list = document.getElementById("type-verb-list");

  const verbs = data.meanings.filter((el) => el.partOfSpeech == "verb")[0];

  if (verbs) {
    verbs.definitions.forEach((el) => {
      const listItem = document.createElement("li");
      listItem.classList.add("type__list-item");
      listItem.textContent = el.definition;
      list.appendChild(listItem);
    });
  } else {
    document.getElementById("type-verb").classList.add("hidden");
  }

  list = document.getElementById("type-noun-synonyms-list");

  let synonyms = nouns.synonyms;

  synonyms.forEach((el) => {
    document.getElementById("type-noun-synonyms").classList.remove("hidden");
    const listItem = document.createElement("li");
    listItem.classList.add("type__list-item");
    listItem.textContent = el;
    list.appendChild(listItem);
  });

  list = document.getElementById("type-verb-synonyms-list");

  synonyms = verbs.synonyms;

  synonyms.forEach((el) => {
    document.getElementById("type-verb-synonyms").classList.remove("hidden");
    const listItem = document.createElement("li");
    listItem.classList.add("type__list-item");
    listItem.textContent = el;
    list.appendChild(listItem);
  });

  list = document.getElementById("type-noun-antonyms-list");

  let antonyms = nouns.antonyms;

  antonyms.forEach((el) => {
    document.getElementById("type-noun-antonyms").classList.remove("hidden");
    const listItem = document.createElement("li");
    listItem.classList.add("type__list-item");
    listItem.textContent = el;
    list.appendChild(listItem);
  });

  list = document.getElementById("type-verb-antonyms-list");

  antonyms = verbs.antonyms;

  antonyms.forEach((el) => {
    document.getElementById("type-verb-antonyms").classList.remove("hidden");
    const listItem = document.createElement("li");
    listItem.classList.add("type__list-item");
    listItem.textContent = el;
    list.appendChild(listItem);
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
