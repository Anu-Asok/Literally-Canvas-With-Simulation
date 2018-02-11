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

var setResize = setInterval(function(){
   var canvas = document.getElementById('defaultCanvas0');
   document.getElementsByTagName('canvas')[1].style['z-index'] = '3';
   if(canvas){
     $('#defaultCanvas0').resizable();
     clearInterval(setResize);
   }
},1000);

var setDrag = document.getElementById('draggable');
setDrag.addEventListener('change',function(){
  var canvas = document.getElementsByTagName('canvas')[1];
  if(this.checked == false){
    $('.ui-wrapper').draggable({disabled:true});
    if(setInteract.checked == false)
      canvas.style['pointer-events'] = 'unset';
  }
  else{
    $('.ui-wrapper').draggable({disabled:false});
    canvas.style['pointer-events'] = 'none';
  }
});

var setInteract = document.getElementById('interactive');
setInteract.addEventListener('change', function(){
  var canvas = document.getElementsByTagName('canvas')[1];
  if(this.checked == false){
    interact = false;
    if(setDrag.checked == false)
      canvas.style['pointer-events'] = 'unset';
  }
  else{
    interact = true;
    canvas.style['pointer-events'] = 'none';
  }
});
