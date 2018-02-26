$("#movieSearch__button").click(evt => {
    const userSearchString = $("#movieSearch").val()
    $.ajax({
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?api_key=858deec9a8305f575390bb92f4c3eab8&language=en-US&query=${userSearchString}&page=1&include_adult=false`
    }).then(res => {
        let titles = "<div class='row'>"
        res.results.forEach((m, idx) => {
            
            titles += `
                <div class="col-md-3 movieGrid__movie">
                    <h2>${m.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w154${m.poster_path}" />
                </div>
            `
            if ((idx + 1) % 4 === 0) {
                titles += "</div><div class='row'>"
            }
        })

        titles += "</div>"

        $("#movieGrid").html(titles)
    })
});