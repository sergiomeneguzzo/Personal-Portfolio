import {defineType} from "sanity";

export const headerType  = defineType({
    name: 'header',
    type: 'document',
    title: 'Header Content',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Nome completo',
        },
        {
            name: 'role',
            type: 'string',
            title: 'Ruolo professionale',
        },
        {
            name: 'location',
            type: 'string',
            title: 'Luogo',
        },
    ],
});
