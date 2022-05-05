# React-Infinite-Scroller
An infinite scroller template with a cache to save api data and a visibility sensor to avoid rendering invisible elements

# Requirements
- An infinite scroller app that pulls content from an api
- Content must be fetched asynchronusly 
- Must include caching of the api data
- Components must be lazy loaded
- Non visible elements must be unloaded

# Componenets
## Scroller
The scroller componenet is lazily loaded in the app.js file and has a spinning react logo to indicate loading;

```
<Suspense fallback=
  {	
    <Container className='loader'>	
      <span className="react-logo">
      <span className="nucleo"></span>
      </span>
    </Container>
  }>
  <Scroller />
</Suspense>
```
The scroller componenet itself is a functional componenet, it contains two useEffect calls; one mounts a scroll listener onto the window and the other calls the fetcher to get more images once the page state variable changes.

```
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
  },[])

  useEffect(()=>{
    console.log("useeffect" +page)
    GetImages();
  },[page])
```

The scroll listener calls the handle scroll function and it increases the page number once the view port reaches the end. As preivously stated this change triggers the useEffect and calls the GetImages function. The GetImages function flips a loading state variable to indicate that the new data is currently being loaded.
This conditionally renders a spinner to indicate that to the user that more data is being loaded.

```
  const handleScroll = (e) =>
  {
    if(window.innerHeight+e.target.documentElement.scrollTop +1 >= e.target.documentElement.scrollHeight && !loadingRef.current)
    {
      
      console.log("reached the end"+pageRef.current)
      setPage(page => page + 1);
    }
  }
```

## Fetcher
The GetImages function calls the GrabPage function from the fetcher file...

The fetcher file contains helper functions to grab data from the API and saves them to local storage with a time to live, this acts as a cache to lower the amount of calls to the api.
The GrabPage function in the fetcher file checks if the "page" of data exists in the cache and returns it if it does, if it doesn't it makes an api call and returns the results. If there are any errors with this process an empty array is returned.
A delay of five seconds is placed to emphasize the spinner as the unsplash api used is fast which makes the loading spinner hard to see.

```
function GrabPage(page,callback)
{
    console.log("Grabbing page "+page)
    const grabbed = ls.get(page);
    if(grabbed)
    {
        console.log("exists in cache!")
        callback(grabbed);
    }
    else
    {
        console.log("Does not exists in cache!")
        GrabFromAPI(page,callback)

    }
}
```

## ImageCell
The data pulled from the GrabPage function is then mapped in the scroller to create ImageCell components for each image.
The ImageCell componenet is a fancy image tag that has a set size and a border.
The mapping function of the Imagecells in the scroller also contains a "visibilitySensor".

```
      return(
        <Container> 
        <h1>Images</h1>
        {images.map((image,index)=>{
          return (
              <VisibilitySensor key={index}>
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
```

This visibility sensor conditionally renders an image cell with the image or a completely empty cell with no data depending on the image cell currently being visible to the user.
This means that if the user is only seeing a certain bit of data at page 9, the data all the way back in page 1 will not be rendered and a placeholder componenet will be rendered in its place.

# Packages
- React bootstrap to add cool looking componenets and improve the UI
- localstorage-ttl to store api data in local storage
- react-visibility-sensor to conditionally render on the visible elements
