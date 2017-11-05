

function processPic(responseText){
	var pic_obj = JSON.parse(responseText);
	console.log(pic_obj)
}

function upload() {
	var formData = new FormData();
	formData.append("file", document.getElementById("file").files[0]);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	        alert(xhr.responseText);
	        processPic(xhr.responseText);
	    }
	}
	xhr.open("POST", "http://ec2-34-210-241-233.us-west-2.compute.amazonaws.com/upload");
	xhr.send(formData);
}

// $.ajax({
//   type: "POST",
//   url: "http://ec2-34-210-241-233.us-west-2.compute.amazonaws.com/upload",
//   data: document.getElementById("file").files[0],
//   cache: false,
//   success: function(data){
//      $("#resultarea").text(data);
//   }
// });
