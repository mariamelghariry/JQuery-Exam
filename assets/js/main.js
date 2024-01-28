// ! ========> Loading
$(document).ready(function () {
  $(".loading").fadeOut(1000, function () {
    $("body").css("overflow", "auto");
  });
});

// ! ========> Side nav
const width = $(".side-nav-inner").innerWidth();
$(".side-nav").css("left", -width);

// ! ========> async functions
async function meals() {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  var mealsData = await response.json();
  // console.log(mealsData)

  for (i = 0; i < mealsData.meals.length; i++) {
    var cartona = "";
    for (var i = 0; i < mealsData.meals.length; i++) {
      cartona += `<div class="meal col-lg-3 position-relative">
    <div class="position-relative">
      <div class="card border-0">
        <img src="${mealsData.meals[i].strMealThumb}" class="card-img-top w-100 rounded" alt="..." />
      </div>
      <div
        class="layer position-absolute w-100 h-100 d-flex align-items-center rounded"
      >
        <span class="fs-3 ps-3 fw-bold">${mealsData.meals[i].strMeal}</span>
      </div>
    </div>
  </div>
`;
    }
    // console.log(cartona)
    $(".meals").html(cartona);
  }

  async function mealsId(Id) {
    var response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`
    );
    var mealIdInfo = await response.json();
    console.log(mealIdInfo);
    $(".meals-details img").attr("src", mealIdInfo.meals[0].strMealThumb);
    $(".info span").html(mealIdInfo.meals[0].strMeal);
    $(".meals-details p").html(mealIdInfo.meals[0].strInstructions);
    $(".area-1 span").html(mealIdInfo.meals[0].strArea);
    $(".category span").html(mealIdInfo.meals[0].strCategory);
    $(".tags span").html(mealIdInfo.meals[0].strTags);
    $(".source").attr("href", mealIdInfo.meals[0].strSource);
    $(".youtube").attr("href", mealIdInfo.meals[0].strYoutube);

    var ingredients = [
      mealsData.meals[0].strIngredient1,
      mealsData.meals[0].strIngredient2,
      mealsData.meals[0].strIngredient3,
      mealsData.meals[0].strIngredient4,
      mealsData.meals[0].strIngredient5,
      mealsData.meals[0].strIngredient6,
      mealsData.meals[0].strIngredient7,
      mealsData.meals[0].strIngredient8,
      mealsData.meals[0].strIngredient9,
      mealsData.meals[0].strIngredient10,
      mealsData.meals[0].strIngredient11,
      mealsData.meals[0].strIngredient12,
      mealsData.meals[0].strIngredient13,
      mealsData.meals[0].strIngredient14,
      mealsData.meals[0].strIngredient15,
      mealsData.meals[0].strIngredient16,
      mealsData.meals[0].strIngredient17,
      mealsData.meals[0].strIngredient18,
      mealsData.meals[0].strIngredient19,
      mealsData.meals[0].strIngredient20,
    ];
    var measure = [
      mealsData.meals[0].strMeasure1,
      mealsData.meals[0].strMeasure2,
      mealsData.meals[0].strMeasure3,
      mealsData.meals[0].strMeasure4,
      mealsData.meals[0].strMeasure5,
      mealsData.meals[0].strMeasure6,
      mealsData.meals[0].strMeasure7,
      mealsData.meals[0].strMeasure8,
      mealsData.meals[0].strMeasure9,
      mealsData.meals[0].strMeasure10,
      mealsData.meals[0].strMeasure11,
      mealsData.meals[0].strMeasure12,
      mealsData.meals[0].strMeasure13,
      mealsData.meals[0].strMeasure14,
      mealsData.meals[0].strMeasure15,
      mealsData.meals[0].strMeasure16,
      mealsData.meals[0].strMeasure17,
      mealsData.meals[0].strMeasure18,
      mealsData.meals[0].strMeasure19,
      mealsData.meals[0].strMeasure20,
    ];
    for (i = 0; i < ingredients.length; i++) {
      $(".recipes li ")
        .eq(i)
        .html(measure[i] + "" + ingredients[i]);
      if (ingredients[i] === "") {
        $(".recipes li ").eq(i).css("display", "none");
      }
    }
  }
  $(".meal").click(function () {
    var index = $(this).index();
    mealsId(mealsData.meals[index].idMeal);
    $(".meal").css("display", "none");
    $(".meals-details").css("display", "block");
  });
}
meals();

async function categories() {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  var mealsCategories = await response.json();
  console.log(mealsCategories);
  for (i = 0; i < mealsCategories.categories.length; i++) {
    $(".categories img")
      .eq(i)
      .attr("src", mealsCategories.categories[i].strCategoryThumb);
    $(".categories span").eq(i).html(mealsCategories.categories[i].strCategory);
  }
  $(".meal-1").click(function () {
    console.log(mealsCategories.categories[$(this).index()].strCategory);
    mealscategory(mealsCategories.categories[$(this).index()].strCategory);
    $(".categories").css("display", "none");
  });
}
async function searchByName(input) {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
  );
  var searchData = await response.json();
  console.log(searchData);

  var cartona = "";
  for (var i = 0; i < searchData.meals.length; i++) {
    cartona += `<div class="meal col-lg-3 position-relative">
    <div class="position-relative">
      <div class="card border-0">
        <img src="${searchData.meals[i].strMealThumb}" class="card-img-top w-100 rounded" alt="..." />
      </div>
      <div
        class="layer position-absolute w-100 h-100 d-flex align-items-center rounded"
      >
        <span class="fs-3 ps-3 fw-bold">${searchData.meals[i].strMeal}</span>
      </div>
    </div>
  </div>
`;
  }
  console.log(cartona);
  $(".cartona").html(cartona);
}

async function searchByLetter(input) {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
  );
  var searchData = await response.json();
  console.log(searchData);

  var cartona = "";

  for (var i = 0; i < searchData.meals.length; i++) {
    cartona += `<div class="meal col-lg-3 position-relative">
      <div class="position-relative">
        <div class="card border-0">
          <img src="${searchData.meals[i].strMealThumb}" class="card-img-top w-100 rounded" alt="..." />
        </div>
        <div
          class="layer position-absolute w-100 h-100 d-flex align-items-center rounded"
        >
          <span class="fs-3 ps-3 fw-bold">${searchData.meals[i].strMeal}</span>
        </div>
      </div>
    </div>
`;
  }

  $(".cartona").html(cartona);
}

async function mealscategory(e) {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`
  );
  var mealsData = await response.json();
  console.log(mealsData);

  var cartona = "";
  for (var i = 0; i < mealsData.meals.length; i++) {
    cartona += `<div class="meal col-lg-3 position-relative">
    <div class="position-relative">
      <div class="card border-0">
        <img src="${mealsData.meals[i].strMealThumb}" class="card-img-top w-100 rounded" alt="..." />
      </div>
      <div
        class="layer position-absolute w-100 h-100 d-flex align-items-center rounded"
      >
        <span class="fs-3 ps-3 fw-bold">${mealsData.meals[i].strMeal}</span>
      </div>
    </div>
  </div>
`;
  }
  $(".categories-result").html(cartona);
}

