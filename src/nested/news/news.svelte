<script>
    import { colors } from "../../routes/colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;

    async function season_now() {
        const response = await fetch("https://api.jikan.moe/v4/seasons/now");
        const get_season_now = await response.json();
        console.log(get_season_now)
        return get_season_now;
    }

    async function season_next() {
        const response = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
        const get_season_now = await response.json();
        console.log(get_season_now)
        return get_season_now;
    }

    function convert(time) {
        const timezone = "GMT+9";
        const target = "Europe/London";
        const originalDateTime = new Date(`2000/01/01 ${time}:00 ${timezone}`);
        time = originalDateTime
            .toLocaleString("en-US", { timeZone: target, hour12: false })
            .split(" ")[1]
            .split(":");
        let HM = time[0] + ":" + time[1];
        return HM;
    }

    let season_info = season_now();
</script>

<h1>Anime this season</h1>


{#await season_info}
    <div class="loading">
        <h1>Loading...</h1>
    </div>

    {:then season_info}
    <div class="animation">
        <div class="scroll">
        {#each season_info.data as info, i}
            <div class="box1" id="a{i + 1}">
                <div>
                    <h2><a href={info.url}>{info.title}</a></h2>
                    <i>Airing: {info.broadcast.day} {convert(info.broadcast.time)}</i>
                    <p>{info.score}</p>
                </div>  
                
                <img src={info.images.jpg.image_url}>
                
                
            </div>
        {/each}
        </div>
    </div>    
    
{/await}


<style lang="scss">
    @keyframes scroll {
        0% {
            min-width: calc(20% - 24px);
            border: solid 2px;
            margin: 10px;

            
        }

        20% {
            min-width: calc(20% - 24px);
            border: solid 2px;
            margin: 10px;

        }
        
        21% {
            min-width: 0px;
            border: 0px;
            margin: 0px;
            
            
        }
        100% {
            min-width: 0px;
            border: 0px;
            margin: 0px;
        }
    }

    h1 {
    }

  

    div.scroll {
        
        display: flex;
        flex-direction: row;
        max-height: 500px;
        width: inherit;
        overflow: hidden;
        
    }

    div.ongoing {
        display: flex;
        flex-direction: row;
    }
    div.upcoming {
        display: flex;
        flex-direction: row;
    }

    div.box1 {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        min-width: calc(20% - 24px);
        overflow: hidden;
        border: solid 2px;
        border-color: #000000;
        justify-content: space-between;
        margin: 10px;
        height: 400px;

        
        
        
        
        h2 {
            font-size: 20px;
            font-weight: 500;
            a {
                text-decoration: none;
                color: #ffffff;
            }
        }

        i {
            justify-self: center;
        }
        p {

            font-weight: 300;
        }
    }

    div#a1 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
    }
    div#a2 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
    }
    div#a3 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
    }
    div#a4 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
    }
    div#a5 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
    }

    div#a6 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 12s;
    }
    div#a7 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 12s;
    }
    div#a8 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 12s;
    }
    div#a9 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 12s;
    }
    div#a10 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 12s;
    }

    div#a11 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 24s;
    }
    div#a22 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 24s;
    }
    div#a13 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 24s;
    }
    div#a14 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 24s;
    }
    div#a15 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 24s;
    }

    div#a16 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 36s;
    }
    div#a17 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 36s;
    }
    div#a18 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 36s;
    }
    div#a19 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 36s;
    }
    div#a20 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 36s;
    }

    div#a21 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 48s;
    }
    div#a22 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 48s;
    }
    div#a23 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 48s;
    }
    div#a24 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 48s;
    }
    div#a25 {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
        animation-delay: 48s;
    }



    
    div.bottom {
        background-color: rgb(0,0,0,0);
        align-self: flex-end;
    }
    
    img {
        width: 100%;
        overflow: hidden;
    }
    

    


</style>
