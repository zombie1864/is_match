interface Iprops {
    isMatch: {
        YESs: number, 
        NOs: number 
    }
}

const PieChart = (props: Iprops) => {
    return (
        <div>
            <h1>Pie</h1>  
            <h2>Yeses:{props.isMatch.YESs}</h2>              
            <h2>Nos:{props.isMatch.NOs}</h2>              
        </div>
    )
}

export default PieChart
