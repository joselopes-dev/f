// Permitir que os elementos possam ser soltos
function allowDrop(event) {
  event.preventDefault();
}

// Função chamada quando o item começa a ser arrastado
function drag(event) {
  event.dataTransfer.setData("imageId", event.target.id);
}

// Função para soltar a imagem na área designada
function drop(event) {
  event.preventDefault();
  var imageId = event.dataTransfer.getData("imageId");
  var droppedElement = document.getElementById(imageId);
  
  // Verificar se a imagem solta corresponde ao ID correto
  if (checkAnswer(imageId, event.target.id)) {
    // Se a resposta estiver correta, coloca a imagem no final da área de drop
    var dropArea = event.target;

    // Criar um contêiner para manter o texto e a imagem separadamente
    var textContent = dropArea.innerHTML; // Salvar o texto atual
    dropArea.innerHTML = ""; // Limpar o conteúdo da drop-area

    // Criar um parágrafo para o texto e adicionar de volta à área
    var textElement = document.createElement("p");
    textElement.innerHTML = textContent;
    dropArea.appendChild(textElement); // Adicionar o texto de volta

    // Adicionar a imagem abaixo do texto
    dropArea.appendChild(droppedElement); 

    // Se estiver correto, joga confetes!
    throwConfetti();
  } else {
    // Se a resposta estiver errada, a imagem retorna para a posição original
    resetPosition(droppedElement);
  }
}

// Função para validar a resposta correta
function checkAnswer(imageId, dropAreaId) {
  // Lógica de validação
  return (imageId === "img1" && dropAreaId === "drop1") ||
         (imageId === "img2" && dropAreaId === "drop2") ||
         (imageId === "img3" && dropAreaId === "drop3") ||
         (imageId === "img4" && dropAreaId === "drop4") ||
         (imageId === "img5" && dropAreaId === "drop5") ||
         (imageId === "img6" && dropAreaId === "drop6") ||
         (imageId === "img7" && dropAreaId === "drop7") ||
         (imageId === "img8" && dropAreaId === "drop8") ||
         (imageId === "img9" && dropAreaId === "drop9") ||
         (imageId === "img10" && dropAreaId === "drop10") ||
         (imageId === "img11" && dropAreaId === "drop11") ||
         (imageId === "img12" && dropAreaId === "drop12");
}

// Função para jogar confetes 🎉
function throwConfetti() {
  confetti({
    particleCount: 100,   // Número de partículas de confete
    spread: 70,           // Ângulo de espalhamento dos confetes
    origin: { y: 0.6 },   // Origem do disparo (ajustado para o meio da tela)
  });
}

// Função para reposicionar a imagem no local original
function resetPosition(element) {
  var dragContainer = document.getElementById('drag-container');
  dragContainer.appendChild(element);
}

// Função para embaralhar os elementos dentro de um contêiner
function shuffleElements(container) {
  var elementsArray = Array.from(container.children);
  
  // Função de embaralhamento (algoritmo de Fisher-Yates)
  for (let i = elementsArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    container.appendChild(elementsArray[j]); // Reposiciona os elementos embaralhados no container
  }
}

// Função para reiniciar o jogo
function restartGame() {
  // Retorna as imagens para o contêiner original
  var container = document.getElementById('drag-container');
  var dropAreas = document.querySelectorAll('.drop-area');
  
  dropAreas.forEach(function(area) {
    var imagesInDropArea = area.querySelectorAll('img');
    imagesInDropArea.forEach(function(image) {
      container.appendChild(image); // Reposiciona as imagens no contêiner original
    });
  });

  // Embaralha as imagens no contêiner
  shuffleElements(container);

  // Embaralha as áreas de drop
  var dropContainer = document.getElementById('drop-area-container');
  shuffleElements(dropContainer);
}

// Embaralhar ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById('drag-container');
  var dropContainer = document.getElementById('drop-area-container');

  // Embaralha as imagens e as áreas de drop
  shuffleElements(container);
  shuffleElements(dropContainer);
});

