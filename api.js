export const fetchNews = async () => {
    var myHeaders = new Headers();
    myHeaders.append("X-API-KEY", "12955196772bd384ae80cb23621d98fc5ddb9bb0");
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "q": "économie d'énergie",
      "gl": "fr",
      "hl": "fr",
      "num": 100
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch("https://google.serper.dev/search", requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      return { error: 'Error fetching news' }; 
    }
  }
  