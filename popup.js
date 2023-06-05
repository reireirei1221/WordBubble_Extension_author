document.addEventListener('DOMContentLoaded', function () {
    var questionText = document.getElementById('questionText');
    var ratingInputs = document.querySelectorAll('#rating input[type="radio"]');
    var sendButton = document.getElementById('sendButton');
    var ratingSection = document.getElementById('rating');
    var messageContainer = document.getElementById('messageContainer');
    var successMessage = document.getElementById('successMessage');
    var errorMessage = document.getElementById('errorMessage');

    // Add click event listeners to the radio buttons
    ratingInputs.forEach(function (input) {
        input.addEventListener('click', function () {
            // Remove 'active' class from all labels
            ratingInputs.forEach(function (input) {
                input.parentNode.classList.remove('active');
            });
            // Add 'active' class to the selected label
            this.parentNode.classList.add('active');
        });
    });

    // Add click event listener to the send button
    sendButton.addEventListener('click', function () {
        var selectedRating = document.querySelector('input[name="rating"]:checked');
        if (selectedRating) {
            console.log('Selected rating:', selectedRating.value);

            sendData(selectedRating.value)
                .then(function (flag_sent) {
                    console.log(flag_sent);

                    if (flag_sent) {
                        // Hide rating section and show success message
                        questionText.style.display = 'none';
                        ratingSection.style.display = 'none';
                        sendButton.style.display = 'none';
                        messageContainer.style.display = 'block';
                        errorMessage.style.display = 'none';
                    } else {
                        // Show error message if no rating is selected
                        errorMessage.style.display = 'block';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    // Show error message if an error occurs during data sending
                    errorMessage.style.display = 'block';
                });
        } else {
            // Show error message if no rating is selected
            errorMessage.style.display = 'block';
        }
    });
});

function sendData(rating) {
    console.log('Sending data...');
    return getCurrentTab()
        .then(function (tab) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();

                console.log(tab);

                var url = tab.url;

                console.log(url);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        // Request succeeded
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
                        var saveUrl = 'https://wordbubbles.herokuapp.com/authors/store-from-outside'; // Replace with the actual data endpoint URL

                        saveXhr.onreadystatechange = function () {
                            if (saveXhr.readyState === 4 && saveXhr.status === 200) {
                                // Data stored successfully
                                console.log('author stored');
                                resolve(true);
                            }
                        };

                        var data = {
                            title: title,
                            authors: authors,
                            rating: rating
                        };

                        console.log(data);

                        saveXhr.open(
                            'GET',
                            saveUrl + '?data=' + encodeURIComponent(JSON.stringify(data)),
                            true
                        );
                        saveXhr.send(null);
                    }
                };

                xhr.open('GET', url, true);
                xhr.send();
            });
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
}

function getCurrentTab() {
    return new Promise(function (resolve, reject) {
        let queryOptions = { active: true, lastFocusedWindow: true };
        chrome.tabs.query(queryOptions, function (tabs) {
            if (tabs && tabs.length > 0) {
                resolve(tabs[0]);
            } else {
                reject('Unable to get the current tab');
            }
        });
    });
}
