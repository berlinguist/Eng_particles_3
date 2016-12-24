/* This software is licensed under a BSD license; see the LICENSE file for details. */

$.widget("ui.PictureJudgment", {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        this.finishedCallback = this.options._finishedCallback;

        var opts = {
            options:     this.options,
            triggers:    [1],
            children:    [
			"PictureDisplay", {f: this.options.f},

			"FlashSide", {	s: this.options.s, 
							timeout: dget(this.options, "timeout", null),
 							q:              this.options.q,
                            as:             this.options.as,
                            hasCorrect:     dget(this.options, "hasCorrect", false),
							followupMessage: dget(this.options, "followupMessage", null),
							overlays: 		dget(this.options, "overlays", null),
                            presentAsScale: this.options.presentAsScale,
                            autoFirstChar:  this.options.presentAsScale ? true : false,
                            randomOrder:    this.options.randomOrder,
                            showNumbers:    this.options.showNumbers,
                            timeout:        this.options.timeout,
                            instructions:   this.options.instructions,
							target:         this.options.target, 
                            leftComment:    this.options.leftComment,
                            rightComment:   this.options.rightComment, 
							feedback: 		this.options.feedback,
							comment: 		this.options.comment,
							commentQ:	 	this.options.commentQ,
							feedbackQ:	 	this.options.feedbackQ,
							feedbackAs:		this.options.feedbackAs,
							qType: 			dget(this.options, "qType", "QuestionSide")},							
            "Caption", {message: "Assume the picture and text provide all necessary information."},
                          						
						]
/*,
            manipulators: [
                [0, function(div) { div.css('font-size', "larger"); return div; }]
            ]*/
        };

        this.element.HBox(opts);
    }
});

ibex_controller_set_properties("PictureJudgment",
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
