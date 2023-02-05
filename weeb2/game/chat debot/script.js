const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

function createChat(from, message) {
	const chat = document.createElement("span");
	chat.innerHTML = message;

	if (from === "bot") {
		chat.classList.add("bot");
	} else if (from === "user") {
		chat.classList.add("user");
	}

	chatBox.appendChild(chat);
	chatBox.scrollTo(0, chatBox.scrollHeight);
}

function botReply(message) {
	const replies = {
		halo: "Halo juga!",
		nanya: "Boleh, mau nanya apa?",
		makanan: "Aku suka semua makanan :D",
		bye: "Sampai jumpa kembali!",
	};
	let words = message.split(" ");
	words = words.map((word) => word.toLowerCase());

	let replied = false;

	words.forEach((word) => {
		if (Object.keys(replies).includes(word)) {
			createChat("bot", replies[word]);
			replied = true;
			return;
		}
	});

	if (!replied) createChat("bot", "Maaf, Debot tidak mengerti, Debot dalam perbaikan :)");
}

function handleForm(e) {
	e.preventDefault();
	const message = chatInput.value;
	if (message === "") {
		return;
	} else {
		createChat("user", message);
	}
	chatInput.value = "";
	setTimeout(() => botReply(message), 500);
}

chatForm.addEventListener("submit", handleForm);
