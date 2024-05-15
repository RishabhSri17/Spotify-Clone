async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let listi = div.getElementsByTagName("a")

    let songs = []
    for (let index = 0; index < listi.length; index++) {
        const element = listi[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    /* console.log(songs) */
    return songs
}

async function main() {
    //Get the list of all songs
    let songs =await getSongs()
    console.log(songs)

    let sgUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for(const song of songs){
        sgUL.innerHTML= sgUL.innerHTML + `<li>${song.replaceAll("%20"," ").replaceAll("%26"," ")}</li>` + "<br>" ;
    }

    //play the first songs
    var audio = new Audio(songs[0]);
    /* audio.play(); */

    audio.addEventListener("loaddata", ()=>{
        console.log(audio.duration,audio.currentSrc,audio.currentTime)
        //the duration variable now holds the duration 
    })
}

main()
