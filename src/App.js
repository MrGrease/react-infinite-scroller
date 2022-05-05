import React,{Component, lazy, Suspense}from 'react';
import logo from './logo.svg';
import './App.css';
import SNavbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCell from './components/imagecell';
import { Container, Row } from 'react-bootstrap';
const Scroller = lazy(()=>import('./components/scroller'));
function App() {
  return (
    <div className="App">
          <SNavbar></SNavbar>
          <hr/>
          <Suspense fallback=
          {	<Container className='loader'>	
            <span className="react-logo">
			          <span className="nucleo"></span>
		          </span>
            </Container>
          }>
            <Scroller />
          </Suspense>
    </div>
  );
}

export default App;
