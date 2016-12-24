/* This software is licensed under a BSD license; see the LICENSE file for details. */

(function () {

var __QuestionSide_callback__ = null;
var __QuestionSides_answers__ = null;

$.widget("ui.QuestionSide", {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        this.finishedCallback = this.options._finishedCallback;

        var QuestionSideField = "QuestionSide (NULL if none).";
        var answerField = "Answer";
        var correctField = "Whether or not answer was correct (NULL if N/A)";
        var timeField = "Time taken to answer.";

		//http://stackoverflow.com/questions/1191865/code-for-a-simple-javascript-countdown-timer
		var Countdown = function(options) {
		  var timer,
		  instance = this,
		  seconds = options.seconds || 10,
		  updateStatus = options.onUpdateStatus || function () {},
		  counterEnd = options.onCounterEnd || function () {};

		  function decrementCounter() {
		    updateStatus(seconds);
		    if (seconds === 0) {
		      counterEnd();
		      instance.stop();
		    }
		    seconds--;
		  }

		  this.start = function () {
		    clearInterval(timer);
		    timer = 0;
		    seconds = options.seconds;
		    timer = setInterval(decrementCounter, 1000);
		  };

		  this.stop = function () {
		    clearInterval(timer);
		  };
		}


        this.element.addClass(this.cssPrefix + "QuestionSide");
        this.element.addClass("hidden");

        this.QuestionSide = dget(this.options, "q");
        this.answers = this.options.as;

        this.hasCorrect = dget(this.options, "hasCorrect", false);
        // hasCorrect is either false, indicating that there is no correct answer,
        // true, indicating that the first answer is correct, or an integer giving
        // the index of the correct answer, OR a string giving the correct answer.
        // Now we change it to either false or an index.
        if (this.hasCorrect === true)
            this.hasCorrect = 0;
        if (typeof(this.hasCorrect) == "string") {
            var foundIt = false;
            for (var i = 0; i < this.answers.length; ++i) {
                if (this.answers[i].toLowerCase() == this.hasCorrect.toLowerCase()) {
                    this.hasCorrect = i;
                    foundIt = true;
                    break;
                }
            }
            assert(foundIt, "Value of 'hasCorrect' option not recognized in QuestionSide");
        }
        this.showNumbers = dget(this.options, "showNumbers", true);
        this.presentAsScale = dget(this.options, "presentAsScale", false);
        this.randomOrder = dget(this.options, "randomOrder", ! (this.hasCorrect === false || this.presentAsScale));
        this.timeout = dget(this.options, "timeout", 5);
        this.instructions = dget(this.options, "instructions");
        this.leftComment = dget(this.options, "leftComment");
        this.rightComment = dget(this.options, "rightComment");
        this.autoFirstChar = dget(this.options, "autoFirstChar", false);
    this.target = dget(this.options, "target");
    
        if (! (this.hasCorrect === false))
            assert(typeof(this.hasCorrect) == "number" && this.hasCorrect < this.answers.length,
                   "Bad index for correct answer in QuestionSide");

        if (this.randomOrder) {
            this.orderedAnswers = new Array(this.answers.length);
            for (var i = 0; i < this.answers.length; ++i)
                this.orderedAnswers[i] = this.answers[i];
            fisherYates(this.orderedAnswers);
        }
        else {
            this.orderedAnswers = this.answers;
        }

        this.setFlag = function(correct) {
            if (! correct) {
                this.utils.setValueForNextElement("failed", true);
            }
        }

        if (this.instructions) {
            this.element.append($(document.createElement("p"))
                                .addClass(this.cssPrefix + "instructions-text")
                                .css('text-align', conf_centerItems ? 'center' : 'left')
                                .text(this.instructions));

      		this.element.append($(document.createElement("p"))
                .addClass(this.cssPrefix + "target-text")
                      .css('text-align', conf_centerItems ? 'center' : 'left')
                      .text(this.target));

        }


        if (this.QuestionSide) {
            this.qp = $(document.createElement("p"))
            .addClass(this.cssPrefix + "QuestionSide-text")
            .css('style', conf_centerItems ? 'clear' : 'both' )
            .append(this.QuestionSide);
			
			this.timeoutS = $(document.createElement("span")).addClass(this.cssPrefix + "QuestionSide-timeout").append(this.timeout);
			this.timeoutD = $(document.createElement("span"))
            .addClass(this.cssPrefix + "timer")
            .append("Time left: ");
			this.qp.append(this.timeoutD);
			
			this.timeoutD.append(this.timeoutS);
        }
		
		
        this.xl = $(document.createElement(((! this.presentAsScale) && this.showNumbers) ? "ol" : "ul"))
            .css('margin-left', "2em").css('padding-left', 0);
        __QuestionSide_answers__ = new Array(this.answers.length);

        if (this.presentAsScale && this.leftComment) {
            var lcd = $(document.createElement("li"))
                      .addClass(this.cssPrefix + "scale-comment-box")
                      .append(this.leftComment);
            this.xl.append(lcd);
        }
		
		var t2 = this;
		t2.selectedAgain = false;

		t2.myCounter = new Countdown({  
		    seconds:this.timeout,  // number of seconds to count down
		    onUpdateStatus: function(sec){
					$("."+t2.cssPrefix + "QuestionSide-timeout").text(sec);
			}, // callback for each second
		    onCounterEnd: function(){} // final action
		});
		__timer__ = t2.myCounter;
		
        for (var i = 0; i < this.orderedAnswers.length; ++i) {
            var li;
            li = $(document.createElement("li"));
            if (this.presentAsScale) {
                li.addClass(this.cssPrefix + "scale-box");
                var t = this;
                 // IE doesn't support :hover for anything other than links, so we
                 // have to use JS.
                 (function (li) {
                     li.mouseover(function () {
						 if(!t2.selected) {
                         li.css('border-color', "black")
                           .css('cursor', 'pointer');
					     }
                     });
                     li.mouseout(function () {
						 if(!t2.selected) {
                         li.css('border-color', "#9ea4b1")
                           .css('cursor', "default");
					   }
                     });
                 })(li);
            }
            else {
                li.addClass(this.cssPrefix + "normal-answer");
            }
            (function(i) {
                li.click(function () {
					t2.myCounter.stop();
					$(t2.timeoutD).addClass("hidden2");
					t2.selected = this; 
					__QuestionSide_callback__(i); 
				}
			);
            })(i);
            var ans = typeof(this.orderedAnswers[i]) == "string" ? this.orderedAnswers[i] : this.orderedAnswers[i][1];
            var t = this; // 'this' doesn't behave as a lexically scoped variable so can't be
                          // captured in the closure defined below.
			
            var a = $(document.createElement("span")).addClass(this.cssPrefix + "fake-link");
            __QuestionSide_answers__[i] = ans;
            __QuestionSide_callback__ = function (i) {
				if(t2.selectedAgain){
					return;
				} else{
					console.log(i);
					$(t2.selected).css('border-color', "red");
					t2.selectedAgain = true;
					$(".hidden").removeClass("hidden")
				}
                var answerTime = new Date().getTime();
                var ans = __QuestionSide_answers__[i];
                var correct = "NULL";
                if (! (t.hasCorrect === false)) {
                    var correct_ans = typeof(t.answers[t.hasCorrect]) == "string" ? t.answers[t.hasCorrect] : t.answers[t.hasCorrect][1];
                    correct = (ans == correct_ans ? 1 : 0);
                    t.setFlag(correct);
                }
                t.finishedCallback([[[QuestionSideField, t.QuestionSide ? csv_url_encode(t.QuestionSide) : "NULL"],
                                     [answerField, csv_url_encode(ans)],
                                     [correctField, correct],
                                     [timeField, answerTime - t.creationTime]]]);
            };
            this.xl.append(li.append(a.append(ans)));
        }
        if (this.presentAsScale && this.rightComment) {
            this.xl.append($(document.createElement("li"))
                           .addClass(this.cssPrefix + 'scale-comment-box')
                           .append(this.rightComment));
        }

        if (! (this.qp === undefined)) {
            this.element.append(this.qp);
//			this.element.append(this.timeoutD);
		}
        // Again, using tables to center because IE sucks.
        var table = $("<table" + (conf_centerItems ? " align='center'" : "") + ">");
        var tr = $(document.createElement("tr"));
        var td = $("<td" + (conf_centerItems ? " align='center'" : "") + ">")
        if (conf_centerItems)
            td.attr('align', 'center');
        this.element.append(table.append(tr.append(td.append(this.xl))));


        if (this.timeout) {
            var t = this;
            this.utils.setTimeout(function () {
                var answerTime = new Date().getTime();
                t.setFlag(false);
                t.finishedCallback([[[QuestionSideField, t.QuestionSide ? csv_url_encode(t.QuestionSide) : "NULL"],
                                     [answerField, "NULL"], [correctField, "NULL"],
                                     [timeField, answerTime - t.creationTime]]]);
            }, this.timeout);
        }

        // TODO: A bit of code duplication in this function.
        var t = this;
        this.safeBind($(document), 'keydown', function(e) {
            var code = e.keyCode;
            var time = new Date().getTime();

            var answerTime = new Date().getTime();
            if ((! t.presentAsScale) && t.showNumbers &&
                ((code >= 48 && code <= 57) || (code >= 96 && code <= 105))) {
                // Convert numeric keypad codes to ordinary keypad codes.
                var n = code >= 96 ? code - 96 : code - 48;
                if (n > 0 && n <= t.orderedAnswers.length) {
                    var ans = typeof(t.orderedAnswers[n-1]) == "string" ? t.orderedAnswers[n-1] : t.orderedAnswers[n-1][1];
                    var correct = "NULL";
                    if (! (t.hasCorrect === false)) {
                        var correct_ans = typeof(t.answers[t.hasCorrect]) == "string" ? t.answers[t.hasCorrect] : t.answers[t.hasCorrect][1];
                        correct = (correct_ans == ans ? 1 : 0);
                        t.setFlag(correct);
                    }
                    t.finishedCallback([[[QuestionSideField, t.QuestionSide ? csv_url_encode(t.QuestionSide) : "NULL"],
                                         [answerField, csv_url_encode(ans)],
                                         [correctField, correct],
                                         [timeField, answerTime = t.creationTime]]]);

                    return false;
                }
                else {
                    return true;
                }
            }
            // Letters (and numbers in the case of scales).
            else if ((code >= 65 && code <= 90) || (t.presentAsScale && ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)))) {
                // Convert numeric keypad codes to ordinary keypad codes.
                code = (code >= 96 && code <= 105) ? code - 48 : code;
                for (var i = 0; i < t.answers.length; ++i) {
                    var ans = null;
                    if (typeof(t.answers[i]) == "string") {
                        if (t.autoFirstChar && code == t.answers[i].toUpperCase().charCodeAt(0))
                            ans = t.answers[i];
                    }
                    else {
                        if (code == t.answers[i][0].toUpperCase().charCodeAt(0))
                            ans = t.answers[i][1];
                    }

                    if (ans) {
                        var correct = "NULL";
                        if (! (t.hasCorrect === false)) {
                            var correct_ans = typeof(t.answers[t.hasCorrect]) == "string" ? t.answers[t.hasCorrect] : t.answers[t.hasCorrect][1];
                            correct = (correct_ans == ans ? 1 : 0);
                            t.setFlag(correct);
                        }
                        t.finishedCallback([[[QuestionSideField, t.QuestionSide ? csv_url_encode(t.QuestionSide) : "NULL"],
                                             [answerField, csv_url_encode(ans)],
                                             [correctField, correct],
                                             [timeField, answerTime - t.creationTime]]]);

                        return false;
                    }
                }
            }

            return true;
        });

        // Store the time when this was first displayed.
        this.creationTime = new Date().getTime();
		//t2.myCounter.start();
    }
});

})();

ibex_controller_set_properties("QuestionSide", {
    obligatory: ["as"],
    htmlDescription: function(opts) {
        return $(document.createElement("div")).text(opts.q || "");
    }
});