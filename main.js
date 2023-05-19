// https://api.wikimedia.org/wiki/API_reference/Feed/Featured_content
// Get today's featured content from English Wikipedia

async function fetchData() {
    try {
      let today = new Date();
      let year = today.getFullYear();
      let month = String(today.getMonth() + 1).padStart(2, '0');
      let day = String(today.getDate()).padStart(2, '0');
      let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;
  
      let response = await fetch(url, {
        headers: {
          'Authorization': 'Bearer MY_CLIENT_ID',
          'Api-User-Agent': 'startpage (my.email@zmail.org)'
        }
      });
  
      if (response.ok) {
        let data = await response.json();
        displayFeaturedContent(data);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function displayFeaturedContent(data) {
    // Display the featured content
    const featuredContainer = document.getElementById('featuredContainer');
    featuredContainer.innerHTML = ''; // Clear previous content
  
    for (let i = 0; i < data.news.length; i++) {
      const newsItem = data.news[i];
      const story = newsItem.story;
      const links = newsItem.links;
  
      const articleElement = document.createElement('div');
      articleElement.innerHTML = `<h2>${story}</h2>`;
  
      const linksList = document.createElement('ul');
      links.forEach(link => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${link}">${link}</a>`;
        linksList.appendChild(listItem);
      });
  
      articleElement.appendChild(linksList);
      featuredContainer.appendChild(articleElement);
    }
}
  
fetchData();