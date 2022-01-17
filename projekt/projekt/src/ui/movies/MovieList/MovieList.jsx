import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getMovieList } from "../../../ducks/movies/operations";
import { getAllMovies } from "../../../ducks/movies/selectors";

import "./MovieList.css"
import Pagination from "../../core/Pagination";

const MovieList = ({movies, getMovieList}, props) => {
    const { t } = useTranslation();
    
    const [displayedMovies, setDisplayedMovies] = useState(movies);
    const [filterOn, setFilterOn] = useState(false)
    const movieContent = filterOn ? displayedMovies : movies;
    

    const inputEl = useRef(null);
    const selectEl = useRef(null);
    const sortSelectEl = useRef(null);

    const selectDateEl = useRef(null);
    const inputDate1El = useRef(null);
    const inputDate2El = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Get current movies
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = movieContent.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    

    let genres = movies.map(movie => movie.genre);
    genres = [...new Set(genres)];
    const selectOptions = genres.map(genre => (
        <option value={genre} key={genre}>{genre}</option>
    ))

    useEffect(() => {

        
        if (movies.length <= 1)
            getMovieList();
        
    }, []);

    const movieList = currentMovies ? (currentMovies.map(movie => {
        const movieLink = `/movies/${movie.id}`
        return (<div key={movie.id} className="movie">
            <img src={movie.image_url} alt={movie.title} />
            <p>{movie.title}</p>
            <p>{movie.release_date.substring(0, 10)}</p>
            <Link to={movieLink}><button>{t("details")}</button></Link>

        </div>
        )
    })
    ) : null;


    const handleInputChange = (movies) => {
        const inputValue = inputEl.current.value.toLowerCase();
        let newMovies = movies.filter(movie => (movie.title.toLowerCase().includes(inputValue)))
        
        return newMovies;      
    }

    

    const handleSelectGenreChange = (movies) => {
        const selectValue = selectEl.current.value;
        let newMovies = movies.filter(movie => movie.genre === selectValue);

        return newMovies;
    }

    const handleDateSelectChange = () => {
        const selectValue = selectDateEl.current.value;
        switch (selectValue) {
            case "date-before":
                inputDate2El.current.className = "hidden"
                break;
            case "date-after":
                inputDate2El.current.className = "hidden"
                break;
            case "date-between":
                inputDate2El.current.className = "visible"
                break;
            default:
                break;
        }
    }

    const handleDateFilter = (movies) => {
        const selectValue = selectDateEl.current.value;
        const inputDate1 = new Date(inputDate1El.current.value);
        let newMovies = movies;

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
        
        return newMovies;
    }

    const filter = () => {
        setFilterOn(true);
        const selectGenreValue = selectEl.current.value;
        const inputTextValue = inputEl.current.value.toLowerCase();
        const dateInputValue = inputDate1El.current.value;

        let newMovies = movies;
        if (selectGenreValue !== "all"){
            newMovies = handleSelectGenreChange(newMovies);
        } 

        if (inputTextValue !== ""){
            newMovies = handleInputChange(newMovies);
        } 

        if (dateInputValue !== ""){
            newMovies = handleDateFilter(newMovies);
        } 

        setDisplayedMovies(newMovies);
    }

    const handleSortChange = () => {
        setFilterOn(true);
        const sortValue = sortSelectEl.current.value;

        let sortedMovies = [...displayedMovies];
        switch (sortValue){
            case "dont-sort":
                sortedMovies = movies;
                break;
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

        setDisplayedMovies(sortedMovies);
    }



    return ( 
        <div className="movies">
            <Link to="/movies/add"><button>{t("add_new_movie")}</button></Link>
            <br/>
            {t("genre")}:  
            <select name="genre" id="genre"
            onChange={filter}
            ref={selectEl}
            >
            <option value="all" key="all">{t("all_genres")}</option>
                {selectOptions}
            </select>

            <div className="date-filters">

                <select name="date-filter" id="date-filter"
                onChange={handleDateSelectChange}
                ref={selectDateEl}
                >
                    <option value="date-before">{t("movies_older_than")}</option>
                    <option value="date-after">{t("movies_newer_than")}</option>
                    <option value="date-between">{t("release_date_between")}</option>
                </select>
                <input type="date" ref={inputDate1El}/> 

                <input id="date2" className="hidden" type="date" ref={inputDate2El}/> 
                
                <button 
                onClick={filter}
                >
                {t("filter")}</button>

            </div>
            
            


            <br/>
            {t("filter")}: <input type="text" 
            ref={inputEl}
                onChange={filter}
            />

            {t("sort")}: <select name="sort" id="sort"
            ref={sortSelectEl}
            onChange={handleSortChange}
            >
                <option value="dont-sort">{t("dont_sort")}</option>
                <option value="sort-alphabetic">{t("sort_alphabetically")}</option>
                <option value="sort-alphabetic-reverse">{t("sort_alphabetically_reverse")}</option>
                <option value="sort-date">{t("sort_date")}</option>
                <option value="sort-date-reverse">{t("sort_date_reverse")}</option>
                <option value="sort-id">{t("sort_id")}</option>
                <option value="sort-id-reverse">{t("sort_id_reverse")}</option>
            </select>

            
            <div className="movieList">
                {movieList}
            </div>
            

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={movieContent.length}
                paginate={paginate}
                endpoint="/movies#"
            />
        </div>
     );
}
 
const mapStateToProps = (state) => {
    return {
        movies: getAllMovies(state),
    };
    
}

const mapDispatchToProps = {
    getMovieList
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);