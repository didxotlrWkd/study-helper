process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = async function query(data) {
    try {
        const response = await fetch(
            "https://flow.edutrack.kr/api/v1/prediction/ad559fa9-e325-496f-9c3b-1c1e9189358f",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        const result = await response.json();
        return result;
    }catch(err){
        console.error(err)
        throw err
    }
}