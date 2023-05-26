<script>
    import { onMount } from "svelte";
    import { colors } from "../../routes/colors";
    const head_primary = colors[0].header_primary;
    const head_navbar = colors[0].header_navbar;
    const colors_logo = colors[0].color_logo;
    
    export let search_input;

    onMount(()=> (search_input = ""))

    
</script>

<header class="navbar" style:background-color={head_primary[0]}>
    <div class="flex">
        <div class="logo">
            <a href="/">
                <img src="/logo.png" alt="nijiker"/>
            </a>
        </div>
        <h1><a href="/">NijikaWeb</a></h1>
    </div>
    <section>
           

        <div id="nekosLink">
            <a href="/nekos">Nekos</a>
    </section>
    <div />
</header>

<style lang="scss">


    div.logo img {
        width: 100%;
    }

    div.logo {
        height: 80px;
        width: 80px;
        margin-right: 20px;
    }

    div.flex {
        margin-left: 10%;
        display: flex;
        align-items: center;
        a  {
            text-decoration: none;
            color: black;
        }   
            
    }

    header.navbar {
        position: sticky;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100px;
        align-items: center;
        width: 100vw;
    }

    section {
        
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 50%;

        input {
            padding: 15px 20px;
            height: 1.5em;
            width: 100%;
            border: 0;
            border-radius: 5px;
            border-color: #dfdfdf;
            inset-block-start: 2px;
        }
        a{
            margin-left: 10em;
            text-decoration: none;
            font-size: 1.5em;
            color: black;
            font-weight: 600;
        }
    }

</style>
