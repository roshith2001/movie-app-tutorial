import React from 'react';

function SearchBox(props) {
    return (
        <div className='col col-sm-4'>
            <input
                className='form-control'
                values={props.value}
                onChange={(event) => props.setSearchValue(event.target.value)}
                placeholder="Type to search..."></input>            
        </div>
    );
}

export default SearchBox;