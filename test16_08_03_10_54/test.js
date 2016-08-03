window.onload = initForm; 

function initForm() {
	var allTags = document.forms[0].getElementsByTagName("*");

	for(var i = 0; i < allTags.length; i++) {
		if(allTags[i].readOnly) {
			allTags[i].onfocus = function() {
				this.blur();
			}
		}
	}	
}

