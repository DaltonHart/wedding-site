console.log("Wedding bells ringing..");

const rsvpBtn = document.getElementById("rsvp");
const rsvp__form = document.getElementById("rsvp__form");

const formData = {
  name: "",
  email: "",
  status: false,
  plusOne: false,
  plusOneName: "",
};

rsvpBtn.addEventListener("click", displayForm);

function displayForm(event) {
  rsvpBtn.parentNode.removeChild(rsvpBtn);
  // name input
  const nameInput = document.createElement("input");
  nameInput.placeholder = "Name";
  nameInput.type = "text";
  nameInput.id = "name";
  nameInput.classList = ["uk-input"];
  rsvp__form.insertAdjacentElement("beforeend", nameInput);
  // name input
  const emailInput = document.createElement("input");
  emailInput.placeholder = "Email";
  emailInput.type = "email";
  emailInput.id = "email";
  emailInput.classList = ["uk-input"];
  rsvp__form.insertAdjacentElement("beforeend", emailInput);
  // attend button
  const attendButton = document.createElement("button");
  attendButton.innerText = "Attending";
  attendButton.classList = ["uk-button uk-button-primary uk-width-1-2@s"];
  attendButton.addEventListener("click", (e) => {
    e.preventDefault();
    setAttend(true);
  });
  // not attending button
  const notAttendButton = document.createElement("button");
  notAttendButton.innerText = "Not Attending";
  notAttendButton.classList = ["uk-button uk-button-danger uk-width-1-2@s"];
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
