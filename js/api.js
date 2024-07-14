async function listaProdutos() {
    const response = await fetch('http://localhost:3000/produtos');
    const data = await response.json();
    return data;
}

async function criaProduto(produto) {
    const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    });
    const data = await response.json();
    return data;
}

async function deletaProduto(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}

export const api = {
    listaProdutos,
    criaProduto,
    deletaProduto
}