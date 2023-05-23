<header class="navBar">
    <div class="logo"></div>
    <nav>
        <div searchBar></div>
    </nav>
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
        nav{
            display: flex;
            width: 66%;
            background-color: black;
            margin: 10px;
        }
    }
</style>