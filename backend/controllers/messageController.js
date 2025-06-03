import {Conversation} from '../models/conversationModel.js'
import {Message} from '../models/messageModel.js'
import { getReceiverSocketId, getIO } from '../socket/socket.js';


export const sendMessage = async (req,res)=>{
    try{
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;
        let gotConversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })
        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await Message.create({
             senderId,
             receiverId,
             message
        })
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
          
        }
        // await gotConversation.save();
        await Promise.all([gotConversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);

        //socket io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          const io = getIO();
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

    }catch(e){
        res.status(500).json({error:e.message});
    }
}

export const getMessage = async(req, res) =>{
    try{
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        }).populate("messages")
        if(!conversation){
            return res.status(404).json({error: "No conversation found"});
        }
      return res.status(200).json(conversation?.messages);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}