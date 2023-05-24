<script>
    import { colors } from "../colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
    import Navbar from "../../nested/navbar/navbar.svelte"
    let search_input = "";
    let nsfw;
    


    async function get_manga(a, nsfw){
        if (nsfw == true) {
            let json = await fetch(`https://api.mangadex.org/manga?limit=9&title=${a}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&contentRating%5B%5D=pornographic&order%5BlatestUploadedChapter%5D=desc`)
            const data = await json.json()
            console.log(data) 
        
        }
        else {
            let json = await fetch(`https://api.mangadex.org/manga?limit=9&title=${a}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&order%5BlatestUploadedChapter%5D=desc`)
            const data = await json.json()
            console.log(data) 
        }
        
    }

</script>

<div class="main">
    <Navbar/>

    <div class="manga_search">
        <div class="search">
            <input bind:value={search_input}>
            <button on:click={get_manga(search_input, nsfw)}>search for manga</button>
            
        </div>
        <div class="checkboxes">
            <p>NSFW</p>
            <input type="checkbox" bind:checked={nsfw}>

        </div>


    </div>
    



</div>

<style>
    div.search {
        margin-top: 100px;
        display: flex;
        align-content: flex-start;
        justify-content: center;
    }

    input {
        padding: 12px 10px;
        height: 1.5em;
        width: 30%;
        border: 0;
        border-radius: 5px;
        border-color: #dfdfdf;
        inset-block-start: 2px;
        margin-right: 12px;
    }

</style>