<script>
    import { colors } from "../../routes/colors";
    const head_primary = colors[0].header_primary;
    const head_navbar = colors[0].header_navbar;
    const colors_logo = colors[0].color_logo;
</script>

<header class="navBar" style:background-color={head_primary[0]}>
    <div class="logo" style:background-color={colors_logo[0]} />
    <section style:background-color={head_navbar[0]}>
        <div>
            <input
                type="text"
                placeholder="Search..."
                id="searchBar"
                style:background-color={head_navbar[0]}
            />
        </div>
    </section>
</header>

<style lang="scss">
    :global(body) {
        margin: 0;
    }
    header {
        padding: 0 20%;
        display: flex;
        justify-content: space-between;
        width: 60%;
        .logo {
            height: 3.5em;
            width: 3.5em;
            margin: 1em 0;
        }
        h3 {
            color: aqua;
            margin: 0;
        }
        section {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 66%;
            margin: 20px 10px;
            border-radius:1em ;

            input {
                padding: 15px 20px;
                height: 1.5em;
                width: 35em;
                border:0;
                border-radius: 5px;
                border-color: #DFDFDF;
                inset-block-start: 2px;
            }
        }
    }
</style>
