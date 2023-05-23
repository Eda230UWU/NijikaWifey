<script>
    import Navbar from "../nested/navbar/navbar.svelte"
    import Mal_win from "../nested/mal_win/mal.svelte"
    import Quick_links from "../nested/quick_links/quick.svelte"
    import News from "../nested/news/news.svelte"
    
    
    
    import { colors } from "../routes/colors.js"
    const colors_dark = colors[0].dark;
    const colors_light = colors[0].light;
   

</script>


<div class="main" style:background-color="#ffffff">
    <Navbar/>
    <div class="content" style:background-color="#acacac">
        <div class="sidebar">
            <Mal_win />
            <Quick_links />
        </div>
        <div class="news">
            <News />  
            <a href="../nekos">Nekos!</a>
        </div>
    </div>
</div>

<style lang="scss">
    * {
        $sec: #ffffff;
        display: flex;
        flex-direction: column;
    }

    div.main {
        flex-direction: column;
        align-items: center;
        width: 100vw;
        height: 100vh;
        h1 {
            font-size: large;
        }
    }
    
    div.content {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        width: 80vw;
        height: 80vh;
    }
    div.sidebar {
        flex-grow: 1;
        min-width: 150px;
    }
    
    div.news {
        margin-left: 90px;
        flex-grow: 2.5;
        padding: 20px;
    }

</style>
