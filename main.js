// https://api.wikimedia.org/wiki/API_reference/Feed/Featured_content
// Get today's featured content from English Wikipedia

// let today = new Date();
// let year = today.getFullYear();
// let month = String(today.getMonth() + 1).padStart(2,'0');
// let day = String(today.getDate()).padStart(2,'0');
// let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;

// let response = await fetch( url,
//   {
//     headers: {
//       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzOWY2YmNlNjAzNDkzMGEwZjJlNDliZTU5YTU1MjZlOCIsImp0aSI6ImMxZDkzYjU2ZmYyMTQ4OTcwYzBjZDQ0MzllNmE5MmNmY2ZmM2FlZWViY2M5NmU2MDE2YzY1ZmIxZTlmY2IxMTBiOTJhMDMzODhlNzM2ZGRiIiwiaWF0IjoxNjg0NDY3NDk3LjM1NDQ0MiwibmJmIjoxNjg0NDY3NDk3LjM1NDQ0NiwiZXhwIjozMzI0MTM3NjI5Ny4zNTE3Nywic3ViIjoiNzI4NTE0ODAiLCJpc3MiOiJodHRwczovL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.siawdZ_KoSMdSrWUNWQlhH3VdDQ7JBd-iVRo2UuNilxwJ5TRbQlBQ-XrzkdxwPQ77mY_vM0fvdg1VphE_PDDujgGX9L6n_7Dq2jmiYjuRpw569YwlL8ZCwmRAkK_E_uDXFpACmwffQ_MA0Y50HFN3Iw438cwW9XVehltaklc6yQDb5MYU8k_ZYh1g5pk_idTnnZ9h6KQtPPs7PtWdwkEm0Pxrv97TFdiMrpm2ZxkziX4V5aVMkrlWM1Oc6Hkmw0LfHCIUg3uEvTFKxr1rnT0B57WlJFsP1Z3Ax0Vj6FTBMbfu2Drh-ZKUogSlhbUIsBuMoQ35_ZCRf9t9naWdB5TPCyuQXnICdu2iKZ9rkE7q7RnVZXy8HEog1Z38RF2hNNiliz2t56oTlpZxNogqGuxVZZxIVK2Z-433YZU8ChNCCRglNVxSVPGf4Ioq2ZmrlhOi3Qf3Ge7UfxfDNOIVZYaCZdQg581zmAHAumtDjUa-z_rDztCLJu7-Y65ut6Ni_8oTOcKjPX0LqSpiIN1hElYBuWAmmuumSUzjdl2SvU42G6rFfMhgr8Mgb9xWtFPMF8QWOuWmLKYr8jq9lAGuI5zognxw57wKK0Bamw3-0icyRErwXZ4xJh3FXDxEFbUKrK_s90uNGqj3E-FgN0fFo7Vs2E2FKa35E4ibPahlau5s6U',
//       'Api-User-Agent': 'startpage2 (ZoDiSanto)'
//     }
//   }
// );
// response.json()
//   .then(console.log).catch(console.error);

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


