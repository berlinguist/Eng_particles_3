// (This example file has been slimmed down and reformatted for ibex 0.3-beta11.)

//****PUT "intro" back into the seq vars for actual experiment****

var shuffleSequence = seq("intro", "first", chooseModN(3,modify("pract", "pract2", "pract3")), "sr", "final");
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

  ["first", "Separator", {normalMessage: "After you listen to the following audio clip, you will have 5 seconds to judge the utterance.  Use the mouse to select your choice.  You will then be asked three additional questions. After the initial question, you will be able to listen to the audio again as many times as you like. To continue, press any key.", transfer: "keypress"}],



    //
    // Three practice items for self-paced reading (one with a comprehension question).
    //
    //*** Version 1, pilot ***
    ["pract", "QuestionFrame", {f: "https://dl.dropboxusercontent.com/u/20613672/allDiff/confused_huh_never_heard_that_before.wav", s: "Huh I've never heard that before", target: "Each can with a label is blue."}],
    ["pract", "QuestionFrame", {f: "https://dl.dropboxusercontent.com/u/20613672/allDiff/confused_huh_never_heard_that_before.wav", s: "Wow I've ever heard that before", target: "Each can with a label is blue."}],
    ["pract2", "QuestionFrame", {f: "https://dl.dropboxusercontent.com/u/20613672/allDiff/confused_huh_never_heard_that_before.wav", s: "Whoa! I've rarely heard that before", target: "Each can with a label is blue."}],
    ["pract2", "QuestionFrame", {f: "https://dl.dropboxusercontent.com/u/20613672/allDiff/confused_huh_never_heard_that_before.wav", s: "Umm I've often heard that before", target: "Each can with a label is blue."}],
    ["pract3", "QuestionFrame", {f: "https://dl.dropboxusercontent.com/u/20613672/allDiff/confused_huh_never_heard_that_before.wav", s: "Nuh uh! I've rarely heard that before", target: "Each can with a label is blue."}],
    ["pract3", "QuestionFrame", {f: "https://dl.dropboxusercontent.com/u/20613672/allDiff/confused_huh_never_heard_that_before.wav", s: "???? I've often heard that before", target: "Each can with a label is blue."}],

    //*** Version 2, pilot ***
   // ["pract", "QuestionFrame", {f: "https://dl.dropboxusercontent.com/u/20613672/allDiff/decl_what_lot_of_cakes_to_choose_from.wav", s: "What there are a lot of cakes to choose from", target: "Each can with a label is blue.", hasCorrect: 1}],
  // *** Version 3, pilot ***
  //  ["pract", "QuestionFrame", {f: "https://dl.dropboxusercontent.com/u/20613672/allDiff/exclam_oh_on_the_phone.wav", s: "Oh I'm on the phone", target: "Each can with a label is blue.", hasCorrect: 1}],

     // ["practice", "AudioPresentation", {f: "https://dl.dropboxusercontent.com/u/20613672/3x3/1.wav", s: "Oh, I thought apples were in the sunflower family", target: "Each can with a label is blue.", hasCorrect: 1},
     // "AcceptabilityJudgment",       {s: "The actress was:" }
     // ],
   //  ["practice", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/P2-comb.jpg", s: "You are a researcher who specializes in how best to teach young children basic concepts. You are making cards for a game to teach young children basic shapes.  In one version of the game, the shape that the children are asked to find is always the same color.  In another version, the color of the particular shape may vary.", target: "The stars are all blue.", hasCorrect: 1}],
     //["practice", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/P3-comb.jpg", s: "You were teaching a friend how to do sudoku, but he got bored and filled in half of it incorrectly as a joke.", target: "Each panel on the left has a number in it.", hasCorrect: 1}],

 // ["next", "Separator", {errorMessage: "You have now completed the practice pictures. Please click any key to start the experiment.",  normalMessage: "You have now completed the practice pictures. Please click any key to start the experiment.", transfer: "keypress"}],
  
