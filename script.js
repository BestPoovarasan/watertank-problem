function fetchvalue() {
    let inputElement=document.getElementById('inputs')
    let inputs=inputElement.value.split(',')
    let bricks =WaterandBricks(inputs)
    let water =onlywater(inputs)
    WaterandBricks(inputs,bricks)
    onlywater(inputs,water)
}

function Tableview(xaxisinput,outputArr,id) {
  var ele = document.getElementById(id);
  var myChart = echarts.init(ele, null, {
  renderer: 'canvas',
  useDirtyRect: false
  });
  var option;
  option = {
  xAxis: {
      type: 'category',
      data: xaxisinput
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
      data: outputArr,
      type: 'bar'
      }
  ]
  };
  if (option && typeof option === 'object') {
  myChart.setOption(option);
  }
  window.addEventListener('resize', myChart.resize);
}

function WaterandBricks(bricks) {
  let finalCase=[]
  let firstCase=[]
  let secondCase=[]
  let result=[]
  let lastValueForFirstCase=0
  let lastValueForSecondCase=0
  for (let i = 0; i < bricks.length; i++) {
      let element = bricks[i];
      if (element == 0) {
          firstCase.push(lastValueForFirstCase)
      }else{
          firstCase.push('-')
          lastValueForFirstCase =element
      }
  }
  for (let  i = bricks.length - 1; i >= 0; i--) {
      let element = bricks[i];
      if (element == 0) {
          secondCase[i] = lastValueForSecondCase
      }else{
          secondCase[i]= '-'
          lastValueForSecondCase=element
      }
  }
  for (let i = 0; i < bricks.length; i++) {
      let fc=firstCase[i]
      let sc=secondCase[i]
      if (fc == '-') {
          finalCase[i]='-'
      }else{
          finalCase[i]=fc - sc > 0 ? sc : fc
      }
  }
  for (let i = 0; i < bricks.length; i++) {
      let element = bricks[i];
      if(element == 0){
          result.push({
              value: finalCase[i],
              itemStyle: {
                  color: '#0149b6'
              }
          })
      }else{
          result.push({
              value: element,
              itemStyle: {
                  color: '#eb6e1b'
              }
          })
      }
  }
  console.log(firstCase);
  console.log(secondCase);
  console.log(finalCase);
  console.log(result);
  console.log(countWaterUnits(finalCase));
  Tableview(bricks,result,'chart1')
  let output = document.getElementById('waterunit')
  output.innerHTML= `${countWaterUnits(finalCase)} Units` 
}

const countWaterUnits = (finalCase) => {
  let sum = 0
  for (let i = 0; i < finalCase.length; i++) {
      let element = finalCase[i];
      if (element != '-') {
          sum += +element
      }
  }
  return sum
}

function onlywater(water) {
  let firstCase = [];
  let secondCase = [];
  let finalCase = [];
  let result = [];
  let lastValueForFirstCase = 0;
  let lastValueForSecondCase = 0;
  for (let i = 0; i < water.length; i++) {
    let element = water[i];
    if (element == 0) {
      firstCase.push(lastValueForFirstCase);
    } else {
      firstCase.push('-');
      lastValueForFirstCase = element;
    }
  }
  for (let i = water.length - 1; i >= 0; i--) {
    let element = water[i];
    if (element == 0) {
      secondCase[i] = lastValueForSecondCase;
    } else {
      secondCase[i] = '-';
      lastValueForSecondCase = element;
    }
  }
  for (let i = 0; i < water.length; i++) {
    let fc = firstCase[i];
    let sc = secondCase[i];
    if (fc == '-') {
      finalCase[i] = '-';
    } else {
      finalCase[i] = fc - sc > 0 ? sc : fc;
    }
  }
  for (let i = 0; i < water.length; i++) {
    let element = water[i];
    if (element == 0) {
      result.push({
        value: finalCase[i],
        itemStyle: {
          color: '#0149b6',
        },
      });
    } else {
      result.push({
        value: element - finalCase[i],
        itemStyle: {
          color: '#0149b6',
        },
      });
    }
  }
  Tableview(water, result, 'chart2');
}  