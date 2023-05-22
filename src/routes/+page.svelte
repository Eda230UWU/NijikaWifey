<script>
    import Navbar from "../nested/navbar/navbar.svelte"
    import Mal_win from "../nested/mal_win/mal.svelte"
    import Quick_links from "../nested/quick_links/quick.svelte"
    import News from "../nested/news/news.svelte"

    export const colors_dark = [];
    export const colors_light = ["#ffffff", "#acacac"];

</script>


<div class="main" style:background-color={colors_light[0]}>
    <Navbar/>
    <div class="content" style:background-color={colors_light[1]}>
        <div class="sidebar">
            <Mal_win/>
            <Quick_links/>
        </div>
        <div class="news">
            <News/>
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
        
    }

    div.content {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        width: 66vw;
        height: 80vh;
        
    }
    div.sidebar {
        flex-grow: 1;
    }
    
    div.news {
        margin-left: 90px;
        flex-grow: 2.5;
    }

</style>