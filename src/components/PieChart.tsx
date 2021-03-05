interface Iprops {
    isMatch: {
        YESs: number, 
        NOs: number 
    }
}

const PieChart = (props: Iprops) => {
    function cssStyle():any {
        if (props.isMatch.YESs) {
            return {
                color: 'red', 
                position: 'absolute', 
                right: '100px',
                display: 'inline-block'
            }
        }
        
    }

    return (
        // <div style={cssStyle()}>
        <div>
            <h1>Pie</h1>  
            <h2>Yeses:{props.isMatch.YESs}</h2>              
            <h2>Nos:{props.isMatch.NOs}</h2>              
        </div>
    )
}

export default PieChart
