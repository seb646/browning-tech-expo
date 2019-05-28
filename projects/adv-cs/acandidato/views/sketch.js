var start, charac, drone, balloon, plane, clothes;

function preload(){
	start = {
		image: loadImage("images/start.png"),
		nohzdyve: loadImage("images/Nohzdyve.gif"),
		startClicked: false,
		controlsEnabled: false,
		endGame: false,
		leftrectx: null,
		leftrecty: null,
		leftrectw: null,
		leftrecth: null,
		frame1: null,
		startx: 400,
		starty: 325,
		rightrectx: 1100,
		rightrecty: 0,
		rightrectw: 100,
		rightrecth: 750,
		ledgey: 800
	}
	charac = {
		image: createImg("images/characGif.gif"),
		imageFall: createImg("images/characfallGif.gif"),
		charFalling: false,
		charx: -25,
		chary: 325,
		charfx: -100,
		charfy: 1000,
	}
	drone = {
		image: createImg("images/drone.gif"),
		droneEnabled: false,
		droneReset: false,
		dronextarget: -1000,
		droneytarget: -1000,
		dronex: -100,
		droney: 100
	}
	balloon = {
		imageBlue: loadImage("images/balloonBlue.png"),
		imageGrey: loadImage("images/balloonGrey.png"),
		imageOrange: loadImage("images/balloonOrange.png"),
		balloonBluex: -1000,
		balloonBluey: -1000,
		balloonGreyx: -1000,
		balloonGreyy: -1000,
		balloonOrangex: -1000,
		balloonOrangey: -1000
	}
	plane = {
		windowLeft: loadImage("images/windowLeft.png"),
		windowRight: loadImage("images/windowRight.png"),
		paperAirplane: createImg("images/paperAirplane.gif"),
		windowy: -1000,
		airplanex: 0
	}
	clothes = {
		clothes1: loadImage("images/clothes1.png"),
		clothes2: loadImage("images/clothes2.png"),
		clothes3: loadImage("images/clothes3.png"),
		clothes1y: -1000,
		clothes2y: -1000,
		clothes3y: -1000
	}
}
function setup() {
	createCanvas(1000, 750);
	background('black');
}

