"use strict";

const $cupcakeList = $("#cupcakeList");
const $form = $('#addCupcakeForm');
const $flavorInput = $('#flavor');
const $sizeInput = $('#size');
const $ratingInput = $('#rating');
const $imageUrlInput = $('#imageUrl');

/** Calls API for a list of cupcakes, returns an array of cupcake objects*///TODO:format to show cupcake object
async function getCupcakeList() {
  const response = await fetch('http://localhost:5000/api/cupcakes');
  const data = await response.json();

  return data.cupcakes;
}

/**Populate cupcake list with cupcake */
async function fillCupcakeList() {
  $cupcakeList.empty();

  const cupcakes = await getCupcakeList();

  for (let cupcake of cupcakes) {
    addCupcakeToHtml(cupcake);
  }

}

/**Event handler for add cupcake form, gets user input and passes to addCupcake
 * then append new cupcake to cupcakes list
*/
async function handleAddCupcake(evt) {
  evt.preventDefault();
  console.log("HandleAddCupcake", evt.target);
  const flavor = $flavorInput.val();
  const size = $sizeInput.val();
  const rating = $ratingInput.val();
  const image_url = $imageUrlInput.val();

  const cupcake = await addCupcakeToDb(flavor, size, rating, image_url);

  addCupcakeToHtml(cupcake);

  $form.trigger('reset');
}
$form.on("submit", handleAddCupcake);

/**Communicates with API to add cupcake to the db,
 * returns cupcake object
 */
async function addCupcakeToDb(flavor, size, rating, image_url) {

  const response = await fetch(
    '/api/cupcakes',
    {
      method: "POST",
      body: JSON.stringify({
        flavor,
        size,
        rating,
        image_url
      }),
      headers: { "content-type": "application/json" }

    });

  const data = await response.json();

  return data.cupcake;
}

/**Adds a cupcake to the cupcake html list *///TODO:destructure cupcake fields in params
function addCupcakeToHtml(cupcake) {
  const $newCupcake = $(`<li id=${cupcake.id}></li>`);
  const $cupcakeImage = $("<img>")
    .attr('src', cupcake.image_url)//TODO:make object with attr keys and pass to .attr or make css file. add alt to img
    .attr('width', '100')
    .attr('height', '100');
  $newCupcake.append($cupcakeImage);
  $newCupcake.append(
    `<p>Flavor: ${cupcake.flavor}</p>
    <p>Size: ${cupcake.size}</p>
    <p>Rating: ${cupcake.rating}</p>`);
  $newCupcake.append(`<button id='${cupcake.id}'>Delete</button>`) //TODO:ID not needed
  $cupcakeList.append($newCupcake);
}

/**Deletes a cupcake from the database */
async function deleteCupcakeFromDb(cupcakeId){
  const response = await fetch(`/api/cupcakes/${cupcakeId}`,{method: "DELETE"})

}

/**Event handler for delete buttons, removes a cupcake from the html list */
async function handleDeleteButton(evt){
  evt.preventDefault();
  $cupcakeToDelete = $(evt.target).closest('li');
  cupcakeId = $cupcakeToDelete.attr('id');
  await deleteCupcakeFromDb(cupcakeId);
  $cupcakeToDelete.remove();
}
$cupcakeList.on("click","button", handleDeleteButton);

fillCupcakeList();