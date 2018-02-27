
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
