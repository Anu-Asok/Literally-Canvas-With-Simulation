var simulations = document.getElementById('simulations');
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