// Start Page 1
// CLIENT ID
// 1710a417810e975efbc92d91d08458fc
// CLIENT SECRET
// e84acf4a5d5642f1679f29711152445eedfd90bb
// ACCESS TOKEN
// eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNzEwYTQxNzgxMGU5NzVlZmJjOTJkOTFkMDg0NThmYyIsImp0aSI6IjEwMjRmNGEyMDM3Nzg1OGIxYmNmZTA5ZTZiZDUwNThkMmRkODI4NzE0NTI4NTE4MzU0ZGQ2NDViM2JjZjk0YjUwNTNiZmZlYTlkNDFhZmJlIiwiaWF0IjoxNjg0NDY3MjA2Ljg0MTM5MywibmJmIjoxNjg0NDY3MjA2Ljg0MTM5NiwiZXhwIjoxNjg0NDgxNjA2LjgzMzUzMiwic3ViIjoiNzI4NTE0ODAiLCJpc3MiOiJodHRwczovL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.FTPpBxWeRqWIccicdfFedYDfEYfvVokyYozvjH1eV2uQEgjaPXv1V9mgNpofLr3rJ6v6ZWI-FtWpf_BpkjAyc281i_2kV1VXKRcXGSZvkKBDaiknuiOUzjiwb497wmzM44TBe9SVY_Vzhpj0HPg6uTqW8s4eku-8TEOAsuj67dfANADOE6oVqY3cUFjZhdOqH6rqDadxfhnea3w00jYXDG9yt2rB6Pq5a61QyqbmWfm6Mn8ceLuQl8ZJC917fUTp1NEieAGfBFwVAjYvD5wr148h9K8zs0NJGqGzb8zNypk26vGlZkbT8nt8wutExcC8mEjz4flljloVa5ISNKowBwsL_y01Ul_XF_nmCrvrQGAzjaMoXZNEeYKlGWh5K0H1tnd2z31ND8QSecoplYhyx0qWcdNXA_VL5CSZeaas11FAuE--XrOhzNT_BLGjwKiDv0PfJmQy6u3WzA1r5xtWA-v2zkkV6KaL9_x-mb47LwYC7X9MZOQsX_czHVDV_ZWjn07SUS2-Geilt-XHSBIPFpshtt-mcpac9kzoErncDtP-hs2jGesminbQ_SBL_Upu_PdjrouiePvCHvNC1V8kq109dHsms8rMROMxyt0GJX6dI6DRaEHlrUna2Fp66Yq8orKAhDBd1ZrQ4EkEUboIJ12XdXoiNcrNkRfN61U0TNo","refresh_token":"def50200657882dbac4f2df0e1ed4118cfa3c48a2089112bd902ae0575df19ca523c0ced4b599d82b29574a94e68a296b2b7df918a98c4790b35d29467afd1370865c407538d3d63f265720684a7efc6e167229f174c9db649d04fd8960ce3acebd4a68607deb25c04120fbd018a718a850be48da98cf685846d5306cfbd99080c26a7cede852ad3184e39c69dfc5785e090de435f16005e119090a5de94fcdc656a2a26705d5c92c00fbcee79bb3026941b62c7cefb4ebdc198e26f8830e257414e6dc62dc72aa54ea829ffbffac808808aef3696e776ce0c8d70feacbfca8435ea9dced863ea47b8d97d30fd8efdcb9e99f19a3c130154ecf263b91c83891dff1c4fcad787b307f3a54fb40549e191dcab99cc54067961353a24ca96c836e83994beacf5b1319e00c388a243dabeb5503f2b6f71ba20493aa220448652bde59279d3966bd572341ebc0deb2accee657e0a1cf040656745f3b76ebe6a43eeb835d85bd8d5cf0941e0ca4ade4bfc611097c925d3295505d03ac9d0a4162b8ffe552b695fd2157b4fa2e5fab138ca

// Start Page 2
// Client ID:
// 39f6bce6034930a0f2e49be59a5526e8
// Client secret:
// 69569f7a3cd5e5563772ec9d2ee7943a700769c7
// Access token:
// eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzOWY2YmNlNjAzNDkzMGEwZjJlNDliZTU5YTU1MjZlOCIsImp0aSI6ImMxZDkzYjU2ZmYyMTQ4OTcwYzBjZDQ0MzllNmE5MmNmY2ZmM2FlZWViY2M5NmU2MDE2YzY1ZmIxZTlmY2IxMTBiOTJhMDMzODhlNzM2ZGRiIiwiaWF0IjoxNjg0NDY3NDk3LjM1NDQ0MiwibmJmIjoxNjg0NDY3NDk3LjM1NDQ0NiwiZXhwIjozMzI0MTM3NjI5Ny4zNTE3Nywic3ViIjoiNzI4NTE0ODAiLCJpc3MiOiJodHRwczovL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.siawdZ_KoSMdSrWUNWQlhH3VdDQ7JBd-iVRo2UuNilxwJ5TRbQlBQ-XrzkdxwPQ77mY_vM0fvdg1VphE_PDDujgGX9L6n_7Dq2jmiYjuRpw569YwlL8ZCwmRAkK_E_uDXFpACmwffQ_MA0Y50HFN3Iw438cwW9XVehltaklc6yQDb5MYU8k_ZYh1g5pk_idTnnZ9h6KQtPPs7PtWdwkEm0Pxrv97TFdiMrpm2ZxkziX4V5aVMkrlWM1Oc6Hkmw0LfHCIUg3uEvTFKxr1rnT0B57WlJFsP1Z3Ax0Vj6FTBMbfu2Drh-ZKUogSlhbUIsBuMoQ35_ZCRf9t9naWdB5TPCyuQXnICdu2iKZ9rkE7q7RnVZXy8HEog1Z38RF2hNNiliz2t56oTlpZxNogqGuxVZZxIVK2Z-433YZU8ChNCCRglNVxSVPGf4Ioq2ZmrlhOi3Qf3Ge7UfxfDNOIVZYaCZdQg581zmAHAumtDjUa-z_rDztCLJu7-Y65ut6Ni_8oTOcKjPX0LqSpiIN1hElYBuWAmmuumSUzjdl2SvU42G6rFfMhgr8Mgb9xWtFPMF8QWOuWmLKYr8jq9lAGuI5zognxw57wKK0Bamw3-0icyRErwXZ4xJh3FXDxEFbUKrK_s90uNGqj3E-FgN0fFo7Vs2E2FKa35E4ibPahlau5s6U