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
        {#each season_info.data as info}
            <div class="box1">
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
    h1 {
    }

  

    div.scroll {
        animation-name: scroll;
        animation-duration: 60s;
        animation-iteration-count: infinite;
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

    div.bottom {
        background-color: rgb(0,0,0,0);
        align-self: flex-end;
    }
    
    img {
        width: 100%;
        overflow: hidden;
    }
    
    

    


</style>
