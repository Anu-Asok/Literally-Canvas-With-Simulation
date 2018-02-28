
//dbRef.child('simulations/').set('sdfa');
var ids = ['create-folder', 'upload-image', 'upload-simulation'];
var options = document.getElementById('options');
options.addEventListener('change', function(){
  var id = this.value;
  for(var i=0; i<3; i++)
    if (ids[i] == id)
      document.getElementById(id).style.display = 'block';
    else
      document.getElementById(ids[i]).style.display = 'none';
});

function shrinkName(name){
  name = name.split(' ').map(function(s){
    return s.toLowerCase();
  });
  return name.join('-');
}

function expandName(name){
  name = name.split('-');
  var x = name[0].split("");
  x[0] = x[0].toUpperCase();
  name[0] = x.join('');
  return name.join(' ');
}

var create = document.getElementById('create');
create.addEventListener('click', function(){
  var folderName = document.getElementById('folder-name').value;
  dbRef.child('simulations/'+shrinkName(folderName)).set('Not Uploaded');
});

var selectSimulationForImage = document.getElementById('select-simulation-for-image');
var selectSimulation = document.getElementById('select-simulation');
dbRef.child('simulations').orderByValue().equalTo('Not Uploaded').once('value', function(snapshot){
  var obj = snapshot.val();
  selectSimulation.options[0].innerText = 'Select the simulation';
  for (var key in obj){
    var option = document.createElement('option');
    option.value = key;
    option.innerText = expandName(key);
    selectSimulation.append(option);
  }
  selectSimulationForImage.innerHTML = selectSimulation.innerHTML;
});

var uploadImageBtn = document.getElementById('upload-image-btn');
uploadImageBtn.addEventListener('click', function(event){
  console.log(event.target);
});
