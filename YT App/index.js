// let API='AIzaSyA09S9&kRNMrSyh4r9hfSyRe-3YGcI2V0'
import navbar from "./components/navbar.js";
let navbar_div=document.getElementById("navbar");
navbar_div.innerHTML=navbar();
console.log(navbar_div)

let API='AIzaSyAHA5lpoKcrjQxWHUE_HcPwq7VAgduB_nk'

let home=document.getElementById("home").addEventListener("click",home_page);
function home_page(){
    // window.location.href="index.html";
    location.reload();
}

let search_query=document.getElementById("search")
search_query.addEventListener("click",search)

// const tezt=fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API} HTTP/1.1`)
// let sou=tezt.json();
// console.log(sou)
const container=document.getElementById("container");
async function search(){
    try{
        const query=document.getElementById("query").value;
        // const res=await GET(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API}HTTP/1.1`)
        const res=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API}`)
        // const res=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&q=${query}&regionCode=IN&key=${API}`)
        const data=await res.json();
        console.log(data)
        const actual=data.items;
        appendvideo(actual);
    }
    catch(error){
        console.log(error)
    }
}
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
//Sort by Rating
document.getElementById("Rating").addEventListener("click",Rating)

async function Rating(){
    // https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=rating&q=rrr&key=[YOUR_API_KEY] HTTP/1.1
    try{
        let sortdata=document.getElementById("query").value;
        console.log(sortdata)
        // const query=document.getElementById("query").value;
        let re=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=rating&q=${sortdata}&regionCode=IN&key=AIzaSyDVMBNpZlHTrsuQlkG0n_WNy9otuXJsfAE`)
    
        let dat=await re.json();
        const actual=dat.items;
        console.log(dat)

        console.log(query.value)
        appendvideo(actual);
    }
    catch(error){
        console.log(error)
    }
}
//Sort by date


const time_sort=async ()=>{
    try{
        let sortdata=document.getElementById("query").value;
        console.log(sortdata)


        let re=await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&q=${sortdata}&regionCode=IN&key=AIzaSyDVMBNpZlHTrsuQlkG0n_WNy9otuXJsfAE`)
        console.log(sortdata)
        let dat=await re.json();
        const actu=dat.items;
        console.log(dat)
        appendvideo(actu);
    }
    catch(error){
        console.log(error)
    }
}
document.getElementById("time").addEventListener("click",time_sort)