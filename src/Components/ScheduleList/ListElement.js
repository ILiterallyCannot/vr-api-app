import React from 'react';

function ListElement(props) {
    if (Object.keys(props.list).length === 0) {
        return <h3>Ei tietoja</h3>;
    }
    return props.list.map(train => (
        <div key={train.id} className='trainSchedule'>
            <div>{train.type}</div>
            <div>{train.start}</div>
            <div>{train.end}</div>
            <div>{train.time}</div>
        </div>
    ));
}

export default ListElement;
