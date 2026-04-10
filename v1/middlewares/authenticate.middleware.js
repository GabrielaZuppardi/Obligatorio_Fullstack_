import jwt from 'jsonwebtoken';


export const authenticateJwToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ mensaje: "Token no proporcionado" });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: "Token no proporcionado" });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ mensaje: "Token inválido" });
        req.user = user;
        next(); 
   });
}