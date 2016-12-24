// (This example file has been slimmed down and reformatted for ibex 0.3-beta11.)

//****PUT "intro" back into the seq vars for actual experiment****

var shuffleSequence = seq("intro", "first", chooseModN(3,modify("god_conf", "huh_conf", "oh_conf", "what_conf", "god_decl", "huh_decl", "oh_decl", "what_decl", "god_exclam", "huh_exclam", "oh_exclam", "what_exclam" )), "sr", "final");
//var shuffleSequence = seq("intro", "first", sepWith("sep", "pract"), "sr", "final");

//var practiceItemTypes = ["practice"];
var centerItems = false;


function Modify(set) {
    this.args = set;
    this.run = function(set) {
        var counter = __counter_value_from_server__;
        var l = set.length;
        var ind = counter % l;
        var newArray = [];
        newArray.push(set[ind]);
        return newArray;
    }
}
function modify(set) { return new Modify(modify.arguments) }

function ModifyB(set) {
    this.args = set;
    this.run = function(set) {
        var counter = __counter_value_from_server__;
        var l = set.length;
        var ind = counter % l;
        var newArray = [];
        newArray.push(set[ind]);
        return newArray;
    }
}
function modifyB(set) { return new ModifyB(modify.arguments) }


function ChooseModN(n, main) {
    this.args = [n,main];
    
    this.run = function(arrays) {
        var n = this.args[0]
        var main = arrays[0][0];
        var c= __counter_value_from_server__;
        
        
        var l = main.length;
        var ind = c % l;
        var newArray = [];
        newArray.push(main[ind]);
        return newArray;
        
        // if (main.length <= n || n < 0)
        //             return main[0];
        //         else {
        //             var newArray = [];
        //             newArray.push(main[n]);
        //             return newArray;
        //         }
    }
}
function chooseModN(n, main) { return new ChooseModN(n, main); }


var defaults = [
    "Separator", { transfer: 1000,
                   normalMessage: "Please wait for the next sentence.",
                   errorMessage: "Wrong. Please wait for the next sentence." },
    "DashedSentence", { mode: "self-paced reading" },
    "AcceptabilityJudgment", { as: ["1", "2", "3", "4", "5"],
                               presentAsScale: true,
                               instructions: "Use number keys or click boxes to answer.",
                               leftComment: "(Very Bad)", rightComment: "(Very Good)" },
    "PictureJudgment", { as: ["Left","Right", "Both", "Neither"],
                presentAsScale: true,
                    instructions: "Please indicate which picture is best described by the sentence.",
                target: "",
	            commentQ: "What would be a better way?"
                 },
    "AudioPresentation",{ as: ["Surprise -- something unexpected happened", 
    							"Anger -- annoyed or irritated at an event or situation", 
    							"Confusion -- trying to make sense of what is going on", 
    							"Excitement -- something positive has happened", 
    							"Neutral -- no obvious emotion"],
    							//presentAsScale: true,
    							//instructions: "Use number keys or click boxes to answer.",
    							//leftComment: "(Very Bad)", rightComment: "(Very Good)"
    			},				 
    "Question", { as: ["Surprise -- something unexpected happened", 
    							"Anger -- annoyed or irritated at an event or situation", 
    							"Confusion -- trying to make sense of what is going on", 
    							"Excitement -- something positive has happened", 
    							"Neutral -- no obvious emotion"],
    				//["1", "2", "3", "4", "5"],
  							presentAsScale: false,
  							//instructions: "Use number keys or click boxes to answer.",
   							//leftComment: "(Very Bad)", rightComment: "(Very Good)"
     							//hasCorrect: true 
   			},
    "Message", { hideProgressBar: true },
    "Form", { hideProgressBar: true }
];

