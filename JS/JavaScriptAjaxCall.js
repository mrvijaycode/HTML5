
http://api.jquery.com/jquery.ajax/

$.ajax({
	success : function () {
	
	
	}
});


$.ajax({
        type: "POST",
        data: "{'prefix':''}",
        url: "/YourWebService.asmx/MethodName",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: functionToCallWhenSucceed,
        failure: funcitonToCallWhenFailed
});


$.ajax({
	url : "test.html",
	context : document.body
}).done(function () {
	$(this).addClass("done");
});



$.ajax({
  statusCode: {
    404: function() {
      alert( "page not found" );
    }
  }
});