<script>
    import { colors } from "../colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
    const colors_primary = colors[0].color_primary;
    const colors_secondary = colors[0].color_secondary;
    const head_navbar = colors[0].header_navbar;
    import Navbar from "../../nested/navbar/navbar.svelte";
    let search = "Evangelion";
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
                "https://nekos.best/api/v2/search?query=" + search + "&type=2"
            );
            const jason = await response.json();
            console.log(jason.results[0].url);
            return jason.results[0].url;
        }
    }
</script>

<main>
    <Navbar />
    <div class="gen_neko" style:background-color={colors_secondary[0]}>
        <h1>Image generator</h1>
        <div class="input_field">
            <select name="Category" id="endpoint" style:background-color={head_navbar[0]} bind:value={endpoint}>
                <option value="neko">Neko</option>
                <option value="kitsune">Kitsune</option>
                <option value="husbando">Husbando</option>
                <option value="waifu">Waifu</option>
            </select>
            <div class="value" style:background-color={head_navbar[0]}>
                <input
                    type="range"
                    bind:value={amount}
                    min="1"
                    max="20"
                    id="valueSlider"
                />
                <p>{amount}</p>
            </div>
        </div>
        <button on:click={clicked} style:background-color={head_navbar[0]}
            >Generate a {endpoint}</button
        >
        {#await src}
            <p>loading</p>
        {:then src}
            <div class="nekos">
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
        <div class="search_neko">
            <h3>Or you can try searching for the anime(gifs only)</h3>
            <input type="text" name="search" bind:value={search} style:background-color={head_navbar[0]} />
            <button on:click={searched} style:background-color={head_navbar[0]}>Find {search} gif</button>
            {#await src2}
                <p>loading</p>
            {:then src2}
                <div class="neko">
                    <img src={src2} alt="" />
                </div>
            {/await}
        </div>
    </div>
</main>

<style lang="scss">
    .gen_neko {
        width: calc(80% - 3em);
        margin: 3em 10%;
        padding: 1.5em;
        min-height: 100vh;
        border-radius: 1em;
        h1 {
            text-align: center;
            font-size: 3;
            color: #dfdfdf;
            margin: 1em;
        }
    }
    .input_field {
        display: flex;
        select {
            width: 80%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #2F3061;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: #dfdfdf;
        }
        .value {
            background-color: #dfdfdf;
            border-radius: 4px;
            width: 20%;
            margin: 8px;
            height: fit-content;
            text-align: center;

            input {
                margin: 4px 4px 0 4px;
                width: calc(100% - 8px);
            }
            p {
                margin-bottom: 2px;
            }
        }
    }
    button {
        display: inline-block;
        padding: 4px 4px;
        font-size: 1em;
        margin-top: 1em;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: #fff;
        border: none;
        border-radius: 2px;
        box-shadow: 0 2px black;
    }

    button:hover {
        background-color: #3e8e41;
    }

    button:active {
        box-shadow: 0 3px black;
        transform: translateY(1px);
    }
    .nekos {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .placeholder {
            width: 10em;
            height: 10em;
            background-color: red;
            margin: 2em;
        }
        img {
            max-height: 22em;
            margin: 1em;
            min-width: calc(50% - 2em);
            border-radius: 10px;
        }
    }
    .search_neko {
        width: 100%;
        margin-top: 10em;
        img {
            width: 100%;
        }
        h3 {
            margin-bottom: 1em;
            color: #dfdfdf;
        }
        input{
            width: 80%;
            padding: 12px 20px;
            margin: 8px 20% 0 0; 
            display: inline-block;
            border: 1px solid #2F3061;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: #dfdfdf;
        }
    }
</style>
