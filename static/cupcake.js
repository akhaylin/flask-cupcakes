"use-strict";

const $cupcakeList = $("#cupcakeList")
const $form = $('#addCupcakeForm');
const $flavorInput = $('#flavor');
const $sizeInput = $('#size');
const $ratingInput = $('#rating');
const $imageUrlInput = $('#imageUrl');

/** Calls API for a list of cupcakes, returns an array of cupcake objects*/
async function getCupcakeList(){
  const response = await fetch('http://localhost:5000/api/cupcakes');
  const data = await response.json();

  return data.cupcakes;
}

/**Populate cupcake list with cupcake */
async function fillCupcakeList(){
  $cupcakeList.empty();

  const cupcakes = await getCupcakeList();

  for(let cupcake of cupcakes){
    const newCupcake = $("<li>");
    const cupcakeImage = $("<img>")
      .attr('src', cupcake.image_url)
      .attr('width', '100')
      .attr('height', '100');
    newCupcake.append(cupcakeImage);
    newCupcake.append(`<span>${cupcake.flavor}</span>`)
    $cupcakeList.append(newCupcake);
  }

}

/** */
async function handleAddCupcake(evt){
  evt.preventDefault();
  console.log("HandleAddCupcake", evt.target);
  const flavor = $flavorInput.val();
  const size = $sizeInput.val();
  const rating = $ratingInput.val();
  const image_url = $imageUrlInput.val();

  const cupcake = await addCupcake(flavor, size, rating, image_url);

  const newCupcake = $("<li>");
  const cupcakeImage = $("<img>")
    .attr('src', cupcake.image_url)
    .attr('width', '100')
    .attr('height', '100');
  newCupcake.append(cupcakeImage);
  newCupcake.append(`<span>${cupcake.flavor}</span>`)
  $cupcakeList.append(newCupcake);

  $form.trigger('reset');
}


/** */
async function addCupcake(flavor, size, rating, image_url){
  console.log("AddCupcake", flavor, size, rating, image_url)
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
      headers: {"content-type": "application/json"}

    });

  const data = await response.json();

  return data.cupcake;
}

$form.on("submit", handleAddCupcake);
fillCupcakeList();