async function mealsArea() {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  var area = await response.json();
  console.log(area);
  for (i = 0; i < area.meals.length; i++) {
    $(".area span").eq(i).html(area.meals[i].strArea);
  }
  $(".area-index").click(function () {
    console.log(area.meals[$(this).index()].strArea);
    mealsAreaResult(area.meals[$(this).index()].strArea)
    $(".area").css("display", "none");
    $(".area-meals").css("display", "flex");


  });
}

async function mealsAreaResult(c) {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${c}`
  );
  var areaData = await response.json();
  console.log(areaData);

  var cartona = "";
  for (var i = 0; i < areaData.meals.length; i++) {
    cartona += `<div class="meal col-lg-3 position-relative">
    <div class="position-relative">
      <div class="card border-0">
        <img src="${areaData.meals[i].strMealThumb}" class="card-img-top w-100 rounded" alt="..." />
      </div>
      <div
        class="layer position-absolute w-100 h-100 d-flex align-items-center rounded"
      >
        <span class="fs-3 ps-3 fw-bold">${areaData.meals[i].strMeal}</span>
      </div>
    </div>
  </div>
`;
  }
  $(".area-meals").html(cartona);
}


// ! ========> Events functions
$(".categories-button").click(function () {
  categories();
  $(".meals").css("display", "none");
  $(".side-nav").css("left", -width);
  $(".close").css("display", "none");
  $(".menu").css("display", "block");
  $(".meals-details").css("display", "none");
  $(".search").css("display", "none");
  $(".search-result").css("display", "none");
  $(".area-meals").css("display", "none");
  $(".area").css("display", "none");
  $(".categories").css("display", "block");
});

$(".search-button").click(function () {
  $(".meals").css("display", "none");
  $(".meals-details").css("display", "none");
  $(".side-nav").css("left", -width);
  $(".close").css("display", "none");
  $(".menu").css("display", "block");
  $(".categories").css("display", "none");
  $(".categories-result").css("display", "none");
  $(".area").css("display", "none");
  $(".area-meals").css("display", "none");
  $(".search").css("display", "flex");
});

$(".search-name").keyup(function (e) {
  var inputVal = $(this).val();
  searchByName(inputVal);
  $(".search-result").css("display", "flex");
});

$(".search-letter").keyup(function (e) {
  var inputVal = $(this).val();
  searchByLetter(inputVal);
  $(".search-result").css("display", "flex");
});

$(".menu").click(function () {
  $(".side-nav").css("left", "0px");
  $(this).css("display", "none");
  $(".close").css("display", "block");
});

$(".close").click(function () {
  $(".side-nav").css("left", -width);
  $(this).css("display", "none");
  $(".menu").css("display", "block");
});

$(".area-button").click(function () {
  $(".meals").css("display", "none");
  $(".meals-details").css("display", "none");
  $(".side-nav").css("left", -width);
  $(".close").css("display", "none");
  $(".menu").css("display", "block");
  $(".categories").css("display", "none");
  $(".categories-result").css("display", "none");
  $(".search").css("display", "none");
  $(".area-meals").css("display", "none");
  $('.area').css("display", "flex");
  mealsArea();
});
