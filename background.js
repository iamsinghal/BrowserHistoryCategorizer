// Define a data structure to store the usage metrics
var data = {
    'social media': [],
    'news': [],
    'shopping': [],
    'entertainment': [],
    'other': []
  };
  
  // Define a function to categorize URLs based on rules
  function getCategory(url) {
    if (url.indexOf('facebook.com') !== -1 || url.indexOf('twitter.com') !== -1) {
      return 'social media';
    } else if (url.indexOf('nytimes.com') !== -1 || url.indexOf('cnn.com') !== -1) {
      return 'news';
    } else if (url.indexOf('amazon.com') !== -1 || url.indexOf('ebay.com') !== -1) {
      return 'shopping';
    } else if (url.indexOf('youtube.com') !== -1 || url.indexOf('netflix.com') !== -1) {
      return 'entertainment';
    } else {
      return 'other';
    }
  }
  
  // Use the browsing history API to track website visits
  chrome.history.onVisited.addListener(function(historyItem) {
    var url = historyItem.url;
    var category = getCategory(url);
    data[category].push(historyItem.lastVisitTime);
  });
  
  // Listen for messages from the popup window
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // If the popup window requests the usage data, send it back
    if (request.action === 'get_data') {
      sendResponse(data);
    }
  });
  