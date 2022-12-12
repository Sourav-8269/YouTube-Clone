let video_div=document.getElementById("video_details")
let API='AIzaSyAHA5lpoKcrjQxWHUE_HcPwq7VAgduB_nk';

import navbar from "./components/navbar.js"
let navbar_div=document.getElementById("navbar");
navbar_div.innerHTML=navbar();


document.getElementById("home").addEventListener("click",home)

function home(){
    window.location.href="index.html";
    // location.reload();
}

let search_query=document.getElementById("query");
search_query.addEventListener("click",function(){
    location.href="index.html";
})
const playvideo= ()=> {
    let {videoId}=JSON.parse(localStorage.getItem("clicked_item"));
    // console.log(data)
    console.log(videoId)
    if(videoId==undefined){
        let {id}=JSON.parse(localStorage.getItem("clicked_item"));
        console.log(id)
        videoId=id;
        console.log(videoId)
    }
    // videoId="IdekLhEuqhE";
    let iframe=document.createElement("iframe");
    iframe.src=`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    iframe.width='100%';
    iframe.height='100%';
    iframe.setAttribute("allowfullscreen",true)
    video_div.append(iframe)
}
playvideo();
const low=async ()=>{
    try{
        // const query=document.getElementById("query").value;
        // const res=await GET(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API}HTTP/1.1`)
        let re=await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=IN&key=${API}`)
        let dat=await re.json();
        const actual=dat.items;
        console.log(dat)
        console.log("Hii")
        appendvideo(actual);
    }
    catch(error){
        console.log(error)
    }
}
let login=document.getElementById("sign");
login.addEventListener("click",function(){
window.location.href="auth.html";
})
low()

let container=document.getElementById("recommendation");
const appendvideo=(data)=>{
    container.innerHTML=null;
    data.forEach(({snippet,id})=>{       //destructuring means mimik of object so inpalce of el we write name from we need data
        const title= snippet.title;          //snippet is also an object so destructuring it we want title,channreltitle
        const videoId= id.videoId;
        const thumbnail= snippet.thumbnails.high.url;
        const channel_name= snippet.channelTitle;
        // console.log(title)
        
        let div=document.createElement("div");
        let img=document.createElement("img");
        img.src=thumbnail;
        let name=document.createElement("h4");
        name.innerText=title;
        let channel=document.createElement("h5");
        channel.innerText=channel_name;

        let video_data={
            id,
            videoId,
            snippet
        };

        div.onclick= () =>{
            // console.log("Clicked")
            storevideo(video_data);
        }

        div.append(img,name,channel);
        container.append(div);
    })
}

function storevideo(video_data){
    localStorage.setItem("clicked_item",JSON.stringify(video_data))
    window.location.href="video.html";
}