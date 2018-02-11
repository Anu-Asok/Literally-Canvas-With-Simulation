var simulations = document.getElementById('simulations');
var url = new URL(window.location.href);
var simulation = url.searchParams.get('simulation');
dbRef.child('simulations').once('value',function(snapshot){
  var obj = snapshot.val();
  for(key in obj){
    var option = document.createElement('option');
    option.value = key;
    option.innerText = obj[key];
    simulations.appendChild(option);
  }
  simulations.style.display = 'block';
});

simulations.addEventListener('change', function(){
  if(this.value != "")
    sgRef.child('simulations/'+this.value+'.js').getDownloadURL().then(function(url){
      window.location.href = '/?simulation=' + encodeURIComponent(url);
    });  
});

var script = document.createElement('script');
script.src = simulation;
document.body.appendChild(script);