function draw() {
	var initseconds;

	fill(color("#8a3335"));
	noStroke();
	background('black');
	plane.paperAirplane.size(100, 100);
	plane.paperAirplane.position(plane.airplanex, plane.windowy);
	charac.imageFall.size(25, 50);
	charac.imageFall.position(charac.charfx, charac.charfy);
	charac.image.size(25, 50);
	charac.image.position(charac.charx, charac.chary);
	drone.image.size(100, 100);
	drone.image.position(drone.dronex, drone.droney);

	image(balloon.imageBlue, balloon.balloonBluex, balloon.balloonBluey, 100, 100);
	image(balloon.imageGrey, balloon.balloonGreyx, balloon.balloonGreyy, 100, 100);
	image(balloon.imageOrange, balloon.balloonOrangex, balloon.balloonOrangey, 100, 100);

	image(clothes.clothes1, 100, clothes.clothes1y);
	image(clothes.clothes2, 100, clothes.clothes2y);
	image(clothes.clothes3, 100, clothes.clothes3y);

	start.nohzdyve.resize(600, 200);
	image(start.nohzdyve, start.startx - 200, start.starty - 200);
	image(start.image, start.startx, start.starty);

	rect(start.leftrectx, start.leftrecty, start.leftrectw, start.leftrecth);
	rect(start.rightrectx, start.rightrecty, start.rightrectw, start.rightrecth);

	image(plane.windowLeft, 80, plane.windowy);
	image(plane.windowRight, 895, plane.windowy);

	if (start.endGame == true){
		fill(color("#ef6630"));
		textFont("Courier New");
		textSize(75);
		textAlign(CENTER, TOP);
		text("Your score: " + document.getElementById("scoreid").innerHTML, 0, 450, width);
		textSize(50);
		textAlign(CENTER, TOP);
		text("Try again?", 0, 550, width);
	}

	if ((start.startClicked == true) && (start.controlsEnabled == false)){
		start.endGame = false;
		start.startx = -100;
		start.starty = -100;
		charac.charx += 5;
		//character reaches middle of screen
		if (charac.charx >= 487.5){
			charac.charx = 487.5;
			start.leftrectw -= 5;
			//character reaches edge of building
			if (start.leftrectw <= 512.5){
				// leftrectw = 512.5;
				//charcter jumps and building moves to side
				if (start.frameAnimate == null){
					start.frameAnimate = frameCount;
				}
				charac.chary -= 5;
				start.leftrectw -= 5;
				if (charac.chary <= 100){
					charac.chary = 100;
				}
				if (start.leftrectw <= 200){
					start.rightrectx -= 5;
					if (start.leftrectw <= 100){
						start.leftrectw = 100;
					}
					if (start.rightrectx <= 900){
						start.rightrectx = 900;

						charac.charfx = 487.5;
						charac.charfy = 100;
						charac.charx = -100;
						charac.chary = -100;

						charac.charFalling = true;
					}
				}

			}
		}
	}
	if (charac.charFalling == true){
		start.leftrecty -= 5;
		if (start.leftrecty <= 0){
			start.leftrecty = 0;
			//Actual controls
			start.controlsEnabled = true;
		}
	}

	if (start.controlsEnabled == true){
		//set frame counter
		if (start.frame1 == null){
			start.frame1 = frameCount;
		}

		document.getElementById("scoreid").innerHTML = frameCount - start.frame1;
		//Controls
		if (keyIsDown(UP_ARROW)){
			charac.charfy -= 10;
		}
		if (keyIsDown(DOWN_ARROW)){
			charac.charfy += 10;
		}
		if (keyIsDown(LEFT_ARROW)){
			charac.charfx -= 10;
		}
		if (keyIsDown(RIGHT_ARROW)){
			charac.charfx += 10;
		}

		//Character boundaries
		if (charac.charfx <= 110){
			charac.charfx = 110;
		}
		if (charac.charfx >= 875){
			charac.charfx = 875;
		}
		if (charac.charfy <= 10){
			charac.charfy = 10
		}
		if (charac.charfy >= 700){
			charac.charfy = 700;
		}

		//ledge animation
		fill(color("#b7ada3"));
		noStroke();
		rect(0, start.ledgey, 100, 50);
		rect(900, start.ledgey, 100, 50);
		start.ledgey -= 10;
		if (start.ledgey <= -10){
			start.ledgey = 800;
		}

		//drone
		hitbox(drone.dronex, drone.droney, "drone");
		console.log(frameCount);
		if ((frameElement - start.frame1) < 1000){
			if (frameCount % 500 == 0){
				console.log("call drone");
				droneCall();
			}
		} else if((frameElement - start.frame1) < 2000){
			if (frameCount % 250 == 0){
				console.log("call drone");
				droneCall();
			}
		} else {
			if (frameCount % 150 == 0){
				console.log("call drone");
				droneCall();
			}
		}


		if (drone.dronex < (drone.dronextarget + 10) && drone.dronex > (drone.dronextarget - 10)){
			drone.dronex = drone.dronextarget;
		} else if (drone.dronex < drone.dronextarget){
			drone.dronex += 10;
		} else if (drone.dronex > drone.dronextarget){
			drone.dronex -= 10;
		}

		if (drone.droney < (drone.droneytarget + 10) && drone.droney > (drone.droneytarget - 10)){
			drone.droney = drone.droneytarget;
			drone.droneytarget -= 15;
		} else if (drone.droney < drone.droneytarget){
			drone.droney += 10;
		} else if (drone.droney > drone.droneytarget){
			drone.droney -= 10;
		}


		//clothesline
		if ((frameElement - start.frame1) < 1000){
			if (frameCount % 400 == 0){
				clothesCall();
			}
		} else if((frameElement - start.frame1) < 2000){
			if (frameCount % 300 == 0){
				clothesCall();
			}
		} else {
			if (frameCount % 200 == 0){
				clothesCall();
			}
		}



		clothes.clothes1y -= 10;
		clothesHit(360, 687, clothes.clothes1y);
		//between 360 and 687

		clothes.clothes2y -= 10;
		clothesHit(237, 535, clothes.clothes2y);
		//between 237 and 535

		clothes.clothes3y -= 10;
		clothesHit(123, 405, clothes.clothes3y);
		//between 123 and 405

		//paper airplane
		hitbox(plane.airplanex, plane.windowy, "plane");

		if ((frameElement - start.frame1) < 1000){
			if (frameCount % 700 == 0){
				plane.windowy = 750;
				plane.airplanex = 0;
			}
		} else if((frameElement - start.frame1) < 2000){
			if (frameCount % 500 == 0){
				plane.windowy = 750;
				plane.airplanex = 0;
			}
		} else {
			if (frameCount % 300 == 0){
				plane.windowy = 750;
				plane.airplanex = 0;
			}
		}


		plane.airplanex += 15;
		if (plane.airplanex == 900){
			plane.airplanex = -1000;
		}
		plane.windowy -= 10;
		//balloon
		hitbox(balloon.balloonBluex, balloon.balloonBluey, "balloon");
		hitbox(balloon.balloonGreyx, balloon.balloonGreyy, "balloon");
		hitbox(balloon.balloonOrangex, balloon.balloonOrangey, "balloon");

		if ((frameElement - start.frame1) < 1000){
			if (frameCount % 300 == 0){
				balloonCall();
			}
		} else if((frameElement - start.frame1) < 2000){
			if (frameCount % 200 == 0){
				balloonCall();
			}
		} else {
			if (frameCount % 100 == 0){
				balloonCall();
			}
		}

		balloon.balloonBluey -= 5;
		balloon.balloonGreyy -= 5;
		balloon.balloonOrangey -= 5;
	}
}

