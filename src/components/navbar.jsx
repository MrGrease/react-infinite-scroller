import React from 'react';
import { useState,useEffect } from "react";
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';
function SNavbar()
{
    return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Infinite Scroller</Navbar.Brand>
      </Container>
    </Navbar>
    );
}

export default SNavbar;