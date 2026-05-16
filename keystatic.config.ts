import { config, collection, fields } from '@keystatic/core';

const isGitHub = !import.meta.env.DEV;

export default config({
  storage: isGitHub
    ? {
        kind: 'github',
        repo: 'brammostinckx/svalsemberg-website',
        branchPrefix: 'keystatic/',
      }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Sint-Victor Alsemberg' },
  },

  collections: {
    nieuws: collection({
      label: 'Nieuws',
      slugField: 'titel',
      path: 'src/content/nieuws/*',
      format: { data: 'yaml', contentField: 'inhoud' },
      entryLayout: 'content',
      schema: {
        titel: fields.slug({
          name: { label: 'Titel', description: 'De titel van het nieuwsitem' },
        }),
        datum: fields.date({
          label: 'Datum',
          defaultValue: { kind: 'today' },
        }),
        tag: fields.select({
          label: 'Categorie',
          options: [
            { label: 'Inschrijvingen', value: 'Inschrijvingen' },
            { label: 'Evenement', value: 'Evenement' },
            { label: 'SV-Tamtam', value: 'SV-Tamtam' },
            { label: 'Nieuws', value: 'Nieuws' },
            { label: 'Sport', value: 'Sport' },
          ],
          defaultValue: 'Nieuws',
        }),
        samenvatting: fields.text({
          label: 'Korte samenvatting',
          description: 'Wordt getoond op de voorpagina en nieuwsoverzicht (max. 2 zinnen)',
          multiline: true,
        }),
        uitgelicht: fields.checkbox({
          label: 'Toon op voorpagina',
          defaultValue: false,
        }),
        link: fields.url({
          label: 'Externe link (optioneel)',
          description: 'Vul in als dit item naar een externe pagina verwijst, bv. https://inschrijven.school',
        }),
        internalLink: fields.text({
          label: 'Interne link (optioneel)',
          description: 'Vul in als dit item naar een pagina op de site verwijst, bv. /inschrijvingen',
        }),
        inhoud: fields.markdoc({
          label: 'Volledige inhoud',
          description: 'Optioneel: extra tekst, afbeeldingen, ... die op de detailpagina verschijnen',
        }),
      },
    }),
  },
});
