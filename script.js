document.addEventListener('DOMContentLoaded', function() {
    console.log('Data loaded:', data);
    populateForm(data);
});

function populateForm(data) {
    populateSelect('skills', data.skills);
    populateSelect('senses', data.senses);
    populateSelect('languages', data.languages);
    populateSelect('resistances', data.resistances);
    populateSelect('magicResistance', data.magicResistance);
    populateSelect('spellcasting', data.spellcasting);
    populateSelect('abilities', data.abilities);
    populateSelect('actions', data.actions);
    populateSelect('reactions', data.reactions);
    populateSelect('items', data.items);
    populateSelect('class', data.classes);
}

function populateSelect(id, options) {
    const select = document.getElementById(id);
    if (!select) {
        console.error(`Element with id ${id} not found.`);
        return;
    }
    console.log(`Populating ${id} with options:`, options);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.name;
        opt.innerHTML = option.name;
        select.appendChild(opt);
    });
}

window.addSkill = function addSkill() {
    const select = document.getElementById('skills');
    const value = document.getElementById('skillsValue').value;
    const list = document.getElementById('skillsList');
    const selectedOption = select.options[select.selectedIndex].value;

    const li = document.createElement('li');
    li.innerText = `${selectedOption}: ${value}`;
    list.appendChild(li);
}

window.addAbility = function addAbility(selectId, listId) {
    const select = document.getElementById(selectId);
    const list = document.getElementById(listId);
    const selectedOption = select.options[select.selectedIndex].value;

    const li = document.createElement('li');
    li.innerText = selectedOption;

    list.appendChild(li);
}

window.buildCard = function buildCard() {
    const cardTitle = document.getElementById('cardTitle');
    const cardImage = document.getElementById('cardImage');
    const cardChallenge = document.getElementById('cardChallenge');
    const cardHP = document.getElementById('cardHP');
    const cardAC = document.getElementById('cardAC');
    const cardStats = document.getElementById('cardStats');
    const cardSkills = document.getElementById('cardSkills');
    const cardSenses = document.getElementById('cardSenses');
    const cardLanguages = document.getElementById('cardLanguages');
    const cardResistances = document.getElementById('cardResistances');
    const cardMagicResistance = document.getElementById('cardMagicResistance');
    const cardSpellcasting = document.getElementById('cardSpellcasting');
    const cardAbilities = document.getElementById('cardAbilities');
    const cardActions = document.getElementById('cardActions');
    const cardReactions = document.getElementById('cardReactions');
    const cardItems = document.getElementById('cardItems');
    const cardClass = document.getElementById('classDisplay');

    if (!cardTitle || !cardImage || !cardChallenge || !cardHP || !cardAC || !cardStats || !cardSkills || !cardSenses || !cardLanguages || !cardResistances || !cardMagicResistance || !cardSpellcasting || !cardAbilities || !cardActions || !cardReactions || !cardItems || !cardClass) {
        console.error('One or more elements not found in the DOM.');
        return;
    }

    cardTitle.innerText = document.getElementById('title').value;
    cardChallenge.innerText = "Level: " + document.getElementById('challenge').value;
    cardHP.innerHTML = `<span class="icon-heart">❤</span> ${document.getElementById('hp').value}`;
    cardAC.innerHTML = `<span class="icon-shield">🛡</span> ${document.getElementById('ac').value}`;
    cardStats.innerHTML = formatStats(document.getElementById('stats').value);
    cardClass.innerText = `Class: ${document.getElementById('class').value}`;

    cardSkills.innerHTML = `<strong>Skills:</strong> ${formatAbilities('skillsList', data.skills)}`;
    cardSenses.innerHTML = `<strong>Senses:</strong> ${formatAbilities('sensesList', data.senses)}`;
    cardLanguages.innerHTML = `<strong>Languages:</strong> ${formatAbilities('languagesList', data.languages)}`;
    cardResistances.innerHTML = `<strong>Damage Resistances:</strong> ${formatAbilities('resistancesList', data.resistances)}`;
    cardMagicResistance.innerHTML = `<strong>Magic Resistance:</strong> ${formatAbilities('magicResistanceList', data.magicResistance)}`;
    cardSpellcasting.innerHTML = `<strong>Spellcasting:</strong> ${formatAbilities('spellcastingList', data.spellcasting)}`;
    cardAbilities.innerHTML = `<strong>Abilities:</strong> ${formatAbilities('abilitiesList', data.abilities)}`;
    cardActions.innerHTML = `<strong>Actions:</strong> ${formatAbilities('actionsList', data.actions)}`;
    cardReactions.innerHTML = `<strong>Reactions:</strong> ${formatAbilities('reactionsList', data.reactions)}`;
    cardItems.innerHTML = `<strong>Equipment:</strong> ${formatItems('itemsList', data.items)}`;

    // Set the image
    const imageUrl = document.getElementById('image').value;
    cardImage.src = imageUrl ? imageUrl : '';
    cardImage.style.display = imageUrl ? 'block' : 'none';

    toggleSection('toggleSkills', 'cardSkills');
    toggleSection('toggleSenses', 'cardSenses');
    toggleSection('toggleLanguages', 'cardLanguages');
    toggleSection('toggleResistances', 'cardResistances');
    toggleSection('toggleMagicResistance', 'cardMagicResistance');
    toggleSection('toggleSpellcasting', 'cardSpellcasting');
    toggleSection('toggleAbilities', 'cardAbilities');
    toggleSection('toggleActions', 'cardActions');
    toggleSection('toggleReactions', 'cardReactions');
    toggleSection('toggleItems', 'cardItems');
};

