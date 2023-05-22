<script>
    import Navbar from "../nested/navbar/navbar.svelte"
    import Mal_win from "../nested/mal_win/mal.svelte"
    import Quick_links from "../nested/quick_links/quick.svelte"
    import News from "../nested/news/news.svelte"

    export const colors_dark = [];
    export const colors_light = ["#ffffff", "#acacac"];

</script>

<<<<<<< HEAD
<div class="main">
    
=======
>>>>>>> 89991aa837dd303cf5e52f4e44f7e151c7c12f76

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
<<<<<<< HEAD
=======
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
        h1{
            font-size: large;
        }
    }

    div.content {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        width: 66vw;
        height: 80vh;
        
    }
>>>>>>> 89991aa837dd303cf5e52f4e44f7e151c7c12f76

</style>