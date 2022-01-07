<template>
    <div>
        <div>
            <h1>COMING SOON</h1>
            <router-link class="link" :to="{name: 'home'}">Home</router-link>
        </div>
        <div>
            <chart :options="options"></chart> 
        </div>
    </div>
</template>

<script>
 
export default {
    name: "testChart",
    data: () => ({
        options:  {
        title: {
            text: 'Stacked Line'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Goal Progress', 'Pace Line']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6', '11/7', '11/8', '11/9','11/10', '11/11', '11/12', '11/13', '11/14', '11/15', '11/16', '11/17', '11/18', '11/19', '11/20', '11/21', '11/22','11/23', '11/24', '11/25', '11/26', '11/27', '11/28', '11/29', '11/30', '11/31', '12/1', '12/2', '12/3', '12/4', '12/5', '12/6', '12/7', '12/8', '12/9', '12/10', '12/11', '12/12', '12/13']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            name: 'Goal Progress',
            color: '#2a6423',
            // areaStyle: {
            //   color: '#1c3785',
            // },
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: 'red',
                // color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                // {
                //     offset: 0,
                //     color: 'rgb(128, 255, 165)'
                // },
                // {
                //     offset: 1,
                //     color: 'rgb(1, 191, 236)'
                // }
                // ])
            },
            symbolSize: 1,
            z: -1,      
            type: 'line',
            data: [130, 150, 125, 135, 175, 185, 148, 168, 72, 181, 88, 82, 80, 85, 90, 105, 89, 92, 92, 79, 89, 20, 225, 15, 220, 35, 220, 180, 65, 205, 40, 120, 125, 115, 120, 135, 120, 80, 65, 105, 90]
,
            smooth: true,
            },
            {
            name: 'Pace Line',
                    lineStyle: {
                width: 2,
            },
            symbolSize: 1,
            z: -1,
            type: 'line',
            data: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400]
            },
        ]
        }
    }),
    created() {
            let data1 = [130, 150, 125, 135, 175, 185, 148, 168, 72, 181, 88, 82, 80, 85, 90, 105, 89, 92, 92, 79, 89, 20, 225, 15, 220, 35, 220, 180, 65, 205, 40, 120, 125, 115, 120, 135, 120, 80, 65, 105, 90]
            let data2 = [0]
            let counter = 0
            data1.forEach((num) => {
                counter += num;
                data2.push(counter)
            })
    }
}
</script>

<style scoped>

</style>