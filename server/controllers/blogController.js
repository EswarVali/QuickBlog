import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';


export const addBlog = async(req, res)=> {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if all fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // Optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //Auto compress the image
                {format: 'webp'}, //Convert to modern format
                {width: '1280'} // Width resizing
            ]
        });

        const image = optimizedImageUrl;
        
        await Blog.create({
            title, 
            subTitle,
            description,
            category,
            image,
            isPublished
        })

        res.json({success: true, message: "Blog added successfully"})

    } catch (error) {
        res.json({sucess: false, message: error.message})
    }
}