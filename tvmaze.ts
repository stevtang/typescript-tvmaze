import axios from "axios";
import * as $ from 'jquery';

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $episdoesButton = $("#Show-getEpisodes");
const $searchForm = $("#searchForm");
const BASE_URL = 'https://api.tvmaze.com/search/shows';

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
interface ShowInterface{
  id: number;
  name: string;
  summary: string;
  image: string;
}

async function getShowsByTerm(term: string): Promise<ShowInterface[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const showsResponse = await fetch(`${BASE_URL}?q=${term}`).then(resp => resp.json());

  console.log("this is the show response", showsResponse);

  const returnVal = showsResponse.map((show) => ({
    id: Number(show.show.id),
    name: show.show.name.toString(),
    summary: show.show.summary.toString(),
    image: show.show.image !== null ? show.show.image.medium.toString() : 'https://tinyurl.com/tv-missing'
  }));

  return returnVal;
  }


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows: ShowInterface[]): void {
  $showsList.empty();
  for (let show of shows) {
  console.log("show image", show.image);
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt="Bletchly Circle San Francisco"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val().toString();
  console.log('typeof term', typeof(term));
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

$showsList.on("click", $("#Show-getEpisodes"), async function(evt){
  evt.preventDefault();
  console.log("evt target", evt.target);
  const showId = evt.target.closest('.Show').getAttribute('data-show-id');
  console.log("show id", showId);

  await getEpisodesOfShow(+showId);
})

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number) {

 }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }