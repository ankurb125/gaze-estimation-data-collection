var quiz = {
    "JS": [
        {
            "id": 1,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "A345",
                    "b": "A765",
                    "c": "G76H",
                    "d": "9YTE"
                }
            ],
            "answer": "G76H",
            "score": 0,
            "status": ""
        },
        {
            "id": 2,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "B789",
                    "b": "DRE5",
                    "c": "WR34",
                    "d": "214L"
                }
            ],
            "answer": "214L",
            "score": 0,
            "status": ""
        },
        {
            "id": 3,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "Y764",
                    "b": "CFXZ",
                    "c": "87PY",
                    "d": "70IY"
                }
            ],
            "answer": "CFXZ",
            "score": 0,
            "status": ""
        },
        {
            "id": 4,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "23WE",
                    "b": "RT5E",
                    "c": "QW87",
                    "d": "756Q"
                }
            ],
            "answer": "RT5E",
            "score": 0,
            "status": ""
        },
        {
            "id": 5,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "87OI",
                    "b": "45DR",
                    "c": "TY7E",
                    "d": "EWRT"
                }
            ],
            "answer": "TY7E",
            "score": 0,
            "status": ""
        },
        {
            "id": 6,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "F4EM",
                    "b": "XCFF",
                    "c": "78PI",
                    "d": "997L"
                }
            ],
            "answer": "997L",
            "score": 0,
            "status": ""
        },
        {
            "id": 7,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "4VVC",
                    "b": "H34D",
                    "c": "2W3E",
                    "d": "4RUI"
                }
            ],
            "answer": "4RUI",
            "score": 0,
            "status": ""
        },
        {
            "id": 8,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "3FD6",
                    "b": "HI63",
                    "c": "LC4T",
                    "d": "32JI"
                }
            ],
            "answer": "HI63",
            "score": 0,
            "status": ""
        },
        {
            "id": 9,
            "question": "What was the string inside the circle?",
            "options": [
                {
                    "a": "ZBH7",
                    "b": "978I",
                    "c": "LKJ4",
                    "d": "36MN"
                }
            ],
            "answer": "LKJ4",
            "score": 0,
            "status": ""
        }
        
       
    ]
}

/**
 * 
 * @param {@type number} problemCount 
 */
