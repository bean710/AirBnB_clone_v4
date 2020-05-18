const amenityList = {};
const cityList = {};
const stateList = {};

function update () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      amenities: Object.keys(amenityList),
      cities: Object.keys(cityList),
      states: Object.keys(stateList)
    }),
    success: function (data) {
      console.log("Got data");
      $('article').remove();
      for (const place of Object.values(data)) {
        // Find a better way to write this nightmare of a line. Maybe use Mustache.js for template
        $('section.places').append(
          '<article>' +
            '<div class="title_box">' +
              `<h2>${place.name}</h2>` +
              `<div class="price_by_night">$${place.price_by_night}</div>` +
            '</div>' +
            '<div class="information">' +
              `<div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>` +
              `<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}</div>` +
              `<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>` +
            '</div>' +
            `<div class="description">${place.description}</div>` +
          '</article>');
      }
    }
  });
}

$(document).ready(function () {
  /**
  $('input[type="checkbox"]').click(function () {
    update();
  });
  **/

  $('.amenitycheck').click(function () {
    $(this).each(function () {
      if (this.checked === true) {
        amenityList[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenityList[$(this).data('id')];
      }
    });

    if (Object.values(amenityList).length > 0) {
      $('.amenities h4').text(Object.values(amenityList).join(', '));
    } else {
      $('.amenities h4').html('&nbsp');
    }

    update();
  });

  $('.citycheck').click(function () {
    $(this).each(function () {
      if (this.checked === true) {
        cityList[$(this).data('id')] = $(this).data('name');
      } else {
        delete cityList[$(this).data('id')];
      }
    });

    const totlist = Object.values(stateList).concat(Object.values(cityList));

    if (totlist.length > 0) {
      $('.locations h4').text(totlist.join(', '));
    } else {
      $('.locations h4').html('&nbsp');
    }

    update();
  });

  $('.statecheck').click(function () {
    $(this).each(function () {
      if (this.checked === true) {
        stateList[$(this).data('id')] = $(this).data('name');
      } else {
        delete stateList[$(this).data('id')];
      }
    });

    const totlist = Object.values(stateList).concat(Object.values(cityList));
    console.log(totlist);

    if (totlist.length > 0) {
      $('.locations h4').text(totlist.join(', '));
    } else {
      $('.locations h4').html('&nbsp');
    }

    update();
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (data) {
      for (const place of Object.values(data)) {
        // Find a better way to write this nightmare of a line. Maybe use Mustache.js for template
        $('section.places').append(
          '<article>' +
            '<div class="title_box">' +
              `<h2>${place.name}</h2>` +
              `<div class="price_by_night">$${place.price_by_night}</div>` +
            '</div>' +
            '<div class="information">' +
              `<div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>` +
              `<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}</div>` +
              `<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>` +
            '</div>' +
            `<div class="description">${place.description}</div>` +
          '</article>');
      }
    }
  });

  $('button').click(function () {
    update();
  });
});

