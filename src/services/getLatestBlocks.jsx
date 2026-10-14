
const getLatestBlocks = async () => {
    let nodeUrl = localStorage.getItem('node') || ''
    const response = await fetch(`${nodeUrl}/block`)
    const result = await response.json();
    return result;
}

export default getLatestBlocks;
