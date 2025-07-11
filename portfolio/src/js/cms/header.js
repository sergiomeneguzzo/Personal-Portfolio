import { client } from '../sanity.js';

export async function fetchHeaderContent() {
    try {
        const data = await client.fetch(
            `*[_type == "header" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]`
        );

        if (!data) {
            return;
        }

        const nameEl = document.querySelector('.name');
        const roleEl = document.querySelector('.role');
        const placeEl = document.querySelector('.place');

        if (nameEl) nameEl.innerHTML = `${data.name}<span class="number"></span>`;
        if (roleEl) roleEl.innerHTML = `${data.role}<span class="number"></span>`;
        if (placeEl) placeEl.innerHTML = `${data.location}, <span class="time"></span>`;

    } catch (error) {
        console.error('Errore fetchHeaderContent:', error);
    }
}
