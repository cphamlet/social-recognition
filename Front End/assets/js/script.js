
$(function() {
	_removeInput();
});

var resultsList;

function processPics(responseText){
	var picsList = JSON.parse(responseText);
	console.log(picsList)
	updateResults()
	// for (var i = 0; i <= 50; i++){
	// 	resultsList.append(picsList[i]);
	// }
}

function updateResults() {
	_removeInput()
}

function _removeInput() {
	$(".box").addClass("remove-input");
}

function upload() {
	var formData = new FormData();
	formData.append("file", document.getElementById("file").files[0]);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	    	responseJSON = xhr.responseText
	        alert(responseJSON);
	        processPics(responseJSON);
	    }
	}
	xhr.open("POST", "./upload");
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
