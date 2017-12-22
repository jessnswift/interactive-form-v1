const $otherTitle = $('#other-title');
function hidePlaceHolder() {
  $otherTitle.hide();
}

// give focus to the first text field & hide other job role
$('#name').focus();
hidePlaceHolder();

// a text field that will appear when "other" in drop down list is selected
$('#title').on('change', function(event) {
  if(event.target.value==='other') {
    $otherTitle.show();
  } else {
    hidePlaceHolder();
  }
})
