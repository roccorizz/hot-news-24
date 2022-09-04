/******************************* display all news category ************************/
const loadAllNewsCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllNewsCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayAllNewsCategories = categories => {
    const newsCategoriesContainer = document.getElementById('newsCategories');
    categories.forEach(categorie => {
        const singleCategorie = document.createElement('small');
        /********start loader*******/
        singleCategorie.innerHTML = `
    <div class="hoover p-1" onclick="loadIndividualCategory('${categorie.category_id}'),toggleSpinner(true)">${categorie.category_name}</div>
`

        newsCategoriesContainer.appendChild(singleCategorie);
    });
}

/******************** display individual category's all news *********************/

const loadIndividualCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayIndividualCategory(data.data))
        .catch(error => console.log(error))
}
const displayIndividualCategory = categories => {
    /**************show total items of a categorie**********/
    const formControl = document.getElementById('inputField')
    formControl.value = `Total ${categories.length} items found`

    /*************show alert if any category has no data***********/
    if (categories.length === 0) { alert('No data Available'); }

    /*************short news by total view***********/
    categories.sort(function (b, a) { return a.total_view - b.total_view });

    /***********show all news of a category**********/
    const individualCategorieContainer = document.getElementById('individualCategorie');
    individualCategorieContainer.innerHTML = '';
    categories.forEach(categorie => {
        const individualCategorieDiv = document.createElement('div');
        /**********div with optional chaining**********/
        individualCategorieDiv.innerHTML = `
        <div class="row" onclick="loadNewsDetail('${categorie._id}')">
            <div class="border rounded mb-3 pt-3 pb-3 d-flex shadow">
                <div class="col-md-3 col-5">
                    <img src="${categorie.thumbnail_url}" class="img-fluid h-100 rounded" alt="..">
                </div>
                <div class="col-md-9 col-7 ps-4">
                    <div class="card-body p-0 d-flex flex-column">
                        <div class="mb-5">
                        <h5 class="card-title">${categorie.title}</h5>
                        <p class="card-text overflow mb-3">${categorie.details}</p> 
                        </div>
                        <div class="mt-5 d-flex align-items-center justify-content-between justify-content-center">
                            <div class="d-flex align-items-center justify-content-center">
                                <div>
                                    <img  style="height: 70px;" class ="img-fluid mh-100 rounded-circle" src="${categorie.author.img}">
                                    <p class="text-capitalize">${categorie.author.name ? categorie.author.name : 'Unknown'}</p>
                                </div>    
                            </div>
                            <div class="opacity-75 ms-4">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star-half-stroke"></i>
                            </div>
                            <div class="ps-3 pe-3">
                                <i class="fa-regular fa-eye"></i>
                                <p>${categorie.total_view ? categorie.total_view : '0'}</p>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        `
        /*******stop loader****83****/
        toggleSpinner(false);

        individualCategorieContainer.appendChild(individualCategorieDiv);
    })

}

/************************** display individual news details ************************/
const loadNewsDetail = (_id) => {
    console.log(_id)
    const url = `https://openapi.programming-hero.com/api/news/${_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
        .catch(error => console.log(error))
}
const displayNewsDetails = categories => {
    console.log(categories)
    categories.forEach(categorie => {
        console.log(categorie)
        const modaltitle = document.getElementById('detailInfoModalLabel')
        modaltitle.innerHTML = `${categorie.title}`
        const modalBody = document.getElementById('modalDetail')
        modalBody.innerHTML = `
        <img class="img-fluid" src="${categorie.image_url}">
        <img  style="height: 70px;" class ="img-fluid mh-100 rounded-circle mt-3" src="${categorie.author.img}">
        <p class="fw-bold p-1 text-capitalize">Author: ${categorie.author.name ? categorie.author.name : 'No Author'}</p>
        <p class="fw-semibold m-0 p-0">${categorie.author.published_date ? categorie.author.published_date : 'No Info'}</p>
        <p class="m-0 p-0"><b>Rating:</b> ${categorie.rating.number ? categorie.rating.number : 'No Info'}</p>
        <p class="m-0 p-0 fw-semibold">${categorie.rating.badge ? categorie.rating.badge : 'No Info'}</p>
        <p class="mt-3">${categorie.details}</p>
        `
    })
}
// spinner function113
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}


loadAllNewsCategories()