function formatAbilities(listId, dataList) {
    const listItems = Array.from(document.getElementById(listId).children);
    const abilities = listItems.map(li => {
        const itemText = li.innerText;
        const itemName = itemText.split(':')[0].trim(); // Get the name of the skill from the list item
        const itemValue = itemText.split(':')[1] ? itemText.split(':')[1].trim() : ''; // Get the user-provided value, if any
        const itemData = dataList.find(item => item.name === itemName);
        if (itemData) {
            if (listId === 'skillsList') { // Check if it's the skills list to append the level
                return `${itemData.name}: ${itemData.description} (Level: ${itemValue})`; // Append level only for skills
            } else {
                return `${itemData.name}: ${itemData.description}`; // For other abilities, do not append level
            }
        }
        return `${itemName}: ${itemValue}`; // Fallback if no matching item in data.js, without labeling it explicitly as "Level"
    }).join('<br>');
    return abilities;
}

function formatStats(stats) {
    const statsArray = stats.split(',').map(stat => stat.trim());
    return statsArray.map(stat => `<strong>${stat.split(' ')[0]}</strong> ${stat.split(' ')[1]}`).join(' | ');
}

function formatItems(listId, dataList) {
    const listItems = Array.from(document.getElementById(listId).children);
    const items = listItems.map(li => {
        const itemName = li.innerText.trim();
        const itemData = dataList.find(item => item.name === itemName);
        if (itemData) {
            return `${itemData.name}: ${itemData.description} (Weight: ${itemData.weight} lbs)`;
        }
        return itemName; // Fallback if no matching item in data.js
    }).join('<br>');
    return items;
}

function toggleSection(toggleId, sectionId) {
    const toggle = document.getElementById(toggleId);
    const section = document.getElementById(sectionId);
    section.style.display = toggle.checked ? 'block' : 'none';
}

window.rollStats = function rollStats(dice) {
    const stats = ['STR', 'DEX', 'INT', 'CHA', 'STA', 'CON', 'PER'];
    const results = stats.map(stat => `${stat}: ${rollDice(dice)}`);
    document.getElementById('stats').value = results.join(', ');
}

function rollDice(dice) {
    return Math.floor(Math.random() * dice) + 1;
}

window.clearForm = function clearForm() {
    document.getElementById('cardForm').reset();
    document.getElementById('skillsList').innerHTML = '';
    document.getElementById('sensesList').innerHTML = '';
    document.getElementById('languagesList').innerHTML = '';
    document.getElementById('resistancesList').innerHTML = '';
    document.getElementById('magicResistanceList').innerHTML = '';
    document.getElementById('spellcastingList').innerHTML = '';
    document.getElementById('abilitiesList').innerHTML = '';
    document.getElementById('actionsList').innerHTML = '';
    document.getElementById('reactionsList').innerHTML = '';
    document.getElementById('itemsList').innerHTML = '';
}
