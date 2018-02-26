$("#movieSearch__button").click(evt => {
    const userSearchString = $("#movieSearch").val()
    $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?api_key=6cc5adb954efa8ba18b1ed8d19b4b1bf&language=en-US&query=${userSearchString}&page=1&include_adult=false`
    }).then(res => {
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
                    
           
            `
        })

        $("#movieGrid").html(titles)
    })
});