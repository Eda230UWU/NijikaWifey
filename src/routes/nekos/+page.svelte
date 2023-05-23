<script>
    import { colors } from "../colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
    import Navbar from "../../nested/navbar/navbar.svelte"

    async function getNeko() {
        const response = await fetch("https://nekos.best/api/v2/neko");
        const json = await response.json();
        console.log(json.results[0].url);
        return json.results[0].url;
    }
    let uwu = getNeko()
</script>

<main>
    <Navbar />
    {#await uwu}
        <p>loading</p>
        {:then uwu}
        <div id="nekos">
            <!-- <img src="{uwu}" alt=""> --> 
            <p>Link is {uwu}</p>
        </div>
{/await}   
</main>
 

<style lang="scss">

    #nekos{
        img{
            width: 25%;
        }
    }
</style>