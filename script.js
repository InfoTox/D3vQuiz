document.addEventListener('DOMContentLoaded', () => {
    let allQuestions = [];
    let quizQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Fonction pour charger les questions depuis le fichier JSON
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            allQuestions = data;
            quizQuestions = selectRandomQuestions(allQuestions, 20);
            startQuiz();
        });

    function selectRandomQuestions(questions, numberOfQuestions) {
        let shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numberOfQuestions);
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('score').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            let q = quizQuestions[currentQuestionIndex];
            document.getElementById('question').innerText = q.question;
            let optionsDiv = document.getElementById('options');
            optionsDiv.innerHTML = '';
            q.options.forEach(option => {
                let button = document.createElement('button');
                button.innerText = option;
                button.addEventListener('click', () => checkAnswer(option));
                optionsDiv.appendChild(button);
            });
        } else {
            endQuiz();
        }
    }

    function checkAnswer(selectedOption) {
        let q = quizQuestions[currentQuestionIndex];
        if (selectedOption === q.answer) {
            score++;
        }
        currentQuestionIndex++;
        showQuestion();
    }

    function endQuiz() {
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('score').style.display = 'block';
        document.getElementById('result').innerText = `Votre score est ${score} sur ${quizQuestions.length}`;
    }

    document.getElementById('restart-button').addEventListener('click', startQuiz);
});