console.log("Wedding bells ringing..");

const rsvpBtn = document.getElementById("rsvp");
const rsvp__form = document.getElementById("rsvp__form");

const formData = {
  name: "",
  email: "",
  status: false,
  additions: [],
};

rsvpBtn.addEventListener("click", displayForm);

function displayForm(event) {
  rsvpBtn.parentNode.removeChild(rsvpBtn);
  // name input
  const nameInput = document.createElement("input");
  nameInput.placeholder = "Name";
  nameInput.type = "text";
  nameInput.id = "name";
  nameInput.classList = ["uk-input uk-form-large"];
  rsvp__form.insertAdjacentElement("beforeend", nameInput);
  // name input
  const emailInput = document.createElement("input");
  emailInput.placeholder = "Email";
  emailInput.type = "email";
  emailInput.id = "email";
  emailInput.classList = ["uk-input uk-form-large"];
  rsvp__form.insertAdjacentElement("beforeend", emailInput);

  // Add additions
  rsvp__form.insertAdjacentHTML(
    "beforeend",
    `<p class="form__text">To add another person to your reservation please fill out the below input and hit the plus.</p>`
  );
  rsvp__form.insertAdjacentHTML(
    "beforeend",
    `<div class="uk-inline">
            <a id="add_one" class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="icon: plus"></a>
            <input class="uk-input uk-form-large" type="text" id="addition" placeholder="Name of Plus One">
        </div>
        <div id="addition_cards"></div>`
  );

  document.getElementById("add_one").addEventListener("click", function (e) {
    const name = document.getElementById("addition").value;
    formData.additions.push({ name });
    console.log(formData);
    renderAdditions();
  });

  function renderAdditions() {
    document.getElementById("addition_cards").innerHTML = "";
    formData.additions.forEach((addition) => {
      document
        .getElementById("addition_cards")
        .insertAdjacentHTML(
          "beforeend",
          `<span class="uk-label uk-label-success">${addition.name} <a href="" class="addition__remove">X</a> </span>`
        );
    });
  }

  // attend button
  const attendButton = document.createElement("button");
  attendButton.innerText = "Attending";
  attendButton.classList = [
    "uk-button uk-button-large uk-button-primary uk-width-1-1 uk-margin-small-top",
  ];
  attendButton.addEventListener("click", (e) => {
    e.preventDefault();
    setAttend(true);
  });
  // not attending button
  const notAttendButton = document.createElement("button");
  notAttendButton.innerText = "Not Attending";
  notAttendButton.classList = [
    "uk-button uk-button-large uk-button-danger uk-width-1-1",
  ];
  notAttendButton.addEventListener("click", (e) => {
    e.preventDefault();
    setAttend(false);
  });

  rsvp__form.insertAdjacentElement("beforeend", attendButton);
  rsvp__form.insertAdjacentElement("beforeend", notAttendButton);
}

function setAttend(value) {
  formData.status = value;
  formData.name = document.getElementById("name").value;
  formData.email = document.getElementById("email").value;
  fetch("/attendees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    });
}

setTimeout(function () {
  const flowers = document.querySelectorAll(".flowers");
  flowers.forEach((flower) => {
    flower.classList.add("visible");
  });
}, 1000);
