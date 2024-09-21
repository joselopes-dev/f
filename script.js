// Permitir que os elementos possam ser soltos
function allowDrop(event) {
  event.preventDefault();
  if (event.type === 'dragover' || event.type === 'touchmove') {
    event.currentTarget.classList.add('drag-over');
  }
}

// Função chamada quando o item começa a ser arrastado com mouse
function drag(event) {
  event.dataTransfer.setData("imageId", event.target.id);
}

// Função chamada quando o item deixa a área de drop com mouse
function dragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

// Função para soltar a imagem na área designada com mouse
function drop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
  
  var imageId = event.dataTransfer.getData("imageId");
  var droppedElement = document.getElementById(imageId);
  
  if (checkAnswer(imageId, event.target.id)) {
    var dropArea = event.target;
    var textContent = dropArea.innerHTML;
    dropArea.innerHTML = "";

    var textElement = document.createElement("p");
    textElement.innerHTML = textContent;
    dropArea.appendChild(textElement);

    dropArea.appendChild(droppedElement); 
    throwConfetti();
  } else {
    resetPosition(droppedElement);
  }
}

// Função para validar a resposta correta
function checkAnswer(imageId, dropAreaId) {
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
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
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
  
  for (let i = elementsArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    container.appendChild(elementsArray[j]);
  }
}

// Função para reiniciar o jogo
function restartGame() {
  var container = document.getElementById('drag-container');
  var dropAreas = document.querySelectorAll('.drop-area');
  
  dropAreas.forEach(function(area) {
    var imagesInDropArea = area.querySelectorAll('img');
    imagesInDropArea.forEach(function(image) {
      container.appendChild(image);
    });
  });

  shuffleElements(container);
  shuffleElements(document.getElementById('drop-area-container'));
}

// Objeto para gerenciar dados de toque
let touchData = {
  dragging: false,
  draggedElement: null,
  originalParent: null,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  clone: null
};

// Iniciar o toque
function touchStart(event) {
  event.preventDefault();
  
  if (event.target.tagName.toLowerCase() === 'img') {
    touchData.dragging = true;
    touchData.draggedElement = event.target;
    touchData.originalParent = event.target.parentElement;
    const touch = event.touches[0];
    touchData.startX = touch.clientX;
    touchData.startY = touch.clientY;
    
    // Criar um clone para seguir o toque
    touchData.clone = event.target.cloneNode(true);
    touchData.clone.style.position = 'absolute';
    touchData.clone.style.pointerEvents = 'none';
    touchData.clone.style.opacity = '0.8';
    touchData.clone.style.left = `${touch.clientX}px`;
    touchData.clone.style.top = `${touch.clientY}px`;
    document.body.appendChild(touchData.clone);
  }
}

// Movimentar o toque
function touchMove(event) {
  if (!touchData.dragging) return;
  
  const touch = event.touches[0];
  touchData.currentX = touch.clientX;
  touchData.currentY = touch.clientY;
  
  if (touchData.clone) {
    touchData.clone.style.left = `${touch.clientX}px`;
    touchData.clone.style.top = `${touch.clientY}px`;
  }

  // Adicionar classe de drag-over se estiver sobre uma drop area
  const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  if (dropTarget && dropTarget.classList.contains('drop-area')) {
    dropTarget.classList.add('drag-over');
  }

  // Remover a classe de drag-over de outras drop areas
  document.querySelectorAll('.drop-area').forEach(function(area) {
    if (area !== dropTarget) {
      area.classList.remove('drag-over');
    }
  });
}

// Finalizar o toque
function touchEnd(event) {
  if (!touchData.dragging) return;
  
  touchData.dragging = false;
  
  if (touchData.clone) {
    document.body.removeChild(touchData.clone);
    touchData.clone = null;
  }
  
  // Remover todas as classes de drag-over
  document.querySelectorAll('.drop-area').forEach(function(area) {
    area.classList.remove('drag-over');
  });
  
  // Detectar o elemento sob o toque
  const dropTarget = document.elementFromPoint(touchData.currentX, touchData.currentY);
  
  if (dropTarget && dropTarget.classList.contains('drop-area')) {
    const imageId = touchData.draggedElement.id;
    const dropAreaId = dropTarget.id;
    
    if (checkAnswer(imageId, dropAreaId)) {
      var dropArea = dropTarget;
      var textContent = dropArea.innerHTML;
      dropArea.innerHTML = "";

      var textElement = document.createElement("p");
      textElement.innerHTML = textContent;
      dropArea.appendChild(textElement);

      dropArea.appendChild(touchData.draggedElement); 
      throwConfetti();
    } else {
      resetPosition(touchData.draggedElement);
    }
  } else {
    resetPosition(touchData.draggedElement);
  }
}

// Adicionar eventos de toque aos elementos arrastáveis
function addTouchSupport() {
  const draggableImages = document.querySelectorAll('.drag-container img');
  
  draggableImages.forEach(function(img) {
    img.addEventListener('touchstart', touchStart, false);
    img.addEventListener('touchmove', touchMove, false);
    img.addEventListener('touchend', touchEnd, false);
  });
}

// Embaralhar ao carregar a página e adicionar suporte a toque
document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById('drag-container');
  var dropContainer = document.getElementById('drop-area-container');

  shuffleElements(container);
  shuffleElements(dropContainer);
  
  // Adicionar suporte a toque
  addTouchSupport();
});

