const form = document.getElementById("form");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ciudad = document.getElementById("ciudad").value.trim();

    if (!ciudad) {
        resultado.innerHTML = `<p Por favor, introduce el nombre de una ciudad.</p>`;
        return;
    }

    console.log(`Buscando clima para: ${ciudad}`);
    await getData(ciudad);
});

async function getData(ciudad) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=1b79e5641454301b2b438193af6ecdbf&units=metric`;
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Introduce dirección valida`);
        }

        const json = await respuesta.json();

        console.log("Respuesta de la API:", json);

        const primerPronostico = json.list[0];
        console.log(primerPronostico);

        const {speed} = primerPronostico.wind;

        console.log("Viento obtenidas:", { speed });

        const { temp, temp_max, temp_min, feels_like, humidity } = primerPronostico.main;

        console.log("Temperaturas obtenidas:", { temp, temp_max, temp_min, feels_like, humidity });

        // Actualiza el frontend
        console.log("Actualizando resultados en el DOM...");
        resultado.innerHTML = `
        <h2>Clima en ${ciudad.charAt(0).toUpperCase() + ciudad.slice(1)}</h2>
        <div class="weather-info">
            <div class="info-item">
                <span class="emoji">🌡️</span>
                <p><strong>Temperatura actual:</strong> ${temp}°C</p>
            </div>
            <div class="info-item">
                <span class="emoji">🌞</span>
                <p><strong>Máxima:</strong> ${temp_max}°C</p>
            </div>
            <div class="info-item">
                <span class="emoji">❄️</span>
                <p><strong>Mínima:</strong> ${temp_min}°C</p>
            </div>
            <div class="info-item">
                <span class="emoji">🤔</span>
                <p><strong>Sensación térmica:</strong> ${feels_like}°C</p>
            </div>
            <div class="info-item">
                <span class="emoji">💧</span>
                <p><strong>Humedad:</strong> ${humidity}%</p>
            </div>
            <div class="info-item">
                <span class="emoji">💨</span>
                <p><strong>Viento:</strong> ${speed} km/h</p>
            </div>
        </div>
    `;
    
        console.log("Resultados actualizados en el DOM.");
    } catch (error) {
        console.error("Error al obtener datos:", error.message);
        resultado.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
