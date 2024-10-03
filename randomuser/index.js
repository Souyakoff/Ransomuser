console.log("Salut");

const endpoint = "https://randomuser.me/api/?results=50";
const openweathermap = "https://api.openweathermap.org/data/2.5/weather?appid=93c2b33698c24ea032446f256a709a61";

// Fetch
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
        datas.results.forEach(user => {  // Corrigé ici
            const genderIcon = user.gender === "male" ? "<img src='IMG/Male.png' alt='Male' style='width: 20px; height: 20px;'>" : "<img src='IMG/female.png' alt='Female' style='width: 20px; height: 20px;'>";
            const lat = user.location.coordinates.latitude;
            const lon = user.location.coordinates.longitude;
            tableBody.innerHTML += `
                <tr>
                    <td>${user.login.username}</td>
                    <td>${genderIcon}</td>
                    <td>${user.name.last}</td>
                    <td>${user.name.first}</td>
                    <td>${user.email}</td>
                    <td><img src="https://flagcdn.com/w40/${user.nat.toLowerCase()}.png" alt="${user.location.country} flag"></td>
                    <td id="weather-${user.login.username}">Loading...</td>
                    <td><img src="${user.picture.thumbnail}" alt="Photo de ${user.name.first}" /></td>
                </tr>
            `;

        });
    })
    .catch(error => {
        console.log(error);
    });
