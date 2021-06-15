const personagensContainer = document.getElementById('personagens');

window.onload = function () {
  gerarArrayPersonagens();
}

function gerarArrayPersonagens() {
  let personagens = [];

  for (let i = 0; i < 4; i++) {
    personagens.push(gerarIDPersonagemAleatorio());
  }

  personagens = verificaArray(personagens);

  fetch(`https://rickandmortyapi.com/api/character/${personagens}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(personagens => {
    for (personagem of personagens) {
      let div = document.createElement('div');
      let span = document.createElement('span');
      let imagem = document.createElement('img');

      span.innerText = personagem.name;
      imagem.src = personagem.image;
      div.appendChild(imagem);
      div.appendChild(span);
      div.classList.add('personagemContainer');
      personagensContainer.appendChild(div);
    }
  })
  .catch(error => console.error(error));
}

function verificaArray(array) {
  for (let i = 0; i < array.length; i++) {
    let aux = array[i];

    for (let j = 0; j < array.length; j++) {
      if (i !== j) {
        if (array[j] === aux) {
          array[j]++;
        }
      }
    }
  }

  return array;
}

function gerarIDPersonagemAleatorio() {
  return Math.floor((Math.random() * 670) + 1);
}