var quizApp = function (_problemCount) {
    this.score = 0;
    this.qno = 1;
    this.currentque = _problemCount;
    var totalque = quiz.JS.length;
    this.displayQuiz = function (cque) {
        this.currentque = cque;
        if (this.currentque < totalque) {
            $("#tque").html(totalque);
            $("#previous").attr("disabled", false);
            $("#next").attr("disabled", false);
            $("#qid").html(quiz.JS[this.currentque].id + '.');
            $("#question").html(quiz.JS[this.currentque].question);
            $("#question-options").html("");
            for (var key in quiz.JS[this.currentque].options[0]) {
                if (quiz.JS[this.currentque].options[0].hasOwnProperty(key)) {
                    $("#question-options").append(
                        "<div class='form-check option-block'>" +
                        "<label class='form-check-label'>" +
                        "<input type='radio' class='form-check-input' name='option' id='q" + key + "' value='" + quiz.JS[this.currentque].options[0][key] + "'><span id='optionval'>" +
                        quiz.JS[this.currentque].options[0][key] +
                        "</span></label>"
                    );
                }
            }
        }
        if (this.currentque <= 0) {
            $("#previous").attr("disabled", true);
        }
        if (this.currentque >= totalque) {
            $('#next').attr('disabled', true);
            for (var i = 0; i < totalque; i++) {
                this.score = this.score + quiz.JS[i].score;
            }
            return this.showResult(this.score);
        }
    }
    // Finally shows result altogether
    this.showResult = function (scr) {
        return;
        $("#result").addClass('result');
        $("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr + '/' + totalque + "</h1>");
        for (var j = 0; j < totalque; j++) {
            var res;
            if (quiz.JS[j].score == 0) {
                res = '<span class="wrong">' + quiz.JS[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
            } else {
                res = '<span class="correct">' + quiz.JS[j].score + '</span><i class="fa fa-check c-correct"></i>';
            }
            $("#result").append(
                '<div class="result-question"><span>Q ' + quiz.JS[j].id + '</span> &nbsp;' + quiz.JS[j].question + '</div>' +
                '<div><b>Correct answer:</b> &nbsp;' + quiz.JS[j].answer + '</div>' +
                '<div class="last-row"><b>Score:</b> &nbsp;' + res +
                '</div>'
            );
        }
    }
    /**
     * Not used any longer
     * @param {@type ( 0 | 1)} scr 
     * @param {@type number} problemCount 
     */
    this.showResultIndidual = function (scr, problemCount) {
        console.assert((scr == 0 | scr == 1), "Score is not either 0 or 1.")
        $("#result").addClass('result');
        // what is scr?
        $("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr + '/' + totalque + "</h1>");

        var res = "";
        if (quiz.JS[problemCount].score == 0) {
            res = '<span class="wrong">' + quiz.JS[problemCount].score + '</span><i class="fa fa-remove c-wrong"></i>';
        } else {
            res = '<span class="correct">' + quiz.JS[problemCount].score + '</span><i class="fa fa-check c-correct"></i>';
        }
        $("#result").append(
            '<div class="result-question"><span>Q ' + quiz.JS[problemCount].id + '</span> &nbsp;' + quiz.JS[problemCount].question + '</div>' +
            '<div><b>Correct answer:</b> &nbsp;' + quiz.JS[problemCount].answer + '</div>' +
            '<div class="last-row"><b>Score:</b> &nbsp;' + res +
            '</div>'
        );

    }
    // TODO: add transition from quiz -> circle with incremented problemCount using url params
    /**
     * 
     * @param {@type boolean} option 
     */
    this.checkAnswer = function (option) {
        var answer = quiz.JS[this.currentque].answer;
        option = option.replace(/</g, "&lt;") //for <
        option = option.replace(/>/g, "&gt;") //for >
        option = option.replace(/"/g, "&quot;")
        if (option == quiz.JS[this.currentque].answer) {
            if (quiz.JS[this.currentque].score == "") {
                quiz.JS[this.currentque].score = 1;
                quiz.JS[this.currentque].status = "correct";
                return true;
            }
        } else {
            quiz.JS[this.currentque].status = "wrong";
            return false;
        }
    }
    this.changeQuestion = function (cque) {
        this.currentque = this.currentque + cque;
        this.displayQuiz(this.currentque);
    }
}

const MAX_PROBLEM_COUNT = 1

// Gets query
let url = new URL(
    window.location.href
);
console.log(url)
let params = new URLSearchParams(url.search);
let problemCountRawStr = params.get("problemCount"); // string
const problemCount = parseInt(problemCountRawStr)
console.assert(problemCount >= 0, "problemCount is invalid")
console.log(problemCount)
const initProblem = () => {
    // We have to pass probleCount to this instance
    var jsq = new quizApp(problemCount);
    var selectedopt;
    $(document).ready(function () {
        jsq.displayQuiz(jsq.currentque);
        $('#question-options').on('change', 'input[type=radio][name=option]', function (e) {
            //var radio = $(this).find('input:radio');
            $(this).prop("checked", true);
            selectedopt = $(this).val();
        });
    });

    $('#next').click(function (e) {

        e.preventDefault();
        console.log("selectedopt:")
        console.log(selectedopt)
        if (selectedopt) {
            if (jsq.checkAnswer(selectedopt)) {
                window.location.href = `circle.html?problemCount=${problemCount + 1}`;
            } else {
                alert("You are wrong! Try again!")
                // jsq.showResultIndidual(jsq.score, problemCount)
                // if she/he get 
                window.location.href = `circle.html?problemCount=${problemCount}`;
            }
            // jsq.changeQuestion(1);
        } else {
            alert("Select an option!")
        }

    });
    $('#previous').click(function (e) {
        e.preventDefault();
        if (selectedopt) {
            jsq.checkAnswer(selectedopt);
        }
        jsq.changeQuestion(-1);
    });



}




if (problemCount ==9) {
    alert("You reached the end!")
    // Do nothing for now
} else {
    initProblem()
}

