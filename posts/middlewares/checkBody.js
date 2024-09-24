// authMiddleware.js
const checkRequestBody =  (req, res, next) => {
console.log(req.body)
  try {
    if (!req.body.name)
        return res.status(200).json({ message: 'please get name', success: false })
    if (!req.body.email)
        return res.status(200).json({ message: 'please get email', success: false })
    if (!req.body.mobileNumbar)
        return res.status(200).json({ message: 'please get mobileNumbar', success: false })
    if (!req.body.address)
        return res.status(200).json({ message: 'please get address', success: false })
    if (!req.body.items)
        return res.status(200).json({ message: 'please get items', success: false })
    if (!req.body.price)
        return res.status(200).json({ message: 'please get price', success: false })

    if (req.body.mobileNumbar.length != 10) {
        return res.status(200).json({ message: 'please enter 10 number', success: false })
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Access Token Required' });
  }

};
module.exports = checkRequestBody;