function mouseClicked(){
	if ((mouseX > 400) && (mouseX < 600) && (mouseY>325) && (mouseY < 425) && (start.startClicked == false)){
		start.startClicked = true;
		start.leftrectx = 0;
		start.leftrecty = 375;
		start.leftrectw = 1000;
		start.leftrecth = 750;
		document.getElementById("scoreid").innerHTML = 0;
	}
}

function droneCall(){
	console.log("droneCall()");
	console.log("False");
	drone.dronex = Math.floor(Math.random()*900) + 100;
	drone.droney = 750;
	drone.dronextarget = Math.floor(Math.random()*900) + 100;
	drone.droneytarget = Math.floor(Math.random()*750);
}

function balloonCall(){
	let randThree = Math.floor(random(0, 3));
	if(randThree == 0){
		balloon.balloonBluex = Math.floor(Math.random()*800) + 100;
		balloon.balloonBluey = 750;
	} else if(randThree == 1){
		balloon.balloonGreyx = Math.floor(Math.random()*800) + 100;
		balloon.balloonGreyy = 750;
	} else if(randThree == 2){
		balloon.balloonOrangex = Math.floor(Math.random()*800) + 100;
		balloon.balloonOrangey = 750;
	}
}

function clothesCall(){
	let randThree = Math.floor(random(0, 3));
	if(randThree == 0){
		clothes.clothes1y = 750;
	} else if(randThree == 1){
		clothes.clothes2y = 750;
	} else if(randThree == 2){
		clothes.clothes3y = 750;
	}
}

function hitbox(x, y, name){
	if( (x > 100) && (x<900) && (y>0) && (y<750)){
		if( ((charac.charfx > x) && (charac.charfx < (x+100))) && ((charac.charfy > y) && (charac.charfy < x+100)) ){
			console.log("contact", name);
			endGame();
		}
	}
}

function clothesHit(xmin, xmax, clothesyvar){
	if( ((charac.charfx < 100 + xmin) || (charac.charfx > (xmax + 100)))  && ((charac.charfy > clothesyvar) && (charac.charfy < clothesyvar + 100))){
			console.log("contact");
			endGame();
	}
}

function endGame(){
	start.startClicked= false;
	start.controlsEnabled= false;
	start.endGame = true;
	start.leftrectx= null;
	start.leftrecty= null;
	start.leftrectw= null;
	start.leftrecth= null;
	start.frame1= null;
	start.startx= 400;
	start.starty= 325;
	start.rightrectx= 1100;
	start.rightrecty= 0;
	start.rightrectw= 100;
	start.rightrecth= 750;
	start.ledgey= 800;

	charac.charFalling= false;
	charac.charx= -25;
	charac.chary= 325;
	charac.charfx= -100;
	charac.charfy= 1000;

	drone.droneEnabled= false;
	drone.droneReset= false;
	drone.dronextarget= null;
	drone.droneytarget= null;
	drone.dronex= -100;
	drone.droney= 100;

	balloon.balloonBluex= -1000;
	balloon.balloonBluey= -1000;
	balloon.balloonGreyx= -1000;
	balloon.balloonGreyy= -1000;
	balloon.balloonOrangex= -1000;
	balloon.balloonOrangey= -1000;

	plane.windowy= -1000;
	plane.airplanex= 0;

	clothes.clothes1y= -1000;
	clothes.clothes2y= -1000;
	clothes.clothes3y= -1000;
}
