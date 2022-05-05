import React from 'react';
import {Container,Image } from 'react-bootstrap'
class Emptycell extends React.Component
{
    render()
    {
        return(
            <Container>
                <Image style={{ width: '10rem',height:"10rem" }} className='my-5'/>
                <p></p>
            </Container>
            )
    }
    constructor(props)
    {
        super(props);
    }
}

export default Emptycell;