export const exportIdeasToCsv = (ideas: { title: string; description: string }[]) => {
  // Create CSV content with headers
  const headers = ['Titel', 'Beschrijving'];
  const rows = ideas.map(idea => [
    // Escape quotes and wrap fields in quotes to handle commas and newlines
    `"${idea.title.replace(/"/g, '""')}"`,
    `"${idea.description.replace(/"/g, '""')}"`
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', 'ideeen.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};