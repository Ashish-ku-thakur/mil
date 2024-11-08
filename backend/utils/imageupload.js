
export let uploadeImageOnCloudinary = async (file) =>{
    let base64ImageContent = Buffer.from(file.buffer).toString("base64")
    let datauri = `data:${file.mimetype};base64,${base64ImageContent}`
    
    return datauri
}


