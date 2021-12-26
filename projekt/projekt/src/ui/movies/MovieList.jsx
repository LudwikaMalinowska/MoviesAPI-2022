import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMovieList } from "../../ducks/movies/operations";
import { getAllMovies } from "../../ducks/movies/selectors";

const MovieList = ({movies, getMovieList}, props) => {
    console.log("movies:", movies);
    const [displayedMovies, setDisplayedMovies] = useState(movies);
    const inputEl = useRef(null);
    const selectEl = useRef(null);

    let genres = movies.map(movie => movie.genre);
    genres = [...new Set(genres)];
    const selectOptions = genres.map(genre => (
        <option value={genre} key={genre}>{genre}</option>
    ))

    useEffect(() => {

        // if (movies.length === 0)
        getMovieList();
    }, []);

    const movieList = displayedMovies ? (displayedMovies.map(movie => {
        const movieLink = `/movies/${movie.id}`
        return (<li key={movie.id}>
            <img src={movie.image_url} alt={movie.title} style={{height: "200px"}} />
            <p>{movie.title}</p>
            <Link to={movieLink}><button>Szczegóły</button></Link>

        </li>
        )
    })
    ) : null;

    const handleInputChange = () => {
        const inputValue = inputEl.current.value.toLowerCase();

        console.log(inputValue);
        const newMovies = displayedMovies.filter(movie => (movie.title.toLowerCase().includes(inputValue)))

        console.log(displayedMovies);
        console.log(newMovies);
        setDisplayedMovies(newMovies);
    }

    const handleSelectChange = () => {
        const selectValue = selectEl.current.value;

        const newMovies = movies.filter(movie => movie.genre === selectValue);

        setDisplayedMovies(newMovies);
    }



    return ( 
        <ul>
            <Link to="/movies/add"><button>Dodaj nowy film</button></Link>
            <br/>
            <select name="genre" id="genre"
            onChange={handleSelectChange}
            ref={selectEl}
            >
                {selectOptions}
            </select>


            <br/>
            Szukaj: <input type="text" 
            ref={inputEl}
            onChange={handleInputChange}/>

            {movieList}
        </ul>
     );
}
 
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        movies: getAllMovies(state)
    };
    
}

const mapDispatchToProps = {
    getMovieList
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);