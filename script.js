document.addEventListener('DOMContentLoaded', () => {
    // Perfume creation functionality
    document
        .getElementById('create-perfume-btn')
        .addEventListener('click', () => {
            const perfumeName =
                document.getElementById('perfume-name').value || 'Mon Parfum Jamaïcain';

            const result = `🎉 Félicitations ! Votre parfum "${perfumeName}" a été créé.`;
            document.getElementById('perfume-result').textContent = result;

            // Generate luxury perfume bottle image
            const canvas = document.getElementById('perfume-image');
            if (canvas && canvas.getContext) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw bottle with gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, '#FFD700'); // Gold
                gradient.addColorStop(0.5, '#FFF8DC'); // Light ivory for a glass effect
                gradient.addColorStop(1, '#C0A17B'); // Light bronze
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(90, 50);
                ctx.bezierCurveTo(60, 50, 60, 250, 90, 270);
                ctx.lineTo(160, 270);
                ctx.bezierCurveTo(190, 250, 190, 50, 160, 50);
                ctx.closePath();
                ctx.fill();

                // Add cap with gradient and striures
                const capGradient = ctx.createLinearGradient(0, 0, 0, 60);
                capGradient.addColorStop(0, '#3E3E3E');
                capGradient.addColorStop(1, '#696969');
                ctx.fillStyle = capGradient;
                ctx.fillRect(85, 0, 80, 60); // Centered cap and enlarged

                // Add striures to the cap
                ctx.fillStyle = '#2C2C2C';
                for (let i = 0; i < 8; i++) {
                    ctx.fillRect(85 + i * 10, 0, 5, 60);
                }

                // Add shine to the bottle
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.moveTo(100, 70);
                ctx.bezierCurveTo(110, 20, 140, 20, 150, 70);
                ctx.lineTo(140, 90);
                ctx.bezierCurveTo(130, 50, 120, 50, 110, 90);
                ctx.closePath();
                ctx.fill();

                // Draw label with outline
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(80, 130, 100, 50); // Enlarged and centered label
                ctx.strokeStyle = '#C0A17B';
                ctx.lineWidth = 2;
                ctx.strokeRect(80, 130, 100, 50);

                // Add perfume name
                ctx.fillStyle = '#000000';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(perfumeName, 130, 160);
            }
        });

    // Quiz game functionality
    const quizQuestions = [{
            question: '🥥 Quel ingrédient est une note de tête courante dans les parfums jamaïcains ?',
            answer: 'noix de coco',
            hint: 'Un fruit tropical souvent utilisé dans les cocktails.',
        },
        {
            question: '🌺 Quelle est une note de cœur clé utilisée dans les parfums tropicaux ?',
            answer: 'hibiscus',
            hint: "Une fleur souvent associée à l'exotisme et aux îles tropicales.",
        },
        // More questions can be added here...
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function loadNewQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const question = quizQuestions[currentQuestionIndex];
            document.getElementById('quiz-question').textContent = question.question;
            document.getElementById('quiz-progress').textContent = `Question ${
        currentQuestionIndex + 1
      }/${quizQuestions.length}`;
            document.getElementById('quiz-result').textContent = '';
            document.getElementById('hint').textContent = '';
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        document.getElementById('quiz-question').textContent = 'Quiz terminé !';
        document.getElementById(
            'quiz-result'
        ).textContent = `Votre score final est de ${score}/${quizQuestions.length}. Merci d'avoir participé !`;
        document.getElementById('quiz-answer').style.display = 'none';
        document.getElementById('submit-answer-btn').style.display = 'none';
        document.getElementById('quiz-progress').style.display = 'none';
    }

    document.getElementById('submit-answer-btn').addEventListener('click', () => {
        const userAnswer = document
            .getElementById('quiz-answer')
            .value.trim()
            .toLowerCase();
        const correctAnswer =
            quizQuestions[currentQuestionIndex].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            score++;
            document.getElementById('quiz-result').textContent =
                '✅ Correct ! Bien joué !';
        } else {
            document.getElementById(
                'quiz-result'
            ).textContent = `❌ Oups ! La bonne réponse était "${quizQuestions[currentQuestionIndex].answer}".`;
        }

        currentQuestionIndex++;
        document.getElementById('quiz-answer').value = '';
        setTimeout(loadNewQuestion, 1500);
    });

    // Load the first question
    loadNewQuestion();
});