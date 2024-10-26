const {Summary} = require('../../../../database')

module.exports = async({lecture_id}) => {
    try{
        const summary = await Summary.findOne({
            where : {
                lecture_id,
            },
            attributes : ["content_url"]
        })

        return summary
    }catch(err){
        console.error(err)
        throw err
    }
}