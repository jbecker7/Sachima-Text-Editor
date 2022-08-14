
$( document ).ready(function(){
		$( ".my-docs-click" ).on( "click", function(){
			$( ".file-list" ).toggleClass( "file-list-show" );	
		});



// I can handle the fonts by somehow saving unlocked fonts to a variable (tied to Google account) which is then fed into font_family_formats in tinymce

		tinymce.init({
	        selector: '.user-text',
	        plugins: [
	          'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
	          'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
	          'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
	        ],
	        toolbar: 'undo redo | bold italic underline| fontfamily ',
	       menubar: false
		});
		
		setInterval(function(){
			var theCount=$('.tox-statusbar__wordcount').text();
			var something=parseInt(theCount.replace('words', ''));
			$("#word-count").val(something);
			if(something > parseInt($("#total-words").val())){
			$("#total-words").css({"background-color":"#00FF00"});
			}
		},1000);

		$( "#save" ).on("click",function(evt){
			const downloadToFile = (content, filename, contentType) => {
			 	const a = document.createElement('a');
			  	const file = new Blob([content], {type: contentType});
			  
				a.href= URL.createObjectURL(file);
				a.download = filename;
				a.click();
			  
				URL.revokeObjectURL(a.href);
			};

			document.querySelector('#save').addEventListener('click', () => {
				const textArea = tinymce.activeEditor.getContent();
				  
				  downloadToFile(textArea, 'file-name.ffe', 'text/plain');
				});

		})

		$( "#print" ).on("click",function(evt){
			console.log("Print Click");
			printOverride();
		

		})
	
		function printOverride(){
			tinymce.activeEditor.execCommand('mcePrint');


		}
		const inputElement = document.getElementById("input");
		inputElement.addEventListener("change", handleFiles, false);
		function handleFiles() {
			const fileList = this.files; 
		 	const numFiles = fileList.length;
		 	for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
  				const file = fileList[i];
				$(".file-list-available").append("<li>" + file.name + "</li>");
				console.log(file);
			}

		}
		document.addEventListener("visibilitychange", event => {
  			if (document.visibilityState === "visible") {
    			console.log("tab is active");
  			} else {
  				console.log("tab is inactive");
    			// window.alert("Do not click off");
    			$( ".shame-message-wrapper" ).toggleClass( "shame-message-visible");	
    			$(document).on("click", function (event) {
    				if ($(event.target).hasClass("shame-message")) {
    					console.log("clicked on");
    				} else {
    					console.log("clicked off");
    					$( ".shame-message-wrapper" ).toggleClass( "shame-message-visible");
    					$(document).off("click");	
    	}
  			});

  		}
})
	
});