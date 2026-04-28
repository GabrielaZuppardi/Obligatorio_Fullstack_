import jwt from 'jsonwebtoken';


export const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ mensaje: "Token no proporcionado" });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: "Token no proporcionado" });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ mensaje: "Token inválido" });
        req.user = decoded; // Guardamos la información decodificada del token en la request para usarla en los controladores
        next(); 
   });
}

/*“Uso req.usuario para guardar el payload del token decodificado.
Es equivalente a req.decoded, pero lo nombro según el dominio de la aplicación*/