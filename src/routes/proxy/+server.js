export async function GET({ url }) {

    const ret = await fetch(url.searchParams.get("url"))
    return new Response(await ret.arrayBuffer(), {
        headers: {
            ...ret.headers,
            'Content-Encoding': 'compressed'
        }
    }

    )
}