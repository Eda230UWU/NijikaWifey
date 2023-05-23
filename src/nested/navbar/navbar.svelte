<script>
    import { colors } from "../../routes/colors";
    const head_primary = colors[0].header_primary;
    const head_navbar = colors[0].header_navbar;
    const colors_logo = colors[0].color_logo;

</script>
<header class="navBar" style:background-color={head_primary[0]}>
    <div class="logo" style:background-color={colors_logo[0]}></div>
    <section style:background-color={head_navbar[0]}>
        <div class="searchBar"></div>
    </section>
</header>

<style lang="scss">
        :global(body)
    {
        margin: 0;
    }
    header{
        padding: 0 20%;
        display: flex;
        justify-content: space-between;
        height: 80px;
        width: 60%;
        .logo{
            height: 80px;
            width: 80px;
        }
        h3{
              color:aqua;
              margin: 0;  
        }
        section {
            display: flex;
            width: 66%;
            background-color: black;
            margin: 10px;
        }
    }
</style>