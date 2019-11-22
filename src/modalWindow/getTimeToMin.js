import React, { useContext } from "react";

function getTimeToMin (mins){
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return  (hours&&minutes) ? hours + ' hour ' + minutes + ' minutes':
        (hours&&!minutes)?hours + ' hour ':
            minutes + ' minutes'
}
export default getTimeToMin