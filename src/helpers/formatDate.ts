export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('us-US', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: '2-digit',
  }).format(date);
};