var items = [

	["sr", "__SendResults__", { }],
    ["sep", "Separator", { }],
    ["intro", "Form", {
         html: { include: "example_intro.html" },}
    ],
    ["final", "Form", { continueMessage: null, html: { include: "final.html" } }
    ],

  ["first", "Separator", {normalMessage: "After you listen to the following audio clip, you will have 5 seconds to judge the utterance.  Use the mouse to select your choice.  You will then be asked three additional questions. After the initial question, you will be able to listen to the audio again as many times as you like. To continue, press any key." , transfer: "keypress"}],

["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_conf1.wav", sentenceDescType: "literal", s: "God you don't know how to tango" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_conf2.wav", sentenceDescType: "literal", s: "God I thought apples were in the sunflower family" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_conf3.wav", sentenceDescType: "literal", s: "God she's never done that before" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_conf4.wav", sentenceDescType: "literal", s: "God I've never heard that before" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_decl1.wav", sentenceDescType: "literal", s: "God we're out of flour" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_decl2.wav", sentenceDescType: "literal", s: "God I put the toolbox in the shed" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_decl3.wav", sentenceDescType: "literal", s: "God I'm on the phone" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_decl4.wav", sentenceDescType: "literal", s: "God another pile of papers to grade" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_exclam1.wav", sentenceDescType: "literal", s: "God he really likes it" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_exclam2.wav", sentenceDescType: "literal", s: "God a package arrived for you" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_exclam3.wav", sentenceDescType: "literal", s: "God you can't be serious right now" }],
["god_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cgod_exclam4.wav", sentenceDescType: "literal", s: "God there are a lot of cakes to choose from" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_conf1.wav", sentenceDescType: "literal", s: "Huh you don't know how to tango" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_conf2.wav", sentenceDescType: "literal", s: "Huh I thought apples were in the sunflower family" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_conf3.wav", sentenceDescType: "literal", s: "Huh she's never done that before" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_conf4.wav", sentenceDescType: "literal", s: "Huh I've never heard that before" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_decl1.wav", sentenceDescType: "literal", s: "Huh we're out of flour" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_decl2.wav", sentenceDescType: "literal", s: "Huh I put the toolbox in the shed" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_decl3.wav", sentenceDescType: "literal", s: "Huh I'm on the phone" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_decl4.wav", sentenceDescType: "literal", s: "Huh another pile of papers to grade" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_exclam1.wav", sentenceDescType: "literal", s: "Huh he really likes it" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_exclam2.wav", sentenceDescType: "literal", s: "Huh a package arrived for you" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_exclam3.wav", sentenceDescType: "literal", s: "Huh you can't be serious right now" }],
["huh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/chuh_exclam4.wav", sentenceDescType: "literal", s: "Huh there are a lot of cakes to choose from" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_conf1.wav", sentenceDescType: "literal", s: "Oh you don't know how to tango" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_conf2.wav", sentenceDescType: "literal", s: "Oh I thought apples were in the sunflower family" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_conf3.wav", sentenceDescType: "literal", s: "Oh she's never done that before" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_conf4.wav", sentenceDescType: "literal", s: "Oh I've never heard that before" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_decl1.wav", sentenceDescType: "literal", s: "Oh we're out of flour" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_decl2.wav", sentenceDescType: "literal", s: "Oh I put the toolbox in the shed" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_decl3.wav", sentenceDescType: "literal", s: "Oh I'm on the phone" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_decl4.wav", sentenceDescType: "literal", s: "Oh another pile of papers to grade" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_exclam1.wav", sentenceDescType: "literal", s: "Oh he really likes it" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_exclam2.wav", sentenceDescType: "literal", s: "Oh a package arrived for you" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_exclam3.wav", sentenceDescType: "literal", s: "Oh you can't be serious right now" }],
["oh_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/coh_exclam4.wav", sentenceDescType: "literal", s: "Oh there are a lot of cakes to choose from" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_conf1.wav", sentenceDescType: "literal", s: "What you don't know how to tango" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_conf2.wav", sentenceDescType: "literal", s: "What I thought apples were in the sunflower family" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_conf3.wav", sentenceDescType: "literal", s: "What she's never done that before" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_conf4.wav", sentenceDescType: "literal", s: "What I've never heard that before" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_decl1.wav", sentenceDescType: "literal", s: "What we're out of flour" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_decl2.wav", sentenceDescType: "literal", s: "What I put the toolbox in the shed" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_decl3.wav", sentenceDescType: "literal", s: "What I'm on the phone" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_decl4.wav", sentenceDescType: "literal", s: "What another pile of papers to grade" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_exclam1.wav", sentenceDescType: "literal", s: "What he really likes it" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_exclam2.wav", sentenceDescType: "literal", s: "What a package arrived for you" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_exclam3.wav", sentenceDescType: "literal", s: "What you can't be serious right now" }],
["what_conf", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/cwhat_exclam4.wav", sentenceDescType: "literal", s: "What there are a lot of cakes to choose from" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_conf1.wav", sentenceDescType: "literal", s: "God you don't know how to tango" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_conf2.wav", sentenceDescType: "literal", s: "God I thought apples were in the sunflower family" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_conf3.wav", sentenceDescType: "literal", s: "God she's never done that before" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_conf4.wav", sentenceDescType: "literal", s: "God I've never heard that before" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_decl1.wav", sentenceDescType: "literal", s: "God we're out of flour" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_decl2.wav", sentenceDescType: "literal", s: "God I put the toolbox in the shed" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_decl3.wav", sentenceDescType: "literal", s: "God I'm on the phone" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_decl4.wav", sentenceDescType: "literal", s: "God another pile of papers to grade" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_exclam1.wav", sentenceDescType: "literal", s: "God he really likes it" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_exclam2.wav", sentenceDescType: "literal", s: "God a package arrived for you" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_exclam3.wav", sentenceDescType: "literal", s: "God you can't be serious right now" }],
["god_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dgod_exclam4.wav", sentenceDescType: "literal", s: "God there are a lot of cakes to choose from" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_conf1.wav", sentenceDescType: "literal", s: "Huh you don't know how to tango" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_conf2.wav", sentenceDescType: "literal", s: "Huh I thought apples were in the sunflower family" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_conf3.wav", sentenceDescType: "literal", s: "Huh she's never done that before" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_conf4.wav", sentenceDescType: "literal", s: "Huh I've never heard that before" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_decl1.wav", sentenceDescType: "literal", s: "Huh we're out of flour" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_decl2.wav", sentenceDescType: "literal", s: "Huh I put the toolbox in the shed" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_decl3.wav", sentenceDescType: "literal", s: "Huh I'm on the phone" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_decl4.wav", sentenceDescType: "literal", s: "Huh another pile of papers to grade" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_exclam1.wav", sentenceDescType: "literal", s: "Huh he really likes it" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_exclam2.wav", sentenceDescType: "literal", s: "Huh a package arrived for you" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_exclam3.wav", sentenceDescType: "literal", s: "Huh you can't be serious right now" }],
["huh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dhuh_exclam4.wav", sentenceDescType: "literal", s: "Huh there are a lot of cakes to choose from" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_conf1.wav", sentenceDescType: "literal", s: "Oh you don't know how to tango" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_conf2.wav", sentenceDescType: "literal", s: "Oh I thought apples were in the sunflower family" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_conf3.wav", sentenceDescType: "literal", s: "Oh she's never done that before" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_conf4.wav", sentenceDescType: "literal", s: "Oh I've never heard that before" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_decl1.wav", sentenceDescType: "literal", s: "Oh we're out of flour" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_decl2.wav", sentenceDescType: "literal", s: "Oh I put the toolbox in the shed" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_decl3.wav", sentenceDescType: "literal", s: "Oh I'm on the phone" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_decl4.wav", sentenceDescType: "literal", s: "Oh another pile of papers to grade" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_exclam1.wav", sentenceDescType: "literal", s: "Oh he really likes it" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_exclam2.wav", sentenceDescType: "literal", s: "Oh a package arrived for you" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_exclam3.wav", sentenceDescType: "literal", s: "Oh you can't be serious right now" }],
["oh_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/doh_exclam4.wav", sentenceDescType: "literal", s: "Oh there are a lot of cakes to choose from" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_conf1.wav", sentenceDescType: "literal", s: "What you don't know how to tango" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_conf2.wav", sentenceDescType: "literal", s: "What I thought apples were in the sunflower family" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_conf3.wav", sentenceDescType: "literal", s: "What she's never done that before" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_conf4.wav", sentenceDescType: "literal", s: "What I've never heard that before" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_decl1.wav", sentenceDescType: "literal", s: "What we're out of flour" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_decl2.wav", sentenceDescType: "literal", s: "What I put the toolbox in the shed" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_decl3.wav", sentenceDescType: "literal", s: "What I'm on the phone" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_decl4.wav", sentenceDescType: "literal", s: "What another pile of papers to grade" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_exclam1.wav", sentenceDescType: "literal", s: "What he really likes it" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_exclam2.wav", sentenceDescType: "literal", s: "What a package arrived for you" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_exclam3.wav", sentenceDescType: "literal", s: "What you can't be serious right now" }],
["what_decl", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/dwhat_exclam4.wav", sentenceDescType: "literal", s: "What there are a lot of cakes to choose from" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_conf1.wav", sentenceDescType: "literal", s: "God you don't know how to tango" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_conf2.wav", sentenceDescType: "literal", s: "God I thought apples were in the sunflower family" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_conf3.wav", sentenceDescType: "literal", s: "God she's never done that before" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_conf4.wav", sentenceDescType: "literal", s: "God I've never heard that before" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_decl1.wav", sentenceDescType: "literal", s: "God we're out of flour" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_decl2.wav", sentenceDescType: "literal", s: "God I put the toolbox in the shed" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_decl3.wav", sentenceDescType: "literal", s: "God I'm on the phone" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_decl4.wav", sentenceDescType: "literal", s: "God another pile of papers to grade" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_exclam1.wav", sentenceDescType: "literal", s: "God he really likes it" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_exclam2.wav", sentenceDescType: "literal", s: "God a package arrived for you" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_exclam3.wav", sentenceDescType: "literal", s: "God you can't be serious right now" }],
["god_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/egod_exclam4.wav", sentenceDescType: "literal", s: "God there are a lot of cakes to choose from" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_conf1.wav", sentenceDescType: "literal", s: "Huh you don't know how to tango" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_conf2.wav", sentenceDescType: "literal", s: "Huh I thought apples were in the sunflower family" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_conf3.wav", sentenceDescType: "literal", s: "Huh she's never done that before" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_conf4.wav", sentenceDescType: "literal", s: "Huh I've never heard that before" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_decl1.wav", sentenceDescType: "literal", s: "Huh we're out of flour" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_decl2.wav", sentenceDescType: "literal", s: "Huh I put the toolbox in the shed" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_decl3.wav", sentenceDescType: "literal", s: "Huh I'm on the phone" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_decl4.wav", sentenceDescType: "literal", s: "Huh another pile of papers to grade" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_exclam1.wav", sentenceDescType: "literal", s: "Huh he really likes it" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_exclam2.wav", sentenceDescType: "literal", s: "Huh a package arrived for you" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_exclam3.wav", sentenceDescType: "literal", s: "Huh you can't be serious right now" }],
["huh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ehuh_exclam4.wav", sentenceDescType: "literal", s: "Huh there are a lot of cakes to choose from" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_conf1.wav", sentenceDescType: "literal", s: "Oh you don't know how to tango" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_conf2.wav", sentenceDescType: "literal", s: "Oh I thought apples were in the sunflower family" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_conf3.wav", sentenceDescType: "literal", s: "Oh she's never done that before" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_conf4.wav", sentenceDescType: "literal", s: "Oh I've never heard that before" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_decl1.wav", sentenceDescType: "literal", s: "Oh we're out of flour" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_decl2.wav", sentenceDescType: "literal", s: "Oh I put the toolbox in the shed" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_decl3.wav", sentenceDescType: "literal", s: "Oh I'm on the phone" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_decl4.wav", sentenceDescType: "literal", s: "Oh another pile of papers to grade" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_exclam1.wav", sentenceDescType: "literal", s: "Oh he really likes it" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_exclam2.wav", sentenceDescType: "literal", s: "Oh a package arrived for you" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_exclam3.wav", sentenceDescType: "literal", s: "Oh you can't be serious right now" }],
["oh_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/eoh_exclam4.wav", sentenceDescType: "literal", s: "Oh there are a lot of cakes to choose from" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_conf1.wav", sentenceDescType: "literal", s: "What you don't know how to tango" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_conf2.wav", sentenceDescType: "literal", s: "What I thought apples were in the sunflower family" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_conf3.wav", sentenceDescType: "literal", s: "What she's never done that before" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_conf4.wav", sentenceDescType: "literal", s: "What I've never heard that before" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_decl1.wav", sentenceDescType: "literal", s: "What we're out of flour" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_decl2.wav", sentenceDescType: "literal", s: "What I put the toolbox in the shed" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_decl3.wav", sentenceDescType: "literal", s: "What I'm on the phone" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_decl4.wav", sentenceDescType: "literal", s: "What another pile of papers to grade" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_exclam1.wav", sentenceDescType: "literal", s: "What he really likes it" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_exclam2.wav", sentenceDescType: "literal", s: "What a package arrived for you" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_exclam3.wav", sentenceDescType: "literal", s: "What you can't be serious right now" }],
["what_exclam", "QuestionFrame", {f:"https://dl.dropboxusercontent.com/u/20613672/all_stitched/ewhat_exclam4.wav", sentenceDescType: "literal", s: "What there are a lot of cakes to choose from" }],


   
 ];
