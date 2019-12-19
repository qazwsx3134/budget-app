
//Get visible qanda




export default (qanda, {city,title,topic, sortBy, startDate, endDate})=>{
    return qanda.filter((qanda)=>{
        
        const titleMatch = qanda.title.toLowerCase().includes(title.toLowerCase());
        const topicMatch = qanda.topic ? qanda.topic.toLowerCase().includes(topic.toLowerCase()): true;
        const cityMatch = qanda.city.toLowerCase() === city.toLowerCase()

        return cityMatch && titleMatch&&topicMatch
    }).sort((a,b)=>{
        if(sortBy ==='date'){
            return a.posted < b.posted ? 1 : -1; //由大到小
        }
        else if (sortBy ==='amount') {
            return a.amount < b.amount ? 1 : -1;
        }else if (sortBy ==='like') {
            return a.likeby.length < b.likeby.length ? 1 : -1;
        }
    });
}