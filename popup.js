
const showquote = document.getElementById('show-quote');
const quoteDiv = document.getElementById('quote');
const showsteps = document.getElementById('show-steps');
const stepDiv = document.getElementById('steps');
const loader = document.getElementById('loader');


// when user clicks the getquote button, do a post api call to get a quote

showquote.addEventListener('click', () => {
  //get current page url
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(url);
  // get the part after https://leetcode.com/problems/ and before /
  var urlParts = url.split("/problems/");
  if (urlParts.length > 1) {
    var problemName = urlParts[1].split("/")[0];


  // make loader visble without a block
  loader.style.opacity = 1;
  // make a post request to the server with the problem name {question: problemName}
  fetch('https://leetquotes-225c15cde1b5.herokuapp.com/getonequote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'question': problemName })

  })
    .then((response) => response.json())
    .then((data) => {
      quoteDiv.style.display = 'block';
      console.log('Success:', data);
      loader.style.opacity = 0;
      quoteDiv.innerText = data.quote;
    })

    .catch((error) => {
      console.error('Error:', error);
    });
  }
  }
  );
}
);

showsteps.addEventListener('click', () => {
  //get current page url
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(url);
  // get the part after https://leetcode.com/problems/ and before /
  var urlParts = url.split("/problems/");
  if (urlParts.length > 1) {
    var problemName = urlParts[1].split("/")[0];

    loader.style.opacity = 1;
// iterate theough the steps and display in json in solution key
  fetch('https://leetquotes-225c15cde1b5.herokuapp.com/getonequote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'question': problemName })
  })
    .then((response) => response.json())
    .then((data) => {

      stepDiv.style.display = 'block';
      console.log('Success:', data);
      loader.style.opacity = 0;
      for (var i = 0; i < data.solution.length; i++) {
        var step = document.createElement('p');
        step.innerText = data.solution[i];
        stepDiv.appendChild(step);
      }
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  }
  );
}
);