process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = async function query(data) {
    try {
        const response = await fetch(
            "https://flow.edutrack.kr/api/v1/prediction/e43adff3-be0b-4252-8300-02a8245ae797",
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
    } catch (err) {
        console.error(err)
        throw err
    }
}