//    [["item_type1",1], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/1.jpg", s: "You are in charge of landscaping in the parks in your city.  It's June, and the Black Spot Disease for trees is spreading through your region. You are keeping a careful watch for that the trees are dying, because it spreads so quickly that once one tree shows the signs, all the nearby trees have to be treated as well.", target: "Some of the trees appear to have Black Spot Disease.", hasCorrect: 0}],
//  [["item_type2",1], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/1.jpg", s: "You are going to spend some time with your niece this afternoon. You are thinking about going to the park, but she is deathly afraid of dogs, so if anyone has brought their dog to the park, you won't be able to go.  On your way to pick her up, you drive by the park to see if you can go.", target: "Some of the people have brought their dogs to the park.", hasCorrect: 0}],
//   [["1_2_ir_all",1], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/1.jpg", s: "You are in charge of landscaping in the parks in your city.  It's June, and the Black Spot Disease for trees  is spreading through your region. You are keeping a careful watch for that the trees are dying, because it spreads so quickly that once one tree shows the signs, all the nearby trees will have to be treated as well.", target: "All of the trees appear to have Black Spot Disease.", hasCorrect: 0}],
//     [["2_1_ir_some",1], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/1.jpg", s: "You are going to spend some time with your niece this afternoon. You are thinking about going to the park, but she is deathly afraid of dogs, so if anyone has brought their dog to the park, you won't be able to go.  On your way to pick her up, you drive by the park to see if you can go.", target: "Some of the people have brought their dogs to the park.", hasCorrect: 0}],   
//   [["2_1_ir_all",1], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/1.jpg", s: "You are going to spend some time with your niece this afternoon. You are thinking about going to the park, but she is deathly afraid of dogs, so if anyone has brought their dog to the park, you won't be able to go.  On your way to pick her up, you drive by the park to see if you can go.", target: "All of the people have brought their dogs to the park.", hasCorrect: 0}],
//   [["2_2_ir_all",1], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/1.jpg", s: "You are in charge of landscaping in the parks in your city.  It's June, and theBlack Spot Disease for trees is spreading through your region. You are keeping a careful watch for that the trees are dying, because it spreads so quickly that once one tree shows the signs, all the nearby trees will have to be treated as well.", target: "All of the trees appear to have Black Spot Disease.", hasCorrect: 0}],
//    

//  [["2_2_ir_some",2], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/2.jpg", s: "You like all your plants to have their own markers.  This year you had someone plant your seeds in pots for you and you decide that you will only hire them again if they correctly put all the plants next to markers.", target: "Some of the plants are missing markers.", hasCorrect: 0}],
//  [["1_1_ir_all",2], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/2.jpg", s: "Your neighbor always plants his potted plants a little too early, so you always peek through the fence to check that his plants are started before you begin work on your own garden.  Your other neighbor has the same strategy as you and wants to know how things look.", target: "All of the seeds have sprouted.", hasCorrect: 0}],
   // [["item_type1",2], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/2.jpg", s: "You like all your plants to have their own markers.  This year you had someone plant your seeds in pots for you and you decide that you will only hire them again if they correctly put all the plants next to markers.", target: "Some of the plants are missing markers.", hasCorrect: 0}],
//  [["1_2_ir_all",2], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/2.jpg", s: "You like all your plants to have their own markers.  This year you had someone plant your seeds in pots for you and you decide that you will only hire them again if they correctly put all the plants next to markers.", target: "All of the plants are missing markers.", hasCorrect: 0}],
//  [["2_1_ir_all",2], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/2.jpg", s: "Your neighbor always plants his potted plants a little too early, so you always peek through the fence to check that his plants are started before you begin work on your own garden.  Your other neighbor has the same strategy as you and wants to know how things look.", target: "All of the seeds have sprouted.", hasCorrect: 0}],
//     [["2_1_ir_some",2], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/2.jpg", s: "Your neighbor always plants his potted plants a little too early, so you always peek through the fence to check that his plants are started before you begin work on your own garden.  Your other neighbor has the same strategy as you and wants to know how things look.", target: "Some of the seeds have sprouted.", hasCorrect: 0}],

 
//  [["item_type2",3], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/3.jpg", s: "As a high school teacher you don't want to make your tests too hard, so if no one in the class gets a question right, you don't count it.  Question 5, however, seems to be fine.  Another teacher, who has the same strategy and who has taught the class in other years, wants to know how this test went.", target: "Some of the students got question 5 correct.", hasCorrect: 0}],
//    [["item_type1",3], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/3.jpg", s: "You are a high school teacher and you would like to take your students on a field trip.  Unfortunately, there is no one who can look after the students who can't go, so if you don't have permission slips from every student, you can't go on the field trip.  Today was the last day for students to turn in their permission slips and you need to tell the other teachers whether you'll be going or not.", target: "Some of the permission slips are missing.", hasCorrect: 0}],
 // [["1_2_ir_all",3], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/3.jpg", s: "You are a high school t eacher and you would like to take your students on a field trip.  Unfortunately, there is no one who can look after the students who can't go, so if you don't have permission slips from every student, you can't go on the field trip.  Today was the last day for students to turn in their permission slips and you need to tell the other teachers whether you'll be going or not.", target: "All of the permission slips are missing.", hasCorrect: 0}],
