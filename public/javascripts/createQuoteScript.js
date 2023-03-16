// Function to get worker calculation from backend
function calculateWorker (hours, hourlyRate, add) {
  var workersCost = parseInt($("#workersCost").html());
  // Will need to hide the value of hourlyRate so that they can't look at it (maybe just the database id for already set rates)
  var url = "/api/addWorker?"+"hours="+hours+"&hourlyRate="+hourlyRate;
  $.ajax(
    {url: url,
    success: function(workerPrice){
      if (add) workersCost = parseInt(workersCost) + parseInt(workerPrice);
      else workersCost = parseInt(workersCost) - parseInt(workerPrice);
      
      $("#workersCost").html(workersCost);
    }
  });
}

// Code from https://www.geeksforgeeks.org/how-to-dynamically-add-remove-table-rows-using-jquery/
$(document).ready(function () {
  
    var rowWorkIdx = 0;
    //var workersCost = 0;
    // Add worker to table from button click
    $('#addWorker').on('click', function () {
      var workerName = $('#workerName').val();
      var hours = $('#hours').val();
      var hourlyRate = $('#hourlyRate').val();

      // Adding a row inside the tbody
      $('#tWorkerBody').append(`<tr id="R${++rowWorkIdx}">
          <td class="text-center">
            <p>${workerName}</p>
          </td>
          <td class="row-index text-center">
            <p>${hours}</p>
          </td>
          <td class="row-index text-center">
            <p>${hourlyRate}</p>
          </td>
          <td class="text-center">
            <button class="btn btn-danger remove"
                type="button">Remove</button>
          </td>
        </tr>`);

        /* // Will need to hide the value of hourlyRate so that they can't look at it
        var url = "/api/addWorker?"+"hours="+hours+"&hourlyRate="+hourlyRate;
        $.ajax(
          {url: url,
          success: function(workerPrice){
            workersCost = parseInt(workersCost) + parseInt(workerPrice);
            $("#workersCost").html(workersCost);
          }
        }); */
        calculateWorker(hours, hourlyRate, true);
        
    });

    // Worker table remove button function
    $('#tWorkerBody').on('click', '.remove', function () {
      var child = $(this).closest('tr').nextAll();

      // Iterate through all table rows to update indexes
      child.each(function () {
        var id = $(this).attr('id');
        var dig = parseInt(id.substring(1));

        $(this).attr('id', `R${dig - 1}`);
      });
      var hours = 0;
      var hourlyRate = 0;
      var col1 = $(this).closest('tr').children('.row-index')[0];
      var col2 = $(this).closest('tr').children('.row-index')[1];

      hours = parseInt($(col1).children('p').html());
      hourlyRate = parseInt($(col2).children('p').html());

      calculateWorker(hours, hourlyRate, false);

      $(this).closest('tr').remove();

      rowWorkIdx--;
    });


    var rowResIdx = 0;
    // Add resource to table from button click
    $('#addResource').on('click', function () {
      var resource = $('#resource').val();
      var resourceCost = $('#resourceCost').val();
      var resourcesCost = parseInt($('#resourcesCost').html());

      // Adding a row inside the tbody
      $('#tResBody').append(`<tr id="R${++rowResIdx}">
          <td class="row-index text-center">
            <p>${resource}</p>
          </td>
          <td class="row-index text-center">
            <p>${resourceCost}</p>
          </td>
          <td class="text-center">
            <button class="btn btn-danger remove"
                type="button">Remove</button>
          </td>
        </tr>`);

        resourcesCost = resourcesCost + parseInt(resourceCost);
        $("#resourcesCost").html(resourcesCost);
    });

    // Worker table remove button function
    $('#tResBody').on('click', '.remove', function () {
      var resourcesCost = parseInt($('#resourcesCost').html());
      var child = $(this).closest('tr').nextAll();

      // Iterate through all table rows to update indexes
      child.each(function () {
        var id = $(this).attr('id');
        var dig = parseInt(id.substring(1));

        $(this).attr('id', `R${dig - 1}`);
      });

      var resourceCost = 0;
      var col2 = $(this).closest('tr').children('.row-index')[1];
      resourceCost = parseInt($(col2).children('p').html());
      resourcesCost = resourcesCost - parseInt(resourceCost);
      $("#resourcesCost").html(resourcesCost);

      $(this).closest('tr').remove();

      rowResIdx--;
    });


  });