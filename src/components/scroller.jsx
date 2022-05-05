import React from 'react';
import { useState,useEffect,useRef } from "react";
import {Container,Row,Col} from 'react-bootstrap';
import ImageCell from './imagecell';
import {GrabPage} from '../Fetcher';
import VisibilitySensor from 'react-visibility-sensor';
import EmptyCell from './emptycell'
import { isVisible } from '@testing-library/user-event/dist/utils';
function Scroller (props)
{


  const [images,setImages]=useState([]);
  const [page,setPage]=useState(0);
  const [loading,setLoading]=useState(false);
  const [hasMore,setHasMore]=useState(true);
  const renderLimit = 30;

  const loadingRef = useRef(false);
  loadingRef.current = loading;
  const pageRef = useRef(0);
  pageRef.current = page;


  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
  },[])

  useEffect(()=>{
    console.log("useeffect" +page)
    GetImages();
  },[page])

  const handleScroll = (e) =>
  {
    if(window.innerHeight+e.target.documentElement.scrollTop +1 >= e.target.documentElement.scrollHeight && !loadingRef.current)
    {
      
      console.log("reached the end"+pageRef.current)
      setPage(page => page + 1);
    }
  }

    async function GetImages()
    {
      setLoading(true);
      console.log("get images"+page);
      GrabPage(page,(data)=>{
        if(data===[])
        {
          setHasMore(false);
        }
        else
        {
          setImages(images.concat(data))   
        }
        setLoading(false);
      })
    }

      return(
        <Container> 
        <h1>Images</h1>
        {images.map((image,index)=>{
          return (
              <VisibilitySensor key={index} partialVisibility={true}>
                {({ isVisible }) => {
                  return (
                    <div>
                    {isVisible ? <ImageCell link={image} key={index} id={index}></ImageCell> : <EmptyCell></EmptyCell>}
                    </div>
                  );
                }}
              </VisibilitySensor>
            );
        })}
          <Container className='loader' >{loading ?             
          <span className="react-logo">
			      <span className="nucleo"></span>
		      </span>: <span></span>}</Container>
        </Container>
      )
}

export default Scroller;