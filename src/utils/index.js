export async function getData(url, token) {
    const respon = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(_ => _.ok ? _.json() : null);

    return respon;
}