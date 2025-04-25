import express, {Request, Response} from 'express';
import {OpenAI} from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


router.post('/generate-resume', async (req:Request, res:Response)=>{
    const {name, title, skills, experience, education} = req.body;

    if(!name || !title || !skills || !experience || !education) {
        return res.status(400).json({error: "Missing requried fields"});
    }

    console.log("Using API Key:", process.env.OPENAI_API_KEY?.slice(0, 10));

    try{
        const prompt = `Create a professional resume for the following individual: 
        Name: ${name}
        Title: ${title}
        Skills: ${skills.join(", ")}
        Experience: ${experience}
        Education: ${education || 'N/A'}
        
        Format it with bullet points for experience and include a strong summary at the top.`

        const completion = await openai.chat.completions.create({
            messages:[{role: 'user', content: prompt}],
            model: 'gpt-3.5-turbo',
        })

        const responseText = completion.choices[0].message.content;
        res.json({resume: responseText});

    }catch(err){
        console.error("OpenAI Error: ", err)
        res.status(500).json({error: 'Failed to generate resume'});
    }
})

export default router;