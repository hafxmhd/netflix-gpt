import useMovieDetails from "../hooks/useMovieDetails";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import useCastDetails from "../hooks/useCastDetails";
import usePlayTrailer from "../hooks/usePlayTrailer";
import CastCard from "./CastCard";


const Details = () => {

  useMovieDetails();
  useCastDetails();
  usePlayTrailer();

  const movieDetails = useSelector((store) => store.movies.movieDetails);
  const castDetails = useSelector((store) => store.movies.castDetails);
  const playTrailer = useSelector((store) => store.movies?.playTrailer);

  const handlePlay = () => {
    return( 
      window.location.assign("https://www.youtube.com/embed/" +
    playTrailer?.key +
    "?&autoplay=1&loop=1&controls=0&&showinfo=0")
    );
   };
   
    return(
      
<div
  className="relative min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${IMG_CDN_URL + movieDetails?.backdrop_path})`,
  }}
>
  {/* Dark overlay to make text readable */}
  <div className="absolute inset-0 bg-black bg-opacity-70"></div>

  {/* Content on top of overlay */}
  <div className="relative z-10">

    {/* ---- Your existing main section ---- */}
    <div className="md:flex">
      <img
        className="w-52 md:w-72 pt-10 ml-12"
        alt="Movie Card"
        src={IMG_CDN_URL + movieDetails?.poster_path}
      />

      <div className="ml-5 md:ml-52 mr-10 md:pt-10">
        <h1 className="text-white text-3xl md:text-6xl font-bold">
          {movieDetails?.title}
        </h1>
        <br />
        <h3 className="text-white text-sm">{movieDetails?.tagline}</h3>
        <p className="text-white text-sm md:text-md pt-8">
          {movieDetails?.overview}
        </p>

        <div className="flex flex-wrap md:flex gap-x-3">
          {movieDetails?.genres?.map((genres) => (
            <h2
              className="text-stone-500 text-md font-semibold pt-5"
              key={genres.id}
            >
              {genres.name}
            </h2>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-5">
          <h2 className="text-white text-md font-semibold pt-5">
            Rating : {Number(movieDetails?.vote_average).toFixed(1)}⭐
          </h2>
          <h2 className="text-white text-md font-semibold pt-5">
            Status : {movieDetails?.status}
          </h2>
          <h2 className="text-white text-md font-semibold pt-5">
            RunTime : {Math.floor(movieDetails?.runtime / 60)}h{" "}
            {movieDetails?.runtime % 60}min
          </h2>
          <h2 className="text-white text-md font-semibold pt-5">
            Release Date : {movieDetails?.release_date}
          </h2>
          <h2 className="text-white text-md font-semibold pt-5">
            Director :{" "}
            {castDetails?.crew?.find((p) => p.job === "Director")?.name}
          </h2>
          <h2 className="text-white text-md font-semibold pt-5">
            Writer :{" "}
            {castDetails?.crew?.find(
              (p) => p.job === "Writer" || p.department === "Writing"
            )?.name}
          </h2>
        </div>

        <div className="pt-10">
          <button
            onClick={handlePlay}
            className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-50 hover:text-white"
          >
            ► Play
          </button>
        </div>
      </div>
    </div>

    {/* ---- Top Casts ---- */}
    <div className="pb-5 mt-10">
      <h2 className="text-white text-3xl font-semibold p-10">TOP CASTS</h2>

      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {castDetails?.cast?.map((cast) => (
            <CastCard
              key={cast.id}
              ImgPath={cast.profile_path}
              Name={cast.name}
              Character={cast.character}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
);
};

export default Details;