const matchJobs = (text, jobKeywords) => {
    const matches = jobKeywords.filter((keyword) => text.includes(keyword));
    return matches.length > 0 ? matches : ['No matches found'];
};

// Example usage:
const jobKeywords = ['JavaScript', 'React', 'Next.js', 'Frontend'];
const result = matchJobs(extractedText, jobKeywords);
console.log('Matched Jobs:', result);