//   [["2_1_ir_all",3], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/3.jpg", s: "As a high school teacher you don't want to make your tests too hard, so if no one in the class gets a question right, you don't count it.  Question 5, however, seems to be fine.  Another teacher, who has the same strategy and who has taught the class in other years, wants to know how this test went.", target: "All of the students got question 5 correct.", hasCorrect: 0}],
//     [["2_1_ir_some",3], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/3.jpg", s: "As a high school teacher you don't want to make your tests too hard, so if no one in the class gets a question right, you don't count it.  Question 5, however, seems to be fine.  Another teacher, who has the same strategy and who has taught the class in other years, wants to know how this test went.", target: "Some of the students got question 5 correct.", hasCorrect: 0}],
//   [["2_2_ir_all",3], "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/3.jpg", s: "You are a high school teacher and you would like to take your students on a field trip.  Unfortunately, there is no one who can look after the students who can't go, so if you don't have permission slips from every student, you can't go on the field trip.  Today was the last day for students to turn in their permission slips and you need to tell the other teachers whether you'll be going or not.", target: "All of the permission slips are missing.", hasCorrect: 0}],
    
  
  
  
 
  

 //   ["f", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/F2.jpg", s: "You and your fellow cowboys have just rounded up most of the herd for the night.  Most of the herd stays together easily, but there are usually some strays that you need to go out and catch.  One of the cowboys who just finished putting the herd away wants to know how many strays are still out.", target: "Four cows are separated from the herd."}],
//    ["f", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/F4.jpg", s: "You've invited a group of people over to your place tonight.  You don't usually have this many people over and you need to be sure that you have enough cutlery in good repair.  You're going shopping with a friend this afternoon so you can pick up anything that you might be missing, but first she wants to know what kind of stores you need visit.", target: "Several mugs are broken."}],  
//    ["f", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/F5.jpg", s: "You are organizing a binder of the papers left over in your office.  You want the papers to be easy to distinguish from one another once they are all in a stack, so you are making sure that each piece of paper is adjacent to a paper of another color.", target: "Each piece of yellow paper is next to a piece of white paper."}],
//    ["f", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/F10.jpg", s: "A very respected professor is coming to give a talk at your university and you are in charge of making sure he has everything he needs during his stay.  He'll have a temporary office while he's visiting and he wanted to know if he could rely on having a bookshelf in the office or not.", target: "The university neglected to put a bookshelf in each room."}],
//    ["f", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/F16.jpg", s: "You're looking to buy a house.  The real estate agent has sent you a list of places to look at.  You gave your real estate agent a list of preferences, one of which was that you don't like houses that are painted brown.  She's sent you a list of places to look at and you are checking to see how well she did.", target: "The houses are painted brown."}],
//    ["f", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/F8.jpg", s: "The florist shop where you work has a big order due today.  The customer wants pairs of vases with just a few roses each to put on tables.  You and a colleague are working together and she wants to know how many more vases are left to do.", target: "The vases on the right are empty."}],
//    ["f", "PictureJudgment", {f: "http://nirvana.ucsc.edu/PragModulation/Best-Exp/Images/F3.jpg", s: "Your library has noticed that a lot of books are overdue.  In an effort to get patrons to return overdue books you are forgiving all fines on overdue books brought in this week.  One patron has just brought back some books and you are checking his record to see which ones are overdue.", target: "Three of the books are overdue"}],

 ];
