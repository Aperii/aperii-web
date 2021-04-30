// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    if(req.method =="POST"){
        console.log(JSON.stringify(req.body))
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        fetch('https://api.aperii.com/auth/login', {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json()).then(json => {
            res.status(json.status).send(json)
        })
    }
}