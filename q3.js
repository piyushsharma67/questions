let data=[{id:4,data:3},{id:2,data:4},{id:3,data:2},{id:3,data:2}]

function filterArray(data){
    let filteredData=[]

    for(let i=0;i<data.length;i++){
        if(data[i].id===3)
        filteredData.push(data[i])
    }
    return filteredData
}

console.log(filterArray(data))