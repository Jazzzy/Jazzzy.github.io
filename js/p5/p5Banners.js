/*
                                  P5 STUFF
*/


var bannerTemplate = function (p) {
  //Self reference
  var self = this;

  //html values
  var externalHeight;
  var scale;

  //Leaf variables
  var leafCountBack = 20;
  var leafCountFront = 10;
  var leafCountColliding = 20;
  var leafGroupBack;
  var leafGroupColliding;
  var leafGroupFront;

  //Main circle logo variables
  var centerCircleGroup;
  var centerCircle;
  var logoImage;

  var noiseVal = 0;



  p.preload = function () {
    self.logoImage = p.loadImage("resources/images/perfil.png");
  };

  p.setup = function () {

    var w_height = $(window).height();
    var w_width = $(window).width();
    externalHeight = $('#p5BannerContainer').parent().height();
    var scale_y = 1.7;
    var canvasHeigth = externalHeight * scale_y;
    //$('#p5BannerContainer').parent().height(canvasHeigth);
    var canvas = p.createCanvas(w_width, canvasHeigth);

    canvas.parent('p5BannerContainer');

    self.scale = canvasHeigth / 1300;



    self.centerCircleGroup = new p.Group();
    self.centerCircle = p.createSprite(p.width / 2, p.height / 2);
    //self.centerCircle.addImage(p.image(self.logoImage, 0, 0, 300, 300));
    //TODO: Put here the sprite of my image logo and resize it accordingly with self.centerCircle.scale = something
    self.centerCircle.draw = function () {
      p.image(self.logoImage, 0, 0, 300 * self.scale, 300 * self.scale);
      p.fill(0, 0, 0, 0);
      p.stroke(0);
      p.strokeWeight(5);
      p.ellipse(0, 0, 302 * self.scale, 302 * self.scale);
      // p.ellipse(0, 0, 300 * self.scale, 300 * self.scale);
    };
    self.centerCircle.setCollider("circle", 0, 0, 150 * self.scale);
    self.centerCircle.depth = 20;
    self.centerCircleGroup.add(self.centerCircle);


    if (Config.ComplexCircles) {
      var frontCircle0 = p.createSprite(p.width / 2, p.height / 2);
      frontCircle0.draw = function () {};
      frontCircle0.setCollider("circle", -30 * self.scale, 0, 135 * self.scale);
      self.centerCircleGroup.add(frontCircle0);

      var frontCircle1 = p.createSprite(p.width / 2.25, p.height / 2);
      frontCircle1.draw = function () {};
      frontCircle1.setCollider("circle", 0, 0, 75 * self.scale);
      self.centerCircleGroup.add(frontCircle1);

      var frontCircle2 = p.createSprite(p.width / 2.4, p.height / 2);
      frontCircle2.draw = function () {};
      frontCircle2.setCollider("circle", 0, 0, 40 * self.scale);
      self.centerCircleGroup.add(frontCircle2);

      var frontCircle3 = p.createSprite(p.width / 2.5, p.height / 2);
      frontCircle3.draw = function () {};
      frontCircle3.setCollider("circle", 0, 0, 20 * self.scale);
      self.centerCircleGroup.add(frontCircle3);
    }


    if (Config.Debug) {
      self.centerCircle.debug = true;
      if (Config.ComplexCircles) {
        frontCircle0.debug = true;
        frontCircle1.debug = true;
        frontCircle2.debug = true;
        frontCircle3.debug = true;
      }
    }

    p.background(255, 237, 195);

    self.leafGroupColliding = new p.Group();

    //===============COLLIDING LEAVES==================
    for (var i = 0; i < leafCountColliding; i++) {
      var leaf = p.createSprite(p.random(0, p.width), p.random(p.height * 0.3, p.height * 0.7));
      leaf.depth = 10;
      leaf.setCollider("circle", 0, 0, 10 * self.scale);
      leaf.setSpeed(p.random(10 * self.scale, 2 * self.scale), p.random(-20, 20));
      leaf.maxSpeed = 20 * self.scale;
      leaf.draw = function () {
        p.ellipse(0, 0, 20 * self.scale, 20 * self.scale);
        if (this.position.x > (p.width + this.width)) {
          this.position.x = (0 - this.width);
        }
        if (this.position.y > (p.height * 1.1)) {
          this.position.y = 0;
        }
        if (this.position.y < (0 - this.heigth)) {
          this.position.y = p.height;
        }
      }
      leaf.scale = p.random(1.7, 2.5);
      leaf.mass = leaf.scale;
      self.leafGroupColliding.add(leaf);
    }


    //===============BACK LEAVES==================
    self.leafGroupBack = new p.Group();
    for (var i = 0; i < leafCountBack; i++) {
      var leaf = p.createSprite(p.random(0, p.width), p.random(0, p.height));
      leaf.depth = 0;
      leaf.setCollider("circle", 0, 0, 10 * self.scale);
      leaf.setSpeed(p.random(5 * self.scale, 2 * self.scale), p.random(-20, 20));
      leaf.maxSpeed = 10 * self.scale;
      leaf.draw = function () {
        p.ellipse(0, 0, 20 * self.scale, 20 * self.scale);
        if (this.position.x > (p.width + this.width)) {
          this.position.x = (0 - this.width);
        }
        if (this.position.y > (p.height * 1.1)) {
          this.position.y = 0;
        }
        if (this.position.y < (0 - this.heigth)) {
          this.position.y = p.height;
        }
      };
      leaf.scale = p.random(0.8, 1.4);
      leaf.mass = leaf.scale;
      self.leafGroupBack.add(leaf);
    }

    //===============FRONT LEAVES==================
    self.leafGroupFront = new p.Group();

    for (var i = 0; i < leafCountFront; i++) {
      var leaf = p.createSprite(p.random(0, p.width), p.random(0, p.height));
      leaf.depth = 30;
      leaf.setCollider("circle", 0, 0, 10 * self.scale);
      leaf.setSpeed(p.random(20 * self.scale, 2 * self.scale), p.random(-20, 20));
      leaf.maxSpeed = 40 * self.scale;
      leaf.draw = function () {
        p.ellipse(0, 0, 20 * self.scale, 20 * self.scale);
        if (this.position.x > (p.width + this.width)) {
          this.position.x = (0 - this.width);
        }
        if (this.position.y > (p.height * 1.1)) {
          this.position.y = 0;
        }
        if (this.position.y < (0 - this.heigth)) {
          this.position.y = p.height;
        }
      };
      leaf.scale = p.random(6, 10);
      leaf.mass = leaf.scale;
      self.leafGroupFront.add(leaf);
    }
  };



  p.draw = function () {
    p.background(255, 237, 195);
    self.centerCircleGroup.displace(self.leafGroupColliding);

    self.leafGroupBack.draw();
    self.leafGroupColliding.draw();
    self.centerCircleGroup.draw();
    self.leafGroupFront.draw();

  };

};

var p5Banner;

function setUpBanners() {
  if (typeof p5Banner !== "undefined") {
    p5Banner.remove();
  }
  p5Banner = new p5(bannerTemplate);
}
