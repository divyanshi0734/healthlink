document.addEventListener('DOMContentLoaded', () => {
    // --- Language Translation ---
    const languageSelector = document.getElementById('language-selector');
    const translations = {
        en: {}, // Will be populated from en.json
        es: {}, // Will be populated from es.json
        fr: {}, // Will be populated from fr.json
        hi: {}  // Will be populated from hi.json
    };

    async function loadTranslations(lang) {
      try { 
        const response = await fetch(`lang/${lang}.json`);
        translations[lang] = await response.json();
        translatePage(lang);
      } catch (error) {
        console.error(`Error loading ${lang} translations:`, error);
      }
    }

    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];

                //Special handling for placeholders
                if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA'){
                    element.placeholder = translations[lang][key];
                }
            } else {
                console.warn(`Translation not found for key: ${key} in language: ${lang}`);
            }
        });
    }

    languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        loadTranslations(selectedLanguage);
    });

    // Load default language (English)
    loadTranslations('en');


    // --- NGO Data ---
    async function loadNGOData() {
        try {
            const response = await fetch('data/ngo_data.json');
            const ngoData = await response.json();
            displayNGOs(ngoData);
        } catch (error) {
            console.error('Error loading NGO data:', error);
        }
    }

    function displayNGOs(ngos) {
        const ngoList = document.getElementById('ngo-list');
        ngoList.innerHTML = ''; // Clear existing list
        ngos.forEach(ngo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${ngo.name}</strong> - ${ngo.description} <a href="${ngo.website}" target="_blank" data-i18n="learn_more">Learn More</a>`;
            ngoList.appendChild(listItem);
        });
    }

    loadNGOData();

    // --- Government Scheme Data ---
    async function loadSchemeData() {
        try {
            const response = await fetch('data/scheme_data.json');
            const schemeData = await response.json();
            displaySchemes(schemeData);
        } catch (error) {
            console.error('Error loading scheme data:', error);
        }
    }

    function displaySchemes(schemes) {
        const schemeList = document.getElementById('scheme-list');
        schemeList.innerHTML = '';
        schemes.forEach(scheme => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${scheme.name}</strong> - ${scheme.description} <a href="${scheme.website}" target="_blank" data-i18n="learn_more">Learn More</a>`;
            schemeList.appendChild(listItem);
        });
    }

    loadSchemeData();

    // --- Resource Library ---
    const resourceCategories = document.querySelectorAll('.resource-categories button');
    const resourceList = document.getElementById('resource-list');

    resourceCategories.forEach(button => {
        button.addEventListener('click', (event) => {
            const category = event.target.dataset.category;
            displayResources(category);
        });
    });

    async function displayResources(category) {
        // **Placeholder**:  Replace with actual data fetching or static resource lists
        // For example, you could have different JSON files for each category.
        resourceList.innerHTML = `<p data-i18n="loading_resources">Loading resources for ${category}...</p>`;

        // Simulate loading delay
        setTimeout(() => {
            let resources = [];
            switch (category) {
                case 'general':
                    resources = [
                        { title: 'General Health Tips', link: '#' },
                        { title: 'Healthy Eating Guide', link: '#' }
                    ];
                    break;
                case 'maternal':
                    resources = [
                        { title: 'Prenatal Care Information', link: '#' },
                        { title: 'Postpartum Depression Resources', link: '#' }
                    ];
                    break;
                case 'child':
                    resources = [
                        { title: 'Childhood Immunization Schedule', link: '#' },
                        { title: 'Nutrition for Children', link: '#' }
                    ];
                    break;
                case 'mental':
                    resources = [
                        { title: 'Mental Health Support Groups', link: '#' },
                        { title: 'Dealing with Stress and Anxiety', link: '#' }
                    ];
                    break;
                    case 'Help':
                    resources = [
                        { title: 'Government Schemes', link: '#' },
                        { title: 'NGOs for Financial & Medical Help', link: '#' }
                    ];
                    break;
                default:
                    resources = [];
            }

            resourceList.innerHTML = '';
            if (resources.length === 0) {
                resourceList.innerHTML = `<p data-i18n="no_resources_available">No resources available for this category.</p>`;
            } else {
                const ul = document.createElement('ul');
                resources.forEach(resource => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${resource.link}" target="_blank">${resource.title}</a>`;
                    ul.appendChild(li);
                });
                resourceList.appendChild(ul);
            }
        }, 500); // Simulated loading delay
    }

    // --- Emergency Form ---
    const emergencyForm = document.getElementById('emergency-form');
    emergencyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;

        // **Placeholder**:  Handle form submission (e.g., send data to a server)
        alert(`Emergency request submitted:\nName: ${name}\nPhone: ${phone}\nLocation: ${location}\nDescription: ${description}`);
        emergencyForm.reset();
    });

    // --- Find Help Buttons (Map Interaction) ---
    document.getElementById('find-hospitals').addEventListener('click', () => {
        // **Placeholder**:  Call a function in map.js to find nearby hospitals
        if (typeof findNearbyHospitals === 'function') {
            findNearbyHospitals(); // Assuming this function exists in map.js
        } else {
            alert('Map functionality not yet implemented.');
        }
    });

    document.getElementById('find-clinics').addEventListener('click', () => {
        // **Placeholder**: Call a function in map.js to find nearby clinics
        if (typeof findNearbyClinics === 'function') {
            findNearbyClinics(); // Assuming this function exists in map.js
        } else {
            alert('Map functionality not yet implemented.');
        }
    });

    document.getElementById('track-ambulance').addEventListener('click', () => {
        // **Placeholder**: Implement ambulance tracking functionality (using map.js)
        alert('Ambulance tracking feature coming soon.');
    });

});