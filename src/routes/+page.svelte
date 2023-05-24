<script>
    import Navbar from "../nested/navbar/navbar.svelte";
    import Mal_win from "../nested/mal_win/mal.svelte";
    import Quick_links from "../nested/quick_links/quick.svelte";
    import News from "../nested/news/news.svelte";

    import { colors } from "../routes/colors.js";
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
    const colors_primary = colors[0].color_primary;
    const colors_secondary = colors[0].color_secondary;
   

    





</script>

<div class="main" style:background-color={colors_primary[0]}>
    <Navbar />
    <div class="content">
        <div class="flex">
            <div class="sidebar" style:background-color={colors_secondary[0]}>
                <Mal_win />
                <Quick_links />
            </div>
            <div class="news" style:background-color={colors_secondary[0]}>
                <News />
            </div>
        </div>
        
    </div>
</div>

<style lang="scss">

    * {
        display: flex;
        flex-direction: column;
    }

    div.main {
        
        flex-direction: column;
        align-items: center;
        max-width: 100vw;
        height: fit-content;
        h1 {
            font-size: large;
        }
    }

    div.flex {
        height: 80vh;
        display: grid;
        grid-template-columns: 3fr 9fr;
        grid-template-rows: 1fr 1fr;
        gap: 3em;
    }

    div.content {
        margin-top: 50px;
        margin: 50px auto 20px auto;
        max-width: calc(80% - 20px);
        padding: 10px;
        min-width: 1000px;
        
    }
    div.sidebar {
        
        min-width: 150px;
    }


    div.news {
        min-height: 60vh;
        display: block;
        overflow: hidden;
        margin-left: 90px;
        padding: 20px;
        max-width: 100%;
        
    }

</style>
