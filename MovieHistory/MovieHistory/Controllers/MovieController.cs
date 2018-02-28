﻿    using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieHistory.Models;
using Microsoft.Extensions.Configuration;
using MovieHistory.Services;
using Microsoft.Extensions.Options;
using MovieHistory.Data;
using Microsoft.AspNetCore.Identity;
using MovieHistory.Models.MovieViewModels;
using Microsoft.EntityFrameworkCore;

namespace MovieHistory.Controllers
{
    public class MovieController : Controller
    {
        private readonly IApplicationConfiguration _appSettings;
        private ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public MovieController(IApplicationConfiguration appSettings, ApplicationDbContext ctx, UserManager<ApplicationUser> userManager)
        {
            _appSettings = appSettings;
            _context = ctx;
            _userManager = userManager;
        }

        // This task retrieves the currently authenticated user
        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        public async Task<IActionResult> Track(string apiId, string title, string img)
        {
            var model = new TrackedMoviesViewModel();

            //add movie to database
            Movie movie = new Movie
            {
                ApiId = Int32.Parse(apiId),
                Title = title,
                ImgUrl = img
            };

            _context.Add(movie);

            //gets the current user
            ApplicationUser _user = await GetCurrentUserAsync();

            //track that movie for the current user
            var trackMovie = new MovieUser
            {
                User = _user,
                MovieId = movie.MovieId
            };


            _context.Add(trackMovie);
            await _context.SaveChangesAsync();


            model.TrackedUserMovies = (from m in _context.Movie
                                      join mu in _context.MovieUser
                                        on m.MovieId equals mu.MovieId
                                      where mu.User == _user
                                      select new TrackedMovie
                                      {
                                          MovieUserId = mu.MovieUserId,
                                          Title = m.Title,
                                          ImageURL = m.ImgUrl,
                                          Genre = mu.Genre,
                                          Favorited = mu.Favorited,
                                          Watched = mu.Watched
                                      }).ToList();

            return View(model);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
