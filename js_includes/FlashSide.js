$.widget("ui.FlashSide", {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        this.finishedCallback = this.options._finishedCallback;

		var isFeedback = false;
		var isComment = false;

        var isContext = true;
		var qType = dget(this.options, "qType", "QuestionSide");
		var showClass = qType;
		
        if(this.options.target == "") {
            isContext = false;
        }

		if(this.options.feedback) {
			isFeedback = true;
//			showClass = "FeedbackQuestionSide"
		}

		if(this.options.comment) {
			isComment = true;
//			showClass = "CommentBoxQuestionSide";
		}

		
		var qSide = { q:              this.options.q,
                        as:             this.options.as,
                        hasCorrect:     dget(this.options, "hasCorrect", false),
                        presentAsScale: this.options.presentAsScale,
                        autoFirstChar:  this.options.presentAsScale ? true : false,
                        randomOrder:    this.options.randomOrder,
                        showNumbers:    this.options.showNumbers,
                        timeout:        this.options.timeout,
                        instructions:   this.options.instructions,
						target:         this.options.target, 
                        leftComment:    this.options.leftComment,
                        rightComment:   this.options.rightComment,
						qType: 			this.options.qType,
						hasContext:     isContext};

		if(isFeedback) {
			var feedbackQ = {q: this.options.feedbackQ,
							as:             this.options.feedbackAs,
                			hasCorrect:     false,
                			presentAsScale: false,
                			autoFirstChar:  this.options.presentAsScale ? true : false,
                			randomOrder:    this.options.randomOrder,
                			showNumbers:    this.options.showNumbers,
                			timeout:        this.options.timeout,
                			instructions:   "",
							target:         "", 
                			leftComment:    this.options.leftComment,
                			rightComment:   this.options.rightComment,
							isFeedback: true,
							hasContext:     isContext};

			qSide["hasFeedback"]= this.options.feedback;
		}
		
		if(isComment) {
			var commentQ = {q: this.options.commentQ,
                			hasCorrect:     false,
                			presentAsScale: false,
                			autoFirstChar:  this.options.presentAsScale ? true : false,
                			randomOrder:    this.options.randomOrder,
                			showNumbers:    this.options.showNumbers,
                			timeout:        this.options.timeout,
                			instructions:   "",
							target:         "", 
							isComment: true,
							hasContext:     isContext};

			qSide["hasComment"]= this.options.comment;
		}
		
		var Fsent = {s: dget(this.options, "s", ""), timeout: dget(this.options, "timeout", null), isContext: isContext, showClass: showClass};

		qSide["followupMessage"] = dget(this.options, "followupMessage", null);				
		qSide["overlays"] = dget(this.options, "overlays", null);				

		
        var opts = {
            options:     this.options};

		if(Fsent["s"] === "") {
			if(isFeedback) {
				feedbackQ["followupMessage"] = dget(this.options, "followupMessage", null);				
				opts["children"] = [qType, qSide, "FeedbackQuestionSide", feedbackQ];
				opts["triggers"] = [1];
			} else if(isComment){
				commentQ["followupMessage"] = dget(this.options, "followupMessage", null);				
				opts["children"] = [qType, qSide, "CommentBoxQuestionSide", commentQ];
				opts["triggers"] = [1];
			} else{
				qSide["followupMessage"] = dget(this.options, "followupMessage", null);				
				opts["children"] = [qType, qSide];
				opts["triggers"] = [0];
			}
		} else {
			if(isFeedback) {
				feedbackQ["followupMessage"] = dget(this.options, "followupMessage", null);				
				opts["children"] = ["FlashSentence", Fsent, qType, qSide, "FeedbackQuestionSide", feedbackQ];	
				opts["triggers"] = [2];
			} else if(isComment) {
				commentQ["followupMessage"] = dget(this.options, "followupMessage", null);				
				opts["children"] = ["FlashSentence", Fsent, qType, qSide, "CommentBoxQuestionSide", commentQ];	
				opts["triggers"] = [2];				
			} else {
				qSide["followupMessage"] = dget(this.options, "followupMessage", null);				
				opts["children"] = ["FlashSentence", Fsent, qType, qSide];	
				opts["triggers"] = [1];
				
			}
		}
/*,
            manipulators: [
                [0, function(div) { div.css('font-size', "larger"); return div; }]
            ]*/

/*		if(this.option.commentBox != false) {
			opts = merge_dicts(opts, {"Form", {html}} );
		}
*/
        this.element.VBoxB(opts);
    }
});

ibex_controller_set_properties("FlashSide",
    { obligatory: ["f", "s", "as"],
      htmlDescription:
          function (opts) {
              var s = ibex_controller_get_property("FlashSentence", "htmlDescription")(opts);
              var q = ibex_controller_get_property("Question", "htmlDescription")(opts);
              var p =
                  $(document.createElement("p"))
                  .append($(document.createElement("b"))
                          .append("Q: ")
                          .append($(q)))
                  .append($(document.createElement("br")))
                  .append($(document.createElement("b"))
                          .append("S: "))
                  .append($(s));

              return p;
          }
    }
);
