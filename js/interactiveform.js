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

// "Theme - JS Puns" display "Cornflower Blue," "Dark Slate Grey," and "Gold"
let designColors = {
  'js puns': [
    {
      'value': 'cornflowerblue',
      'friendlyName': 'Cornflower Blue'
    },
    {
      'value': 'darkslategrey',
      'friendlyName': 'Dark Slate Gray'
    },
    {
      'value': 'gold',
      'friendlyName': 'Gold'
    }
  ],
  // "Theme - Heart JS" display "Steel Blue," "Dim Grey," and "Tomato"
  'heart js': [
    {
      'value': 'tomato',
      'friendlyName': 'Tomato'
    },
    {
      'value': 'steelblue',
      'friendlyName': 'Steel Blue'
    },
    {
      'value': 'dimgrey',
      'friendlyName': 'Dim Grey'
    }
  ],
};

// if selected show specific colors
$('#design').on('change', function(event) {
  if(event.target.value==='js puns') {
    let optionsHtml = ``;
    let punsOptions = designColors['js puns'];
    for (let i = 0; i < punsOptions.length; i++) {
      optionsHtml += `<option value="${punsOptions[i].value}">${punsOptions[i].friendlyName}</option>`
    }
    $('#color').html(optionsHtml);
  } else if (event.target.value==='heart js') {
    let optionsHtml = ``;
    let punsOptions = designColors['heart js'];
    for (let i = 0; i < punsOptions.length; i++) {
      optionsHtml += `<option value="${punsOptions[i].value}">${punsOptions[i].friendlyName}</option>`
    }
    $('#color').html(optionsHtml);

    }
  })

  // Disable the workshop in the competing time slots that aren't available.

  let conflictingLookUp = {
    'js-frameworks':['express'],
    'express':['js-frameworks'],
    'js-libs':['node'],
    'node':['js-libs']
  }

 let checkBoxes = $('.activities input');
 $.each(checkBoxes, function(index, currentCheckBox){
   let $currentCheckBox = $(currentCheckBox);

   $currentCheckBox.click(function(event){
     if(event.target.checked) {
       var conflictingActivity = conflictingLookUp[event.target.name];
       var $conflictingCheckBox = $(`.activities input[name=${conflictingActivity}]`);
       let label = $conflictingCheckBox.parent()[0];
       $conflictingCheckBox.prop('disabled', true);
       $(label).css('color', 'gray');
     //When a user unchecks an activity, competing activities (if there are any) are no longer disabled.
     } else {
       var conflictingActivity = conflictingLookUp[event.target.name];
       var $conflictingCheckBox = $(`.activities input[name=${conflictingActivity}]`);
        $conflictingCheckBox.prop('disabled', false);
        let label = $conflictingCheckBox.parent()[0];
        $(label).css('color', 'black');
    }
   })
 })

 //As a user selects activities, a running total should display below the list of checkboxes.
