
var NOF_CHALLENGES = 24;
var HIGH_SCORE_LIMIT = 100;
var HIGH_SCORE_MAX_LINES = 10000;

var monthNames = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
var levelNames = new Array('easy', 'medium', 'hard');

var challLevels = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);

var challNames = new Array('Puzzle this!', 'Lots of Dots', 'Favourite Letters', 'Cool Car', 'Key Strokes', 'Message to Ken', 'Crypto for Rookies', 'Snd Mny', 'Microscope',
'An egg or not ...', 'Tweaked Tweet', 'Once Upon a File', 'Lost the Thread', 'Shards', 'P Cap', 'Pathfinder', 'Monster Party', 'Nitwit\'s Doormat Key',
'Disco Time', 'Spaghetti Hash', 'MonKey', 'Game, Set and Hash', 'Lovely Vase', 'Your Passport, please');

var reUserName = /^[\w.\-]+$/g;

var challId = 0;
var challAuthor = 'PS';
var scrambledEggCipher = '';
var navBarShown = false;

function getUserLevel(p) {
    if (p >= 90) return 'Chief Bunny';
    else if (p >= 80) return 'Buck';
    else if (p >= 64) return 'Hare';
    else if (p >= 48) return 'Bunny';
    else if (p >= 32) return 'Cony';
    else if (p >= 16) return 'Leveret';
    else return 'Chinchilla';
}

function setChallId(newChallId) {
	challId = newChallId;
}

function setChallAuthor(newChallAuthor) {
	challAuthor = newChallAuthor;
}

function toggleNavBar() {
	navBarShown = !navBarShown;
	if (navBarShown)
		$('#navPanel').show();
	else
		$('#navPanel').hide();
}

(function($) {
	$.fn.redrawForWebkit = function() {
		this[0].style.display = 'none';
		this[0].offsetHeight;
		this[0].style.display = 'block';
	};
})(jQuery);

function addHeader(selectedItem) {
	var cHome = '', cChal = '', cScor = '', cEggs = '', cFig = '', cBudd = '', cHow2 = '', selClass = 'current';
	if (selectedItem == 'home')
		cHome = selClass;
	else if (selectedItem == 'challenges')
		cChal = selClass;
	else if (selectedItem == 'scores')
		cScor = selClass;
	else if (selectedItem == 'eggs')
		cEggs = selClass;
	else if (selectedItem == 'buddies')
		cBudd = selClass;
	else if (selectedItem == 'howto')
		cHow2 = selClass;
	$('#header-wrapper')
			.append(
					'  <div id="header">' 
						    + '    <h1 id="headertextmobile">Hacky Easter 2017</h1>'
							+ '    <nav id="nav">'
							+ '      <ul>'
							+ '        <li style="margin-right: 8px;"><img class="headerlogo" src="images/logo.png"/></li>'
							+ '        <li id="headertextdesktop">Hacky Easter 2017</li>'
							+ '        <li class="'
							+ cHome
							+ '"><a href="index.html"><span class="fa fa-home">&#160;</span>Home</a></li>'
							+ '        <li class="'
							+ cChal
							+ '"><a href="challenges.html"><span class="fa fa-puzzle-piece">&#160;</span>Challenges</a></li>'
							+ '        <li class="'
							+ cScor
							+ '"><a href="scores.html"><span class="fa fa-trophy">&#160;</span>Scores</a></li>'
							+ '        <li class="'
							+ cEggs
							+ '"><a href="eggs.html"><span class="fa fa-shopping-basket">&#160;</span>Eggs</a></li>'
							+ '        <li class="'
							+ cBudd
							+ '"><a href="buddies.html"><span class="fa fa-users">&#160;</span>Buddies</a></li>'
							+ '        <li class="'
							+ cHow2
							+ '"><a href="howto.html"><span class="fa fa-question-circle">&#160;</span>How to</a></li>'
							+ '        <li><img class="headerlogo" style="width:24px; height:24px; margin-bottom: -6px;" src="images/twitter.png" onclick="location.href=\'https://twitter.com/hackyeaster\'"></img></li>'
							+ '      </ul>'
							+ '    </nav>'
							+ '  </div>'							
							+ '  <div id="titleBar">'
							+ '    <span class="toggle" onClick="toggleNavBar();"></span>'
							+ '  </div>'
							+ '  <div id="navPanel" style="display:none;">'
							+ '    <div>'
							+ '      <nav>'
							+ '        <a class="link depth-0" href="index.html"><span class="indent-0"></span>Home</a>'
							+ '        <a class="link depth-0" href="challenges.html"><span class="indent-0"></span>Challenges</a>'
							+ '        <a class="link depth-0" href="scores.html" style=""><span class="indent-0"></span>Scores</a>'
							+ '        <a class="link depth-0" href="eggs.html"><span class="indent-0"></span>Eggs</a>'
							+ '        <a class="link depth-0" href="buddies.html"><span class="indent-0"></span>Buddies</a>'
							+ '        <a class="link depth-0" href="howto.html"><span class="indent-0"></span>How to</a>'
							+ '      </nav>' + '    </div>' + '  </div>');
}

