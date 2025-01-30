export const parseCsvFile = async (file: File): Promise<Array<{ title: string; description: string }>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        
        // Skip header row and filter out empty lines
        const ideas = lines
          .slice(1)
          .filter(line => line.trim())
          .map(line => {
            // Handle both quoted and unquoted CSV formats
            const match = line.match(/(?:^|,)("(?:[^"]+|"")*"|[^,]*)/g);
            if (!match) return null;
            
            const [title, description] = match
              .map(field => field.replace(/^,/, '')) // Remove leading commas
              .map(field => field.replace(/^"|"$/g, '')) // Remove quotes
              .map(field => field.replace(/""/g, '"')); // Replace double quotes with single quotes
            
            return { title, description };
          })
          .filter((idea): idea is { title: string; description: string } => 
            idea !== null && 
            idea.title?.trim() !== '' && 
            idea.description?.trim() !== ''
          );
        
        resolve(ideas);
      } catch (error) {
        reject(new Error('Failed to parse CSV file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};