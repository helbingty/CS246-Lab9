async function getWeather() {
    const latitude = 44.2619;
    const longitude = -88.4154;

const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,cloud_cover,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const current = data.current;

        const wind10 = current.wind_speed_10m;
        const wind80 = current.wind_speed_80m;
        const wind120 = current.wind_speed_120m;
        const wind180 = current.wind_speed_180m;

        const tempC = current.temperatue_2m;
        const cloud = current.cloud_cover;

        const tempF = (tempC * 9/5) + 32;
        const mph10 = wind10 * 0.621371;
        const mph80 = wind80 * 0.621371;
        const mph120 = wind120 * 0.621371;
        const mph180 = wind180 * 0.621371;

        printResults(tempF, cloud, mph10, mph80, mph120, mph180);

    } catch (error) {
        console.error("Error fetching the requested data: ", error);
    }

    function classifyTemperature(tempF) {
        if (tempF  < 32) {
            return "Below freezing";
        }
        if (tempF === 32) {
            return "Freezing";
            }
        return "Above freezing";
    }

    function classifyCloudCover(cloud) {
        if (cloud <= 5) {
            return "Clear";
        }
        if (cloud <= 25) {
            return "Few";
        }
        if (cloud <= 50) {
            return "Scattered";
        }
        if (cloud <= 87) {
            return "Broken";
        }
        return "Overcast";
    }

    function classifyWind(w10, w80, w120, w180) {
        const lowerAvg  = w10;
        const higherAvg = (w80 + w120 + w180) / 3;
        if (higherAvg > lowerAvg) {
            return "Windier higher";
        }
        if (higherAvg < lowerAvg) {
            return "Windier lower";
        }
        return "Mixed wind behavior";
    }

    function printResults(tempF, cloud, w10, w80, w120, w180) {
        console.log("Temperature:", classifyTemperature(tempF));
        console.log("Cloud Cover:", classifyCloudCover(cloud));
        console.log("Wind:", classifyWind(w10, w80, w120, w180));
    }
}

getWeather();
