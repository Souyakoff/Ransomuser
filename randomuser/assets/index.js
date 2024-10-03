console.log("Salut");

const endpoint = "https://randomuser.me/api/?results=50";
const openweathermapEndpoint = "https://api.openweathermap.org/data/2.5/weather?appid=93c2b33698c24ea032446f256a709a61";
const weatherIconUrl = "https://openweathermap.org/img/wn/${weatherIcon}@2x.png;"

// Fetch des utilisateurs
fetch(endpoint)
    .then(response => {
        console.log(response.status);

        if (response.status === 200) {
            return response.json();
        }
        throw new Error('Erreur réseau');
    })
    .then(datas => {
        console.log(datas);

        const tableBody = document.getElementById("usersTable");
        datas.results.forEach(user => {
            const genderIcon = user.gender === "male" ? "<img src='../IMG/Male.png' alt='Male' style='width: 20px; height: 20px;'>" : "<img src='../IMG/female.png' alt='Female' style='width: 20px; height: 20px;'>";
            const lat = user.location.coordinates.latitude;
            const lon = user.location.coordinates.longitude;

            // Ajouter la ligne au tableau
            tableBody.innerHTML += `
                <tr>
                    <td>${user.login.username}</td>
                    <td>${genderIcon}</td>
                    <td>${user.name.last}</td>
                    <td>${user.name.first}</td>
                    <td>${user.email}</td>
                    <td><img src="https://flagcdn.com/w40/${user.nat.toLowerCase()}.png" alt="${user.location.country} flag"></td>
                    <td>${user.location.city}</td>
                    <td id="weather-${user.login.username}">Patientez...</td>
                    <td><img src="${user.picture.thumbnail}" alt="Photo de ${user.name.first}" /></td>
                </tr>
            `;

            fetch(`${openweathermapEndpoint}&lat=${lat}&lon=${lon}&units=metric`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw new Error('Erreur réseau météo');
                })
                .then(weatherData => {
                    const weatherIcon = weatherData.weather[0].icon;
                    const weatherCell = document.getElementById(`weather-${user.login.username}`);
                    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

                    // Mettre a jour avec l'icone météo
                    weatherCell.innerHTML = `
                        <img src="${weatherIconUrl}" alt="Météo" style="width: 40px; height: 40px;">
                        ${weatherData.main.temp} °C
                    `;
                })
        });
    })
    .catch(error => {
        console.log(error);
    });
