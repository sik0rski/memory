const squares = document.querySelectorAll('.square');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const totalPairs = 12;
let values = [];
for (let i = 1; i <= totalPairs; i++) {
    values.push(i);
    values.push(i);
}
values.push('?');

values = values.sort(() => 0.5 - Math.random());

squares.forEach((square, index) => {
    square.dataset.value = values[index];
    square.addEventListener('click', flipCard);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    const uniqueClass = Array.from(this.classList).find(cls => cls.startsWith('square_'));
    console.log(uniqueClass);

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