function addFooter() {
}

function addAppStoreLinks() {
	$('#appstore-links')
			.append(
					'<a href="https://itunes.apple.com/ch/app/hackyeaster/id831522886?mt=8" class="storeLinkIos"></a>');
	$('#appstore-links')
			.append(
					'<a href="http://play.google.com/store/apps/details?id=ps.hacking.hackyeaster.android" class="storeLinkAndroid"></a>');
}

function addChallengeSidebar() {
	if (!(challId && challId >= 1 && challId <= NOF_CHALLENGES))
		return;
	var challIdString = challId;
	if (challId < 10)
		challIdString = '0' + challIdString;
	$('#sidebar')
			.append(
					'            <section class="box">'
							+ '              <a href="#" class="image featured challenge"><img src="./images/banner/challenge_'
							+ challIdString
							+ '.jpg" alt="Challenge '
							+ challIdString
							+ '" /></a>'
							+ '              <header>'
							+ '                <h3>Details</h3>'
							+ '              </header>'
							+ '              <p>Author: '
							+ '<a href="https://www.hacking-lab.com/user/profile/' + challAuthor + '/">' + challAuthor + '</a>'
							+ '<br/>'
							+ '              Level: '
							+ levelNames[challLevels[challId - 1] - 1]
							+ '<br/>'
							+ '              Solutions: <span id="nofSolutions"></span></p>'
							+ '              <span id="latestSolutionsTitle" style="display:none;">Latest solutions:</span>'
							+ '              <ul class="dates small" id="solutions"></ul>'
							+ '            </section>');
	addSolutionsOfEgg(challId);
}

function addChallengeHeader() {
	if (!(challId && challId >= 1 && challId <= NOF_CHALLENGES))
		return;
	var challIdString = challId;
	if (challId < 10)
		challIdString = '0' + challIdString;
	$('#challenge-header').append(
			'            <h2>' + challIdString + ' - ' + challNames[challId - 1] + '</h2>');
}

function addChallenge(challId, rowId) {
	if (!(challId && challId >= 1 && challId <= NOF_CHALLENGES))
		return;
	if (!(rowId && rowId >= 1 && rowId < 10))
		return;
	var challIdString = challId;
	if (challId < 10)
		challIdString = '0' + challIdString;
	$('#challenge_row_' + rowId)
			.append(
					'          <div class="4u" id="chall'
							+ challId
							+ '">'
							+ '            <section class="box">'
							+ '              <header>'
							+ '                <h3><span class="level '
							+ levelNames[challLevels[challId - 1] - 1]
							+ '">'
							+ challIdString
							+ '</span>'
							+ challNames[challId - 1]
							+ '</h3>'
							+ '              </header>'
							+ '              <a href="challenge'
							+ challIdString
							+ '.html" class="image featured"><img src="./images/banner/challenge_'
							+ challIdString + '.jpg" alt="" /></a>'
							+ '            </section>' + '          </div>');
}

