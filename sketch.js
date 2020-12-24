var dog,dogimg,database,foodstock,food,feedTime;
var foodobj,addfood,feed;
function preload()
{
dogimg=loadImage("images/dogImg.png")
dog1img=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(900, 500);
  database = firebase.database()
  dog=createSprite(250,250,50,50)
  dog.addImage(dogimg)
  dog.scale=0.1
  foodobj=new Food()
  foodstock =database.ref("Food");
foodstock .on("value",readStock)
feedTime=database.ref("FeedTime")
feedTime.on("value",readStock)
feed=createButton("feed the dog")
feed.position(700,95);
feed.mousePressed(feedDog);
addfood= createButton("Add Food");
addfood.position(795,100);
addfood.mousePressed(addFood); 

}


function draw() {  
  background(46,139,87);
 /* if(keyWentDown(UP_ARROW)){
     writeStock(food)
     dog.addImage(dog1img);
  }*/currentTime = hour();
  drawSprites();
fill("white")
  textSize(30);
  text("remainingFood"+":" +food,120,120)
  textSize(20);
  fill("white");
  text("Food Remaining: "+foodS,170,100);
  if(fedTime>=12)
        {
        fill("white");
        textSize(15); 
        text("Last Fed : "+ fedTime%12 + " PM", 350,30);
        }
        else if(fedTime==0)
        {
            fill("white");
            textSize(15); 
             text("Last Fed : 12 AM",350,30);
        }
        else
        {
            fill("white");
            textSize(15); 
            text("Last Fed : "+ fedTime + " AM", 350,30);
        }


}
function readStock(data){
food=data.val();
food
}

function writeStock(x){
 if(x<=0){
   x=0;
 }else{
   x=x-1;
 }
 
  database.ref('/').update({
   'Food':x
 })
  }
  function feedDog()
{
    dog.addImage(dog1img);
    foodobj.updatefoodstock(foodobj.getFoodStock()-1);
    database.ref('/').update({
      Food : foodobj.getFoodStock(),
      feedTime:hour()
    })
    
}
function addFood()
{
  dog.addImage(sadDogImg);
  food++;
  database.ref('/').update({
    Food:food
  })
}
