
//Get visible viewpoint




export default (viewpoint, {city,text, sortBy})=>{
    return viewpoint.filter((viewpoint)=>{
        
        const nameMatch = viewpoint.name.toLowerCase().includes(text.toLowerCase());
        
        const cityMatch = viewpoint.city.toLowerCase() === city.toLowerCase()

        return cityMatch && nameMatch 
    }).sort((a,b)=>{
        if(sortBy ==='date'){
            return a.posted < b.posted ? 1 : -1; //由大到小
        }
        else if (sortBy ==='amount') {
            return a.averagePrice < b.averagePrice ? 1 : -1;
        }else if (sortBy ==='like') {
            return a.likeby.length < b.likeby.length ? 1 : -1;
        }
    });
}