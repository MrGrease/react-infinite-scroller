const ls = require('localstorage-ttl')
const TTL = 600000;

const apiKeyParam ="&client_id="+process.env.REACT_APP_APIKEY;
const pageParam="&page=";
const per_pageParam="&per_page="+process.env.REACT_APP_PAGECOUNT;
const ApiURLNoSearch="https://api.unsplash.com/photos?";

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

async function GrabFromAPI(page,callback)
{
    fetch(ApiURLNoSearch+apiKeyParam+pageParam+page+per_pageParam)
    .then(res => res.json())
    .then(
      (result) => {
        console.log("data received");
        var im = []
        result.forEach(element => {
          im.push(element.urls.thumb);
        });
        SaveToCache(page,im);
        //Test delay
        setTimeout(function() {
            callback(im);
        }, 5000);
      },
      (error) => {
        console.log(error);
        callback([]);

      }
    )
}

function SaveToCache(page,data)
{
    console.log("saving to cache")
    ls.set(page,data,TTL);
}

export {GrabPage}