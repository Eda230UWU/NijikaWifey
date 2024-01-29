<script>
    import { colors } from "../colors.js";
    import Navbar from "../../nested/navbar/navbar.svelte";
    import { onMount } from "svelte";
    import {marked} from 'marked' 

    //colors
    const colors_light = colors.light;
    const colors_dark = colors.dark;
    
    let _marked = marked; 
    let search_input = "";
    let nsfw;
    let data = [];
    let chapter_list = [];
    let cover_url = "" 
    let pages_url = []
    let search_offset = 0;

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

    


    async function read(data) {
        cover_url = `/proxy?url=https://uploads.mangadex.org/covers/${data.id}/${data.relationships.find((t) => t.type === 'cover_art').attributes.fileName}`;
        let response = await proxy_url(`https://api.mangadex.org/chapter?limit=100&manga=${data.id}&contentRating%5B%5D=safe&translatedLanguage%5B%5D=en&contentRating%5B%5D=pornographic&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&includeFutureUpdates=1&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5BpublishAt%5D=asc&order%5BreadableAt%5D=asc&order%5Bvolume%5D=asc&order%5Bchapter%5D=asc`);
        chapter_list = await response.json()
        chapter_list = chapter_list.data
        console.log(chapter_list)
    }

    

    async function get_manga(a, nsfw, b) {
        if (nsfw == true) {
            let response = await proxy_url(
                `https://api.mangadex.org/manga?limit=20&offset=${b}&title=${a}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&contentRating%5B%5D=pornographic&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&includes%5B%5D=author`
            );
            let gex = await response.json();
            return gex.data;
        } else {
            let response = await proxy_url(
                `https://api.mangadex.org/manga?limit=20&offset=${b}&title=${a}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&includes%5B%5D=author`
            );
            let gex = await response.json();
            console.log(gex)                        
            return gex.data;
        }
    }

    function more_results(a, nsfw){
        search_offset = search_offset + 20
        get_manga(a, nsfw, search_offset)
    }

    function less_results(a, nsfw){
            if (search_offset >= 20){
            search_offset = search_offset - 20
            get_manga(a, nsfw, search_offset)
        }
    }

</script>

<div class="main">
    <Navbar />

    <div style:display="flex">
        <div class="search">
            <div class="manga_search">
                <div class="search">
                    <input bind:value={search_input} />
                    <button
                        on:click={() => {
                            data = get_manga(search_input, nsfw, search_offset);
                        }}>search for manga</button
                    >
                </div>
                <div class="checkboxes">
                    <b>NSFW</b>
                    <input type="checkbox" bind:checked={nsfw} />
                </div>
                <div class="results">
                    {#await data}
                        <p>Searching for my Nijika</p>
                    {:then data}
                        <div class="container">
                            {#each data as data}
                                <div class="box">
                                    <div class="img">
                                        <img
                                            alt=""
                                            src="/proxy?url=https://uploads.mangadex.org/covers/{data.id}/{data.relationships.find((t) => t.type === 'cover_art').attributes.fileName}"
                                        />
                                    </div>
                                    <div style:background-color="#00000099" style:overflow="hidden" style:width="calc(100% - 256px)">
                                        <div class="manga_info">
                                            <h1>{data.attributes.title.en}</h1>
                                            <h3>By: {data.relationships[0].attributes.name}</h3>
                                            {#each data.attributes.tags as tags}
                                                <i style:display="inline-block">{tags.attributes.name.en}</i>                                                
                                            {/each}


                                            {#if data.attributes.description.en != undefined}
                                                <p>
                                                    {@html _marked(data.attributes.description.en)}
                                                </p>
                                            {/if}
                                        </div>
                                        <div class="blur_backg" style:background-image="url(/proxy?url=https://uploads.mangadex.org/covers/{data.id}/{data.relationships.find(
                                            (t) => t.type === 'cover_art'
                                            ).attributes.fileName})">
                                        </div>
                                    </div>
                                    <button class="read"
                                        on:click={() => {
                                            read(data);
                                        }}>start<br />reading</button
                                    >
                                </div>
                            {/each}
                        </div>
                        <div class="pages">
                            <button on:click={() => {
                                data = less_results(search_input, nsfw)
                            }}>previous page</button>
                            <button on:click={
                                data = more_results(search_input, nsfw)
                            }>next page</button>
                        </div>
                    {/await}
                </div>
            </div>
        </div>
       
    </div>
</div>

<style lang="scss">
    *:focus {
        outline: none;
    }
    
    div.box {display: flex; justify-content: space-between;}
    
    
   

    div.manga_search {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;

        
        div.search {
            margin-top: 100px;
            display: flex;
            align-content: flex-start;
            justify-content: center;
            min-width: 900px;
            width: 40vw;
            transition: all, 1s;
            overflow: hidden;
        }

        div.checkboxes {
            margin-top: 10px;
            display: flex;
            color: #dfdfdf;
            b {
                
                margin-right: -35spx;
            }

            input {
                border: none;
                width: 100px;
            }
        }

        input {
            padding: 12px 10px;
            height: 1.5em;
            width: 30%;
            border: 0;
            border-radius: 5px;
            border-color: #dfdfdf;
            inset-block-start: 0px;
            margin-right: 12px;
        }
        input:focus {
            outline: none;
        }

       
    }
    
    div.results {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;   
        
        div.img img {
            width: 256px;
            height: 100%;
        }

       
        
        .blur_backg {
            filter: blur(10px);
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-position-y: -50px;
            background-color: rgba(0, 0, 0, 0.286); 
            position: relative;
            top: -40px;
            z-index: -1;
            }

        div.manga_info {
             
            h3 {
                padding-top: 0px;
                margin-top: 0px;
                color: #dfdfdf;

            }
            height: 0px;
            overflow: visible;
            z-index: 2;
            padding: 20px;
            
        }

        div.container {
            display: flex;
            flex-direction: column;
            width: 1000px;
        }
        
        div.box {
            display: flex;
            border: solid 2px;
            margin: 10px;
        }
        
        p {
            margin-top: 20px;
            color: #dfdfdf;
        }
        h1 {
            color: #dfdfdf;
            margin-bottom: 10px;
        }
        i {
            background-color: #484869;
            padding: 5px 10px;
            margin-top: 10px;
            margin-right: 10px;
            border-radius: 5px;
        }
    }

    div.pages {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
            width: 200px;
            height: 50px;
            margin: 20px;
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

    button.read {        
        color: #000000;
        border: 0px;
        border-radius: 2px 0px 0px 2px;
    }
</style>
