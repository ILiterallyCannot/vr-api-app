import React from 'react';

function SearchList(props) {
    return props.listData.map(station => (
        <p key={station} onClick={props.handleClick} className='option'>
            {station}
        </p>
    ));
}

export default SearchList;