function addEggOMatic(placeholder) {
	if (placeholder == null) {
		placeholder = 'lowercase only';
	}
	$('#eggOMaticBox')
			.append(
					'          <header id="challenge-header">'
							+ '             <h2>Egg-O-Matic &trade;</h2>'
							+ '          </header>'
							+ '          <p>'
							+ '            Enter password and press enter.'
							+ '            <div class="eggOMatic">'
							+ '              <img class="eggImage" id="scrambledEggImage" onerror="errorScrambledEgg();" /><br/>'
							+ '              <form action="#" onsubmit="return false;">'
							+ '                <input type="text" class="input-text" id="scrambledEggKey" onkeydown="if (event.keyCode==13) decryptScrambledEgg();" placeholder="' + placeholder + '"></input>'
							+ '              </form>' + '            </div>'
							+ '          </p>');
	emptyScrambledEgg();
}

function addNews() {
	var sLinkHtml, sLinkText;
	$("#news").empty();
	$.getJSON("json?service=news", function(data) {
		$.each(data.news, function(i, newsitem) {
			var sDay = getDayString(newsitem.timestamp);
			var sTime = getTimeString(newsitem.timestamp);
			var sLink = '';
			if (newsitem.linkurl) {
				if (newsitem.linktext) {
					sLinkText = newsitem.linktext;
				} else {
					sLinkText = 'Details';
				}
				sLinkHtml = '<br/><a href="' + newsitem.linkurl + '">'
						+ sLinkText + '</a>';
			} else {
				sLinkHtml = '';
			}
			$("#news").append(
					'<li><span class="date"><span class="dateday">' + sDay
							+ '</span><br/><span class="datetime">' + sTime
							+ '</span></span>' + '<h3>' + newsitem.title
							+ '</h3>' + '<p>' + newsitem.text + ' ' + sLinkHtml
							+ '</p>');
		});
	});
}

function addSolutions() {
	var eggId, sEggId, sDay, sTime;
	$("#solutions").empty();
	$.getJSON("json?service=solutions", function(data) {
		$.each(data.solutions, function(i, solution) {
			sEggId = solution.e;
			if (sEggId < 10)
				sEggId = '0' + sEggId;
			sDay = getDayString(solution.t);
			sTime = getTimeString(solution.t);
			$("#solutions").append(
					'<li><span class="date '
							+ levelNames[challLevels[solution.e - 1] - 1]
							+ '"><span class="dateday">' + sDay
							+ '</span><br/>' + '<span class="datetime">'
							+ sTime + '</span></span>'
							+ '<p><img src="images/flags/' + solution.n
							+ '.png"/><a href="eggs.html?name=' + solution.u
							+ '">' + solution.u + '</a> &#183; Egg ' + sEggId
							+ '</p></li>');
		});
	});
}

function addSolutionsOfEgg(challId) {
	var nofSolutions = 0, sDay, sTime;
	if (!(challId && challId >= 1 && challId <= NOF_CHALLENGES))
		return;
	$.getJSON("json?service=solutionsofegg&egg=" + challId, function(data) {
		nofSolutions = data.count;
		if (data.count > 0) {
			$('#latestSolutionsTitle').show();
			$.each(data.solutions, function(i, solution) {
				sDay = getDayString(solution.t);
				sTime = getTimeString(solution.t);
				$("#solutions").append(
						'<li><span class="date '
								+ levelNames[challLevels[challId - 1] - 1]
								+ '"><span class="dateday">' + sDay
								+ '</span><br/>' + '<span class="datetime">'
								+ sTime + '</span></span>'
								+ '<p><img src="images/flags/' + solution.n
								+ '.png"/><a href="eggs.html?name=' + solution.u + '">'
								+ solution.u + '</a></p></li>');
			});
		} else {
			nofSolutions = 0;
		}
		$("#nofSolutions").append(nofSolutions);
	});
}

function markSolvedEggs(name) {
	$.getJSON("json?service=eggs&name=" + encodeURIComponent(name), function(
			data) {
		$.each(data.eggs, function(i, egg) {
			$("#chall" + egg.i).addClass('challSolved');
		});
	});
}

