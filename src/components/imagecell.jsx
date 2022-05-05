import { isVisible } from '@testing-library/user-event/dist/utils';
import React from 'react';
import {Container,Image } from 'react-bootstrap'

class ImageCell extends React.Component
{
    render()
    {
        return(
            <Container>
                <Image src={this.link} style={{ width: '10rem',height:"10rem" }} className='border border-dark rounded-circle my-5'/>
                <p>{this.id}</p>
            </Container>
            )
    }
    constructor(props)
    {
        super(props);
        this.link = props.link;
        this.id=props.id;
    }
}

export default ImageCell;