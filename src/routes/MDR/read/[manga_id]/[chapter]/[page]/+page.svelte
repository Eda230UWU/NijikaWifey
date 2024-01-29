<script>
    import { colors } from "../../../../../colors";
    import Navbar from "../../../../../../nested/navbar/navbar.svelte";
    import { onMount } from "svelte";
    import {marked} from 'marked' 

    //colors
    const colors_light = colors.light;
    const colors_dark = colors.dark;
    
    let _marked = marked; 
    let read_width = "0px";
    let search_width = "100vw";
    let search_height = "auto";
    let search_input = "";
    let nsfw;
    let data = [];
    let chapter_list = [];
    let cover_url = "" 
    let pages_url = []
    let index

    async function proxy_url(url) {
        return await fetch("/proxy?url=" + encodeURIComponent(url));
    }

    async function get_page(chapter_id) {
        let response = await proxy_url(`https://api.mangadex.org/at-home/server/${chapter_id}`)
        pages_url = await response.json()
        index = 0 
        cover_url = `/proxy?url=https://uploads.mangadex.org/data/${pages_url.chapter.hash}/${pages_url.chapter.data[index]}`
        console.log(pages_url)
        
        
    }

    function page_increment() {
        index++
        cover_url = `/proxy?url=https://uploads.mangadex.org/data/${pages_url.chapter.hash}/${pages_url.chapter.data[index]}`
    }

    function page_decrement() {
        index--
        cover_url = `/proxy?url=https://uploads.mangadex.org/data/${pages_url.chapter.hash}/${pages_url.chapter.data[index]}`
    }


    async function read(data) {
        search_width = "0px";
        read_width = "100vw";
        search_height = "80vh";
        cover_url = `/proxy?url=https://uploads.mangadex.org/covers/${data.id}/${data.relationships.find((t) => t.type === 'cover_art').attributes.fileName}`;
        let response = await proxy_url(`https://api.mangadex.org/chapter?limit=100&manga=${data.id}&contentRating%5B%5D=safe&translatedLanguage%5B%5D=en&contentRating%5B%5D=pornographic&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`);
        chapter_list = await response.json()
        chapter_list = chapter_list.data
        console.log(chapter_list)
    }

    function search() {
        search_width = "100vw";
        read_width = "0px";
        search_height = "fit-content";
    }

    async function get_manga(a, nsfw) {
        if (nsfw == true) {
            let response = await proxy_url(
                `https://api.mangadex.org/manga?limit=20&title=${a}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&contentRating%5B%5D=pornographic&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&includes%5B%5D=author`
            );
            let gex = await response.json();
            return gex.data;
        } else {
            let response = await proxy_url(
                `https://api.mangadex.org/manga?limit=20&title=${a}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&includes%5B%5D=author`
            );
            let gex = await response.json();
            console.log(gex)                        
            return gex.data;
        }
    }
</script>





<div class="read" style:min-width={read_width}>
    <button on:click={() => {search();}}>Search for manga</button>
    
    <div class="reader">
        
        <div class="manga_page">
            <button on:click={()=> {page_decrement()}}>previous page</button>
            {#await cover_url then cover_url}                        
                <img alt="" src={cover_url}/>
            {/await}
            
            <button on:click={()=> {page_increment()}}>next page</button>
            
        </div>
        <div class="chapter_list">
        {#await chapter_list}
            <p>loading ...</p>                    
        {:then chapter_list} 
            {#each chapter_list as chapter_list}
                {#if chapter_list.attributes.translatedLanguage == "en"}
                    {#if chapter_list.attributes.title == "" || chapter_list.attributes.title == null}
                    <div>
                        <button on:click={() => {get_page(chapter_list.id)}}>Vol: {chapter_list.attributes.volume} Ch: {chapter_list.attributes.chapter}</button>
                    </div>
                    {:else }
                    <div>
                        <button on:click={() => {get_page(chapter_list.id)}}>Vol: {chapter_list.attributes.volume} Ch: {chapter_list.attributes.chapter} "{chapter_list.attributes.title}"</button>
                    </div>
                    {/if}
                {/if}
            {/each}
        {/await}

        </div>
    </div>
</div>


<style lang="scss">
    *:focus {
        outline: none;
    }
    
        
   
    div.read {
        padding-top: 20px;
        transition: all, 1s;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        

        div.reader {
            margin-top: 40px;
            display: flex;
            height: 75vh;

            div.manga_page {
                display: flex;
                height: 75vh;
                img {
                    height: 100%;
                }

                button {
                    height: 100%;
                    align-self: flex-start;
                    justify-self: flex-start;
                }
            }


            div.chapter_list {
                overflow: scroll;
                width: 20vw;
                button {
                    background-color: #dfdfdf;
                    width: 100%;
                    height: fit-content;
                }
            }

        }
    }

    
    
   
    button {
        background-color: #484869;
        color: #000000;
        border: 0px;
        border-radius: 5px;
    }

    button:hover {
        cursor: pointer;
    }

    
</style>
