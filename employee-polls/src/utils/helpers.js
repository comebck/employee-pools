export const timestampToString = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const mins = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12;
    //fill to 2 digits
    const formattedMins = mins.toString().padStart(2, '0');
  
    const dateString = `${formattedHours}:${formattedMins}:${ampm} | ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return dateString;
}