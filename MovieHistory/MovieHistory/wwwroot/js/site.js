$("#movieSearch__button").click(evt => {
    const userSearchString = $("#movieSearch").val()
    $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?api_key=6cc5adb954efa8ba18b1ed8d19b4b1bf&language=en-US&query=${userSearchString}&page=1&include_adult=false`
    }).then(res => {
<<<<<<< HEAD
        let titles = ""
        res.results.forEach(m => {
                //<h2>${m.title}</h2>
                //<img src="https://image.tmdb.org/t/p/w154${m.poster_path}" />
            titles += `


                    <img class="card-img-top" src="https://image.tmdb.org/t/p/w154${m.poster_path}" alt="Card image cap">
                    
                        <h4 class="card-title">${m.title}</h4>
                        <span class="card-text">${m.overview}</span>
                    
                    
                        <span class="list-group-item"> ${m.genre} </span>
                        <span class="list-group-item">${m.release_date}</span>
                    
           
=======
        let titles = "<div class='row'>"
        res.results.forEach((m, idx) => {
            
            titles += `
                <div class="col-md-3 movieGrid__movie">
                    <h2>${m.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w154${m.poster_path}" />
                </div>
>>>>>>> b1d4a44aff094b715e71687754903f86691d69ab
            `
            if ((idx + 1) % 4 === 0) {
                titles += "</div><div class='row'>"
            }
        })

        titles += "</div>"

        $("#movieGrid").html(titles)
    })
});