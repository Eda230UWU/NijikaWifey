<script>
    import { colors } from "../colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
    import Navbar from "../../nested/navbar/navbar.svelte";

    let src;
    let endpoint;
    let amount;
    function clicked() {
        if (
            endpoint == "husbando" ||
            endpoint == "waifu" ||
            endpoint == "neko" ||
            endpoint == "kitsune"
        ) {
            src = getNeko();
        } else {
            alert("Thats not a category");
        }
    }
    async function getNeko() {
        const response = await fetch(
            "https://nekos.best/api/v2/" + endpoint + "?amount=" + amount
        );
        const json = await response.json();
        console.log(json.results[0].url);
        return json.results[0].url;
    }
</script>

<main>
    <Navbar />
    <div>
        <input bind:value={endpoint} />
        <input bind:value={amount} />
    </div>
    <button on:click={clicked}>Generate a neko</button>
    {#await src}
        <p>loading</p>
    {:then src}
        <div id="nekos">
            <img {src} alt="" />
        </div>
    {/await}
</main>

<style lang="scss">
    #nekos {
        img {
            width: 25%;
        }
        button {
        }
    }
</style>
