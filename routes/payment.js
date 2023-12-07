import express from "express"
import Razorpay from "razorpay"
import crypto from "crypto"

const paymentRouter = express.Router()

paymentRouter.post("/orders",async (req,res) => {
    try{
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        })

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }

        instance.orders.create(options, (error, order) => {
            if(error) {
                console.log(error)
                return res.status(500).json({message: error.message})
            }

            return res.status(200).json({data: order})
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({message: error.message})
    }
})

paymentRouter.post("/verify", async (req,res) => {
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const shasum = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(sign.toString())
        .digest("hex")

        if(razorpay_signature === shasum) {
            return res.status(200).json({message: "Payment verified Successfully"})
        } else {
            return res.status(400).json({message: "Payment verification failed"})
        }
    } catch (error) {
        console.log(error)
       return res.status(500).json({message: error.message})
    }
})

export default paymentRouter

