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

export async function postData(url, token, data) {
    const respon = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(_ => _.json());

    return respon;
}