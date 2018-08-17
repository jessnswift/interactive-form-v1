$('h3').hide();
$('#bitcoin').hide();
$('#paypal').hide();
$('.tshirt').hide();

const $otherTitle = $('#other-title');
let totalFee = 0;
function hidePlaceHolder() {
  $otherTitle.hide();
}

//give focus to the first text field & hide other job role
$('#name').focus();
hidePlaceHolder();

//a text field that will appear when "other" in drop down list is selected
$('#title').on('change', function(event) {
  if(event.target.value ==='other') {
    $otherTitle.show();
  } else {
    hidePlaceHolder();
  }
})

//"Theme - JS Puns" display "Cornflower Blue," "Dark Slate Grey," and "Gold"
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
  //"Theme - Heart JS" display "Steel Blue," "Dim Grey," and "Tomato"
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

//if selected show specific colors
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

  //Disable the workshop in the competing time slots that aren't available.

  let conflictingLookUp = {
    'js-frameworks':['git'],
    'git':['js-frameworks'],
    'js-libs':['node'],
    'node':['js-libs']
  }

 let checkBoxes = $('.activities input');
 function updateTotalVisibility(){
 //As a user selects activities, a running total should display below the list of checkboxes.
 let showTotal = false;
   $.each(checkBoxes, function(index, item){
     if (item.checked) {
       showTotal = true;
     }
   })
   if (showTotal) {
     $('h3').show();
   } else {
     $('h3').hide();
   }
 }
 $.each(checkBoxes, function(index, currentCheckBox){
   let $currentCheckBox = $(currentCheckBox);

   $currentCheckBox.click(function(event){
     let feeAmount = 100;
     if(event.target.name === 'all') {
       feeAmount = 200;
     }

     var conflictingActivity = conflictingLookUp[event.target.name];
     var $conflictingCheckBox = $(`.activities input[name=${conflictingActivity}]`);
     let label = $conflictingCheckBox.parent()[0];

     if(event.target.checked) {
       totalFee += feeAmount;
       $conflictingCheckBox.prop('disabled', true);
       $(label).css('color', 'gray');
     } else {
       // When a user unchecks an activity, competing activities
       // (if there are any) are no longer disabled.
        totalFee -= feeAmount;
        $conflictingCheckBox.prop('disabled', false);
        $(label).css('color', 'black');
      }

      $('h3').text(`Total = $${totalFee}`);
      updateTotalVisibility();
    })
 })

//Display payment sections based on the payment option chosen in the select menu
$('#payment').change(function(event){

   $('#bitcoin').hide();
   $('#credit').hide();
   $('#paypal').hide();

  let selectedOption = event.target.value;
  $(`#${selectedOption.split(' ')[0]}`).show();
});

function onsubmit(event){
  let isValid = true;
  event.preventDefault();
  // validate name field to be required
  let nameInput = $('#name')
  if (nameInput.val() === "") {
    isValid = false;
    $('#name-error').html('Please provide your name')
  }

  // valdiate email to be required and formmated correctly
  let mailInput = $('#mail')
  if (mailInput.val() === "") {
    isValid = false;
    $('#mail-error').html('Please provide a valid email')
  }

  // validate at least one activity is checked

  // let noCheckBoxesChecked = $.inArray($('.activities input'), (currentCheckBox) => {return currentCheckBox.checked}) === -1;
  let checkBoxesChecked = $('.activities input').filter((index, currentCheckBox) => {
    return currentCheckBox.checked
  })
  let noCheckBoxesChecked = checkBoxesChecked.length === 0;
  if (noCheckBoxesChecked) {
    isValid = false;
    $('#checkbox-error').html('Please check at least one activity')
  }
  // If the selected payment option is "Credit Card," make sure the user has supplied a
  //  credit card number, a zip code, and a CVV value before the form can be submitted.
  if ($('#payment')[0].selectedOptions[0].value === 'credit card'){
    if ($('#cc-num').val() === ""){
      isValid = false
      $('#cc-num').addClass('errorborder');
    }
    if ($('#zip').val() === ""){
      isValid = false;
      $('#zip').addClass('errorborder');
    }
    if ($('#cvv').val() === ""){
      isValid = false;
      $('#cvv').addClass('errorborder');
    }
  }

  if (isValid) {
    $("form[name='registration']")[0].submit();
  } else {
    return false;
  }
}

let registrationForm = $("form[name='registration']");
$(registrationForm).submit(onsubmit);
