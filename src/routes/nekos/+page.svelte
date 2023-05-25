<script>
    import { colors } from "../colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
    import Navbar from "../../nested/navbar/navbar.svelte";
    let search;
    let src;
    let src2;
    let endpoint;
    let amount = 1;

    function clicked() {

            if (
            endpoint == "husbando" ||
            endpoint == "waifu" ||
            endpoint == "neko" ||
            endpoint == "kitsune"
            ){
                src = getNeko();
            } 
            else {
            alert("Thats not a category");
            }
        }
            async function getNeko() {
                const response = await fetch(
                    "https://nekos.best/api/v2/" + endpoint + "?amount=" + amount            
                );
                const json = await response.json();
                console.log(json);
                  return json.results[0].url;

            }
     function searched(){
        src2 = getNeko();
         async function getNeko() {
                const response = await fetch(
                    "https://nekos.best/api/v2/search?query="+ search + "&type=1"
                );
                const json = await response.json();
                console.log(json.results[0].url);
                  return json.results[0].url;
            }
     }
        
</script>
<main>
    <Navbar />
    <div>
        <select name="Category" id="endpoint" bind:value={endpoint}>
            <option value="neko">Neko</option>
            <option value="kitsune">Kitsune</option>
            <option value="husbando">Husbando</option>
            <option value="waifu">Waifu</option>
        </select>
        <input type=number bind:value={amount} min=1 max=20 />
    </div>
    <button on:click={clicked}>Generate a neko</button>
    {#await src}
        <p>loading</p>
    {:then src}
            <div class="nekos">
                <img {src} alt=""/>
            </div>
    {/await}
    <p>Or you can try searching it</p>
    <input type="text" name="search" bind:value={search}>
    <button on:click={searched}>Search a neko</button>
    {#await src2}
        <p>loading</p>
    {:then src2}
            <div class="nekos">
                <img {src2} alt=""/>
            </div>
    {/await}
</main>

<style lang="scss">
    .nekos {
        img {
            width: 25%;
        }
        button {
        }
    }
</style>