function addEggs(name) {
	var eggNr, sDay, sTime;
	var totalScore = 0, easyEggs = 0, mediumEggs = 0, hardEggs = 0;
	$.getJSON("json?service=eggs&name=" + encodeURIComponent(name), function(
			data) {
		$("#eggs").empty();
		if (data.egg) {
			$("#eggs").append(data.egg);
			;
		}
		$.each(data.eggs, function(i, egg) {
			totalScore += egg.p;
			if (egg.l == 1)
				easyEggs++;
			else if (egg.l == 2)
				mediumEggs++;
			else if (egg.l == 3)
				hardEggs++;
			eggNr = egg.i;
			if (egg.i < 10)
				eggNr = '0' + eggNr;
			sDay = getDayString(egg.t);
			sTime = getTimeString(egg.t);
			$("#eggs").append(
					'<span class="eggImage ' + levelNames[egg.l - 1] + 'Egg">'
							+ '  <span class="eggTitle">' + eggNr + '</span>'
							+ '  <span class="eggDay">' + sDay + '</span>'
							+ '  <span class="eggTime">' + sTime + '</span>'
							+ '  <span class="eggPoints">' + (egg.l * 2)
							+ ' Points</span>' + '</span>');
		});
		$("#userLevel").text(getUserLevel(totalScore));
		$("#totalScore").text(totalScore);
		$("#easyEggs").text(easyEggs);
		$("#mediumEggs").text(mediumEggs);
		$("#hardEggs").text(hardEggs);
		$("#totalEggs").text(easyEggs + mediumEggs + hardEggs);
		$("#statistics").show();
	});
}

function addBuddies(name, ticket) {
	var userFont, rankFont;
	var lineCount = 0;
	$("#buddies").empty();
	$("#buddies")
			.append(
					'<div class="scoreLine"><span class="cHead center">#</span>'
							+ '<span class="cHead">Nt</span>'
							+ '<span class="cHead">Name</span>'
							+ '<span class="cHead center">Pt</span>'
							+ '<span class="cHead">Eggs<a href="#" class="switchScores" onclick="javascript:showBar=!showBar;changeScoreLines(showBar);">collapse</a></span></div>');

	 $.ajax("json?service=buddies", {
	    type : "POST",
	    data : {
	      "name" : name,
	      "ticket" : ticket
	    }
	  }).done(function(data) {
	    
	    $.each(data.buddies, function(i, buddy) {
        lineCount++;
        userFont = (buddy.u.length > 10) ? "font09" : "";
        if (buddy.r < 100)
          rankFont = "";
        else if (buddy.r < 1000)
          rankFont = "font09";
        else
          rankFont = "font07";
        $("#buddies").append(
            '<div class="scoreLine"><span class="cRank ' + rankFont + '">' + buddy.r
                + '</span><span class="cNat"><img src="images/flags/' + buddy.n + '.png"/></span><span class="cUser '
                + userFont + '"><a href="eggs.html?name=' + buddy.u + '">' + buddy.u
                + '</a></span><span class="cScor">' + buddy.s + '</span>' + '<span class="cEggs">' + eggList(buddy.e)
                + '</span></div>');
      });
	  }).fail(function() {
	    alert('Error while fetching buddies.')
	  });
}

function addScores(doLimit) {
	var limit = (doLimit ? HIGH_SCORE_LIMIT : HIGH_SCORE_MAX_LINES);
	var lineCount = 0;
	var userFont, rankFont;
	$("#scores").empty();
	$("#scores")
			.append(
					'<div class="scoreLine"><span class="cHead center">#</span>'
							+ '<span class="cHead">Nt</span>'
							+ '<span class="cHead">Name</span>'
							+ '<span class="cHead center">Pt</span>'
							+ '<span class="cHead">Eggs<a href="#" class="switchScores" onclick="javascript:showBar=!showBar;changeScoreLines(showBar);">collapse</a></span></div>');
	$
			.getJSON(
					"json?service=scores&limit=" + (limit + 1),
					function(data) {
						$
								.each(
										data.scores,
										function(i, score) {
											lineCount++;
											if (lineCount <= limit) {
												userFont = (score.u.length > 10) ? "font09"
														: "";
												if (score.r < 100)
													rankFont = "";
												else if (score.r < 1000)
													rankFont = "font09";
												else
													rankFont = "font07";
												$("#scores")
														.append(
																'<div class="scoreLine"><span class="cRank '
																		+ rankFont
																		+ '">'
																		+ score.r
																		+ '</span><span class="cNat"><img src="images/flags/'
																		+ score.n
																		+ '.png"/></span><span class="cUser '
																		+ userFont
																		+ '"><a href="eggs.html?name='
																		+ score.u
																		+ '">'
																		+ score.u
																		+ '</a></span><span class="cScor">'
																		+ score.s
																		+ '</span>'
																		+ '<span class="cEggs">'
																		+ eggList(score.e)
																		+ '</span></div>');
											}
										});
						$("#statsHackers").text(data.stats.hackers);
						$("#statsSolutions").text(data.stats.solutions);
						$("#statsNations").text(data.stats.nations);
						$("#statsPoints").text(data.stats.points);
						$("#statsPointsPerHacker").text(
								Math.round(100 * data.stats.points
										/ data.stats.hackers) / 100);
						$('#statistics').show();
						if (doLimit && lineCount > HIGH_SCORE_LIMIT)
							$("#showAllButton").show();
						else
							$("#showAllButton").hide();
					});
}

