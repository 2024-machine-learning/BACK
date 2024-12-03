function postData(title, content) {
    console.log('Post Data 실행됨');
    fetch('http://localhost:8080/ai/song', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 요청 헤더 추가
        },
        body: JSON.stringify({ novelTitle: title, novelContent: stripHTMLTags(content) }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // 응답 본문 JSON 변환
        })
        .then((data) => {
            console.log("Response data:", data);
            console.log('then call');
            loadPage(
                '../../resultPage.html',
                ['https://sdk.scdn.co/spotify-player.js', './script/apiScript.js'],
                () => {
                    const titleText = document.getElementById('titleText');
                    const novelContent = document.getElementById('novelContent');

                    if (titleText && novelContent) {
                        titleText.innerHTML = data.novelTitle;
                        novelContent.innerHTML = content;
                    }
                    console.log('set first html');
                    console.log(data.title,data.artist);

                    const artistText = document.getElementById('Artist');
                    const trackText= document.getElementById('Title');

                    if(artistText && trackText){
                        artistText.innerHTML = data.artist;
                        trackText.innerHTML = data.title;
                    }

                    const secdivisor = document.getElementById('secdiv');
                    const titledeco=document.getElementById('titleHilightBar');

                    if(secdivisor && titledeco){
                        secdivisor.setAttribute('style',`background-color:rgb(${data.R},${data.G},${data.B})`);
                        titledeco.setAttribute('style',`background-color:rgb(${data.R},${data.G},${data.B})`);
                    }
                }
            );

        })
        .catch((err) => {
            console.error("Error:", err);
            console.log("Fallback content:", title, content);
            loadPage(
                '../../resultPage.html',
                ['https://sdk.scdn.co/spotify-player.js', './script/apiScript.js'],
                () => {
                    const titleText = document.getElementById('titleText');
                    const novelContent = document.getElementById('novelContent');

                    if (titleText && novelContent) {
                        titleText.innerHTML = title;
                        novelContent.innerHTML = content;
                    }
                }
            );
        });
}


function stripHTMLTags(input) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;
    return tempDiv.textContent || tempDiv.innerText || '';
}