const admin = (req , res , next) => {
    // Agar user authenticated hy and available hy ore admin bhi  hy
    if(req.user && req.user.role === 'admin'){
        next()
    }else{
        res.status(403).json({massage: "Access denied ,  Admin only"})
    }
}

module.exports = {admin}