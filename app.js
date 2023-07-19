const express=require("express");
const https=require("https");
const bodyParser =require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const query=req.body.cityName;
  const apikey="9838cd668b2a74b5b99abb642871383b";
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp
      const weatherDescription=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon
      const imgurl="https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p> The Discription of weather is: " + weatherDescription + "</p>");
      res.write("<h1>The Temperature in  "+req.body.cityName+" is : " + temp + " Degree Celsius</h1>");
      res.write("<img src=" +imgurl+">");
      res.send();



    })
  })

})




app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})









// const query="London";
// const apikey="9838cd668b2a74b5b99abb642871383b";
// const unit="metric"
// const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
// https.get(url, function(response){
//   console.log(response.statusCode);
//
//   response.on("data",function(data){
//     const weatherData=JSON.parse(data)
//     const temp=weatherData.main.temp
//     const weatherDescription=weatherData.weather[0].description
//     const icon=weatherData.weather[0].icon
//     const imgurl="https://openweathermap.org/img/wn/" + icon + "@2x.png";
//     res.write("<p> The Discription of weather is: " + weatherDescription + "</p>")
//     res.write("<h1>The Temperature in London is : " + temp + " Degree Celsius</h1>");
//     res.write("<img src=" +imgurl+">")
//     res.send()
//
//
//
//   })
// })
