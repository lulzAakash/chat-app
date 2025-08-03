const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel')
const User = require('../models/userModel');
const { getReceiverSocketId, io } = require('../socket/socket');

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId] },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }
        
        // await conversation.save();
        // await newMessage.save();
        
        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);
        
        //SOCKET IO FUTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            // this method to send events to specific client
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }

        res.status(201).json(newMessage)

    }
    catch (error) {
        console.log('Error in sendMessage controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getMessages = async (req,res) => {
    try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;
        console.log(userToChatId);
        console.log(senderId);

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}
module.exports = { sendMessage,getMessages }