function eggList(solved) {
	var result = '';
	var eggClass;
	var eggSolved;
	for (var i = 1; i <= NOF_CHALLENGES; i++) {
		eggSolved = false;
		for (var j = 0; j < solved.length; j++) {
			if (solved[j] == i) {
				eggSolved = true;
			}
		}
		eggClass = levelNames[challLevels[i - 1] - 1];
		if (!eggSolved)
			eggClass += ' unsolved';
		result += '<span class="cell ' + eggClass + '" ></span>';
	}
	return result;
}

function changeScoreLines(showBar) {
	$('.switchScores').text('111');
	if (showBar) {
		$('.cEggs').addClass('bar');
		$('.switchScores').text('expand');
	} else {
		$('.cEggs').removeClass('bar');
		$('.switchScores').text('collapse');
	}
}

function getDayString(d) {
	if (!d)
		return '';
	var day = parseInt(d.substr(0, 2), 10);
	var monthName = monthNames[parseInt(d.substr(3, 2), 10) - 1];
	return monthName + ' ' + day;
}

function getTimeString(d) {
	if (!d)
		return '';
	var hours = parseInt(d.substr(d.length - 5, 2), 10);
	if (hours < 10)
		hours = '0' + hours;
	var minutes = parseInt(d.substr(d.length - 2, 2), 10);
	if (minutes < 10)
		minutes = '0' + minutes;
	return hours + ':' + minutes;
}

function getQueryParams() {
	var qs = document.location.search;
	qs = qs.split("+").join(" ");
	var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
	while (tokens = re.exec(qs)) {
		var val = decodeURIComponent(tokens[2]);
		if (val != null && val.match(reUserName)) {
			params[decodeURIComponent(tokens[1])] = val;
		}
	}
	return params;
}

function decryptScrambledEgg() {
	decryptScrambledEggWithKey($('#scrambledEggKey').val());
}

function decryptScrambledEggWithKey(key) {
	var decryptedEgg = CryptoJS.AES.decrypt(scrambledEggCipher, key);
	document.getElementById('scrambledEggImage').setAttribute(
			'src',
			'data:image/png;base64,'
					+ CryptoJS.enc.Latin1.stringify(decryptedEgg));
}

function emptyScrambledEgg() {
	document.getElementById('scrambledEggImage').setAttribute('src',
			'images/egg_gray.png');
}

function errorScrambledEgg() {
	document.getElementById('scrambledEggImage').setAttribute('src',
			'images/egg_error.png');
	setTimeout(function() {
		document.getElementById('scrambledEggImage').setAttribute('src',
				'images/egg_gray.png');
	}, 1000);
}

function saveUser(userName, userTicket) {
	if (window.localStorage) {
		window.localStorage.setItem('he2017user', userName);
		window.localStorage.setItem('he2017ticket', userTicket);
	}
}

function deleteUser() {
	if (window.localStorage) {
		window.localStorage.removeItem('he2017user');
		window.localStorage.removeItem('he2017ticket');
	}
}

function getRegisteredUser() {
	if (window.localStorage) {
		return {
			'user' : window.localStorage.getItem('he2017user'),
			'ticket' : window.localStorage.getItem('he2017ticket')
		};
	}
	return null;
}

