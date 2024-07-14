import { api } from "./api.js";

const lista = document.querySelector("[data-lista]");
const form = document.querySelector("[data-form]");

function constroiCard(produto) {
    const card = document.createElement("li");
    card.className = "card-item";
    card.innerHTML = `
        <div class="card" id="${produto.id}">
            <img src=${produto.imagem} alt="Imagem do produto" class="product-image">
            <div class="card-container--info">
                <p>${produto.nome}</p>
                <div class="card-container--value">
                    <p>$ ${produto.preco}</p>
                    <button class="delete-button">
                        <img src="assets/delete.png" alt="Deletar">
                    </button>
                </div>
            </div>
        </div>
    `;

    return card;
}

async function renderizaProdutos() {
    try {
        const produtos = await api.listaProdutos();
        produtos.forEach(produto => {
            lista.appendChild(constroiCard(produto));
        });
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const card = button.closest(".card");
                const id = card.id;
                deletaProduto(id);
            });
        });
        
    } catch {
        lista.innerHTML = "nenhum produto foi adicionado";
    }
}

renderizaProdutos();


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = event.target.querySelector("[data-nome]").value;
    const preco = event.target.querySelector("[data-preco]").value;
    const imagem = event.target.querySelector("[data-imagem]").value;
    const produto = {
        nome,
        preco,
        imagem
    };
    try {
        await api.criaProduto(produto);
        lista.appendChild(constroiCard(produto));
    } catch {
        lista.innerHTML = "Erro ao adicionar produto";
    }
});

const deletaProduto = async (id) => {
    try {
        await api.deletaProduto(id);
        const card = document.getElementById(id);
        card.remove();
    } catch {
        lista.innerHTML = "Erro ao deletar produto";
    }
}




