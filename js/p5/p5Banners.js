

/*
                                  P5 STUFF
*/


var bannerTemplate = function(p) {
  var self = this;

  var externalHeight;
  var scale;

  var maxLeafCount = 100;
  var leafGroup;

  var centerCircleGroup;
  var centerCircle;

  var noiseVal = 0;

  p.setup = function (){

    var w_height = $( window ).height();
    var w_width = $( window ).width();
    externalHeight = $('#p5BannerContainer').parent().height();
    var scale_y = 1.7;
    var canvasHeigth =  externalHeight*scale_y;
    //$('#p5BannerContainer').parent().height(canvasHeigth);
    var canvas = p.createCanvas(w_width, canvasHeigth);

    canvas.parent('p5BannerContainer');

    self.scale = canvasHeigth/1300;



    self.centerCircleGroup = new p.Group();
    self.centerCircle = p.createSprite(p.width/2, p.height/2);
    //TODO: Put here the sprite of my image logo and resize it accordingly with self.centerCircle.scale = something
    self.centerCircle.draw = function() {
      p.ellipse(0,0,300*self.scale,300*self.scale);
    }
    self.centerCircle.setCollider("circle",0,0,150*self.scale);
    self.centerCircleGroup.add(self.centerCircle);

    var frontCircle0 = p.createSprite(p.width/2, p.height/2);
    frontCircle0.draw = function() {
    }
    frontCircle0.setCollider("circle",-30*self.scale,0,135*self.scale);
    self.centerCircleGroup.add(frontCircle0);

    var frontCircle1 = p.createSprite(p.width/2.25, p.height/2);
    frontCircle1.draw = function() {
    }
    frontCircle1.setCollider("circle",0,0,75*self.scale);
    self.centerCircleGroup.add(frontCircle1);

    var frontCircle2 = p.createSprite(p.width/2.4, p.height/2);
    frontCircle2.draw = function() {
    }
    frontCircle2.setCollider("circle",0,0,40*self.scale);
    self.centerCircleGroup.add(frontCircle2);

    var frontCircle3 = p.createSprite(p.width/2.5, p.height/2);
    frontCircle3.draw = function() {
    }
    frontCircle3.setCollider("circle",0,0,20*self.scale);
    self.centerCircleGroup.add(frontCircle3);

    if(DEBUG){
      self.centerCircle.debug=true;
      frontCircle0.debug=true;
      frontCircle1.debug=true;
      frontCircle2.debug=true;
      frontCircle3.debug=true;
    }

    p.background(255,237,195);

    self.leafGroup = new p.Group();

    for(var i=0 ; i< maxLeafCount ; i++){
      var leaf = p.createSprite(p.random(0,p.width),p.random(0,p.height));
      leaf.setCollider("circle", 0,0,10*self.scale);
      leaf.setSpeed(p.random(10*self.scale,2*self.scale), p.random(-20, 20));
      leaf.maxSpeed=20*self.scale;
      leaf.draw = function() {
        p.ellipse(0,0,20*self.scale,20*self.scale);
        if(this.position.x > (p.width+this.width)){
          this.position.x = (0 - this.width);
        }
        if(this.position.y > (p.height*1.1)){
          // this.position.y = (0 - this.heigth);
          this.position.y = 0;
        }
        if(this.position.y < (0 - this.heigth)){
          // this.position.y = (p.height*1.1);
          this.position.y = p.height;
        }

        // var snoise_x = (p.noise(this.position.x)*2. - 1.);
        // var snoise_y = (p.noise(this.position.y)*2 - 1);
        //
        // console.log(snoise_x);
        //
        // this.addSpeed(snoise_x,180);


      }
      leaf.scale = p.random(0.5, 1);
      leaf.mass = leaf.scale;
      self.leafGroup.add(leaf);
    }

  };

  p.draw = function (){
    p.background(255,237,195);
    //self.leafGroup.bounce(self.leafGroup);
    self.centerCircleGroup.displace(self.leafGroup);

    p.drawSprites();

  };

};

var p5Banner;
function setUpBanners(){
  if(typeof p5Banner !== "undefined"){
    p5Banner.remove();
  }
  p5Banner = new p5(bannerTemplate);
}
