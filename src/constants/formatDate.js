export function ioDateToUI(isoDateString) {

    // Parse the ISO date string into a Date object
    let date = new Date(isoDateString);

    // Extract the day, month, and year
    let day = String(date.getUTCDate()).padStart(2, '0');
    let month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    let year = date.getUTCFullYear();

    // Format the date as "DD/MM/YYYY"
    return `${day}/${month}/${year}`;
}