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
    const sortSelectEl = useRef(null);

    const selectDateEl = useRef(null);
    const inputDate1El = useRef(null);
    const inputDate2El = useRef(null);
    

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
            <p>{movie.release_date.substring(0, 10)}</p>
            <Link to={movieLink}><button>Szczegóły</button></Link>

        </li>
        )
    })
    ) : null;

    const handleInputChange = () => {
        const inputValue = inputEl.current.value.toLowerCase();

        console.log(inputValue);
        const newMovies = movies.filter(movie => (movie.title.toLowerCase().includes(inputValue)))

        if (inputValue !== "")
            setDisplayedMovies(newMovies);
        else 
            setDisplayedMovies(movies);
    }

    const handleSelectGenreChange = () => {
        const selectValue = selectEl.current.value;

        const newMovies = movies.filter(movie => movie.genre === selectValue);

        setDisplayedMovies(newMovies);
    }

    const handleDateFilter = () => {
        const selectValue = selectDateEl.current.value;
        const inputDate1 = new Date(inputDate1El.current.value);
        let newMovies = displayedMovies;

        switch (selectValue) {
            case "date-before":
                newMovies = movies.filter(movie => {
                    const movieDate = new Date(movie.release_date);

                    return movieDate.getTime() < inputDate1.getTime()
                })

                break;
            case "date-after":
                newMovies = movies.filter(movie => {
                    const movieDate = new Date(movie.release_date);

                    return movieDate.getTime() > inputDate1.getTime()
                })

                break;
            case "date-between":
                newMovies = movies.filter(movie => {
                    const movieDate = new Date(movie.release_date);
                    const inputDate2 = new Date(inputDate2El.current.value);

                    const afterDate1 = movieDate.getTime() > inputDate1.getTime();
                    const beforeDate2 = movieDate.getTime() < inputDate2.getTime();

                    return afterDate1 && beforeDate2;
                })
                break;
            default:
                break;
        }

        console.log("newMovies:", newMovies);

        setDisplayedMovies(newMovies);

    }

    const handleSortChange = () => {
        const sortValue = sortSelectEl.current.value;

        const sortedMovies = [...movies];
        switch (sortValue){
            case "sort-alphabetic":
                sortedMovies.sort((movie1, movie2) => (movie1.title.toLowerCase()).localeCompare(movie2.title.toLowerCase()));
                break;
            case "sort-alphabetic-reverse":
                sortedMovies.sort((movie1, movie2) => (movie1.title.toLowerCase()).localeCompare(movie2.title.toLowerCase()));

                sortedMovies.reverse();
                break;
            case "sort-date":
                sortedMovies.sort((movie1, movie2) => {
                    const date1 = new Date(movie1.release_date);
                    const date2 = new Date (movie2.release_date);

                    return date1.getTime() - date2.getTime();
                });
                break;
            case "sort-date-reverse":
                sortedMovies.sort((movie1, movie2) => {
                    const date1 = new Date(movie1.release_date);
                    const date2 = new Date (movie2.release_date);

                    return date2.getTime() - date1.getTime();
                });
                break;
            case "sort-id":
                sortedMovies.sort((movie1, movie2) => movie1.id - movie2.id);
                break;
            case "sort-id-reverse":
                sortedMovies.sort((movie1, movie2) => movie2.id - movie1.id);
                break;
            default:
                break;
        }

        // console.log(sortedMovies);
        setDisplayedMovies(sortedMovies);
    }



    return ( 
        <ul>
            <Link to="/movies/add"><button>Dodaj nowy film</button></Link>
            <br/>
            Gatunek:  
            <select name="genre" id="genre"
            onChange={handleSelectGenreChange}
            ref={selectEl}
            >
                {selectOptions}
            </select>

            <div className="date-filters">

                <select name="date-filter" id="date-filter"
                // onChange={handleSelectDateChange}
                ref={selectDateEl}
                >
                    <option value="date-before">Filmy starsze niż</option>
                    <option value="date-after">Filmy nowsze niż</option>
                    <option value="date-between">Release date pomiędzy</option>
                </select>
                <input type="date" ref={inputDate1El}/> 

                {/* {selectDateEl.current.value === "date-between" ? (
                    <input type="date" ref={inputDate2El}/> 
                ): null } */}
                <input type="date" ref={inputDate2El}/> 
                {/* display hidden */}
                <button onClick={handleDateFilter}>Filtruj</button>

            </div>
            
            


            <br/>
            Szukaj: <input type="text" 
            ref={inputEl}
            onChange={handleInputChange}/>

            Sortuj: <select name="sort" id="sort"
            ref={sortSelectEl}
            onChange={handleSortChange}
            >
                <option value="sort-alphabetic">Alfabetycznie A-Z</option>
                <option value="sort-alphabetic-reverse">Alfabetycznie Z-A</option>
                <option value="sort-date">Według daty - rosnąco</option>
                <option value="sort-date-reverse">Według daty - malejąco</option>
                <option value="sort-id">Według id - rosnąco</option>
                <option value="sort-id-reverse">Według id - malejąco</option>
            </select>

            

            {movieList}
        </ul>
     );
}
 
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        movies: getAllMovies(state),
    };
    
}

const mapDispatchToProps = {
    getMovieList
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);