function isUserRegistered() {
	var userInfo = getRegisteredUser();
	return (userInfo && userInfo.user != null && userInfo.user != ''
			&& userInfo.ticket != null && userInfo.ticket != '');
}

function submitEgg(name, ticket, code) {
	$.ajax("json?service=solution", {
		type : "POST",
		data : {
			"name" : name,
			"ticket" : ticket,
			"code" : code
		}
	}).done(function(data) {
		solutionSubmitted('{"status": ' + data.status + '}');
	}).fail(function() {
		solutionSubmitted('{"status":5}');
	});
}

function solutionSubmitted(json) {
	var jsonRes = JSON.parse(json);
	if (jsonRes.status == 0) {
		alert('CONGRATS! The easter egg was submitted successfully!');
	} else if (jsonRes.status == 1) {
		alert('Error: We don\'t know you!');
	} else if (jsonRes.status == 2) {
		alert('Error: Unknown egg, or already solved');
	} else if (jsonRes.status == 3) {
		alert('Error: Invalid ticket');
	} else if (jsonRes.status == 4) {
		alert('Error: Egg list update failed');
	} else if (jsonRes.status == 5) {
		alert('Error: Communication error. Are you online, hobo?')
	} else if (jsonRes.status == 6) {
		alert('Error: Sorry, the competition is over. No solutions may be submitted anymore.')
	}
}

function addBuddy(name, ticket, buddy) {
  $.ajax("json?service=addbuddy", {
    type : "POST",
    data : {
      "name" : name,
      "ticket" : ticket,
      "buddy" : buddy
    }
  }).done(function(data) {
    buddySubmitted('{"status": ' + data.status + '}');
  }).fail(function() {
    buddySubmitted('{"status":5}');
  });
}

function removeBuddy(name, ticket, buddy) {
  $.ajax("json?service=removebuddy", {
    type : "POST",
    data : {
      "name" : name,
      "ticket" : ticket,
      "buddy" : buddy
    }
  }).done(function(data) {
    buddySubmitted('{"status": ' + data.status + '}');
  }).fail(function() {
    buddySubmitted('{"status":5}');
  });
}

function buddySubmitted(json) {
  var jsonRes = JSON.parse(json);
  if (jsonRes.status == 0) {
    window.location.href = "buddies.html";
  } else if (jsonRes.status == 1) {
    alert('Unknown buddy');
  } else if (jsonRes.status == 2) {
    alert('Error: Something went wrong');
  } else if (jsonRes.status == 3) {
    alert('Want to be your own buddy?!');
  } else if (jsonRes.status == 4) {
    alert('Buddy already added');
  } else if (jsonRes.status == 5) {
    alert('Error: Communication error. Are you online, buddy?')
  }
}

jQuery(document).ready(function($){

	var windowXArray = [],
	    windowYArray = [];

	for (var i = 0; i < $(window).innerWidth(); i++) {
	    windowXArray.push(i);
	}
	    
	for (var i = 0; i < $(window).innerHeight(); i++) {
	    windowYArray.push(i);
	}

	function randomPlacement(array) {
	    var placement = array[Math.floor(Math.random()*array.length)];
	    return placement;
	}	    

	var canvas = oCanvas.create({
	   canvas: '#canvas',
	   background: 'rgba(0,0,0,0)',
	   fps: 60
	});

	var dotCount = 0;
	
	setInterval(function(){

	if (dotCount >= 20) return;
		
	var rectangle = canvas.display.ellipse({
	   x: randomPlacement(windowXArray),
	   y: randomPlacement(windowYArray),
	   origin: { x: 'center', y: 'center' },
	   radius: 0,
	   fill: '#ffffff',
	   opacity: 0.2
	});

	canvas.addChild(rectangle);
	dotCount++;

	rectangle.animate({
	  radius: 160,
	  opacity: 0
	}, {
	  duration: 20000,
	  easing: 'linear',
	  callback: function () { this.remove(); dotCount--; }
	});

	}, 1000);

	$(window).resize(function(){
	canvas.width = $(window).innerWidth();
	canvas.height = $(window).innerHeight();
	});

	$(window).resize();

	});
