<script>
    import { colors } from "../colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
    import Navbar from "../../nested/navbar/navbar.svelte";
    import { onMount } from "svelte";

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
                `https://api.mangadex.org/manga?limit=20&title=${a}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&contentRating%5B%5D=pornographic&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art`
            );
            let gex = await response.json();
            return gex.data;
        } else {
            let response = await proxy_url(
                `https://api.mangadex.org/manga?limit=20&title=${a}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art`
            );
            let gex = await response.json();
            console.log(gex)                        
            return gex.data;
        }
    }
</script>

<div class="main">
    <Navbar />
    <div style:display="flex">
        <div class="search" style:min-width={search_width} style:max-height={search_height}>
            <div class="manga_search">
                <div class="search">
                    <input bind:value={search_input} />
                    <button
                        on:click={() => {
                            data = get_manga(search_input, nsfw);
                        }}>search for manga</button
                    >
                </div>
                <div class="checkboxes">
                    <p>NSFW</p>
                    <input type="checkbox" bind:checked={nsfw} />
                </div>
                <div class="results">
                    {#await data}
                        <p>koubus</p>
                    {:then data}
                        <div class="container">
                            {#each data as data}
                                <div class="box">
                                    <div class="img">
                                        <img
                                            alt=""
                                            src="/proxy?url=https://uploads.mangadex.org/covers/{data.id}/{data.relationships.find(
                                                (t) => t.type === 'cover_art'
                                            ).attributes.fileName}"
                                        />
                                    </div>
                                    <div class="manga_info">
                                        <h1>{data.attributes.title.en}</h1>

                                        {#if data.attributes.description.en == undefined}
                                            <i>description missing</i>
                                        {:else}
                                            <p>
                                                {data.attributes.description.en}
                                            </p>
                                        {/if}
                                    </div>
                                    <button
                                        on:click={() => {
                                            read(data);
                                        }}>start<br />reading</button
                                    >
                                </div>
                            {/each}
                        </div>
                    {/await}
                </div>
            </div>
        </div>

        <div class="read" style:min-width={read_width}>
            <button on:click={() => {search();}}>Search for manga</button>
            
            <div class="reader">
                
                <div class="manga_page">
                    {#await cover_url then cover_url}                        
                        <img alt="" src={cover_url}/>
                    {/await}
                    <button on:click={()=> {page_decrement()}}>previous page</button>
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
    </div>
</div>

<style lang="scss">
    div.search {
        transition: all, 1s;
        overflow: hidden;
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
                height: 75vh;
                img {
                    height: 100%;
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

    div.manga_search {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div.search {
            margin-top: 100px;
            display: flex;
            align-content: flex-start;
            justify-content: center;
            width: 40%;
        }

        div.checkboxes {
            display: flex;
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
    }

    div.results {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        div.img img {
            width: 256px;
        }

        div.img {
        }

        div.manga_info {
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
        }

        p {
            color: #dfdfdf;
        }
    }
</style>
