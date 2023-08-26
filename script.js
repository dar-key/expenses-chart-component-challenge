const expensesChartComponentContainer = document.getElementById('expenses-chart-component-container');
const statsContainer = expensesChartComponentContainer.querySelector('.spending-div').querySelector('.stats');

fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    let highestSpending = jsonData[0].amount;
    
    jsonData.forEach(item => {
      if (item.amount > highestSpending)
        highestSpending = item.amount;
    });

    jsonData.forEach(item => {
        const itemElement = statsContainer.querySelector('.' + item.day)
        const itemLine = itemElement.querySelector('.line');
        const itemAmount = itemElement.querySelector('.amount');
        itemLine.style.height = String(item.amount / highestSpending * 150) + 'px';
        if (item.amount == highestSpending)
            itemLine.style.backgroundColor = 'hsl(186, 34%, 60%)';
        itemAmount.innerHTML = '$' + item.amount;
        itemLine.addEventListener('mouseover', () => {
            itemAmount.style.visibility = 'visible';
        });
        itemLine.addEventListener('mouseout', () => {
            itemAmount.style.visibility = 'hidden';
        });
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));