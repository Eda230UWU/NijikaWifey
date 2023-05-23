<script>
    import { colors } from "../../routes/colors";
    const head_primary = colors[0].header_primary;
    const head_navbar = colors[0].header_navbar;
    const colors_logo = colors[0].color_logo;
</script>

<header class="navbar" style:background-color={head_primary[0]}>
    <div class="flex">
        <div class="logo">
            <img src="/logo.png" />
        </div>
        <h1>NijikaWeb</h1>
    </div>
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
    <div />
</header>

<style lang="scss">
    :global(body) {
        margin: 0;
    }

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
    }

    header.navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100px;
        align-items: center;
        width: 100vw;
    }

    h3 {
        color: aqua;
        margin: 0;
    }
    section {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 40%;

        input {
            padding: 15px 20px;
            height: 1.5em;
            width: 35em;
            border: 0;
            border-radius: 5px;
            border-color: #dfdfdf;
            inset-block-start: 2px;
        }
    }
</style>
