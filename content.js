
// chrome.runtime.onMessage.addListener(
//     function (message, sender, sendResponse) {
//         if (message) {
//             console.log("rating received");
//             console.log(message.rating);
//         }
//     }
// );





// document.addEventListener('click', function (e) {
//     var title = document.getElementsByClassName("citation__title")[0].innerText;
//     var author_data = document.getElementsByClassName("loa__author-name");
//     var authors = [];

//     for (var i = 0; i < author_data.length; i++) {
//         var author = author_data[i].innerText;
//         authors.push(author);
//     }

//     console.log(title);
//     console.log(authors);

//     var xhr = new XMLHttpRequest();
//     var url = 'https://wordbubbles.herokuapp.com/authors/store-from-outside'; // 実際のベースURLに置き換えてください

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             // リクエストが成功した場合の処理
//             console.log("author stored");
//         }
//     };

//     var data = {
//         title: title,
//         authors: authors
//     };

//     xhr.open('GET', url + '?data=' + encodeURIComponent(JSON.stringify(data)), true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send();
// });
