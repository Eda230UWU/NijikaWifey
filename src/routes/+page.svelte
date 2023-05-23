<script>
    import Navbar from "../nested/navbar/navbar.svelte";
    import Mal_win from "../nested/mal_win/mal.svelte";
    import Quick_links from "../nested/quick_links/quick.svelte";
    import News from "../nested/news/news.svelte";

    import { colors } from "../routes/colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
<<<<<<< HEAD
=======
   

    async function getNeko() {
        const response = await fetch("https://nekos.best/api/v2/neko");
        const json = await response.json();
        console.log(json.results[0].url);
        return json;
    }
    let uwu = getNeko();
>>>>>>> 4088be716123c0324b72817af7c5b7e9555fff96
</script>

<div class="main" style:background-color={colors_light[1]}>
    <Navbar />
    <div class="content" style:background-color="#acacac">
        <div class="flex">
            <div class="sidebar">
                <Mal_win />
                <Quick_links />
            </div>
            <div class="news">
                <News />
            </div>
        </div>
        {/await}
    </div>
</div>

<style lang="scss">
    * {
        $sec: #ffffff;
        display: flex;
        flex-direction: column;
    }

    div.main {
        min-width: 1000px;
        flex-direction: column;
        align-items: center;
        max-width: 100vw;
        height: 100vh;
        h1 {
            font-size: large;
        }
    }

    div.flex {
        display: flex;
        height: 100%;
        flex-direction: row;
    }

    div.content {
        margin-top: 50px;
        margin: 50px auto 20px auto;
        max-width: 80vw;
        padding: 10px;
        
    }
    div.sidebar {
        
        min-width: 150px;
    }


    div.news {
        display: block;
        overflow: hidden;
        margin-left: 90px;
        padding: 20px;
        max-width: 100%;
    }
</style>
