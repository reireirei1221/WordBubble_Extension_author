document.addEventListener('DOMContentLoaded', function () {
    var sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', function () {
        var selectedRating = document.querySelector('input[name="rating"]:checked');
        if (selectedRating) {
            console.log('Selected rating:', selectedRating.value);
            sendData(selectedRating.value);
        } else {
            console.log('Please select a rating.');
        }
    });
});

function sendData(rating) {
    console.log('Sending data...');
    getCurrentTab().then((tab) => {
        var xhr = new XMLHttpRequest();
        var url = tab.url;

        console.log(url);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // リクエストが成功した場合の処理

                var parser = new DOMParser();
                var doc = parser.parseFromString(xhr.responseText, 'text/html');
                
                var title = doc.querySelector('.citation__title').innerText;
                var author_data = doc.querySelectorAll('.loa__author-name');
                var authors = [];

                for (var i = 0; i < author_data.length; i++) {
                    var author = author_data[i].innerText;
                    authors.push(author);
                }

                console.log(title);
                console.log(authors);
                console.log(rating);

                var saveXhr = new XMLHttpRequest();
                var saveUrl = 'https://wordbubbles.herokuapp.com/authors/store-from-outside'; // 実際のデータ送信先URLに置き換えてください

                saveXhr.onreadystatechange = function () {
                    if (saveXhr.readyState === 4 && saveXhr.status === 200) {
                        // リクエストが成功した場合の処理
                        console.log("author stored");
                    }
                };

                var data = {
                    title: title,
                    authors: authors,
                    rating: rating
                };

                console.log(data);

                saveXhr.open('GET', saveUrl + '?data=' + encodeURIComponent(JSON.stringify(data)), false);
                saveXhr.send(null);
            }
        };

        xhr.open('GET', url, true);
        xhr.send();
        // chrome.tabs.sendMessage(tab.id, { rating: rating });
        // console.log('Data sent!');

    });
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function save_paper() {
    console.log("save_paper called");
}

// function save_paper(rating) {
//     var title = document.getElementsByClassName("citation__title")[0].innerText;
//     var author_data = document.getElementsByClassName("loa__author-name");
//     var authors = [];
//     for (var i = 0; i < author_data.length; i++) {
//         authors.push(author_data[i].innerText);
//     }

//     var xhr = new XMLHttpRequest();
//     var url = 'https://wordbubbles.herokuapp.com/authors/store-from-outside'; // 実際のデータ送信先URLに置き換えてください

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             // リクエストが成功した場合の処理
//             console.log("author stored");
//         }
//     };

//     var data = {
//         title: title,
//         authors: authors,
//         rating: rating
//     };

//     xhr.open('GET', url + '?data=' + encodeURIComponent(JSON.stringify(data)), true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send();
// }