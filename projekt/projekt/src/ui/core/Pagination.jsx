import { Link } from "react-router-dom";


const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <Link onClick={() => paginate(number)} to='/movies#' className='page-link'>
                <button>{number}</button> 
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
export default Pagination;
