var app = new Vue({
    el: '#app',
    data: {
        questions: [],
        quizIntro: true,
        quizStart: false,
        quizFailed: false,
        quizSuccess: false,
        maxCorrectAnswers: 12,
        currentQuestion: null,
        currentDate: '',
        currentTime: '',
        currentQuestionIndex: 0,
        countCorrectAnswers: 0,
        ranOutOfQuestions: false,
        totalQuestions: 0,
        currentPageNumber: 0,
        pageNumber: 0,
        showQuiz: true,
        validPageNumbers: [],
        pageNotFound: false
    },
    mounted: function () {
        this.validPageNumbers.push(200);
        this.validPageNumbers.push(390);

        var initalPageNumber = 390;

        this.currentPageNumber = initalPageNumber;
        this.pageNumber = initalPageNumber;

        this.loadRandomData(); 
        this.getCurrentDatetime();

        setInterval(this.getCurrentDatetime, 5000);
    },
    methods: {
        getData: function (event) {
            this.loadData();
        },
        getCurrentDatetime: function(event) {
            var date = new Date();

            var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

            this.currentDate = months[date.getMonth()] + String(date.getDate()).padStart(2, '0');
            this.updateDatetime();
        },
        updateDatetime: function(event) {
            var date = new Date();

            this.currentTime = String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0')  + ":" + String(date.getSeconds()).padStart(2, '0') ;
        },
        startQuiz: function (event) {
            this.quizIntro = false;
            this.quizStart = true;
        },
        goToPage: function (val) {
            this.pageNumber = val;
            this.updatePageNumber();            
        },
        updatePageNumber: function (event) {
            this.currentPageNumber = this.pageNumber;

            var pageExists = this.validPageNumbers.indexOf(this.pageNumber);

            this.pageNotFound = (pageExists === -1);
        },
        resetQuiz: function (event) {
            this.quizStart = false;
            this.ranOutOfQuestions = false;
            this.quizFailed = false;
            this.quizSuccess = false;
            this.quizIntro = true;
            this.countCorrectAnswers = 0;
            this.currentQuestionIndex = 0;
            this.loadRandomData();
        },
        wonQuiz: function (event) {
            this.quizStart = false;
            this.quizSuccess = true;
        },
        failedQuiz: function (event) {
            this.quizStart = false;
            this.quizFailed = true;
        },
        noMoreQuestions: function (event) {
            this.ranOutOfQuestions = true;
            this.quizStart = false;
        },
        loadRandomData: function () {
            axios.get('assets/questions/general.json')
                .then(response => {
                    this.questions = [];
                    var quizJson = response.data;

                    var batchQuestions = quizJson.Questions;
                    
                    this.totalQuestions = batchQuestions.length;

                    var maxQuestions = this.maxCorrectAnswers;

                    if (maxQuestions > this.totalQuestions) {
                        maxQuestions = this.totalQuestions - 1;
                    }

                    // GET RANDOM INDEXES
                    var idxes = [];

                    while(idxes.length < this.maxCorrectAnswers){
                        var r = Math.floor(Math.random() * this.totalQuestions) + 1;
                        if(idxes.indexOf(r) === -1) idxes.push(r);
                    }

                    for(const idx in idxes) {
                        var questionIndex = idxes[idx];
                        this.questions.push(batchQuestions[questionIndex]);
                    }

                    this.currentQuestion = this.questions[this.currentQuestionIndex];

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {

                });
        },
        validateAnswer: function(selectedAnswer) {
            if (this.currentQuestion.CorrectAnswer === selectedAnswer) {
                this.countCorrectAnswers = this.countCorrectAnswers + 1;

                if (this.countCorrectAnswers === this.maxCorrectAnswers) {
                    this.wonQuiz();
                } else {
                    this.nextQuestion();
                }
                
            } else {
                this.failedQuiz();
            }
        },
        nextQuestion: function() {
            this.currentQuestionIndex = this.currentQuestionIndex + 1;

            var question = this.questions[this.currentQuestionIndex];

            if (question === undefined) {
                this.noMoreQuestions();
            } else {
                this.currentQuestion = this.questions[this.currentQuestionIndex];
            }

        }
    }
})