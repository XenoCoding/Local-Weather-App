$("document").ready(function(){
  
  var location = $("#location");
  var temp = $("#temperature");
  var unit = $("#unit");
  var weatherLogo = $("#weatherLogo");
  var unitValue = "F";
  var apiIP = "https://ipinfo.io";
  var loc;
  
  $.getJSON(apiIP, function(data) {
    
    loc = data.loc;

    var slice;
    for(var i = 0; i < loc.length; i++){
      if(loc[i] == ','){
        slice = i;
      }
    }
    
    var lat = loc.slice(0, slice);
    var lon = loc.slice(slice+1, loc.length-1);
    
    var apiWeather = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&id=524901&APPID=40850d0bc887141319d06bdfe22f26c9";
    $.getJSON(apiWeather, function(data){
      
      location.html(data.name + ", " + data.sys.country);
      
      temp.html(data.main.temp + "°");
      
      var toggle = false;
      // rest of your code.
      unit.on('click',function(){
        toggle = !toggle; // switch the functionality of toggle on each click.
        if(toggle){
          //if toggle is true, set it to F.
          unit.html('F');
          temp.html(data.main.temp + "°");
        } 
        else{
          // toggle is false, set to C.
          function round(num, places) {
            var multiplier = Math.pow(10, places);
            return Math.round(num * multiplier) / multiplier;
          }
          
          unit.html('C');
          var celcius = round((data.main.temp -32)*(5/9), 2);
          temp.html(celcius + "°");
        }
      });
      
      var weatherIcon = data.weather[0].icon; 
      weatherLogo.attr("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");;
      
    }, "jsonp");
  }, "jsonp");
});
