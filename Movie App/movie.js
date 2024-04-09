const url = new URL(location.href);
const movieId = url.searchParams.get('id');
const movieTitle = url.searchParams.get('title');

const APILINK = 'http://127.0.0.1:8000/api/v1/reviews/'


const row = document.querySelector(".row");
const title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement('div');
div_new.setAttribute('class', 'column');
div_new.innerHTML = `
            <div class="card">
                New Review
                <p><strong>Review: </strong>
                    <input type='text' id='new_review' value='' />
                </p>
                <p><strong>User: </strong>
                    <input type='text' id='new_user' value='' />
                </p>
                <p><a href='#' onclick=saveReview('new_review', 'new_user')>Save</a></p>

            `
row.appendChild(div_new);

returnReviews(APILINK);

async function returnReviews(url) {
    response = await (await fetch(url + 'movie/' + movieId)).json();
    console.log(response);

    response.forEach(review => {

        //Dynamically create containers for API data
        const columnDiv = document.createElement('div');
        columnDiv.setAttribute('class', 'column');

        columnDiv.innerHTML = `
                <div class="card" id=${review._id}>
                    <p><strong>Review: </strong>${review.review}</p>
                    <p><strong>User: </strong>${review.user}</p>
                    <p>
                        <a href='#' onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Edit</a>
                        <a href='#' onClick="deleteReview('${review._id}')">Delete</a>
                    </p>
                </div>`

        row.appendChild(columnDiv);
    });
}

function editReview(id, review, user){
    const element = document.getElementById(id)
    const reviewInputId = 'review' + id;
    const userInputId = 'user' + id;

    element.innerHTML = `
                    <p><strong>Review: </strong>
                        <input type='text' id="${reviewInputId}" value="${review}" />
                    </p>
                    <p><strong>User: </strong>
                        <input type='text' id="${userInputId}" value="${user}" />
                    </p>
                    <p><a href="#" onclick=saveReview('${reviewInputId}', '${userInputId}', '${id}')>Save review</a></p>
                `
}

function saveReview(reviewInputId, userInputId, id=""){
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value

    if (id){
        fetch(APILINK + id, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'review': review, 'user': user})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            location.reload();
        });
    } else {
        fetch(APILINK + 'new', {
            method: 'POST',
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            location.reload();
          });
    }
}

function deleteReview(id){
    fetch(APILINK + id, {
        method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        location.reload();
      })
}