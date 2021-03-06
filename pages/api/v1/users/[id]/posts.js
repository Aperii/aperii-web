// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    if(req.method =="POST"){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        //console.log(req)
        //JSON.stringify(req.body)
        fetch(`https://api.aperii.com/users/${req.query.id}/posts`, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'content-type': 'application/json',
                authorization: req.headers.authorization
            }
        }).then(res => res.json()).then(json => {
            res.status(json.status ? json.status : 200).send(json)
        })
    }
}