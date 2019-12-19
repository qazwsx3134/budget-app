
//Get visible event




export default (event, {city,title, sortBy, startDate, endDate})=>{
    return event.filter((event)=>{
        
        const titleMatch = event.title.toLowerCase().includes(title.toLowerCase());
        const cityMatch = event.city.toLowerCase() === city.toLowerCase()

        return cityMatch && titleMatch
    }).sort((a,b)=>{
        if(sortBy ==='date'){
            return a.startDate < b.startDate ? -1 : 1; //from little to large
        }
        else if (sortBy ==='amount') {
            return a.eventFee < b.eventFee ? 1 : -1;
        }else if (sortBy ==='like') {
            return a.likeby.length < b.likeby.length ? 1 : -1;
        }
    });
}