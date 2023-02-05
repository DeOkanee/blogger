const game = document.getElementById("game");

let images = ["boy", "businesswoman", "girl", "maid", "prisoner", "traveller"];

function createCard(src) {
	const card = document.createElement("div");
	card.classList.add("card");
	const img = document.createElement("img");
	img.src = src;
	card.appendChild(img);
	return card;
}

function start() {
	images = images.sort(() => Math.random() - 0.5);
	images.forEach((img) => {
		const card = createCard(`images/${img}.png`);
		game.appendChild(card);
	});

	images = images.sort(() => Math.random() - 0.5);
	images.forEach((img) => {
		const card = createCard(`images/${img}.png`);
		game.appendChild(card);
	});
	main();
}

function main() {
	const card = document.querySelectorAll(".card");

	// Toggle active cards
	card.forEach((el) => {
		el.addEventListener("click", () => {
			if (el.classList.contains("active")) {
				return;
			} else {
				el.classList.add("active");
			}
		});
	});

	// Update active cards
	setInterval(function () {
		var currentActive = 0;
		var cardImage = [];
		card.forEach((el) => {
			if (el.classList.contains("active")) {
				currentActive++;
				cardImage.push(el.childNodes[0].src);
			}
		});
		if (currentActive == 2) {
			if (cardImage[0] == cardImage[1]) {
				setTimeout(function () {
					card.forEach((el) => {
						if (el.childNodes[0].src == cardImage[0]) {
							el.classList.add("disabled");
						}
					});
					updateScore();
				}, 400);
			}
			setTimeout(function () {
				card.forEach((el) => {
					el.classList.remove("active");
					cardImage = [];
				});
			}, 500);
		}
	}, 1);

	const playAgain = document.querySelector(".play-again");
	setInterval(function () {
		var disabledCards = 0;
		card.forEach((el) => {
			if (el.classList.contains("disabled")) {
				disabledCards++;
			}
		});
		if (disabledCards == card.length) {
			playAgain.classList.add("show");
		}
	});

	var totalPoints = 0;
	// Update score
	const score = document.querySelector(".score");
	const updateScore = function () {
		totalPoints += 100;
		score.innerText = totalPoints;
	};
}

start();
