console.log("Wedding bells ringing..");

const rsvpBtn = document.getElementById("rsvp");
const rsvp__form = document.getElementById("rsvp__form");

const formData = {
  name: "",
  email: "",
  status: false,
  additions: [],
  errors: [],
};

rsvpBtn.addEventListener("click", displayForm);

function displayForm(event) {
  const h2s = document.querySelectorAll("h2");
  h2s.forEach(h2 => {
    h2.remove();
  });
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
            <input class="uk-input uk-form-large" type="text" id="addition" placeholder="Name of Plus Ones">
        </div>
        <div id="addition_cards"></div>`
  );

  document.getElementById("add_one").addEventListener("click", function (e) {
    const name = document.getElementById("addition").value;
    formData.additions.push({ name });
    renderAdditions();
  });

  function renderAdditions() {
    document.getElementById("addition_cards").innerHTML = "";
    formData.additions.forEach((addition, index) => {
      document
        .getElementById("addition_cards")
        .insertAdjacentHTML(
          "beforeend",
          `<span class="addition uk-label">${addition.name} <a id="${index}" href="" class="addition__remove">X</a> </span>`
        );
      document
        .getElementById(index)
        .addEventListener("click", function (event) {
          event.preventDefault();
          formData.additions.splice(event.target.id, 1);
          renderAdditions();
        });
    });
  }

  // attend button
  const attendButton = document.createElement("button");
  attendButton.innerText = "Attending";
  attendButton.classList = [
    "uk-button uk-button-large uk-button-primary uk-width-1-1 uk-margin-small-top",
  ];
  attendButton.addEventListener("click", e => {
    e.preventDefault();
    setAttend(true);
  });
  // not attending button
  const notAttendButton = document.createElement("button");
  notAttendButton.innerText = "Not Attending";
  notAttendButton.classList = [
    "uk-button uk-button-large uk-button-danger uk-width-1-1",
  ];
  notAttendButton.addEventListener("click", e => {
    e.preventDefault();
    setAttend(false);
  });

  rsvp__form.insertAdjacentElement("beforeend", attendButton);
  rsvp__form.insertAdjacentElement("beforeend", notAttendButton);
}

function setAttend(value) {
  formData.errors = [];
  formData.status = value;
  formData.name = document.getElementById("name").value;
  formData.email = document.getElementById("email").value;

  if (!formData.name) {
    formData.errors.push("name");
  }
  if (!formData.email) {
    formData.errors.push("email");
  }

  removeErrors(["name", "email"]);

  if (formData.errors.length) {
    return displayErrors(formData.errors);
  } else {
    fetch("/attendees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(json => {
        document.getElementById("rsvp__form").remove();
        const thankyou = document.createElement("h2");
        thankyou.classList = ["header_thanks"];
        thankyou.innerText = "Thank you for joining us on our special day.";
        document.body.appendChild(thankyou);
      });
  }
}

function displayErrors(errors) {
  errors.forEach(error => {
    document.getElementById(error).classList.add("uk-form-danger");
  });
}

function removeErrors(errors) {
  errors.forEach(error => {
    document.getElementById(error).classList.remove("uk-form-danger");
  });
}

setTimeout(function () {
  const flowers = document.querySelectorAll(".flowers");
  flowers.forEach(flower => {
    flower.classList.add("visible");
  });
}, 1000);

setTimeout(function () {
  const deer = document.querySelector(".uk-animation-stroke");
  console.log(deer);
  deer.classList.add("visible");
}, 400);
