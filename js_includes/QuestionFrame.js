/* This software is licensed under a BSD license; see the LICENSE file for details. */

$.widget("ui.QuestionFrame", {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.utils = this.options._utils;
        this.finishedCallback = this.options._finishedCallback;
		
        var questionField = "After you hear the following audio clip, you will have 5 seconds to judge the utterance. Use the mouse to select your choice.  You will then be asked three additional questions. After the initial question, you will be able to listen to the audio again as many times as you like.";
        var answerField = "Answer";
        var correctField = "Whether or not answer was correct (NULL if N/A)";
        var timeField = "Time taken to answer.";
		
		var t = this;
		this.file = this.options.f;
		var mainDiv = $(document.createElement("div"))
			.addClass(this.cssPrefix + "div")
			.appendTo(this.element);
		
			
		var seekInfo = []
			
		// var audio = $(document.createElement("audio"))
		// 	.attr({ src: this.file, controls: true, onplay: "test()"})
		// 	    	.addClass(this.cssPrefix + "audio")
		// 	    	.appendTo(mainDiv);
		//
		// //http://jsfiddle.net/aarongloege/fzXsT/light/
		// $(".AudioPresentation-audio")[0].addEventListener("play", function() {
		// 	console.log("play");
		// 	console.log(this.currentTime);
		// 	now = new Date().getTime();
		// 	console.log(now-creationTime);
		// 	seekInfo.push({"type": "play", "loc": this.currentTime, "time": now-creationTime});
		//
		// 	t.finishedCallback([[["type", "play"],
		// 						["loc", this.currentTime],
		// 						["time", now-creationTime]]]);
		//
		// 	}
		// );
		//
		// $(".AudioPresentation-audio")[0].addEventListener("pause", function() {
		// 	console.log("pause");
		// 	console.log(this.currentTime);
		// 	now = new Date().getTime();
		// 	console.log(now-creationTime);
		// 	seekInfo.push({"type": "pause", "loc": this.currentTime, "time": now-creationTime});
		//
		// 	}
		// );
		//
		//
		// $(".AudioPresentation-audio")[0].addEventListener("seeking", function() {
		// 	console.log("seek");
		// 	console.log(this.currentTime);
		// 	now = new Date().getTime();
		// 	console.log(now-creationTime);
		// 	seekInfo.push({"type": "seeking", "loc": this.currentTime, "time": now-creationTime});
		// 	}
		// );

		var creationTime = new Date().getTime();
	var opts = {
            options:     this.options,
            triggers:    [3,4,5],
            children:    [
			"AudioPresentation", {"f": this.options.f},
			"FlashSentence", {	s: this.options.s},
			"QuestionSide", {q: "How natural does the speaker's tone of voice sound?", 
			            as: ["1", "2", "3", "4", "5"],
			            presentAsScale: true,
			            leftComment: "Awkward",//"Very Odd",
			            rightComment: "Perfectly Normal",
			            },
			
			"Question", {
 							q:              "What is the emotion being conveyed here?",
                            as:             this.options.as,
                            hasCorrect:     false,
							followupMessage: null,
                            presentAsScale: false,
                            autoFirstChar:  false,
                            randomOrder:    false,
                            showNumbers:    false,
                            timeout:        this.options.timeout,
                            instructions:   this.options.instructions,
							target:         this.options.target, 
                            leftComment:    this.options.leftComment,
                            rightComment:   this.options.rightComment
							},

			"QuestionB", {
 							q:              "What is the intensity of the speaker's emotion? How expressive do they sound?",
                            as:             ["1","2","3","4","5"],
                            hasCorrect:     false,
							followupMessage: null,
                            presentAsScale: true,
                            autoFirstChar:  false,
                            randomOrder:    false,
                            showNumbers:    false,
                            timeout:        this.options.timeout,
                            instructions:   this.options.instructions,
							target:         this.options.target, 
                            leftComment:    "Low, not expressive",
                            rightComment:   "High, very expressive"
							},
							
			"FreeTextQuestion", {
							q:              "Does the sentence the speaker uttered explain why they felt the particular emotion? Why or why not?",
	                        as:             ["1","2","3","4","5"],
	                        hasCorrect:     false,
							followupMessage: null,
	                        presentAsScale: true,
	                        autoFirstChar:  false,
	                        randomOrder:    false,
	                        showNumbers:    false,
	                        timeout:        this.options.timeout,
	                        instructions:   this.options.instructions,
							target:         this.options.target, 
	                        leftComment:    this.options.leftComment,
	                        rightComment:   this.options.rightComment
							}                          						
						]
/*,
            manipulators: [
                [0, function(div) { div.css('font-size', "larger"); return div; }]
            ]*/
        };

        this.element.VBox(opts);

				
    }
});

 ibex_controller_set_properties("QuestionFrame", { obligatory: ["f"],
       htmlDescription:
           function (opts) {
              return $(document.createElement("div")).text(opts.f)[0];
          }
});
