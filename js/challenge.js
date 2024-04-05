document.addEventListener("DOMContentLoaded", function() {
    let counter = document.getElementById('counter');
    let minusButton = document.getElementById('minus');
    let plusButton = document.getElementById('plus');
    let heartButton = document.getElementById('heart');
    let pauseButton = document.getElementById('pause');
    let likesList = document.querySelector('.likes');
    let commentForm = document.getElementById('comment-form');
    let commentInput = document.getElementById('comment-input');
    let commentList = document.getElementById('list');

    let count = 0;
    let intervalId;
    let likes = {};
    let paused = false;

    function updateCounter() {
        counter.textContent = count;
    }

    function startCounter() {
        intervalId = setInterval(function() {
            count++;
            updateCounter();
        }, 1000);
    }

    function stopCounter() {
        clearInterval(intervalId);
    }

    function incrementCounter() {
        count++;
        updateCounter();
    }

    function decrementCounter() {
        count--;
        updateCounter();
    }

    function likeCounter() {
        likes[count] = likes[count] ? likes[count] + 1 : 1;
        renderLikes();
    }

    function renderLikes() {
        likesList.innerHTML = "";
        for (let num in likes) {
            let li = document.createElement('li');
            li.textContent = `${num} has ${likes[num]} likes`;
            likesList.appendChild(li);
        }
    }

    function togglePause() {
        if (paused) {
            resumeCounter();
        } else {
            pauseCounter();
        }
    }

    function pauseCounter() {
        paused = true;
        stopCounter();
        disableButtons();
        pauseButton.textContent = 'resume';
    }

    function resumeCounter() {
        paused = false;
        startCounter();
        enableButtons();
        pauseButton.textContent = 'pause';
    }

    function disableButtons() {
        minusButton.disabled = true;
        plusButton.disabled = true;
        heartButton.disabled = true;
    }

    function enableButtons() {
        minusButton.disabled = false;
        plusButton.disabled = false;
        heartButton.disabled = false;
    }

    function submitComment(event) {
        event.preventDefault();
        let commentText = commentInput.value.trim();
        if (commentText !== '') {
            let commentDiv = document.createElement('div');
            commentDiv.textContent = commentText;
            commentList.appendChild(commentDiv);
            commentInput.value = '';
        }
    }

    startCounter();

    minusButton.addEventListener('click', decrementCounter);
    plusButton.addEventListener('click', incrementCounter);
    heartButton.addEventListener('click', likeCounter);
    pauseButton.addEventListener('click', togglePause);
    commentForm.addEventListener('submit', submitComment);
});
