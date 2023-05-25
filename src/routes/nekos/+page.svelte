<script>
    import { colors } from "../colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
    import Navbar from "../../nested/navbar/navbar.svelte";
    import { each } from "svelte/internal";
    let search;
    let src;
    let src2;
    let endpoint;
    let amount = 1;

    function clicked() {
        async function getNeko() {
            const response = await fetch(
                "https://nekos.best/api/v2/" + endpoint + "?amount=" + amount
            );
            const json = await response.json();
            console.log(json);
            return json;
        }
        src = getNeko();
    }
    function searched() {
        src2 = searchNeko();
        async function searchNeko() {
            const response = await fetch(
                "https://nekos.best/api/v2/search?query=" + search + "&type=1"
            );
            const jason = await response.json();
            console.log(jason.results[0].url);
            return jason.results[0].url;
        }
    }
</script>

<main>
    <Navbar />
    <div class="gen_neko">
        <div class="input_field">
            <select name="Category" id="endpoint" bind:value={endpoint}>
                <option value="neko">Neko</option>
                <option value="kitsune">Kitsune</option>
                <option value="husbando">Husbando</option>
                <option value="waifu">Waifu</option>
            </select>
            <input type="number" bind:value={amount} min="1" max="20" />
            <button on:click={clicked}>Generate a neko</button>
        </div>
        {#await src}
            <p>loading</p>
        {:then src}
            <div class="nekos" style:grid-template-columns="{amount}fr">
                {#if src}
                    {#each src.results as source, i}
                        <div class="neko" id="ne{i + 1}">
                            <!--<div class="placeholder" />-->
                            <img src={source.url} alt="" />
                        </div>
                    {/each}
                {/if}
            </div>
        {/await}
    </div>
    <div class="search_neko">
        <p>Or you can try searching it</p>
    <input type="text" name="search" bind:value={search} />
    <button on:click={searched}>Search a neko</button>
    {#await src2}
        <p>loading</p>
    {:then src2}
        <div class="neko">
            <img src={src2} alt="" />
        </div>
    {/await}
    </div>
</main>

<style lang="scss">
    .input_field {
        width: 60%;
        select {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            button {
            }
        }
    }
    .nekos {
        display: flex;
        flex-wrap: wrap;
        .placeholder {
            width: 10em;
            height: 10em;
            background-color: red;
            margin: 2em;
        }
        img {
            max-width: 15em;
            margin: 2em;
        }
    }
</style>
