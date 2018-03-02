
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
  this.innerText = 'Creating...';
  var folderName = document.getElementById('folder-name').value;
  dbRef.child('simulations/').orderByKey().equalTo(shrinkName(folderName)).once('value', (snapshot) => {
    if(!snapshot.val()){
      dbRef.child('simulations/'+shrinkName(folderName)).set('Not Uploaded').then(()=>{
        alert('Added!');
        window.location.href = '/options';
      });
    }
    else{
      alert("Name already exists!");
      this.innerText = 'Create';
    }
  });
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

var simulationImage = document.getElementById('simulation-image');

simulationImage.addEventListener('change', function(event){
  var status = document.getElementById('status');
  status.style.display = 'block';
  var file = event.target.files[0];
  var sg = sgRef.child('images/'+selectSimulationForImage.value+'/'+file.name);
  sg.put(file).then(function(){
    status.innerText = 'Generating URL...';
    sgRef.child('images/'+selectSimulationForImage.value+'/'+file.name).getDownloadURL().then(function(url){
      status.innerText = 'Finished';
      document.getElementById('url').innerText = url;
    });
  });
});

var simulationJS = document.getElementById('simulation-js');
simulationJS.addEventListener('change', function(event){
  var status = document.getElementById('upload-status');
  var file = event.target.files[0];
  if (file.name == selectSimulation.value+'.js'){
    status.innerText = 'Uploading...';
    var sg = sgRef.child('simulations/'+file.name);
    sg.put(file).then(function(){
      dbRef.child('simulations/'+selectSimulation.value).set(expandName(selectSimulation.value)).then(function(){
        alert('Finished!');
        window.location.href = '/options';
      })
    });
  }
  else {
    alert("Rename the file to "+selectSimulation.value+'.js');
  }
});
