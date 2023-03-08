$(document).ready(function () {
  
    var rowWorkIdx = 0;
    // Add worker to table from button click
    $('#addWorker').on('click', function () {
      var hours = $('#hours').val();
      var hourlyRate = $('#hourlyRate').val();

      // Adding a row inside the tbody
      $('#tWorkerBody').append(`<tr id="R${++rowWorkIdx}">
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
    });

    // Worker table remove button function
    $('#tWorkerBody').on('click', '.remove', function () {
      var child = $(this).closest('tr').nextAll();

      // Iterate through all table rows to update indexes
      child.each(function () {
        var id = $(this).attr('id');
        var idx = $(this).children('.row-index').children('p');
        var dig = parseInt(id.substring(1));

        $(this).attr('id', `R${dig - 1}`);
      });

      $(this).closest('tr').remove();

      rowWorkIdx--;
    });


    var rowResIdx = 0;
    // Add resource to table from button click
    $('#addResource').on('click', function () {
      var resource = $('#resource').val();
      var resourceCost = $('#resourceCost').val();

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
    });

    // Worker table remove button function
    $('#tResBody').on('click', '.remove', function () {
      var child = $(this).closest('tr').nextAll();

      // Iterate through all table rows to update indexes
      child.each(function () {
        var id = $(this).attr('id');
        var idx = $(this).children('.row-index').children('p');
        var dig = parseInt(id.substring(1));

        $(this).attr('id', `R${dig - 1}`);
      });

      $(this).closest('tr').remove();

      rowResIdx--;
    });


  });