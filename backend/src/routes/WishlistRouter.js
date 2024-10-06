const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/WishlistController");
const { authUserMiddleWare } = require("../middleware/authMiddleware");

router.post("/add", WishlistController.addToWishlist);
router.get("/", WishlistController.getWishlist);
router.delete("/remove", WishlistController.removeProductFromWishlist);

module.exports = router;
