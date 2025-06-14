import formidable from 'formidable';
import fs from 'fs';
import pdf from 'pdf-parse';

export const config = {
    api: {
        bodyParser: false, // Disabling default body parsing
    },
};

const parsePDF = async(filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const form = formidable({ multiples: false });

    form.parse(req, async(err, fields, files) => {
        if (err) {
            console.error('Error parsing file:', err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        try {
            const filePath = files.file.filepath;
            const extractedText = await parsePDF(filePath);
            res.status(200).json({ text: extractedText });
        } catch (error) {
            console.error('PDF Parsing Error:', error.message);
            res.status(500).json({ error: 'Failed to extract PDF content' });
        }
    });
}