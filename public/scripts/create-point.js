function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    // console.log('ufSelect = ' + ufSelect[0].nome)
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value>Selecione a cidade</option>'
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            // console.log(cities.json)
            for (const city of cities) {
                // console.log(city.id + ',' + city.nome)
                // console.log(citySelect.value)
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            // console.log(citySelect.innerHTML)
            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// trabalhando com itens de coletas

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    // console.log(item)
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    // adicionar ou remover uma classe com JS
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = event.target.dataset.id

    // console.log('Tipo resíduos: ', itemId)

    /** verificar se existem itens selecionados 
     se sim, pegar os itens selecionados */

    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    /** se já estiver selecionado, tirar da seleção */
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        /* se não estiver selecionado, adicionar à seleção */
        // console.log('Tipo de resíduo: ', itemId)
        selectedItems.push(itemId)
    }

    console.log('SelectedItems: ', selectedItems)

    /* atualiar o campo escondido com os itens selecionado */
    collectedItems.value = selectedItems

}