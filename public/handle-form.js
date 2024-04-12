const myForm = document.querySelector("form");
const button = myForm.querySelector("button");
const inputs = myForm.querySelectorAll(".form-control");

button.addEventListener("click", async () => {
	button.disabled = true;

	const formData = new FormData(myForm);
	const userName = formData.get("userName");
	const phoneNumber = formData.get("phoneNumber");
	const message = formData.get("message");

	await add(userName, phoneNumber, message).then(() => {
		inputs.forEach((input) => (input.value = ""));
		button.disabled = false;
	});
});

async function add(userName, phoneNumber, message) {
	await fetch("/application", {
		method: "POST",
		body: JSON.stringify({ userName, phoneNumber, message }),
		headers: {
			"Content-Type": "application/json",
		},
	});
}
