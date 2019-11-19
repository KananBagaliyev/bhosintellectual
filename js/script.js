(function() {
    var questions = [{
      question: "1.	1999-cu ilə aid bir filmdə bu aktrisanın canlandırdığı, uzun müddətdir xəstəxanada qalan personaj həkimdən taleyinin necə olacağını - yəni xəstəxanada qalacağını, yoxsa gedəcəyini soruşur. Aktrisanın son dövrlərdə hansı serialda çəkildiyini deyin.",
      choices: ["Stranger things", "Dark","Breaking Bad", "Sherlock Holmes"],
      correctAnswer: 0
    }, {
      question: "Bir zarafatyana mənbədə qeyd edilir ki, Nuhun gəmisində olarkən bu canlılar Nuhun xarici görünüşündən çox qorxmuş və onun nəzərinə çarpmamaq üçün müxtəlif yollar axtarmışdılar. Söhbətin hansı canlılardan getdiyini tapın.",
      choices: ["İlan", "Qurbağa","Buqələmun", "Meymun"],
      correctAnswer: 2
    }, {
      question: "Bir məqalədə yazılır ki, son vaxtlarda Fransada populyarlaşan X çox əlverişli idi, belə ki, onsuz da  qanunvericiliyə görə hər bir sürücü X-dan istifadə etməlidir. X-ı birinci növ təyini söz birləşməsi ilə ifadə edin.",
      choices: ["Qırmızı başlıqlı", "Sarı sarıqlı", "Sarı jilet", "Sənaye devrimi"],
      correctAnswer: 2
    }, {
      question: "Venesuelanın eks-prezidenti Uqo Çaves dəstəkçiləri ilə görüşlərinin birində stulu ONUN üçün boş qoymuşdu. Maraqlıdır ki, ONUN təsvir edildiyi bir çox şəkillərdə xronoloji cəhətdən səhv edilmişdir, çünki ONUN yaşadığı dövrdə stullar çox da yayılmamışdı. Söhbətin kimdən getdiyini tapın.",
      choices: ["Che Guevera", "İsa Məsih ", "Fidel Kastro", "Hitler"],
      correctAnswer: 1
    },{
        question:"Bir türkdilli mənbədə qeyd edilir ki, qədim dövrdə X daha çox isti havanın təsirindən qorunmaq üçün istifadə edilirdi və bu X-a indiki adının verilməsinə səbəb olmuşdu. X-ı tapın.",
        choices:["Çətir","Şəmsəddin","Papaq","Soyuducu"],
        correctAnswer: 0
    },{
        question: "Bir zarafatda qeyd edilir ki, qəribədir, amma Demetri Martin öz çıxışlarını əksərən əyləşərək həyata keçirir.Demetri Martinin hansı peşənin sahibi olduğunu tapın.",
        choices:["Komedyen","Aktyor","Mühəndis","Stend-up"],
        correctAnswer:3
    },{
        question:"TRİSKAY-DEKAFOBİYA-dan əziyyət çəkənləri BU qorxu həmişə “izləyir”. Onlar “Qara cümə” adlandırdıqları günlərdə qətllər, qəzalar, bədbəxtliklər çox olduğuna inanırlar. Bəs bu qrup insanlar nədən qorxurlar?",
        choices:["soyuqdan","qaranlıqdan","13 rəqəmindən","rütubətdən"],
        correctAnswer:2
    }];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Sual ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('Siz ' +questions.length + ' sualdan ' +
                   numCorrect + ' doğru cavab verdiniz.');
      return score;
    }
  })();


  function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

sortTable()




