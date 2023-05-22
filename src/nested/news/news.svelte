<script>
    import { colors } from "../../routes/colors.js"
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;

    async function season_now() {
        const response = await fetch("https://api.jikan.moe/v4/seasons/now");
        const get_season_now = await response.json();
        console.log(get_season_now.data[0].url)
        return get_season_now   
    }
    
    let season_info = season_now()
    

</script>




<h1>Anime this season</h1>

<div>
        
    {#await season_info}
    <div class="loading"> 
        <h1>Loading...</h1>
    </div>


    {:then season_info}
    <div class="scroll">
        <div class="box1">
            <h2><a href={season_info.data[0].url}>{season_info.data[0].title}</a></h2>
            <div class="img">
                <img src={season_info.data[0].images.jpg.image_url}>
            </div>
            <i>Airing at: {season_info.data[0].broadcast.day} {season_info.data[0].broadcast.time} UTC+9</i>
            <p>{season_info.data[0].score}</p>
        </div>
    </div>

    {/await} 
</div>





<style lang="scss">
    h1 {

    }

    div.scroll {
        display: flex;
        flex-direction: row;

    }

    div.box1 {
        flex-direction: column;
        max-width: 20%;
    }

    div.img {
        margin: 0px 20px 0px 20px;
    }

    div.img img {
        width: 100%;
    }

</style>