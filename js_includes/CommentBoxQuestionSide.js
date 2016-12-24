/* This software is licensed under a BSD license; see the LICENSE file for details. */

(function () {

var __CommentBoxQuestionSide_callback__ = null;
var __CommentBoxQuestionSides_answers__ = null;

$.widget("ui.CommentBoxQuestionSide", {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        this.finishedCallback = this.options._finishedCallback;

        var CommentBoxQuestionSideField = "CommentBoxQuestionSide (NULL if none).";
        var answerField = "Answer";
        var correctField = "Whether or not answer was correct (NULL if N/A)";
        var timeField = "Time taken to answer.";
		var hasFeedback = dget(this.options, "hasFeedback", false);
		var isFeedback = dget(this.options, "isComment", false);
		
        this.element.addClass(this.cssPrefix + "CommentBoxQuestionSide");

        this.CommentBoxQuestionSide = dget(this.options, "q");

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
            assert(foundIt, "Value of 'hasCorrect' option not recognized in CommentBoxQuestionSide");
        }
        this.timeout = dget(this.options, "timeout", null);
        this.instructions = dget(this.options, "instructions");
		this.target = dget(this.options, "target");
		
        if (! (this.hasCorrect === false))
            assert(typeof(this.hasCorrect) == "number" && this.hasCorrect < this.answers.length,
                   "Bad index for correct answer in CommentBoxQuestionSide");

        this.setFlag = function(correct) {
			return 1;
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


        if (this.CommentBoxQuestionSide) {
            this.qp = $(document.createElement("p"))
            .addClass(this.cssPrefix + "CommentBoxQuestionSide-text")
            .css('text-align', conf_centerItems ? 'center' : 'left')
            .append(this.CommentBoxQuestionSide);
        }
		this.xl = $(document.createElement("textarea")).attr("id", "comments").attr("rows", 3).attr("columns", 50).css('margin-left', "2em").css('padding-left', 0);
		
		this.xlbutton= $(document.createElement("div")).text("Continue").addClass(this.cssPrefix + "fake-link").click( function() {
			comments = $("#comments").val();
			__CommentBoxQuestionSide_callback__(comments); 
			__QuestionSide_already = false;
		}
		
		);
		var t = this; // 'this' doesn't behave as a lexically scoped variable so can't be
                      // captured in the closure defined below.
        __CommentBoxQuestionSide_callback__ = function (val) {
            var answerTime = new Date().getTime();
            t.setFlag(val);
            t.finishedCallback([[[CommentBoxQuestionSideField, t.CommentBoxQuestionSide ? csv_url_encode(t.CommentBoxQuestionSide) : "NULL"],[answerField, val], [correctField, "NULL"],[timeField, answerTime - t.creationTime]]]);
        }

        if (! (this.qp === undefined))
            this.element.append(this.qp);
		this.element.append(this.xl).append(this.xlbutton);

        if (this.timeout) {
            var t = this;
            this.utils.setTimeout(function () {
                var answerTime = new Date().getTime();
                t.setFlag(false);
                t.finishedCallback([[[CommentBoxQuestionSideField, t.CommentBoxQuestionSide ? csv_url_encode(t.CommentBoxQuestionSide) : "NULL"],[answerField, "NULL"], [correctField, "NULL"],[timeField, answerTime - t.creationTime]]]);
            }, this.timeout);
        }

        // Store the time when this was first displayed.
        this.creationTime = new Date().getTime();
    }
});

})();

ibex_controller_set_properties("CommentBoxQuestionSide", {
    obligatory: ["as"],
    htmlDescription: function(opts) {
        return $(document.createElement("div")).text(opts.q || "");
    }
});
