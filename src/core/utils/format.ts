export const formatTimeSpan = (time: number) => {
  const hours = Math.floor(time / (60 * 60 * 1000));
  const minutes = Math.floor((time / (60 * 1000)) % 60);

  return `${hours}h${minutes > 0 ? `${String(minutes).padStart(2, '0')}m` : ''}`;
};
