
//Get visible food

export default (food, {city,title, sortBy, label, endDate})=>{
    return food.filter((food)=>{
        const labelMatch = label ? food.label.find(function(item, index, array) {

           return item.subLabel == label
        }): true;
        const titleMatch = food.name.toLowerCase().includes(title.toLowerCase());
        const cityMatch = food.city.toLowerCase() === city.toLowerCase()

        return cityMatch && titleMatch && labelMatch
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