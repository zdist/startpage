function displayFeaturedContent(data) {
  // Display the featured content
  const featuredContainer = document.getElementById('featuredContainer');
  featuredContainer.innerHTML = ''; // Clear previous content

  for (let i = 0; i < data.news.length; i++) {
    const newsItem = data.news[i];
    const story = newsItem.story.news;
    const links = newsItem.links;
    // const news = newsItem.story.news;

    const articleElement = document.createElement('div');
    articleElement.innerHTML = `<h2>${story.news}</h2>`;

    const linksList = document.createElement('ul');
    links.forEach(link => {
      const listItem = document.createElement('li');
      const linkTitle = link.title || link.displaytitle || 'Untitled';
      const linkUrl = link.content_urls.desktop.page;
      listItem.innerHTML = `<a href="${linkUrl}">${linkTitle}</a>`;
      linksList.appendChild(listItem);
    });

    articleElement.appendChild(linksList);
    featuredContainer.appendChild(articleElement);
  }
}

async function fetchData(accessToken) {
  try {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2,'0');
    let day = String(today.getDate()).padStart(2,'0');
    let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;
    
    let response = await fetch( url,
      {
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzOWY2YmNlNjAzNDkzMGEwZjJlNDliZTU5YTU1MjZlOCIsImp0aSI6ImMxZDkzYjU2ZmYyMTQ4OTcwYzBjZDQ0MzllNmE5MmNmY2ZmM2FlZWViY2M5NmU2MDE2YzY1ZmIxZTlmY2IxMTBiOTJhMDMzODhlNzM2ZGRiIiwiaWF0IjoxNjg0NDY3NDk3LjM1NDQ0MiwibmJmIjoxNjg0NDY3NDk3LjM1NDQ0NiwiZXhwIjozMzI0MTM3NjI5Ny4zNTE3Nywic3ViIjoiNzI4NTE0ODAiLCJpc3MiOiJodHRwczovL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.siawdZ_KoSMdSrWUNWQlhH3VdDQ7JBd-iVRo2UuNilxwJ5TRbQlBQ-XrzkdxwPQ77mY_vM0fvdg1VphE_PDDujgGX9L6n_7Dq2jmiYjuRpw569YwlL8ZCwmRAkK_E_uDXFpACmwffQ_MA0Y50HFN3Iw438cwW9XVehltaklc6yQDb5MYU8k_ZYh1g5pk_idTnnZ9h6KQtPPs7PtWdwkEm0Pxrv97TFdiMrpm2ZxkziX4V5aVMkrlWM1Oc6Hkmw0LfHCIUg3uEvTFKxr1rnT0B57WlJFsP1Z3Ax0Vj6FTBMbfu2Drh-ZKUogSlhbUIsBuMoQ35_ZCRf9t9naWdB5TPCyuQXnICdu2iKZ9rkE7q7RnVZXy8HEog1Z38RF2hNNiliz2t56oTlpZxNogqGuxVZZxIVK2Z-433YZU8ChNCCRglNVxSVPGf4Ioq2ZmrlhOi3Qf3Ge7UfxfDNOIVZYaCZdQg581zmAHAumtDjUa-z_rDztCLJu7-Y65ut6Ni_8oTOcKjPX0LqSpiIN1hElYBuWAmmuumSUzjdl2SvU42G6rFfMhgr8Mgb9xWtFPMF8QWOuWmLKYr8jq9lAGuI5zognxw57wKK0Bamw3-0icyRErwXZ4xJh3FXDxEFbUKrK_s90uNGqj3E-FgN0fFo7Vs2E2FKa35E4ibPahlau5s6U',
          'Api-User-Agent': 'startpage2 (ZoDiSanto)'
        }
      }
    );
    response.json()
      .then(console.log).catch(console.error);

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

async function requestAccessToken(authCode, clientId, clientSecret) {
  try {
    const response = await fetch('https://meta.wikimedia.org/w/rest.php/oauth2/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode,
        client_id: clientId,
        client_secret: clientSecret
      })
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      // Use the access token for further API requests
      return accessToken;
    } else {
      console.error('Request failed with status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error requesting access token:', error);
    return null;
  }
}

const authCode = 'def50200280c3b6cff7e390cf572c3c11731b1bee9764cd9d5fb44c1cb4173382ea5d1c694e139dd3863aebcfd8aa046c63b4cb3f6e55d0aac5f6d967fb211881a9108da63be3e7e073a078f7e31fc46ccc0e1a6f0eefb60e68ad1bb0b8a023e44efc3a34b242b4d6d59a0f9392c25d6238b9d9e33a1304a41356862fa23812e02565df02888c8b1abbd03cb9e7a8dce67b01ccb80a5970b20da6a3057e7b86c19d78b096366fbfdd17b39e45cfd8ac1e43e2c99e402b842db8b5ff23b84c90a21e783209e54b4898a7d27f5961032b3959d7214d3c4d05a2bc7eb0d25070679946304d69a35ed6ad748e7fb4f6d460ff441900ad5fc6eacc188ca4db2621de17eb3a75e19f2d458c8872912329006f0f0c14df590c5cada8f55e2619c608d6656808fa5a0d2253e372aa3e90856c23b7959d549915ad949438c18644271b2b8c580f28b4e2254706e24293f1803ca1e78abbd0acae356fdde8a549068f0791e958df0595dc5cb52f6fe1767';
const clientId = '39f6bce6034930a0f2e49be59a5526e8';
const clientSecret = '69569f7a3cd5e5563772ec9d2ee7943a700769c7';

requestAccessToken(authCode, clientId, clientSecret)
  .then(accessToken => {
    console.log('Access token:', accessToken);
    fetchData(accessToken);
  });
.siawdZ_KoSMdSrWUNWQlhH3VdDQ7JBd-iVRo2UuNilxwJ5TRbQlBQ-XrzkdxwPQ77mY_vM0fvdg1VphE_PDDujgGX9L6n_7Dq2jmiYjuRpw569YwlL8ZCwmRAkK_E_uDXFpACmwffQ_MA0Y50HFN3Iw438cwW9XVehltaklc6yQDb5MYU8k_ZYh1g5pk_idTnnZ9h6KQtPPs7PtWdwkEm0Pxrv97TFdiMrpm2ZxkziX4V5aVMkrlWM1Oc6Hkmw0LfHCIUg3uEvTFKxr1rnT0B57WlJFsP1Z3Ax0Vj6FTBMbfu2Drh-ZKUogSlhbUIsBuMoQ35_ZCRf9t9naWdB5TPCyuQXnICdu2iKZ9rkE7q7RnVZXy8HEog1Z38RF2hNNiliz2t56oTlpZxNogqGuxVZZxIVK2Z-433YZU8ChNCCRglNVxSVPGf4Ioq2ZmrlhOi3Qf3Ge7UfxfDNOIVZYaCZdQg581zmAHAumtDjUa-z_rDztCLJu7-Y65ut6Ni_8oTOcKjPX0LqSpiIN1hElYBuWAmmuumSUzjdl2SvU42G6rFfMhgr8Mgb9xWtFPMF8QWOuWmLKYr8jq9lAGuI5zognxw57wKK0Bamw3-0icyRErwXZ4xJh3FXDxEFbUKrK_s90uNGqj3E-FgN0fFo7Vs2E2FKa35E4ibPahlau5s6U
