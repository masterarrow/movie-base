import React from 'react';


const Pagination = (props) => {
    // Set a pagination links
    const { gotoNextPage } = props;
    const { gotoPrevPage } = props;

    return (
        /* Show only if the value is set */
        <nav className="page-nav" aria-label="Page navigation">
            <ul className="pagination">
                <li className="page-item">
                    {gotoPrevPage &&
                        <div className="page-link" onClick={gotoPrevPage} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </div>
                    }
                </li>
                <li className="page-item disabled"><div className="page-link">...</div></li>
                <li className="page-item">
                    {gotoNextPage &&
                        <div className="page-link" onClick={gotoNextPage} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </div>
                    }
                </li>
            </ul>
        </nav>
    )
};

export default Pagination;
