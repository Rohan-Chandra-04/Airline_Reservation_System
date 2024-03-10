

const secret = process.env.JWT_SECRET;
import jwt from 'jsonwebtoken';




const middleware = (req, res, next)=>{
    var recievedToken = req.headers.authorization

    console.log(req.headers)

    console.log(recievedToken)

    if (!recievedToken || !recievedToken.startsWith('Bearer ')){
        console.log(recievedToken)
        return res.status(403).json({msg: 'unauthorized access'})
    }
    else{

        
        var actualToken = recievedToken.split(" ")[1]

        console.log(actualToken);
        try{

            const decoded = jwt.verify(actualToken, secret)

            console.log(decoded)

            req.email = decoded.email

            next()

        }catch(err){
            res.status(403).json({msg : "unauthorized access"})
            console.log(err)
        }

    }
}

export  {middleware}