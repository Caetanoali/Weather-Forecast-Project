
//Usando o querySelctor para controlar o evento do botton submit, no caso previnir o efeito padrão dele.
document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    //Criando a variavel para o campo de pesquisa onde o usaruio vai digitar 
    const cityName = document.querySelector("#city_name").value;

    //Criando o alerta e vinculando com o HTML, para impedir que o usuario digite errado ou em branco 
    if (!cityName) {
        document.querySelector("#weather").classList.remove('show'); //usado o remove para que quando digitar novamente, a tela seja limpa antes do novo resultado ser apresentado 
        showAlert("Você precisa digitar uma cidade");
        return; 
    }
    
    //Chaves Key da API que estamos usando
    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    //Criando as variaveis e chamando a API para poder pegar os dados que ela nos fornece
    const results = await fetch(apiUrl); //Chamada da Api
    const json = await results.json();

    //Criando um IF podemos pegar os que a API nos envia para poder coloca-los nas informações que nos queremos 
    if(json.cod === 200) { //se o cod do Previw for igual a 200 (ok) então vamos mandar essas informações para a função showInfo
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        })
    } else { //Para impedir que um nome que não seja cidade não seja aceito pela aplicação 
        document.querySelector("#weather").classList.remove('show'); 

        showAlert(`
        Não foi possivel localizar
        <img src="img/nolocal.svg"/>
        `)
    }
})

//Criando a função que vai nos mostrar os dados corretamente na tela 
function showInfo(json){ //Show = somente para que mostre o que queremos quando for pesquisado 
    showAlert("");

    //add a classe show no JavaScript e não no HTML para poder mostrar os resultados apenas quando o nome da cidade for pesquisado
    document.querySelector("#weather").classList.add('show'); 

    //vinculando os resultados que a API nos dá apra os dados da tela 
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace(".",",")} <sup>ºC</sup> `
    //to.Fixed(1) = uma casa depois da virgula, toString() = para transformar em String, replace() para trocar o ponto por virgula. 
    document.querySelector('#temp_description').innerHTML = `${json.description}`

    //Para arrumar a imagem usamos a url que recebemos da api 
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    //temperaturas, igual a feita em cima, porém com max e min
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace(".",",")} <sup>ºC</sup> `
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace(".",",")} <sup>ºC</sup> `

    document.querySelector('#humidity').innerHTML = `${json.humidity}%`
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}Km/h`

}

//Função criada para o Alerta que foi defino no HTML com o id, e estilizado no CSS, porém o alerta só foi colocado em pratica no IF no inicio desse cod. JavaScript 
function showAlert(msg) { 
    document.querySelector("#alert").innerHTML = msg;
}

