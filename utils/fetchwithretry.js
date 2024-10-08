import http from 'http'
export const agent = new http.Agent({
  keepAlive: true,
});

export const fetchWithRetry = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          //console.log(response)
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json();
      } catch (error) { 
        if (i === retries - 1) throw error;
      }
    }
  };
  