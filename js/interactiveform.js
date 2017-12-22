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
