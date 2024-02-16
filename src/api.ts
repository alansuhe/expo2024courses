// import c from '../constants/Contants'

// const API_URL = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=3&mkt=zh-CN'

type ApiParamsType = {
    idx?: number,
    n?: number,
    // mkt?: string
}

export async function getBingWallPapers({ idx = 0, n = 1 }: ApiParamsType) {

    const apiUrl = `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=${n}`
    return await fetch(apiUrl)
        .then(res => res.json())
        .then(json => { return (json.images) })
        .catch(e => console.log(e))
}